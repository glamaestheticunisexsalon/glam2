/* GLAM checkout — Razorpay Standard Checkout.
   mode "server": the order is created and the payment signature verified by server/server.js (recommended).
   mode "client": static hosting only — Razorpay opens with the amount, and your Razorpay dashboard is the record. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const config = window.SITE_CONFIG || {}, pay = config.payments || {}, shop = config.shop || {};
  const mode = pay.mode === 'client' ? 'client' : 'server';
  const apiBase = String(pay.apiBase || '').replace(/\/$/, '');
  const keyOk = v => /^rzp_(test|live)_[A-Za-z0-9]+$/.test(String(v || ''));
  let busy = false;

  document.addEventListener('DOMContentLoaded', () => {
    const root = $('#checkout-root'); if (!root || !window.GlamCart) return;
    const cartApi = window.GlamCart, fmt = cartApi.fmt;
    const state = { fulfilment: 'delivery' };

    const totals = () => { const subtotal = cartApi.subtotal(), shipping = cartApi.shipping(subtotal, state.fulfilment); return { subtotal, shipping, total: subtotal + shipping }; };

    function renderEmpty() {
      root.className = 'checkout-empty';
      root.innerHTML = '<p class="eyebrow">YOUR BAG</p><h2>Your bag is <em>empty.</em></h2><p>Add something from the GLAM shop and come back to check out.</p><a class="button button-gold" href="products.html">Visit the shop <span>↗</span></a>';
    }

    function summaryHtml() {
      const t = totals();
      const rows = cartApi.lines().map(({ product: p, quantity }) => `<li><img src="${esc(p.image)}" width="64" height="48" alt=""><div><strong>${esc(p.name)}</strong><span>${quantity} × ${fmt(cartApi.selling(p))}</span></div><b>${fmt(cartApi.selling(p) * quantity)}</b></li>`).join('');
      return `<h2>Order summary</h2><ul class="summary-lines">${rows}</ul><dl class="summary-totals"><div><dt>Subtotal</dt><dd>${fmt(t.subtotal)}</dd></div><div><dt>${state.fulfilment === 'pickup' ? 'Pick-up' : 'Shipping'}</dt><dd>${t.shipping ? fmt(t.shipping) : 'Free'}</dd></div><div class="grand"><dt>Total</dt><dd id="grand-total">${fmt(t.total)}</dd></div></dl><p class="fine-print">Prices are in Indian rupees. <a href="products.html">Keep shopping</a></p>`;
    }

    function render() {
      if (!cartApi.lines().length) return renderEmpty();
      const pickup = shop.pickupEnabled !== false, waHref = cartApi.waUrl ? cartApi.waUrl('Hi GLAM, I would like to place an order.') : '';
      root.innerHTML = `<form id="checkout-form" class="checkout-form" novalidate>
        <fieldset><legend>1 · Contact</legend>
          <label>Full name<input name="name" autocomplete="name" required placeholder="Your name"></label>
          <div class="two"><label>Mobile number<input name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="10-digit mobile number"></label>
          <label>Email<input name="email" type="email" autocomplete="email" required placeholder="For your receipt"></label></div>
        </fieldset>
        <fieldset><legend>2 · Delivery</legend>
          <div class="choice-row" role="radiogroup" aria-label="How would you like to receive your order?">
            <label class="choice"><input type="radio" name="fulfilment" value="delivery" checked><span><strong>Home delivery</strong><small>We ship to your address</small></span></label>
            ${pickup ? '<label class="choice"><input type="radio" name="fulfilment" value="pickup"><span><strong>Pick up at the salon</strong><small>Collect from GLAM, Pallikaranai</small></span></label>' : ''}
          </div>
          <div id="address-fields">
            <label>Address<input name="line1" autocomplete="address-line1" placeholder="House / flat, street"></label>
            <label>Area / landmark (optional)<input name="line2" autocomplete="address-line2" placeholder="Area, landmark"></label>
            <div class="three"><label>City<input name="city" autocomplete="address-level2" placeholder="City"></label>
            <label>State<input name="state" autocomplete="address-level1" value="Tamil Nadu"></label>
            <label>PIN code<input name="pincode" inputmode="numeric" autocomplete="postal-code" maxlength="6" placeholder="600100"></label></div>
          </div>
          <label>Order note (optional)<input name="notes" maxlength="200" placeholder="Anything we should know?"></label>
        </fieldset>
        <label class="consent"><input type="checkbox" name="agree" required><span>I agree to the <a href="terms.html" target="_blank" rel="noopener">Terms</a>, <a href="privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a> and <a href="shipping-returns.html" target="_blank" rel="noopener">Shipping &amp; Returns</a> policy.</span></label>
        <p class="form-error" id="checkout-error" role="alert" hidden></p>
        <button class="button button-gold pay-button" type="submit"><span id="pay-label">Pay ${fmt(totals().total)} securely</span> <span aria-hidden="true">↗</span></button>
        <p class="fine-print pay-note">Payments are processed by Razorpay. GLAM never sees or stores your card, UPI or bank details.</p>
        ${mode === 'client' && !keyOk(pay.keyId) ? `<p class="notice">Online payment is being set up. To order now, please ${waHref ? `<a href="${esc(waHref)}" target="_blank" rel="noopener">message us on WhatsApp</a>` : '<a href="contact.html">contact us</a>'}${cartApi.phone ? ` or call <a href="tel:${esc(String(cartApi.phone).replace(/[^+\d]/g,''))}">${esc(cartApi.phone)}</a>` : ''}.</p>` : ''}
      </form><aside class="order-summary" id="order-summary">${summaryHtml()}</aside>`;
      wire();
    }

    function refreshTotals() {
      $('#order-summary').innerHTML = summaryHtml();
      const label = $('#pay-label'); if (label) label.textContent = `Pay ${fmt(totals().total)} securely`;
    }

    function wire() {
      const form = $('#checkout-form'), address = $('#address-fields');
      const syncFulfilment = () => {
        state.fulfilment = form.elements.fulfilment.value;
        address.hidden = state.fulfilment === 'pickup';
        refreshTotals();
      };
      form.addEventListener('change', e => { if (e.target.name === 'fulfilment') syncFulfilment(); });
      syncFulfilment();
      form.addEventListener('submit', e => { e.preventDefault(); startPayment(form); });
    }

    const showError = message => { const el = $('#checkout-error'); if (!el) return; el.textContent = message; el.hidden = !message; if (message) el.scrollIntoView({ block: 'center', behavior: 'smooth' }); };
    const setBusy = on => { busy = on; const b = $('.pay-button'); if (b) { b.disabled = on; b.classList.toggle('is-busy', on); } };

    function readForm(form) {
      const v = Object.fromEntries(new FormData(form)); const delivery = state.fulfilment === 'delivery';
      const phone = String(v.phone || '').replace(/[\s-]/g, '').replace(/^\+?91/, '');
      if (!String(v.name || '').trim()) return { error: 'Please enter your name.' };
      if (!/^[6-9]\d{9}$/.test(phone)) return { error: 'Please enter a valid 10-digit Indian mobile number.' };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v.email || '').trim())) return { error: 'Please enter a valid email address.' };
      if (delivery) {
        if (!String(v.line1 || '').trim() || !String(v.city || '').trim() || !String(v.state || '').trim()) return { error: 'Please complete your delivery address.' };
        if (!/^\d{6}$/.test(String(v.pincode || '').trim())) return { error: 'Please enter a valid 6-digit PIN code.' };
      }
      if (!v.agree) return { error: 'Please accept the Terms, Privacy and Shipping & Returns policy to continue.' };
      return { customer: { name: v.name.trim(), email: v.email.trim(), phone }, fulfilment: state.fulfilment, address: delivery ? { line1: v.line1.trim(), line2: String(v.line2 || '').trim(), city: v.city.trim(), state: v.state.trim(), pincode: v.pincode.trim() } : null, notes: String(v.notes || '').trim() };
    }

    function loadRazorpay() {
      if (window.Razorpay) return Promise.resolve();
      return new Promise((resolve, reject) => { const s = document.createElement('script'); s.src = 'https://checkout.razorpay.com/v1/checkout.js'; s.onload = resolve; s.onerror = () => reject(new Error('Could not load the Razorpay payment window. Please check your connection and try again.')); document.head.append(s); });
    }

    async function api(path, body) {
      let res;
      try { res = await fetch(`${apiBase}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); }
      catch { throw new Error('We could not reach the payment server. Please try again in a moment or contact GLAM.'); }
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.ok === false) throw new Error(json.error || 'Something went wrong while starting your payment.');
      return json;
    }

    async function startPayment(form) {
      if (busy) return; showError('');
      const input = readForm(form); if (input.error) return showError(input.error);
      if (mode === 'client' && !keyOk(pay.keyId)) return showError('Online payment is not switched on yet. Please contact GLAM to place your order.');
      setBusy(true);
      try {
        const items = cartApi.lines().map(l => ({ id: l.id, quantity: l.quantity }));
        const expected = Math.round(totals().total * 100);
        let order = null, key = pay.keyId;
        if (mode === 'server') {
          order = await api('/api/razorpay/order', { items, customer: input.customer, fulfilment: input.fulfilment, address: input.address, notes: input.notes });
          key = keyOk(pay.keyId) ? pay.keyId : order.keyId;
          if (order.amount !== expected) { refreshTotals(); setBusy(false); return showError(`Prices were updated. Your total is now ${fmt(order.amount / 100)} — please review and pay again.`); }
        }
        await loadRazorpay();
        const description = items.map(i => `${i.quantity}× ${cartApi.lines().find(l => l.id === i.id).product.name}`).join(', ').slice(0, 250);
        const options = {
          key, amount: expected, currency: shop.currency || 'INR', name: pay.brandName || 'GLAM', description,
          prefill: { name: input.customer.name, email: input.customer.email, contact: input.customer.phone },
          notes: { fulfilment: input.fulfilment, ref: order?.ref || '', note: input.notes.slice(0, 200) },
          theme: { color: pay.themeColor || '#a95847' },
          modal: { ondismiss: () => { setBusy(false); } },
          handler: response => onSuccess(response, order, input)
        };
        if (pay.logo) options.image = pay.logo;
        if (order) options.order_id = order.orderId;
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', r => { setBusy(false); showError(`Payment failed${r?.error?.description ? `: ${r.error.description}` : ''}. You have not been charged for this attempt — please try again.`); });
        window.GlamAnalytics?.trackCheckout({ items: items.length, value: expected / 100 });
        rzp.open();
      } catch (err) { setBusy(false); showError(err.message); }
    }

    async function onSuccess(response, order, input) {
      const snapshot = { lines: cartApi.lines().map(l => ({ name: l.product.name, quantity: l.quantity, price: cartApi.selling(l.product) })), totals: totals() };
      let verified = false, ref = order?.ref || '';
      if (mode === 'server') {
        try { const r = await api('/api/razorpay/verify', { ref, razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature }); verified = r.status === 'paid'; ref = r.ref || ref; }
        catch (err) { return renderResult({ state: 'pending', response, ref, input, snapshot, message: err.message }); }
      }
      cartApi.clear();
      window.GlamAnalytics?.trackPurchase({ transaction_id: response.razorpay_payment_id, value: snapshot.totals.total, currency: shop.currency || 'INR' });
      renderResult({ state: 'paid', verified, response, ref, input, snapshot });
    }

    function renderResult({ state: status, verified, response, ref, input, snapshot, message }) {
      const lines = snapshot.lines.map(l => `<li><span>${l.quantity} × ${esc(l.name)}</span><b>${fmt(l.price * l.quantity)}</b></li>`).join('');
      const wa = cartApi.waUrl ? cartApi.waUrl(`Hi GLAM, I just paid for an order.\nPayment ID: ${response.razorpay_payment_id}${ref ? `\nOrder ref: ${ref}` : ''}\nName: ${input.customer.name}`) : '';
      root.className = 'checkout-result';
      root.innerHTML = status === 'paid'
        ? `<p class="eyebrow">PAYMENT RECEIVED</p><h2>Thank you, <em>${esc(input.customer.name.split(' ')[0])}.</em></h2><p>${verified ? 'Your payment has been verified and your order is confirmed.' : 'Razorpay has confirmed your payment. GLAM will confirm your order shortly.'} Please keep your payment ID for reference.</p><div class="result-card">${ref ? `<p><span>Order reference</span><strong>${esc(ref)}</strong></p>` : ''}<p><span>Payment ID</span><strong>${esc(response.razorpay_payment_id)}</strong></p><ul>${lines}</ul><p class="grand"><span>Total paid</span><strong>${fmt(snapshot.totals.total)}</strong></p><p><span>${input.fulfilment === 'pickup' ? 'Collection' : 'Delivery'}</span><strong>${input.fulfilment === 'pickup' ? 'Pick up at GLAM salon' : esc([input.address.line1, input.address.city, input.address.pincode].join(', '))}</strong></p></div><div class="result-actions"><a class="button button-gold" href="products.html">Continue shopping</a><button class="button button-outline" onclick="window.print()">Print receipt</button>${wa ? `<a class="text-link" href="${esc(wa)}" target="_blank" rel="noopener">Message GLAM on WhatsApp <span>↗</span></a>` : ''}</div>`
        : `<p class="eyebrow">ONE MOMENT</p><h2>We’re confirming <em>your payment.</em></h2><p>${esc(message || 'We could not confirm your payment automatically.')} <strong>Please do not pay again.</strong> If money was deducted, GLAM will confirm your order — quote payment ID <strong>${esc(response.razorpay_payment_id)}</strong>.</p><div class="result-actions"><a class="button button-gold" href="contact.html">Contact GLAM</a></div>`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    render();
  });
})();
