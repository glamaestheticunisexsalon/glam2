(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const config = window.SITE_CONFIG || {};
  const data = window.GLAM_DATA || {};
  const analytics = window.GlamAnalytics;
  const valid = value => value && !String(value).includes('[');
  const setLink = (el, href, text) => { if (!el) return; el.href = href || '#'; if (text) el.textContent = text; };
  const phone = valid(config.phone) ? config.phone : '';
  const whatsapp = valid(config.booking?.whatsappNumber || config.whatsapp) ? (config.booking?.whatsappNumber || config.whatsapp) : '';
  const email = valid(config.email) ? config.email : '';
  const waUrl = message => whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(message)}` : '';
  const toast = message => { const el = $('.toast'); if (!el) return; el.textContent = message; el.classList.add('is-visible'); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('is-visible'), 3400); };
  const bookingMessage = values => `Hi GLAM, I would like to book an appointment.\n\nService: ${values.service}${values.type ? `\nType: ${values.type}` : ''}\nPreferred date: ${values.date}\nPreferred time: ${values.time}\nName: ${values.name}\nPhone: ${values.phone}`;
  const requestBooking = values => {
    analytics?.trackBooking({ service:values.service, method:config.booking?.type || 'whatsapp' });
    const message = bookingMessage(values), type = config.booking?.type || 'whatsapp';
    if (type === 'api') { toast('Online booking will be available when GLAM connects its booking service. Please contact the salon.'); return; }
    if (type === 'external' && valid(config.booking?.externalUrl)) { location.href = config.booking.externalUrl; return; }
    if (type === 'email' && email) { location.href = `mailto:${email}?subject=${encodeURIComponent('Appointment request — GLAM')}&body=${encodeURIComponent(message)}`; return; }
    const url = waUrl(message);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else if (email) location.href = `mailto:${email}?subject=${encodeURIComponent('Appointment request — GLAM')}&body=${encodeURIComponent(message)}`;
    else toast('Please add GLAM’s real WhatsApp number or email in data/site-config.js to enable appointment requests.');
  };

  function initHero() {
    const m = config.media?.slider || {};
    const slides = [
      {title:'Hair that<br><em>defines you.</em>',copy:'Professional styling, colour, haircuts and extension consultations tailored to your look.',image:m.hairColor,alt:'Hair colour service at GLAM: highlights being brushed into long wavy hair',fit:'cover',position:'center 22%',cta:'Explore hair services',href:'services.html',secondary:'Book appointment',secondaryHref:'booking.html'},
      {title:'Length that<br><em>moves with you.</em>',copy:'Hair extensions chosen for your colour, texture and everyday life — more length, more possibilities.',image:m.hairExtensions,alt:'Hair extensions at GLAM: long wavy hair with caramel highlights',fit:'cover',cta:'Discover hair extensions',href:'service-detail.html?service=hair-extensions',secondary:'Book appointment',secondaryHref:'booking.html?service=Hair%20Extension'},
      {title:'Sharp look.<br><em>Bold you.</em>',copy:'Precise beard shaping and grooming tailored to your face and style.',image:m.beard,alt:'Beard grooming service at GLAM',fit:'cover',cta:'Explore beard grooming',href:'service-detail.html?service=hair-styling',secondary:'Book appointment',secondaryHref:'booking.html?service=Hair%20Cut%20%26%20Styling&type=Beard%20Style'},
      {title:'Carbon laser,<br><em>considered care.</em>',copy:'A professional carbon laser consultation to review your skin, suitability and aftercare.',image:m.carbon,alt:'Carbon laser treatment at GLAM',fit:'cover',cta:'Learn about carbon laser',href:'service-detail.html?service=skin-rejuvenation',secondary:'Book a consultation',secondaryHref:'booking.html?service=Skin%20Rejuvenation&type=Carbon%20Laser'},
      {title:'Light-based<br><em>skin care.</em>',copy:'Cellular LED light therapy, planned with you in a calm, professional setting.',image:m.led,alt:'Cellular LED light therapy at GLAM',fit:'cover',cta:'Learn about LED therapy',href:'service-detail.html?service=skin-rejuvenation',secondary:'Book a consultation',secondaryHref:'booking.html?service=Skin%20Rejuvenation&type=Cellular%20Light%20Therapy'},
      {title:'Professional<br><em>chemical peels.</em>',copy:'A peel consultation focused on your skin, your goals and clear aftercare.',image:m.peel,alt:'Chemical peel treatment at GLAM',fit:'cover',cta:'Learn about peels',href:'service-detail.html?service=skin-rejuvenation',secondary:'Book a consultation',secondaryHref:'booking.html?service=Skin%20Rejuvenation&type=Chemical%20Peels'},
      {title:'Your beauty.<br><em>Your confidence.</em><br><span class="hero-gold">Your GLAM.</span>',copy:'Make a little space for yourself. Your premium salon experience starts here.',image:m.board,alt:'GLAM Unisex Salon: skin rejuvenation, microblading and hair extension',fit:'contain',cta:'Book appointment',href:'#booking',secondary:'Shop the GLAM edit',secondaryHref:'products.html'},
      {title:'Where beauty<br><em>meets confidence.</em>',copy:'A considered destination for hair, beauty and advanced aesthetic care — where every detail begins with you.',image:m.logo,alt:'GLAM logo in gold on a black background',fit:'contain',cta:'Book your experience',href:'#booking',secondary:'Explore services',secondaryHref:'#services'}
    ];
    const slideMs = Number(m.slideMs) || 2000;
    const dots = $('.slide-dots'), title = $('#hero-title'), copy = $('#hero-copy'), media = $('.hero-media');
    if (!dots || !title || !copy) return;
    const primary = $('#hero-primary'), secondary = $('#hero-secondary');
    const total = $('.hero-index span:last-child'); if (total) total.textContent = String(slides.length).padStart(2,'0');
    let active = 0;
    const imgs = media ? slides.map((slide, i) => {
      const img = document.createElement('img');
      img.className = `hero-slide fit-${slide.fit}`; img.src = slide.image; img.alt = slide.alt; img.decoding = 'async';
      img.width = 1200; img.height = 800; if (slide.position) img.style.objectPosition = slide.position;
      if (i > 1) img.loading = 'lazy';
      media.append(img); return img;
    }) : [];
    slides.forEach((slide, i) => { const b = document.createElement('button'); b.className = 'slide-dot'; b.type = 'button'; b.setAttribute('role','tab'); b.setAttribute('aria-label',`Show slide ${i+1}`); b.setAttribute('aria-selected',String(i === 0)); b.addEventListener('click', () => show(i)); dots.append(b); });
    const show = index => {
      active = (index + slides.length) % slides.length; const slide = slides[active];
      title.innerHTML = slide.title; copy.textContent = slide.copy;
      if (primary) { primary.href = slide.href; primary.innerHTML = `${esc(slide.cta)} <span aria-hidden="true">↗</span>`; }
      if (secondary) { secondary.href = slide.secondaryHref; secondary.innerHTML = `${esc(slide.secondary)} <span aria-hidden="true">↓</span>`; }
      imgs.forEach((img, i) => { img.classList.toggle('is-active', i === active); img.setAttribute('aria-hidden', String(i !== active)); });
      $$('.slide-dot',dots).forEach((dot,i) => dot.setAttribute('aria-selected',String(i === active)));
      $('.hero-current').textContent = String(active+1).padStart(2,'0');
      const hero = $('.hero'); hero.classList.remove('slide-enter'); requestAnimationFrame(() => hero.classList.add('slide-enter'));
    };
    $('.slide-prev')?.addEventListener('click',() => show(active-1)); $('.slide-next')?.addEventListener('click',() => show(active+1));
    show(0);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) { let timer = setInterval(() => show(active+1), slideMs); const hero = $('.hero'); hero?.addEventListener('mouseenter',() => clearInterval(timer)); hero?.addEventListener('mouseleave',() => { clearInterval(timer); timer = setInterval(() => show(active+1),slideMs); }); }
  }
  /* ---------- formatting & shared card builders ---------- */
  const fmt = amount => new Intl.NumberFormat('en-IN',{style:'currency',currency:config.shop?.currency || 'INR',maximumFractionDigits:0}).format(amount || 0);
  const selling = product => typeof data.sellingPrice === 'function' ? data.sellingPrice(product) : (Number(product.price) || 0);
  const hasPrice = product => selling(product) > 0;
  const stockLeft = product => product.stock === undefined || product.stock === '' ? Infinity : Math.max(0, Number(product.stock) || 0);
  const maxQty = product => Math.min(Number(config.shop?.maxQuantityPerItem) || 10, stockLeft(product));
  const imageTag = (item, {width = 1000, height = 800, lazy = true} = {}) => `<img src="${esc(item.image)}" width="${width}" height="${height}" alt="${esc(item.imageAlt || item.name)}"${item.imagePosition ? ` style="object-position:${esc(item.imagePosition)}"` : ''}${lazy ? ' loading="lazy"' : ''}>`;
  const priceHtml = product => {
    if (!hasPrice(product)) return '<span class="price-now">Enquire for price</span>';
    const now = selling(product), was = Number(product.price) || 0;
    return now < was ? `<span class="price-now">${fmt(now)}</span> <s class="price-was">${fmt(was)}</s>` : `<span class="price-now">${fmt(now)}</span>`;
  };
  const savingBadge = product => { const now = selling(product), was = Number(product.price) || 0; return hasPrice(product) && now < was ? `<span class="product-sale">Save ${Math.round((1-now/was)*100)}%</span>` : ''; };
  const typesOf = item => (item.typeGroups || []).flatMap(g => (g.items || []).map(t => t.name));
  const typeChips = (item, max = 0) => { const all = typesOf(item), list = max ? all.slice(0, max) : all; return list.map(n => `<span class="type-chip">${esc(n)}</span>`).join('') + (max && all.length > max ? `<span class="type-chip type-more">+${all.length - max} more</span>` : ''); };
  const serviceCard = (item, i, reveal = true) => { const link = `service-detail.html?service=${encodeURIComponent(item.slug)}`; return `<article class="service-card${reveal ? ' reveal' : ''}"><a class="service-image" href="${link}">${imageTag(item)}<span class="service-index">${String(i+1).padStart(2,'0')}</span><span class="service-arrow">↗</span></a><div class="service-card-copy"><p class="eyebrow">${esc(item.category)}</p><h3><a href="${link}">${esc(item.name)}</a></h3><p>${esc(item.shortDescription)}</p><div class="type-chips" aria-label="Types of ${esc(item.name)}">${typeChips(item, 6)}</div><a class="text-link" href="${link}">Discover service <span>↗</span></a></div></article>`; };
  const productCard = (item, badge) => {
    const link = `product-detail.html?product=${encodeURIComponent(item.slug)}`, sold = stockLeft(item) === 0;
    const action = !hasPrice(item) ? `<a class="button button-outline button-small" href="contact.html">Enquire</a>` : sold ? `<button class="button button-outline button-small" disabled>Sold out</button>` : `<button class="button button-gold button-small add-to-cart" data-product="${esc(item.id)}">Add to bag <span aria-hidden="true">＋</span></button>`;
    return `<article class="product-card reveal"><a class="product-image" href="${link}">${imageTag(item,{width:800,height:580})}<span class="product-badge">${esc(badge || item.category)}</span>${savingBadge(item)}${sold ? '<span class="product-soldout">Sold out</span>' : ''}</a><div class="product-card-copy"><p class="eyebrow">${esc(item.brand)}</p><h3><a href="${link}">${esc(item.name)}</a></h3><p class="product-price">${priceHtml(item)}</p><div class="product-actions">${action}<button class="wishlist-button" data-wishlist="${esc(item.id)}" aria-label="Save ${esc(item.name)} to wishlist" aria-pressed="false">♡</button></div></div></article>`;
  };

  function renderServices() {
    const grid = $('#service-grid');
    if (!grid) return;
    grid.innerHTML = (data.services || []).filter(item => item.featured).map((item,i) => serviceCard(item, i)).join('');
  }
  function renderProducts() {
    const grid = $('#product-grid'); if (!grid) return;
    grid.innerHTML = (data.products || []).filter(item => item.featured).slice(0,4).map(item => productCard(item, 'THE GLAM EDIT')).join('');
  }
  function renderCatalogPage() {
    const root = $('#catalog-list');
    if (!root) return;
    const type = document.body.dataset.catalogType || ($('#product-filters') ? 'products' : 'services');
    const source = type === 'products' ? (data.products || []) : (data.services || []);
    const filterRoot = type === 'products' ? $('#product-filters') : $('#service-filters');
    const categories = ['All', ...new Set(source.map(item => item.category).filter(Boolean))];
    let active = 'All';
    const render = () => {
      const entries = source.filter(item => active === 'All' || item.category === active);
      root.innerHTML = type === 'products' ? entries.map(item => productCard(item)).join('') : entries.map((item,i) => serviceCard(item, i, false)).join('');
      if (!entries.length) root.innerHTML = '<p class="catalog-empty">More GLAM selections will be added soon. Contact our team for current availability.</p>';
      if (type === 'products') $$('.product-card', root).forEach(card => card.classList.add('is-visible'));
    };
    if (filterRoot) {
      filterRoot.innerHTML = categories.map(category => `<button type="button" class="filter-chip${category === 'All' ? ' is-active' : ''}" aria-pressed="${category === 'All'}">${esc(category)}</button>`).join('');
      filterRoot.addEventListener('click', event => { const button=event.target.closest('.filter-chip'); if(!button)return; active=button.textContent; $$('.filter-chip',filterRoot).forEach(chip=>{const chosen=chip===button;chip.classList.toggle('is-active',chosen);chip.setAttribute('aria-pressed',String(chosen));});render(); initReveal(); });
    }
    render();
  }
  function renderFaqs() {
    const root = $('#faq-list'); if (!root) return;
    root.innerHTML = (data.faqs || []).map((item,i) => `<details class="faq-item" ${i===0?'open':''}><summary>${esc(item.question)}<span aria-hidden="true">＋</span></summary><p>${esc(item.answer)}</p></details>`).join('');
    window.GlamSchema?.faqs(data.faqs || []);
  }
  function renderGallery() {
    const root = $('#gallery-grid'); if (!root) return;
    const full = document.body.dataset.galleryPage === 'full';
    const all = data.gallery || [];
    let list = full ? all : all.filter(item => item.home).slice(0,5);
    root.classList.toggle('is-full', full);
    const tile = (item, i) => { const shape = item.height > item.width * 1.1 ? ' is-tall' : item.width > item.height * 1.9 ? ' is-wide' : ''; return `<button class="gallery-tile gallery-tile-${i+1}${shape}" data-gallery="${i}" aria-label="View image: ${esc(item.caption)}"><img src="${esc(item.image)}" width="${item.width}" height="${item.height}" alt="${esc(item.alt)}" loading="lazy"><span>${esc(item.caption)} <b>↗</b></span></button>`; };
    const paint = () => { root.innerHTML = list.map(tile).join(''); };
    const filterRoot = $('#gallery-filters');
    if (full && filterRoot) {
      const categories = ['All', ...new Set(all.map(item => item.category))];
      filterRoot.innerHTML = categories.map(c => `<button type="button" class="filter-chip${c === 'All' ? ' is-active' : ''}" aria-pressed="${c === 'All'}">${esc(c)}</button>`).join('');
      filterRoot.addEventListener('click', event => { const b = event.target.closest('.filter-chip'); if (!b) return; const c = b.textContent; list = c === 'All' ? all : all.filter(item => item.category === c); $$('.filter-chip',filterRoot).forEach(chip => { const on = chip === b; chip.classList.toggle('is-active',on); chip.setAttribute('aria-pressed',String(on)); }); paint(); });
    }
    paint();
    root.addEventListener('click', event => {
      const button = event.target.closest('[data-gallery]'); if (!button) return;
      let index = Number(button.dataset.gallery);
      const modal = document.createElement('dialog'); modal.className = 'lightbox';
      const draw = () => { const item = list[index]; modal.innerHTML = `<button class="dialog-close" aria-label="Close image">×</button><img src="${esc(item.image)}" width="${item.width}" height="${item.height}" alt="${esc(item.alt)}"><div class="lightbox-bar"><button class="lightbox-nav" data-dir="-1" aria-label="Previous image">←</button><p>${esc(item.caption)} · ${index+1}/${list.length}</p><button class="lightbox-nav" data-dir="1" aria-label="Next image">→</button></div>`; };
      draw(); document.body.append(modal); modal.showModal();
      modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.dialog-close')) { modal.close(); return; } const nav = e.target.closest('.lightbox-nav'); if (nav) { index = (index + Number(nav.dataset.dir) + list.length) % list.length; draw(); } });
      modal.addEventListener('close',() => modal.remove(),{once:true}); analytics?.trackEvent('gallery_view',{category:list[index].category});
    });
  }
  /* ---------- calendar date picker ---------- */
  function initDatePickers() {
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    $$('input[name="date"]').forEach(input => {
      if (input.dataset.picker) return; input.dataset.picker = '1';
      input.type = 'text'; input.autocomplete = 'off'; input.placeholder = 'Select a date'; input.setAttribute('aria-haspopup','dialog');
      const today = startOfDay(new Date()); let selected = null, view = new Date(today.getFullYear(), today.getMonth(), 1);
      const wrap = document.createElement('div'); wrap.className = 'date-field'; input.parentNode.insertBefore(wrap, input); wrap.append(input);
      const toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = 'date-toggle'; toggle.setAttribute('aria-label','Open calendar');
      toggle.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>';
      const pop = document.createElement('div'); pop.className = 'calendar'; pop.hidden = true; pop.setAttribute('role','dialog'); pop.setAttribute('aria-label','Choose a date');
      wrap.append(toggle, pop);
      const label = d => d.toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short', year:'numeric' });
      const render = () => {
        const first = new Date(view.getFullYear(), view.getMonth(), 1), days = new Date(view.getFullYear(), view.getMonth()+1, 0).getDate();
        const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
        let cells = ''; for (let i = 0; i < first.getDay(); i++) cells += '<span></span>';
        for (let day = 1; day <= days; day++) {
          const d = new Date(view.getFullYear(), view.getMonth(), day), past = d < today, cls = ['cal-day', iso(d) === (selected && iso(selected)) ? 'is-selected' : '', iso(d) === iso(today) ? 'is-today' : ''].join(' ').trim();
          cells += `<button type="button" class="${cls}" data-day="${iso(d)}" ${past ? 'disabled' : ''} aria-label="${d.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}">${day}</button>`;
        }
        pop.innerHTML = `<div class="cal-head"><button type="button" class="cal-nav" data-nav="-1" aria-label="Previous month" ${canPrev ? '' : 'disabled'}>‹</button><strong>${MONTHS[view.getMonth()]} ${view.getFullYear()}</strong><button type="button" class="cal-nav" data-nav="1" aria-label="Next month">›</button></div><div class="cal-week"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div><div class="cal-grid">${cells}</div><div class="cal-foot"><button type="button" data-today>Today</button><button type="button" data-clear>Clear</button></div>`;
      };
      const open = () => { $$('.calendar').forEach(c => { if (c !== pop) c.hidden = true; }); render(); pop.hidden = false; input.setAttribute('aria-expanded','true'); };
      const close = () => { pop.hidden = true; input.setAttribute('aria-expanded','false'); };
      const choose = d => { selected = d; input.value = label(d); input.dataset.iso = iso(d); input.setCustomValidity(''); input.dispatchEvent(new Event('change', { bubbles: true })); close(); };
      toggle.addEventListener('click', e => { e.preventDefault(); pop.hidden ? open() : close(); });
      input.addEventListener('click', open); input.addEventListener('focus', open);
      input.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); return; } if (e.key === 'Tab') return; if (['Enter','ArrowDown',' '].includes(e.key)) open(); e.preventDefault(); });
      input.addEventListener('paste', e => e.preventDefault());
      pop.addEventListener('click', e => {
        const nav = e.target.closest('[data-nav]'), day = e.target.closest('[data-day]');
        if (nav) { view = new Date(view.getFullYear(), view.getMonth() + Number(nav.dataset.nav), 1); render(); }
        else if (day) { const [y,m,d] = day.dataset.day.split('-').map(Number); choose(new Date(y, m-1, d)); }
        else if (e.target.closest('[data-today]')) choose(today);
        else if (e.target.closest('[data-clear]')) { selected = null; input.value = ''; delete input.dataset.iso; close(); }
      });
      document.addEventListener('click', e => { if (!wrap.contains(e.target)) close(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    });
  }
  function initBooking() {
    const form = $('#booking-form'); if (!form) return;
    const service = form.elements.service;
    (data.services || []).filter(item => item.bookingEnabled).forEach(item => { const option = document.createElement('option'); option.value = item.name; option.textContent = item.name; service.append(option); });
    const typeLabel = document.createElement('label'); typeLabel.className = 'type-field'; typeLabel.hidden = true; typeLabel.innerHTML = 'Type of service<select name="type"><option value="">Any / not sure yet</option></select>';
    service.closest('label')?.after(typeLabel); const typeSelect = typeLabel.querySelector('select');
    const fillTypes = () => { const item = (data.services || []).find(x => x.name === service.value); typeSelect.innerHTML = '<option value="">Any / not sure yet</option>'; const groups = item?.typeGroups || []; groups.forEach(g => { const og = document.createElement('optgroup'); og.label = g.title; (g.items || []).forEach(t => { const o = document.createElement('option'); o.value = t.name; o.textContent = t.name; og.append(o); }); typeSelect.append(og); }); typeLabel.hidden = !groups.length; };
    service.addEventListener('change', fillTypes);
    const qs = new URLSearchParams(location.search), pre = qs.get('service'); if (pre && [...service.options].some(o => o.value === pre)) service.value = pre;
    fillTypes(); const preType = qs.get('type'); if (preType && [...typeSelect.options].some(o => o.value === preType)) typeSelect.value = preType;
    
    if (form.dataset.wizard === 'true') {
      const steps = $$('.booking-step', form), progress = $('#booking-progress'), summary = $('#booking-summary');
      let current = 0;
      const showStep = index => {
        current = Math.max(0, Math.min(index, steps.length - 1));
        steps.forEach((step, i) => { step.hidden = i !== current; });
        if (progress) { progress.textContent = `STEP ${current + 1} OF ${steps.length}`; progress.setAttribute('aria-valuenow', String(current + 1)); }
        if (current === steps.length - 1 && summary) {
          const values = Object.fromEntries(new FormData(form));
          summary.innerHTML = `<p><span>Service</span><strong>${esc(values.service)}${values.type ? ' · ' + esc(values.type) : ''}</strong></p><p><span>Date</span><strong>${esc(values.date)}</strong></p><p><span>Time</span><strong>${esc(values.time)}</strong></p><p><span>Name</span><strong>${esc(values.name)}</strong></p><p><span>Phone</span><strong>${esc(values.phone)}</strong></p>`;
        }
      };
      form.addEventListener('click', event => {
        const next = event.target.closest('[data-step-next]'), back = event.target.closest('[data-step-back]');
        if (next) { const validStep = [...steps[current].querySelectorAll('input,select')].every(field => field.reportValidity()); if (validStep) showStep(current + 1); }
        if (back) showStep(current - 1);
      });
      showStep(0);
      form.addEventListener('submit', event => { event.preventDefault(); const values = Object.fromEntries(new FormData(form)); analytics?.trackEvent('booking_start',{service:values.service}); requestBooking(values); });
      return;
    }
    form.addEventListener('submit', event => { event.preventDefault(); if (!form.reportValidity()) return; const values = Object.fromEntries(new FormData(form)); analytics?.trackEvent('booking_start',{service:values.service}); requestBooking(values); });
  }
  /* ---------- shopping bag ---------- */
  const cartKey = 'glam-cart-v1', wishlistKey = 'glam-wishlist-v1';
  const readStore = key => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };
  const writeStore = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable: bag lasts for this page view only */ } };
  const findProduct = id => (data.products || []).find(item => item.id === id);
  let cart = readStore(cartKey).filter(row => row && findProduct(row.id)).map(row => ({ id: row.id, quantity: Math.min(Math.max(1, Math.floor(Number(row.quantity)) || 1), maxQty(findProduct(row.id))) })).filter(row => row.quantity > 0);
  const saveCart = () => writeStore(cartKey, cart);
  const cartLines = () => cart.map(row => ({ id: row.id, quantity: row.quantity, product: findProduct(row.id) })).filter(line => line.product);
  const cartCount = () => cart.reduce((sum, row) => sum + row.quantity, 0);
  const cartSubtotal = () => cartLines().reduce((sum, line) => sum + selling(line.product) * line.quantity, 0);
  const shippingFor = (subtotal, fulfilment = 'delivery') => {
    const rule = config.shop?.shipping || {};
    if (fulfilment === 'pickup' || !subtotal) return 0;
    if (Number(rule.freeAbove) > 0 && subtotal >= Number(rule.freeAbove)) return 0;
    return Math.max(0, Number(rule.flatFee) || 0);
  };
  function ensureCartUi() {
    if (!$('.cart-drawer')) {
      document.body.insertAdjacentHTML('beforeend', '<aside class="cart-drawer" aria-label="Shopping bag" aria-hidden="true"><div class="cart-head"><h2>Your bag <span class="cart-count">0</span></h2><button class="cart-close" aria-label="Close bag">×</button></div><div class="cart-items"></div><div class="cart-bottom"></div></aside><div class="drawer-scrim"></div>');
    }
    if (!$('.cart-trigger')) {
      const header = $('.site-header'); if (!header) return;
      let actions = $('.header-actions', header);
      if (!actions) { actions = document.createElement('div'); actions.className = 'header-actions'; header.append(actions); }
      const button = document.createElement('button'); button.className = 'icon-button cart-trigger'; button.setAttribute('aria-label', 'Open shopping bag'); button.innerHTML = 'Bag <span class="cart-count">0</span>';
      actions.prepend(button);
    }
  }
  function paintCart() {
    $$('.cart-count').forEach(node => node.textContent = cartCount());
    const root = $('.cart-items'), bottom = $('.cart-bottom');
    if (root) root.innerHTML = cart.length ? cartLines().map(({ product: p, quantity }) => `<article class="cart-row"><img src="${esc(p.image)}" width="90" height="65" alt="${esc(p.name)}"><div><h3><a href="product-detail.html?product=${encodeURIComponent(p.slug)}">${esc(p.name)}</a></h3><p>${fmt(selling(p))} each</p><div class="quantity-control"><button data-quantity="-1" data-id="${esc(p.id)}" aria-label="Decrease quantity of ${esc(p.name)}">−</button><span>${quantity}</span><button data-quantity="1" data-id="${esc(p.id)}" aria-label="Increase quantity of ${esc(p.name)}">＋</button><strong class="cart-line-total">${fmt(selling(p) * quantity)}</strong><button class="remove-item" data-remove="${esc(p.id)}">Remove</button></div></div></article>`).join('') : '<p class="empty-bag">Your bag is waiting for something lovely.</p><a class="text-link" href="products.html">Browse the shop <span>↗</span></a>';
    if (bottom) bottom.innerHTML = cart.length ? `<div class="cart-subtotal"><span>Subtotal</span><strong>${fmt(cartSubtotal())}</strong></div><p>Shipping and delivery options are shown at checkout.</p><a class="button button-gold checkout-button" href="checkout.html">Checkout <span>↗</span></a>` : '';
  }
  function openCart() { $('.cart-drawer')?.classList.add('is-open'); $('.cart-drawer')?.setAttribute('aria-hidden','false'); $('.drawer-scrim')?.classList.add('is-visible'); }
  function closeCart() { $('.cart-drawer')?.classList.remove('is-open'); $('.cart-drawer')?.setAttribute('aria-hidden','true'); $('.drawer-scrim')?.classList.remove('is-visible'); }
  function addToCart(id, { silent = false } = {}) {
    const product = findProduct(id);
    if (!product || !hasPrice(product)) { toast('Please contact GLAM to order this product.'); return false; }
    const limit = maxQty(product);
    if (limit < 1) { toast('Sorry, this product is sold out.'); return false; }
    const existing = cart.find(row => row.id === id);
    if (existing && existing.quantity >= limit) { toast(`You already have the maximum available (${limit}) in your bag.`); return false; }
    existing ? existing.quantity++ : cart.push({ id, quantity: 1 });
    saveCart(); paintCart(); analytics?.trackAddToCart(id, existing ? existing.quantity : 1);
    if (!silent) toast(`${product.name} added to your bag`);
    return true;
  }
  function initCart() {
    ensureCartUi(); paintCart();
    $$('.cart-trigger').forEach(el => el.addEventListener('click', openCart)); $('.cart-close')?.addEventListener('click', closeCart); $('.drawer-scrim')?.addEventListener('click', closeCart);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCart(); });
    window.GlamWishlist = { all: () => readStore(wishlistKey), toggle(id) { const list = readStore(wishlistKey), next = list.includes(id) ? list.filter(x => x !== id) : [...list, id]; writeStore(wishlistKey, next); return next.includes(id); } };
    const saved = window.GlamWishlist.all();
    document.addEventListener('click', event => {
      const add = event.target.closest('.add-to-cart');
      if (add) { if (addToCart(add.dataset.product)) openCart(); return; }
      const buy = event.target.closest('[data-buy-now]');
      if (buy) { const id = buy.dataset.buyNow; if (cart.some(row => row.id === id) || addToCart(id, { silent: true })) location.href = 'checkout.html'; return; }
      const wish = event.target.closest('[data-wishlist]');
      if (wish) { const on = window.GlamWishlist.toggle(wish.dataset.wishlist); wish.setAttribute('aria-pressed', String(on)); wish.firstChild.textContent = on ? '♥' : '♡'; toast(on ? 'Saved to your wishlist' : 'Removed from your wishlist'); return; }
      const q = event.target.closest('[data-quantity]');
      if (q) { const row = cart.find(item => item.id === q.dataset.id); if (row) { const limit = maxQty(findProduct(row.id)); const next = row.quantity + Number(q.dataset.quantity); if (next > limit) toast(`Only ${limit} available.`); row.quantity = Math.min(limit, Math.max(1, next)); saveCart(); paintCart(); } return; }
      const remove = event.target.closest('[data-remove]');
      if (remove) { cart = cart.filter(item => item.id !== remove.dataset.remove); saveCart(); paintCart(); analytics?.trackEvent('remove_from_cart', { item_id: remove.dataset.remove }); }
    });
    $$('[data-wishlist]').forEach(btn => { if (saved.includes(btn.dataset.wishlist)) { btn.setAttribute('aria-pressed','true'); btn.firstChild.textContent = '♥'; } });
    window.GlamCart = { lines: cartLines, subtotal: cartSubtotal, shipping: shippingFor, count: cartCount, clear() { cart = []; saveCart(); paintCart(); }, fmt, selling, open: openCart, close: closeCart, toast, valid, waUrl, phone };
  }
  function initSearch() {
    if (!$('.search-dialog')) {
      const dialog = document.createElement('dialog'); dialog.className = 'search-dialog'; dialog.setAttribute('aria-labelledby','search-title');
      dialog.innerHTML = '<div class="dialog-head"><p class="eyebrow" id="search-title">SEARCH THE GLAM EDIT</p><button class="dialog-close" aria-label="Close search">×</button></div><label for="site-search">What are you looking for?</label><input id="site-search" type="search" placeholder="Try carbon laser, hair care…" autocomplete="off"><div class="search-results" id="search-results" aria-live="polite"></div>';
      document.body.append(dialog);
    }
    const dialog=$('.search-dialog'), input=$('#site-search'), results=$('#search-results'); if(!dialog||!input||!results) return;
    $('.search-trigger')?.addEventListener('click',()=>{dialog.showModal();input.focus();}); $('.dialog-close')?.addEventListener('click',()=>dialog.close()); dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    input.addEventListener('input',()=>{ const q=input.value.trim().toLowerCase(); results.innerHTML=''; if(q.length<2) {results.innerHTML='<p class="search-hint">Type at least two letters to explore services, products and FAQs.</p>';return;} const items=[...(data.services||[]).map(x=>({...x,type:'Service',url:`service-detail.html?service=${encodeURIComponent(x.slug)}`,text:`${x.name} ${x.category} ${x.shortDescription} ${typesOf(x).join(' ')} ${(x.keywords||[]).join(' ')}`})),...(data.products||[]).map(x=>({...x,type:'Product',url:`product-detail.html?product=${encodeURIComponent(x.slug)}`,text:`${x.name} ${x.category} ${x.description}`})),...(data.offers||[]).map(x=>({...x,type:'Offer',url:'offers.html',text:`${x.title} ${x.description}`})),...(data.faqs||[]).map(x=>({...x,type:'FAQ',url:'#faq-list',text:`${x.question} ${x.answer}`}))].filter(x=>x.text.toLowerCase().includes(q)).slice(0,8);
      const highlight = value => { const safe=esc(value); const safeQuery=esc(q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); return safe.replace(new RegExp(`(${safeQuery})`,'ig'),'<mark>$1</mark>'); };
      results.innerHTML=items.length?items.map(x=>`<a class="search-result" href="${x.url}"><span>${esc(x.type)}</span><strong>${highlight(x.name||x.title||x.question)}</strong><small>${highlight(x.shortDescription||x.description||x.answer||'')}</small></a>`).join(''):'<p class="search-hint">No exact match. Try a service name or ask our team.</p>'; analytics?.trackEvent('search',{search_term:q,result_count:items.length}); });
  }
  function initContact() {
    $$('[data-phone]').forEach(el=>{setLink(el,phone?`tel:${phone.replace(/[^+\d]/g,'')}`:'#',phone||'[GLAM PHONE]');el.addEventListener('click',()=>analytics?.trackPhoneClick({location:el.className||'link'}));});
    $$('[data-email]').forEach(el=>{setLink(el,email?`mailto:${email}`:'#',email||'[GLAM EMAIL]');el.addEventListener('click',()=>analytics?.trackEvent('email_click',{location:el.className||'link'}));});
    const address=[config.address,config.area,config.city,config.state,config.pincode].filter(valid).join(', '); $$('[data-address]').forEach(el=>el.textContent=address||'[GLAM ADDRESS], [GLAM AREA], [GLAM CITY]');
    $$('[data-hours]').forEach(el=>el.textContent=(config.openingHours||[]).map(row=>`${row.days}: ${row.hours}`).join(' · ')||'[OPENING HOURS]');
    $$('[data-whatsapp]').forEach(el=>{const url=waUrl('Hi GLAM, I would like to know more.');if(url&&el.textContent.includes('[GLAM WHATSAPP]')){const d=whatsapp.replace(/\D/g,'').replace(/^91(?=\d{10}$)/,'');el.textContent=`+91 ${d.slice(0,5)} ${d.slice(5)}`;}if(url)setLink(el,url);else el.addEventListener('click',e=>{e.preventDefault();toast('Add GLAM’s WhatsApp number in data/site-config.js to enable chat.');}); el.addEventListener('click',()=>analytics?.trackWhatsAppClick({location:el.className||'link'}));});
    const directions=$('[data-directions]'); if(directions) {if(valid(config.googleMapsUrl)) directions.href=config.googleMapsUrl; else directions.addEventListener('click',e=>{e.preventDefault();toast('Add GLAM’s Google Maps URL in data/site-config.js.');});directions.addEventListener('click',()=>analytics?.trackEvent('directions_click',{location:location.pathname}));}
    const map=$('.map-panel iframe'); if(map && valid(config.googleMapsEmbedUrl)) {map.src=config.googleMapsEmbedUrl;map.hidden=false;$('.map-placeholder')?.setAttribute('hidden','');}
    const mapLabel=$('.map-placeholder p'); if(mapLabel)mapLabel.textContent=`${config.businessName || 'GLAM'} · ${[config.area,config.city].filter(valid).join(', ') || '[GLAM LOCATION]'}`;
    $$('[data-social]').forEach(el=>{const url=config.social?.[el.dataset.social];if(valid(url))el.href=url;else el.hidden=true;});
    $('#newsletter-form')?.addEventListener('submit',e=>{e.preventDefault();toast('Thank you. Newsletter sign-up will be available when GLAM connects its email service.');});
  }
  function initConsent() { const banner=$('.consent-banner'), ids=config.analytics||{}, enabled=Object.values(ids).some(valid); if(!banner||!enabled||analytics?.hasConsent())return; banner.hidden=false; $('.consent-accept')?.addEventListener('click',()=>{analytics.grantConsent();banner.hidden=true;analytics.trackPageView();}); $('.consent-dismiss')?.addEventListener('click',()=>{localStorage.setItem('glam-analytics-consent','denied');banner.hidden=true;}); }
  async function initDetail() {
    if(!$('#detail-content')) return;
    const type=document.body.dataset.detailType, slug=new URLSearchParams(location.search).get(type==='service'?'service':'product');
    const item=type==='service'?await window.DataService.getService(slug):await window.DataService.getProduct(slug);
    const root=$('#detail-content');
    if(!item){root.innerHTML='<section class="detail-not-found"><p class="eyebrow">THE GLAM EDIT</p><h1>We could not find that <em>page.</em></h1><p>Explore our services or the GLAM shop, or contact the team for help.</p><a class="button button-gold" href="services.html">Explore services</a> <a class="button button-outline" href="products.html">Visit the shop</a></section>';return;}
    const localLabel=[config.area,config.city].filter(valid).join(', ');
    document.title=type==='service'?item.seoTitle:item.name+' | GLAM Beauty Store'+(localLabel?` in ${localLabel}`:'');
    const description=type==='service'?item.seoDescription:item.description+(localLabel?` Visit GLAM in ${localLabel}.`:'');
    if(type==='service'){let k=$('meta[name="keywords"]');if(!k){k=document.createElement('meta');k.name='keywords';document.head.append(k);}k.content=(item.keywords||[]).join(', ');}
    const metaDescription=$('meta[name="description"]'); if(metaDescription)metaDescription.content=description;
    const canonical=$('link[rel="canonical"]'); if(canonical&&valid(config.websiteUrl))canonical.href=`${config.websiteUrl.replace(/\/$/,'')}/${type==='service'?'service-detail.html?service=':'product-detail.html?product='}${encodeURIComponent(item.slug)}`;
    const bullets=(values=[])=>values.map(value=>`<li>${esc(value)}</li>`).join('');
    const hero = img => `<img src="${esc(item.image)}" width="1600" height="1200" alt="${esc(item.imageAlt||item.name)}"${item.imagePosition?` style="object-position:${esc(item.imagePosition)}"`:''}>`;
    if (type === 'service') {
      const bookBase = `booking.html?service=${encodeURIComponent(item.name)}`;
      const groupsHtml = (item.typeGroups || []).map(g => `<div class="type-group"><h3>${esc(g.title)}</h3><ul class="type-list">${(g.items || []).map(t => `<li><a href="${bookBase}&type=${encodeURIComponent(t.name)}">${esc(t.name)}<span aria-hidden="true">↗</span></a></li>`).join('')}</ul></div>`).join('');
      const faqHtml = (item.faqs || []).length ? `<section class="detail-faq"><p class="eyebrow">QUICK ANSWERS</p><h2>Questions about <em>${esc(item.name)}.</em></h2>${item.faqs.map((f, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${esc(f.question)}<span aria-hidden="true">＋</span></summary><p>${esc(f.answer)}</p></details>`).join('')}</section>` : '';
      root.innerHTML=`<div class="detail-hero">${hero()}<div><p class="eyebrow">${esc(item.category)}</p><h1>${esc(item.name)}<em>.</em></h1><p class="quick-answer">${esc(item.quickAnswer || item.shortDescription)}</p><p>${esc(item.description)}</p><a class="button button-gold" href="${bookBase}">Book this service <span>↗</span></a></div></div>${groupsHtml ? `<section class="detail-types"><p class="eyebrow">TYPES OF ${esc(item.name.toUpperCase())}</p><h2>Choose your <em>service.</em></h2><div class="type-groups">${groupsHtml}</div></section>` : ''}<div class="detail-sections"><section><p class="eyebrow">THE EXPERIENCE</p><h2>What to <em>expect.</em></h2><ol>${bullets(item.process)}</ol></section><section><p class="eyebrow">A CONSIDERED APPROACH</p><h2>Made for <em>your needs.</em></h2><ul>${bullets(item.benefits)}</ul><p><strong>Duration:</strong> ${esc(item.duration)}<br><strong>Pricing:</strong> Contact GLAM for current pricing</p></section><section><p class="eyebrow">AFTER YOUR VISIT</p><h2>Care, <em>continued.</em></h2><ul>${bullets(item.aftercare)}</ul></section></div>${faqHtml}`;
      window.GlamSchema?.service(item);
    } else {
      const left = stockLeft(item), sold = left === 0, canBuy = hasPrice(item) && !sold;
      const stockText = sold ? 'Sold out' : left <= 10 && left !== Infinity ? `Only ${left} left` : 'In stock';
      const buttons = canBuy ? `<button class="button button-gold add-to-cart" data-product="${esc(item.id)}">Add to bag</button><button class="button button-outline" data-buy-now="${esc(item.id)}">Buy now</button>` : `<a class="button button-gold" href="contact.html">Enquire about this product</a>`;
      const perks = ['Secure online payment with Razorpay', config.shop?.pickupEnabled ? 'Home delivery or pick-up from the salon' : 'Home delivery'];
      root.innerHTML=`<div class="detail-hero product-hero">${hero()}<div><p class="eyebrow">${esc(item.category)}</p><h1>${esc(item.name)}<em>.</em></h1><p class="detail-price">${priceHtml(item)} ${savingBadge(item)}</p><p>${esc(item.description)}</p><p class="detail-stock ${sold?'is-sold':left<=10?'is-low':''}">${stockText}</p><div class="detail-actions">${buttons}<button class="wishlist-button" data-wishlist="${esc(item.id)}" aria-label="Save ${esc(item.name)} to wishlist" aria-pressed="false">♡</button></div><ul class="trust-list">${perks.map(text=>`<li>${esc(text)}</li>`).join('')}</ul></div></div><div class="detail-sections"><section><p class="eyebrow">PRODUCT DETAILS</p><h2>A little <em>about it.</em></h2><p>${esc(item.description)}</p><p><strong>Brand:</strong> ${esc(item.brand)}<br><strong>Category:</strong> ${esc(item.category)}${item.sku?`<br><strong>SKU:</strong> ${esc(item.sku)}`:''}</p>${(item.ingredients||[]).length?`<p><strong>Ingredients:</strong> ${esc(item.ingredients.join(', '))}</p>`:''}</section><section><p class="eyebrow">HOW TO USE</p><h2>Good to <em>know.</em></h2><p>${esc(item.usage)}</p><p class="fine-print">Always read the label and patch test new products. Ask our team if you are unsure which product suits you.</p></section></div>`;
      window.GlamSchema?.product(item);
      const saved = window.GlamWishlist?.all?.() || []; $$('[data-wishlist]', root).forEach(btn => { if (saved.includes(btn.dataset.wishlist)) { btn.setAttribute('aria-pressed','true'); btn.firstChild.textContent = '♥'; } });
    }
    window.GlamSchema?.breadcrumbs([{name:'Home',url:'index.html'},{name:type==='service'?'Services':'Shop',url:type==='service'?'services.html':'products.html'},{name:item.name,url:location.href}]);
    analytics?.trackEvent(type==='service'?'view_service':'view_product',{item_id:item.id});
  }
  function initReveal() {
    const targets=$$('.reveal'); if(!('IntersectionObserver' in window)){targets.forEach(x=>x.classList.add('is-visible'));return;}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12}); targets.forEach(item=>observer.observe(item));
  }
  document.addEventListener('DOMContentLoaded', async () => {
    $('#year') && ($('#year').textContent=new Date().getFullYear());
    renderServices();renderProducts();renderCatalogPage();renderFaqs();renderGallery();initHero();initDatePickers();initBooking();initCart();initSearch();initContact();initConsent();initReveal();await initDetail();
    window.GlamSchema?.business();
    window.GlamSchema?.website();
    if(window.GlamAnalytics?.hasConsent())window.GlamAnalytics.trackPageView();
  });
})();
