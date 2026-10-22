(() => {
  const config = () => window.SITE_CONFIG?.analytics || {};
  const valid = value => Boolean(value && !value.includes('['));
  const load = () => {
    const { googleAnalyticsId: ga, googleTagManagerId: gtm, googleAdsId: ads } = config();
    const tagId = valid(ga) ? ga : (valid(ads) ? ads : '');
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...args) => window.dataLayer.push(args));
    if (tagId && !document.querySelector('[data-gtag-loaded]')) {
      const s = document.createElement('script'); s.async = true; s.dataset.gtagLoaded = 'true'; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`; document.head.append(s);
      window.gtag('js', new Date());
      if (valid(ga)) window.gtag('config', ga, { anonymize_ip: true });
      if (valid(ads)) window.gtag('config', ads);
    }
    if (valid(gtm) && !document.querySelector('[data-gtm-loaded]')) {
      const s = document.createElement('script'); s.async = true; s.dataset.gtmLoaded = 'true'; s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtm)}`; document.head.append(s);
    }
  };
  const consentKey = 'glam-analytics-consent';
  window.GlamAnalytics = {
    grantConsent() { localStorage.setItem(consentKey, 'granted'); load(); },
    hasConsent() { return localStorage.getItem(consentKey) === 'granted'; },
    trackEvent(name, parameters = {}) { if (this.hasConsent() && typeof window.gtag === 'function') window.gtag('event', name, parameters); },
    trackPageView() { this.trackEvent('page_view', { page_location: location.href, page_title: document.title }); },
    trackBooking(parameters = {}) { this.trackEvent('booking_submit', parameters); },
    trackWhatsAppClick(parameters = {}) { this.trackEvent('whatsapp_click', parameters); },
    trackPhoneClick(parameters = {}) { this.trackEvent('phone_click', parameters); },
    trackProductView(id) { this.trackEvent('view_product', { product_id: id }); },
    trackAddToCart(id, quantity) { this.trackEvent('add_to_cart', { item_id: id, quantity }); },
    trackCheckout(parameters = {}) { this.trackEvent('begin_checkout', parameters); },
    trackPurchase(parameters = {}) { this.trackEvent('purchase', parameters); }
  };
  if (window.GlamAnalytics.hasConsent()) load();
})();
