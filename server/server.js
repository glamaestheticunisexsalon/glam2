'use strict';
/*
  GLAM website + Razorpay payment server — zero dependencies (Node 18+).

    node server/server.js

  • Serves the static website from the project folder.
  • POST /api/razorpay/order    creates a Razorpay order from the *catalogue prices* (never trusts browser prices)
  • POST /api/razorpay/verify   verifies the Razorpay payment signature and marks the order paid
  • POST /api/razorpay/webhook  Razorpay -> server confirmation (payment.captured / order.paid / payment.failed)
  • GET  /api/admin/orders      list orders (needs  Authorization: Bearer <ADMIN_TOKEN>)
  The Razorpay SECRET key lives only in server/.env — never in the website files.
*/
const http = require('http'), https = require('https'), fs = require('fs'), path = require('path'), crypto = require('crypto'), vm = require('vm');

/* ---------- env ---------- */
try {
  fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  });
} catch { /* no .env file: rely on real environment variables */ }
const env = k => process.env[k] || '';
const ROOT = path.resolve(__dirname, '..');
const PORT = Number(env('PORT')) || 3000;
const DATA_DIR = path.resolve(env('DATA_DIR') || path.join(__dirname, 'data'));
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const RZP_BASE = (env('RAZORPAY_API_BASE') || 'https://api.razorpay.com').replace(/\/$/, '');

/* ---------- catalogue (re-read when the files change) ---------- */
let siteCache = { stamp: '', value: null };
function loadSite() {
  const files = ['data/site-config.js', 'data/catalog.js'].map(f => path.join(ROOT, f));
  const stamp = files.map(f => fs.statSync(f).mtimeMs).join('|');
  if (siteCache.stamp === stamp) return siteCache.value;
  const sandbox = { window: {} }; vm.createContext(sandbox);
  files.forEach(f => vm.runInContext(fs.readFileSync(f, 'utf8'), sandbox, { filename: f, timeout: 1000 }));
  siteCache = { stamp, value: { config: sandbox.window.SITE_CONFIG || {}, data: sandbox.window.GLAM_DATA || {} } };
  return siteCache.value;
}
/* The live product list: the admin store (server/data/products.json) once it exists, otherwise the sample list in catalog.js. */
function liveData() {
  const { config, data } = loadSite();
  return { config, data: Object.assign({}, data, { products: loadProducts().filter(p => p.active !== false) }) };
}

/* ---------- product & inventory store (JSON file, atomic writes) ---------- */
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json'), STOCKLOG_FILE = path.join(DATA_DIR, 'stock-log.json');
let products = null, stockLog = null, storeChain = Promise.resolve();
function atomicWrite(file, value) {
  storeChain = storeChain.then(() => new Promise(resolve => {
    try { fs.mkdirSync(DATA_DIR, { recursive: true }); const tmp = file + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(value, null, 2)); fs.renameSync(tmp, file); }
    catch (err) { console.error('Could not save', path.basename(file) + ':', err.message); }
    resolve();
  }));
  return storeChain;
}
function loadProducts() {
  if (products) return products;
  try { products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8')).products; if (!Array.isArray(products)) throw 0; }
  catch {
    /* first run: seed from catalog.js, minus anything already sold under the old "starting stock" model */
    const sold = id => { try { return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')).orders.filter(o => o.status === 'paid').reduce((n, o) => n + (o.items.find(i => i.id === id)?.quantity || 0), 0); } catch { return 0; } };
    products = JSON.parse(JSON.stringify(loadSite().data.products || [])).map(p => { if (p.stock !== undefined && p.stock !== '') p.stock = Math.max(0, Number(p.stock) - sold(p.id)); else p.stock = 0; return Object.assign({ active: true, lowStockAt: 5 }, p); });
    saveProducts();
  }
  return products;
}
const saveProducts = () => atomicWrite(PRODUCTS_FILE, { products });
function loadStockLog() { if (stockLog) return stockLog; try { stockLog = JSON.parse(fs.readFileSync(STOCKLOG_FILE, 'utf8')).log || []; } catch { stockLog = []; } return stockLog; }
function logStock(entry) { const log = loadStockLog(); log.push(Object.assign({ at: new Date().toISOString() }, entry)); if (log.length > 5000) log.splice(0, log.length - 5000); return atomicWrite(STOCKLOG_FILE, { log }); }

/* ---------- order store (JSON file, atomic writes) ---------- */
let orders = null, writeChain = Promise.resolve();
function loadOrders() {
  if (orders) return orders;
  try { orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')).orders || []; } catch { orders = []; }
  return orders;
}
function saveOrders() {
  writeChain = writeChain.then(() => new Promise(resolve => {
    try { fs.mkdirSync(DATA_DIR, { recursive: true }); const tmp = ORDERS_FILE + '.tmp'; fs.writeFileSync(tmp, JSON.stringify({ orders }, null, 2)); fs.renameSync(tmp, ORDERS_FILE); }
    catch (err) { console.error('Could not save orders:', err.message); }
    resolve();
  }));
  return writeChain;
}

/* ---------- helpers ---------- */
class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
const json = (res, status, body, extra = {}) => { const text = JSON.stringify(body); res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra }); res.end(text); };
const safeEqual = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };
const hmac = (secret, text) => crypto.createHmac('sha256', secret).update(text).digest('hex');
const readBody = (req, limit = 64 * 1024) => new Promise((resolve, reject) => {
  const chunks = []; let size = 0;
  req.on('data', c => { size += c.length; if (size > limit) { reject(new HttpError(413, 'Request too large.')); req.destroy(); } else chunks.push(c); });
  req.on('end', () => resolve(Buffer.concat(chunks))); req.on('error', reject);
});
const parseJson = buf => { try { return JSON.parse(buf.toString('utf8') || '{}'); } catch { throw new HttpError(400, 'Invalid JSON.'); } };
const clean = (v, max = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

const hits = new Map();
function rateLimit(req, limit = 30, windowMs = 60_000) {
  const ip = req.socket.remoteAddress || 'x', now = Date.now(), rec = hits.get(ip) || { n: 0, reset: now + windowMs };
  if (now > rec.reset) { rec.n = 0; rec.reset = now + windowMs; }
  rec.n++; hits.set(ip, rec);
  if (rec.n > limit) throw new HttpError(429, 'Too many requests. Please wait a minute and try again.');
}
setInterval(() => { const now = Date.now(); for (const [k, v] of hits) if (now > v.reset) hits.delete(k); }, 60_000).unref();

function rzp(method, endpoint, body) {
  const keyId = env('RAZORPAY_KEY_ID'), secret = env('RAZORPAY_KEY_SECRET');
  if (!keyId || !secret) throw new HttpError(503, 'Online payments are not configured yet.');
  const target = new URL(RZP_BASE + endpoint), lib = target.protocol === 'http:' ? http : https, payload = body ? JSON.stringify(body) : null;
  return new Promise((resolve, reject) => {
    const req = lib.request(target, { method, timeout: 15000, headers: { 'Authorization': 'Basic ' + Buffer.from(`${keyId}:${secret}`).toString('base64'), 'Content-Type': 'application/json', ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}) } }, res => {
      const chunks = []; res.on('data', c => chunks.push(c));
      res.on('end', () => { let parsed = {}; try { parsed = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { /* non-JSON */ } resolve({ status: res.statusCode, body: parsed }); });
    });
    req.on('timeout', () => req.destroy(new Error('timeout'))); req.on('error', reject); if (payload) req.write(payload); req.end();
  });
}

/* ---------- order creation ---------- */
function priceCart(items, fulfilment) {
  const { config, data } = liveData(), shop = config.shop || {}, rule = shop.shipping || {};
  if (!Array.isArray(items) || !items.length || items.length > 30) throw new HttpError(400, 'Your bag is empty.');
  const maxPer = Number(shop.maxQuantityPerItem) || 10, seen = new Set(), lines = [];
  for (const raw of items) {
    const product = (data.products || []).find(p => p.id === String(raw?.id));
    if (!product || seen.has(product.id)) throw new HttpError(400, 'One of the products in your bag is no longer available.');
    seen.add(product.id);
    const quantity = Math.floor(Number(raw.quantity));
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > maxPer) throw new HttpError(400, `Please choose between 1 and ${maxPer} of each product.`);
    const unit = data.sellingPrice(product);
    if (!(unit > 0)) throw new HttpError(400, `${product.name} is not available to buy online. Please contact GLAM.`);
    if (product.stock !== undefined && product.stock !== '') {
      const available = Math.max(0, Number(product.stock));
      if (quantity > available) throw new HttpError(409, available ? `Only ${available} of ${product.name} left in stock.` : `${product.name} is sold out.`);
    }
    lines.push({ id: product.id, name: product.name, quantity, unit });
  }
  const subtotal = lines.reduce((s, l) => s + l.unit * l.quantity, 0);
  let shipping = 0;
  if (fulfilment === 'delivery' && !(Number(rule.freeAbove) > 0 && subtotal >= Number(rule.freeAbove))) shipping = Math.max(0, Number(rule.flatFee) || 0);
  return { lines, subtotal, shipping, total: subtotal + shipping };
}
function validateCustomer(b) {
  const fulfilment = b.fulfilment === 'pickup' ? 'pickup' : 'delivery';
  if (fulfilment === 'pickup' && loadSite().config.shop?.pickupEnabled === false) throw new HttpError(400, 'Pick-up is not available.');
  const c = b.customer || {}, phone = clean(c.phone, 20).replace(/[\s-]/g, '').replace(/^\+?91/, '');
  const customer = { name: clean(c.name, 80), email: clean(c.email, 120), phone };
  if (!customer.name) throw new HttpError(400, 'Please enter your name.');
  if (!/^[6-9]\d{9}$/.test(phone)) throw new HttpError(400, 'Please enter a valid 10-digit mobile number.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customer.email)) throw new HttpError(400, 'Please enter a valid email address.');
  let address = null;
  if (fulfilment === 'delivery') {
    const a = b.address || {}; address = { line1: clean(a.line1, 160), line2: clean(a.line2, 160), city: clean(a.city, 60), state: clean(a.state, 60), pincode: clean(a.pincode, 6) };
    if (!address.line1 || !address.city || !address.state) throw new HttpError(400, 'Please complete your delivery address.');
    if (!/^\d{6}$/.test(address.pincode)) throw new HttpError(400, 'Please enter a valid 6-digit PIN code.');
  }
  return { fulfilment, customer, address, notes: clean(b.notes, 200) };
}

async function createOrder(req, res) {
  const body = parseJson(await readBody(req)), info = validateCustomer(body), priced = priceCart(body.items, info.fulfilment);
  const amount = Math.round(priced.total * 100);
  if (amount < 100) throw new HttpError(400, 'The order total is too low to process.');
  const ref = 'GLAM-' + Date.now().toString(36).toUpperCase() + '-' + crypto.randomBytes(2).toString('hex').toUpperCase();
  let r;
  try {
    r = await rzp('POST', '/v1/orders', { amount, currency: loadSite().config.shop?.currency || 'INR', receipt: ref, notes: { ref, fulfilment: info.fulfilment, customer: info.customer.name, phone: info.customer.phone } });
  } catch (err) { if (err instanceof HttpError) throw err; console.error('Razorpay unreachable:', err.message); throw new HttpError(502, 'The payment service is unreachable. Please try again shortly.'); }
  if (r.status !== 200 || !r.body.id) { console.error('Razorpay order error:', r.status, JSON.stringify(r.body)); throw new HttpError(502, 'The payment service could not create your order. Please try again.'); }
  loadOrders().push({ ref, razorpayOrderId: r.body.id, status: 'created', amount, currency: r.body.currency, items: priced.lines, subtotal: priced.subtotal, shipping: priced.shipping, total: priced.total, ...info, createdAt: new Date().toISOString() });
  await saveOrders();
  json(res, 200, { ok: true, ref, orderId: r.body.id, amount, currency: r.body.currency, keyId: env('RAZORPAY_KEY_ID'), totals: { subtotal: priced.subtotal, shipping: priced.shipping, total: priced.total } });
}

function markPaid(order, paymentId) {
  if (order.status === 'paid') return false;
  order.status = 'paid'; order.paymentId = paymentId; order.paidAt = new Date().toISOString();
  for (const line of order.items) {
    const p = loadProducts().find(x => x.id === line.id); if (!p || p.stock === '' || p.stock === undefined) continue;
    const before = Number(p.stock) || 0, after = Math.max(0, before - line.quantity); p.stock = after;
    if (before < line.quantity) console.warn(`⚠ Oversold ${p.name}: wanted ${line.quantity}, had ${before} (order ${order.ref})`);
    logStock({ id: p.id, name: p.name, delta: after - before, stock: after, reason: 'Online order ' + order.ref, by: 'system' });
  }
  saveProducts();
  console.log(`✔ PAID ${order.ref} ₹${order.total} · ${order.customer.name} · ${order.customer.phone} · ${order.fulfilment}`);
  return true;
}

async function verifyPayment(req, res) {
  const b = parseJson(await readBody(req)), orderId = clean(b.razorpay_order_id, 60), paymentId = clean(b.razorpay_payment_id, 60), signature = clean(b.razorpay_signature, 128);
  if (!orderId || !paymentId || !signature) throw new HttpError(400, 'Missing payment details.');
  const order = loadOrders().find(o => o.razorpayOrderId === orderId);
  if (!order) throw new HttpError(404, 'Order not found.');
  const expected = hmac(env('RAZORPAY_KEY_SECRET'), `${orderId}|${paymentId}`);
  if (!env('RAZORPAY_KEY_SECRET') || !safeEqual(expected, signature)) { order.lastFailure = 'bad signature'; await saveOrders(); throw new HttpError(400, 'Payment verification failed.'); }
  markPaid(order, paymentId); await saveOrders();
  json(res, 200, { ok: true, status: 'paid', ref: order.ref });
}

async function webhook(req, res) {
  const raw = await readBody(req, 512 * 1024), secret = env('RAZORPAY_WEBHOOK_SECRET');
  if (!secret) throw new HttpError(503, 'Webhook secret is not configured.');
  if (!safeEqual(hmac(secret, raw), String(req.headers['x-razorpay-signature'] || ''))) throw new HttpError(400, 'Invalid signature.');
  const event = parseJson(raw), payment = event.payload?.payment?.entity, orderId = payment?.order_id || event.payload?.order?.entity?.id;
  const order = loadOrders().find(o => o.razorpayOrderId === orderId);
  if (order) {
    if (event.event === 'payment.captured' || event.event === 'order.paid') { if (payment?.amount && payment.amount !== order.amount) console.warn('Webhook amount mismatch for', order.ref); else markPaid(order, payment?.id || order.paymentId); }
    else if (event.event === 'payment.failed' && order.status !== 'paid') { order.status = 'failed'; order.lastFailure = payment?.error_description || 'payment failed'; }
    await saveOrders();
  }
  json(res, 200, { ok: true });
}

/* ---------- admin: auth, products, inventory, orders ---------- */
const ADMIN_SECRET = crypto.randomBytes(32);            // sessions end when the server restarts
const SESSION_MS = 8 * 60 * 60 * 1000;
const adminPassword = () => env('ADMIN_PASSWORD') || env('ADMIN_TOKEN');
const loginHits = new Map();
function signSession(exp) { const body = String(exp); return body + '.' + crypto.createHmac('sha256', ADMIN_SECRET).update(body).digest('hex'); }
function requireAdmin(req) {
  const pw = adminPassword();
  if (!pw) throw new HttpError(503, 'Admin is not enabled. Set ADMIN_PASSWORD in server/.env and restart the server.');
  const given = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (given && safeEqual(pw, given)) return;                       // raw password as bearer (scripts / curl)
  const [exp, sig] = given.split('.');
  if (exp && sig && Number(exp) > Date.now() && safeEqual(signSession(exp), given)) return;
  throw new HttpError(401, 'Please sign in again.');
}
async function adminLogin(req, res) {
  const ip = req.socket.remoteAddress || 'x', now = Date.now(), rec = loginHits.get(ip) || { n: 0, reset: now + 15 * 60_000 };
  if (now > rec.reset) { rec.n = 0; rec.reset = now + 15 * 60_000; }
  if (rec.n >= 8) throw new HttpError(429, 'Too many sign-in attempts. Please wait 15 minutes.');
  const pw = adminPassword(); if (!pw) throw new HttpError(503, 'Admin is not enabled. Set ADMIN_PASSWORD in server/.env and restart the server.');
  const b = parseJson(await readBody(req, 4096));
  if (!safeEqual(pw, String(b.password || ''))) { rec.n++; loginHits.set(ip, rec); throw new HttpError(401, 'Incorrect password.'); }
  loginHits.delete(ip);
  json(res, 200, { ok: true, token: signSession(now + SESSION_MS), expiresInMs: SESSION_MS });
}
const text = (v, max, multiline = false) => String(v ?? '').replace(multiline ? /[\u0000-\u0009\u000b-\u001f\u007f]/g : /[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const lines = (v, max = 20) => (Array.isArray(v) ? v : String(v || '').split(/\r?\n|,/)).map(x => text(x, 120)).filter(Boolean).slice(0, max);
const slugify = v => String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const IMAGE_RE = /^images\/[A-Za-z0-9_\-\/.]+\.(jpe?g|png|webp|svg)$/i;
function cleanProduct(b, existing) {
  const p = {};
  p.name = text(b.name, 100); if (!p.name) throw new HttpError(400, 'Product name is required.');
  p.id = existing ? existing.id : slugify(b.id || p.name);
  if (p.id.length < 2) throw new HttpError(400, 'Please use a product name with letters or numbers.');
  p.slug = p.id;
  p.brand = text(b.brand, 80) || 'GLAM selection';
  p.category = text(b.category, 60) || 'Hair Care';
  p.sku = text(b.sku, 40);
  p.description = text(b.description, 1200, true);
  p.usage = text(b.usage, 600, true);
  p.ingredients = lines(b.ingredients, 40);
  const price = Number(b.price), disc = Number(b.discountPrice || 0);
  if (!(price >= 0) || price > 10_000_000) throw new HttpError(400, 'Please enter a valid price.');
  if (!(disc >= 0) || (disc > 0 && disc >= price)) throw new HttpError(400, 'The selling price must be lower than the list price (or leave it 0).');
  p.price = Math.round(price * 100) / 100; p.discountPrice = Math.round(disc * 100) / 100;
  const stock = Number(b.stock); if (!Number.isInteger(stock) || stock < 0 || stock > 1_000_000) throw new HttpError(400, 'Stock must be a whole number, 0 or more.');
  p.stock = stock;
  const low = b.lowStockAt === '' || b.lowStockAt === undefined ? 5 : Number(b.lowStockAt); if (!Number.isInteger(low) || low < 0) throw new HttpError(400, 'Low-stock alert must be a whole number, 0 or more.');
  p.lowStockAt = low;
  p.featured = Boolean(b.featured); p.active = b.active !== false;
  const image = text(b.image, 200); if (image && (!IMAGE_RE.test(image) || image.includes('..'))) throw new HttpError(400, 'Image must be a file inside the images folder.');
  p.image = image || 'images/products/argan-hair-serum.svg';
  p.imageAlt = text(b.imageAlt, 160) || p.name;
  p.gallery = Array.isArray(existing?.gallery) ? existing.gallery : [];
  return p;
}
function adminProducts(req, res) { json(res, 200, { ok: true, products: loadProducts() }); }
async function adminSaveProduct(req, res, id) {
  const b = parseJson(await readBody(req, 128 * 1024)), list = loadProducts(), idx = id ? list.findIndex(p => p.id === id) : -1;
  if (id && idx < 0) throw new HttpError(404, 'Product not found.');
  const prev = idx >= 0 ? list[idx] : null, p = cleanProduct(b, prev);
  if (!prev && list.some(x => x.id === p.id)) throw new HttpError(409, 'A product with this name already exists.');
  if (!prev) { list.push(p); await logStock({ id: p.id, name: p.name, delta: p.stock, stock: p.stock, reason: 'Product created', by: 'admin' }); }
  else {
    list[idx] = p;
    if (p.stock !== prev.stock) await logStock({ id: p.id, name: p.name, delta: p.stock - prev.stock, stock: p.stock, reason: text(b.stockReason, 120) || 'Edited in admin', by: 'admin' });
  }
  await saveProducts(); json(res, prev ? 200 : 201, { ok: true, product: p });
}
async function adminStock(req, res, id) {
  const b = parseJson(await readBody(req, 4096)), p = loadProducts().find(x => x.id === id);
  if (!p) throw new HttpError(404, 'Product not found.');
  const before = Number(p.stock) || 0; let after;
  if (b.set !== undefined) after = Number(b.set); else after = before + Number(b.delta);
  if (!Number.isInteger(after) || after < 0 || after > 1_000_000) throw new HttpError(400, 'That would make the stock invalid (it must be a whole number, 0 or more).');
  p.stock = after; await logStock({ id, name: p.name, delta: after - before, stock: after, reason: text(b.reason, 120) || 'Manual adjustment', by: 'admin' });
  await saveProducts(); json(res, 200, { ok: true, product: p });
}
async function adminDeleteProduct(req, res, id) {
  const list = loadProducts(), idx = list.findIndex(p => p.id === id); if (idx < 0) throw new HttpError(404, 'Product not found.');
  const [gone] = list.splice(idx, 1); await logStock({ id, name: gone.name, delta: -(Number(gone.stock) || 0), stock: 0, reason: 'Product deleted', by: 'admin' });
  await saveProducts(); json(res, 200, { ok: true });
}
async function adminUpload(req, res) {
  const b = parseJson(await readBody(req, 6 * 1024 * 1024)), buf = Buffer.from(String(b.data || ''), 'base64');
  if (!buf.length || buf.length > 4 * 1024 * 1024) throw new HttpError(400, 'Please choose an image under 4 MB.');
  const kind = buf.slice(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])) ? 'jpg' : buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) ? 'png' : (buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') ? 'webp' : null;
  if (!kind) throw new HttpError(400, 'Only JPG, PNG or WebP images are allowed.');
  const base = slugify(String(b.name || 'product').replace(/\.[^.]+$/, '')) || 'product', rel = `images/products/uploads/${base}-${Date.now().toString(36)}.${kind}`;
  const abs = path.join(ROOT, rel); fs.mkdirSync(path.dirname(abs), { recursive: true }); fs.writeFileSync(abs, buf);
  json(res, 201, { ok: true, path: rel });
}
const FULFIL = ['new', 'packed', 'shipped', 'ready for pickup', 'delivered', 'cancelled'];
function adminOrders(req, res) { json(res, 200, { ok: true, orders: loadOrders().slice().reverse(), statuses: FULFIL }); }
async function adminOrderUpdate(req, res, ref) {
  const b = parseJson(await readBody(req, 4096)), o = loadOrders().find(x => x.ref === ref); if (!o) throw new HttpError(404, 'Order not found.');
  const st = String(b.fulfilmentStatus || ''); if (!FULFIL.includes(st)) throw new HttpError(400, 'Unknown status.');
  o.fulfilmentStatus = st;
  if (st === 'cancelled' && b.restock && o.status === 'paid' && !o.restocked) {
    for (const line of o.items) { const p = loadProducts().find(x => x.id === line.id); if (!p) continue; const before = Number(p.stock) || 0; p.stock = before + line.quantity; await logStock({ id: p.id, name: p.name, delta: line.quantity, stock: p.stock, reason: 'Order cancelled ' + o.ref, by: 'admin' }); }
    o.restocked = true; await saveProducts();
  }
  await saveOrders(); json(res, 200, { ok: true, order: o });
}
function adminStockLog(req, res) { json(res, 200, { ok: true, log: loadStockLog().slice(-500).reverse() }); }
const csvCell = v => { let t = String(v ?? ''); if (/^[=+\-@\t\r]/.test(t)) t = "'" + t; return '"' + t.replace(/"/g, '""') + '"'; };
function adminCsv(req, res) {
  const rows = [['SKU', 'Name', 'Category', 'Price', 'Selling price', 'Stock', 'Low-stock alert', 'Visible']].concat(loadProducts().map(p => [p.sku, p.name, p.category, p.price, p.discountPrice || '', p.stock, p.lowStockAt, p.active === false ? 'No' : 'Yes']));
  res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="glam-inventory.csv"', 'Cache-Control': 'no-store' });
  res.end(rows.map(r => r.map(csvCell).join(',')).join('\r\n'));
}
/* the storefront's catalogue: catalog.js with the live product list swapped in */
function liveCatalog(req, res) {
  const file = path.join(ROOT, 'data/catalog.js'); let src = fs.readFileSync(file, 'utf8');
  const pub = loadProducts().filter(p => p.active !== false).map(({ lowStockAt, active, ...rest }) => rest);
  const marker = '/* Price helpers';
  const inject = `window.GLAM_DATA.products = ${JSON.stringify(pub)};\n\n`;
  src = src.includes(marker) ? src.replace(marker, inject + marker) : src + '\n' + inject;
  res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-cache' }); res.end(src);
}
async function adminRoute(req, res, pathname) {
  if (req.method === 'POST' && pathname === '/api/admin/login') return adminLogin(req, res);
  requireAdmin(req);
  let m;
  if (req.method === 'GET' && pathname === '/api/admin/products') return adminProducts(req, res);
  if (req.method === 'POST' && pathname === '/api/admin/products') return adminSaveProduct(req, res, null);
  if ((m = pathname.match(/^\/api\/admin\/products\/([a-z0-9-]+)$/))) {
    if (req.method === 'PUT') return adminSaveProduct(req, res, m[1]);
    if (req.method === 'DELETE') return adminDeleteProduct(req, res, m[1]);
  }
  if (req.method === 'POST' && (m = pathname.match(/^\/api\/admin\/products\/([a-z0-9-]+)\/stock$/))) return adminStock(req, res, m[1]);
  if (req.method === 'POST' && pathname === '/api/admin/upload') return adminUpload(req, res);
  if (req.method === 'GET' && pathname === '/api/admin/orders') return adminOrders(req, res);
  if (req.method === 'PATCH' && (m = pathname.match(/^\/api\/admin\/orders\/([A-Z0-9-]+)$/))) return adminOrderUpdate(req, res, m[1]);
  if (req.method === 'GET' && pathname === '/api/admin/stock-log') return adminStockLog(req, res);
  if (req.method === 'GET' && pathname === '/api/admin/inventory.csv') return adminCsv(req, res);
  return json(res, 404, { ok: false, error: 'Not found' });
}

/* ---------- static files ---------- */
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2' };
function serveStatic(req, res) {
  let pathname; try { pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { return json(res, 400, { error: 'Bad request' }); }
  if (pathname.endsWith('/')) pathname += 'index.html';
  const file = path.resolve(ROOT, '.' + pathname), rel = path.relative(ROOT, file), parts = rel.split(path.sep);
  const blocked = rel.startsWith('..') || path.isAbsolute(rel) || parts[0] === 'server' || parts.some(p => p.startsWith('.')) || /\.(md|log)$/i.test(file);
  const send = (f, status) => { const ext = path.extname(f).toLowerCase(); res.writeHead(status, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': /\.(jpe?g|png|svg|webp|woff2)$/.test(ext) ? 'public, max-age=86400' : 'no-cache', 'X-Content-Type-Options': 'nosniff', ...(parts[0] === 'admin' ? { 'X-Robots-Tag': 'noindex, nofollow', 'X-Frame-Options': 'DENY', 'Content-Security-Policy': "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none'" } : {}) }); fs.createReadStream(f).pipe(res); };
  if (!blocked && fs.existsSync(file) && fs.statSync(file).isFile()) return send(file, 200);
  const notFound = path.join(ROOT, '404.html'); return fs.existsSync(notFound) ? send(notFound, 404) : json(res, 404, { error: 'Not found' });
}

/* ---------- server ---------- */
const server = http.createServer(async (req, res) => {
  const origin = env('ALLOWED_ORIGIN');
  if (origin) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); res.setHeader('Vary', 'Origin'); }
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  try {
    const { pathname } = new URL(req.url, 'http://x');
    if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
    if (pathname.startsWith('/api/')) {
      if (req.method !== 'GET' && pathname !== '/api/razorpay/webhook') rateLimit(req, pathname === '/api/admin/upload' ? 60 : 30);
      if (pathname.startsWith('/api/admin/')) return await adminRoute(req, res, pathname);
      if (req.method === 'POST' && pathname === '/api/razorpay/order') return await createOrder(req, res);
      if (req.method === 'POST' && pathname === '/api/razorpay/verify') return await verifyPayment(req, res);
      if (req.method === 'POST' && pathname === '/api/razorpay/webhook') return await webhook(req, res);
      if (req.method === 'GET' && pathname === '/api/health') return json(res, 200, { ok: true, razorpayConfigured: Boolean(env('RAZORPAY_KEY_ID') && env('RAZORPAY_KEY_SECRET')) });
      return json(res, 404, { ok: false, error: 'Not found' });
    }
    if (pathname === '/data/catalog.js' && req.method === 'GET') return liveCatalog(req, res);
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { ok: false, error: 'Method not allowed' });
    serveStatic(req, res);
  } catch (err) {
    if (err instanceof HttpError) return json(res, err.status, { ok: false, error: err.message });
    console.error(err); json(res, 500, { ok: false, error: 'Something went wrong. Please try again.' });
  }
});
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`GLAM server running at http://localhost:${PORT}`);
    if (!env('RAZORPAY_KEY_ID') || !env('RAZORPAY_KEY_SECRET')) console.warn('⚠  RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET not set — checkout will show "payments not configured". See server/README.md');
  });
}
module.exports = { server, hmac };
