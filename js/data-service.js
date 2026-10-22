/* Replace this adapter with ApiDataService without changing page rendering code. */
(() => {
  const local = window.GLAM_DATA || {};
  window.DataService = {
    async getServices() { return local.services || []; },
    async getService(id) { return (local.services || []).find(item => item.id === id || item.slug === id || (item.aliases || []).includes(id)) || null; },
    async getProducts() { return local.products || []; },
    async getProduct(id) { return (local.products || []).find(item => item.id === id || item.slug === id) || null; },
    async getOffers() { return local.offers || []; },
    async getTestimonials() { return local.testimonials || []; },
    async getGallery() { return local.gallery || []; },
    async getTeam() { return local.team || []; },
    async getFAQs() { return local.faqs || []; },
    async getSiteConfig() { return window.SITE_CONFIG || {}; }
  };
  // API migration sketch: return fetch('/api/services').then(r => { if (!r.ok) throw new Error('Services unavailable'); return r.json(); });
})();
