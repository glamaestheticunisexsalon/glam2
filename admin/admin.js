(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const inr = n => '₹' + Number(n || 0).toLocaleString('en-IN');
  const root = '../';                       // admin lives in /admin/, images in /images/
  let token = sessionStorage.getItem('glam-admin') || '', products = [], orders = [], statuses = [], editingId = null;

  const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2800); };
  async function api(path, { method = 'GET', body, raw } = {}) {
    const res = await fetch('/api/admin' + path, { method, headers: { Authorization: 'Bearer ' + token, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
    if (res.status === 401 && path !== '/login') { signOut(); throw new Error('Please sign in again.'); }
    if (raw) return res;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Something went wrong.');
    return data;
  }
  function signOut() { token = ''; sessionStorage.removeItem('glam-admin'); $('#app').hidden = true; $('#login').hidden = false; }

  /* ---------- login ---------- */
  $('#login-form').addEventListener('submit', async e => {
    e.preventDefault(); $('#login-error').textContent = '';
    try { const r = await api('/login', { method: 'POST', body: { password: $('#password').value } }); token = r.token; sessionStorage.setItem('glam-admin', token); $('#password').value = ''; start(); }
    catch (err) { $('#login-error').textContent = err.message; }
  });
  $('#logout').addEventListener('click', signOut);

  /* ---------- data ---------- */
  async function load() { products = (await api('/products')).products; paint(); }
  async function start() {
    $('#login').hidden = true; $('#app').hidden = false;
    try { await load(); } catch (err) { if (token) toast(err.message); }
  }
  const state = p => p.active === false ? 'hid' : Number(p.stock) <= 0 ? 'out' : Number(p.stock) <= Number(p.lowStockAt || 0) ? 'low' : 'ok';
  const label = { ok: 'In stock', low: 'Low stock', out: 'Out of stock', hid: 'Hidden' };

  function paint() {
    const active = products.filter(p => p.active !== false);
    const value = active.reduce((n, p) => n + (Number(p.stock) || 0) * ((Number(p.discountPrice) > 0 && Number(p.discountPrice) < Number(p.price)) ? Number(p.discountPrice) : Number(p.price) || 0), 0);
    $('#stats').innerHTML = [[products.length, 'Products'], [active.filter(p => state(p) === 'low').length, 'Low stock'], [active.filter(p => state(p) === 'out').length, 'Out of stock'], [inr(value), 'Stock value (selling price)']].map(([n, l]) => `<div class="stat"><b>${esc(n)}</b><span>${l}</span></div>`).join('');
    $('#cats').innerHTML = [...new Set(products.map(p => p.category))].map(c => `<option value="${esc(c)}">`).join('');
    const q = $('#q').value.trim().toLowerCase(), f = $('#filter').value;
    const list = products.filter(p => (!q || `${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(q)) && (f === 'all' || (f === 'hidden' ? p.active === false : state(p) === f)));
    $('#rows').innerHTML = list.map(p => `<tr data-id="${esc(p.id)}"><td><img src="${root}${esc(p.image)}" alt=""></td><td><strong>${esc(p.name)}</strong><br><small class="muted">${esc(p.sku || '—')} · ${esc(p.category)}</small></td><td>${Number(p.discountPrice) > 0 ? `${inr(p.discountPrice)} <s class="muted">${inr(p.price)}</s>` : inr(p.price)}</td><td><strong>${Number(p.stock) || 0}</strong></td><td><div class="adj"><button class="btn" data-d="-1" aria-label="Remove one">−</button><button class="btn" data-d="1" aria-label="Add one">+</button><input type="number" step="1" placeholder="±qty" aria-label="Quantity to add or remove"><button class="btn" data-apply>Apply</button></div></td><td><span class="pill ${state(p)}">${label[state(p)]}</span></td><td><button class="btn" data-edit>Edit</button></td></tr>`).join('') || '<tr><td colspan="7" class="muted">No products match.</td></tr>';
  }
  $('#q').addEventListener('input', paint); $('#filter').addEventListener('change', paint);

  $('#rows').addEventListener('click', async e => {
    const tr = e.target.closest('tr'); if (!tr) return; const id = tr.dataset.id;
    if (e.target.closest('[data-edit]')) return openEditor(products.find(p => p.id === id));
    let delta = null;
    if (e.target.closest('[data-d]')) delta = Number(e.target.closest('[data-d]').dataset.d);
    else if (e.target.closest('[data-apply]')) { delta = Number($('input', tr).value); if (!Number.isInteger(delta) || !delta) return toast('Enter a whole number such as 10 or -2.'); }
    if (delta === null) return;
    try { const r = await api(`/products/${id}/stock`, { method: 'POST', body: { delta, reason: 'Quick adjust' } }); Object.assign(products.find(p => p.id === id), r.product); paint(); toast(`${r.product.name}: stock is now ${r.product.stock}`); }
    catch (err) { toast(err.message); }
  });

  /* ---------- editor ---------- */
  const form = $('#editor-form'), dlg = $('#editor');
  function openEditor(p) {
    editingId = p ? p.id : null; $('#editor-title').textContent = p ? 'Edit product' : 'Add product'; $('#delete').hidden = !p; $('#editor-error').textContent = '';
    const v = p || { name: '', brand: 'GLAM selection', category: '', sku: '', price: '', discountPrice: 0, stock: 0, lowStockAt: 5, description: '', usage: '', ingredients: [], image: 'images/products/argan-hair-serum.svg', imageAlt: '', featured: false, active: true };
    for (const k of ['name', 'brand', 'category', 'sku', 'price', 'discountPrice', 'stock', 'lowStockAt', 'description', 'usage', 'image', 'imageAlt']) form.elements[k].value = v[k] ?? '';
    form.elements.ingredients.value = (v.ingredients || []).join('\n'); form.elements.featured.checked = !!v.featured; form.elements.active.checked = v.active !== false;
    $('#preview').src = root + v.image; $('#file').value = ''; dlg.showModal();
  }
  $('#add').addEventListener('click', () => openEditor(null)); $('#cancel').addEventListener('click', () => dlg.close());
  $('#file').addEventListener('change', async () => {
    const f = $('#file').files[0]; if (!f) return;
    try {
      const bmp = await createImageBitmap(f), scale = Math.min(1, 1200 / Math.max(bmp.width, bmp.height)), c = document.createElement('canvas');
      c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale); c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
      const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', .86)), b64 = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(String(fr.result).split(',')[1]); fr.readAsDataURL(blob); });
      const r = await api('/upload', { method: 'POST', body: { name: f.name, data: b64 } });
      form.elements.image.value = r.path; $('#preview').src = root + r.path; toast('Image uploaded');
    } catch (err) { $('#editor-error').textContent = err.message || 'Could not upload that image.'; }
  });
  form.addEventListener('submit', async e => {
    e.preventDefault(); $('#editor-error').textContent = '';
    const el = form.elements, body = { name: el.name.value, brand: el.brand.value, category: el.category.value, sku: el.sku.value, price: el.price.value, discountPrice: el.discountPrice.value || 0, stock: el.stock.value, lowStockAt: el.lowStockAt.value, description: el.description.value, usage: el.usage.value, ingredients: el.ingredients.value, image: el.image.value, imageAlt: el.imageAlt.value, featured: el.featured.checked, active: el.active.checked };
    try { await api(editingId ? `/products/${editingId}` : '/products', { method: editingId ? 'PUT' : 'POST', body }); dlg.close(); await load(); toast('Saved'); }
    catch (err) { $('#editor-error').textContent = err.message; }
  });
  $('#delete').addEventListener('click', async () => {
    if (!editingId || !confirm('Delete this product permanently? To just hide it from the shop, untick "Visible in the shop" instead.')) return;
    try { await api('/products/' + editingId, { method: 'DELETE' }); dlg.close(); await load(); toast('Deleted'); } catch (err) { $('#editor-error').textContent = err.message; }
  });
  $('#csv').addEventListener('click', async () => {
    try { const r = await api('/inventory.csv', { raw: true }); const a = document.createElement('a'); a.href = URL.createObjectURL(await r.blob()); a.download = 'glam-inventory.csv'; a.click(); URL.revokeObjectURL(a.href); } catch (err) { toast(err.message); }
  });

  /* ---------- tabs: orders & history ---------- */
  const when = iso => new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  async function showTab(name) {
    $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === name));
    ['inventory', 'orders', 'history'].forEach(t => { $('#tab-' + t).hidden = t !== name; }); $('#stats').hidden = name !== 'inventory';
    try {
      if (name === 'orders') { const r = await api('/orders'); orders = r.orders; statuses = r.statuses; paintOrders(); }
      if (name === 'history') { const r = await api('/stock-log'); $('#log-rows').innerHTML = r.log.map(l => `<tr><td>${esc(when(l.at))}</td><td>${esc(l.name)}</td><td><strong>${l.delta > 0 ? '+' : ''}${l.delta}</strong></td><td>${l.stock}</td><td>${esc(l.reason)}</td><td>${esc(l.by)}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">No stock changes yet.</td></tr>'; }
    } catch (err) { toast(err.message); }
  }
  $('#tabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) showTab(b.dataset.tab); });
  function paintOrders() {
    $('#order-rows').innerHTML = orders.map(o => `<tr data-ref="${esc(o.ref)}"><td><strong>${esc(o.ref)}</strong><br><small class="muted">${esc(when(o.createdAt))}</small></td><td>${esc(o.customer?.name)}<br><small class="muted">${esc(o.customer?.phone)} · ${esc(o.fulfilment)}</small></td><td>${(o.items || []).map(i => `${esc(i.name)} × ${i.quantity}`).join('<br>')}</td><td>${inr(o.total)}</td><td><span class="pill ${o.status === 'paid' ? 'ok' : o.status === 'failed' ? 'out' : 'low'}">${esc(o.status)}</span></td><td>${o.status === 'paid' ? `<select data-status>${statuses.map(s => `<option${(o.fulfilmentStatus || 'new') === s ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select>` : '—'}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">No orders yet.</td></tr>';
  }
  $('#order-rows').addEventListener('change', async e => {
    const sel = e.target.closest('[data-status]'); if (!sel) return; const ref = sel.closest('tr').dataset.ref, o = orders.find(x => x.ref === ref);
    let restock = false;
    if (sel.value === 'cancelled') { restock = confirm('Add the items from this order back into stock?\n\nNote: this does not refund the customer — issue refunds in the Razorpay dashboard.'); }
    try { const r = await api('/orders/' + ref, { method: 'PATCH', body: { fulfilmentStatus: sel.value, restock } }); Object.assign(o, r.order); toast('Order updated' + (restock ? ' and stock restored' : '')); if (restock) load(); }
    catch (err) { toast(err.message); paintOrders(); }
  });

  if (token) start(); else $('#login').hidden = false;
})();
