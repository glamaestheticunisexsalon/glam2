(() => {
  const safe = value => value && !String(value).includes('[') ? value : '';
  const add = value => { const script = document.createElement('script'); script.type = 'application/ld+json'; script.textContent = JSON.stringify(value); document.head.append(script); };
  window.GlamSchema = {
    business() {
      const c = window.SITE_CONFIG || {};
      const node = { '@context':'https://schema.org', '@type':'BeautySalon', name:c.businessName, description:window.SEO_CONFIG?.description, priceRange:c.priceRange, areaServed:[safe(c.area), safe(c.city), ...(window.SEO_CONFIG?.areasServed || [])].filter(Boolean), knowsAbout:(window.GLAM_DATA?.services || []).map(x => x.name), keywords:(window.SEO_CONFIG?.keywords || []).join(', '), image:c.media?.reception || '' };
      const url = safe(c.websiteUrl), phone = safe(c.phone), email = safe(c.email), address = safe(c.address);
      if (url) node.url = url;
      if (phone) node.telephone = phone;
      if (email) node.email = email;
      if (address) node.address = { '@type':'PostalAddress', streetAddress:address, addressLocality:safe(c.city), addressRegion:safe(c.state), postalCode:safe(c.pincode), addressCountry:c.country || 'India' };
      if (c.latitude && c.longitude) node.geo = { '@type':'GeoCoordinates', latitude:c.latitude, longitude:c.longitude };
      const hours=(c.openingHours||[]).filter(row=>row.opens&&row.closes&&row.dayOfWeek).map(row=>({'@type':'OpeningHoursSpecification',dayOfWeek:row.dayOfWeek,opens:row.opens,closes:row.closes}));
      if(hours.length)node.openingHoursSpecification=hours;
      node.sameAs = Object.values(c.social || {}).map(safe).filter(Boolean);
      const services=window.GLAM_DATA?.services||[];
      if(services.length)node.hasOfferCatalog={'@type':'OfferCatalog',name:'GLAM Salon Services',itemListElement:services.map(item=>({'@type':'OfferCatalog',name:item.name,itemListElement:(item.typeGroups||[]).flatMap(g=>(g.items||[]).map(t=>({'@type':'Service',name:t.name})))}))};
      add(node);
    },
    service(item) {
      const c = window.SITE_CONFIG || {}, types = (item.typeGroups || []).flatMap(g => (g.items || []).map(t => t.name));
      const node = { '@context':'https://schema.org', '@type':'Service', name:item.name, serviceType:item.name, description:item.quickAnswer || item.description, image:item.image, keywords:(item.keywords || []).join(', '), provider:{ '@type':'BeautySalon', name:c.businessName, telephone:safe(c.phone) }, areaServed:[safe(c.area), safe(c.city)].filter(Boolean) };
      if (types.length) node.hasOfferCatalog = { '@type':'OfferCatalog', name:item.name + ' services', itemListElement:types.map(n => ({ '@type':'Offer', itemOffered:{ '@type':'Service', name:n } })) };
      if (item.price) node.offers = { '@type':'Offer', price:item.price, priceCurrency:'INR' };
      add(node);
      this.faqs(item.faqs || []);
    },
    product(item) { const price = window.GLAM_DATA?.sellingPrice ? window.GLAM_DATA.sellingPrice(item) : Number(item.price); const node = { '@context':'https://schema.org', '@type':'Product', name:item.name, description:item.description, image:item.image, brand:{ '@type':'Brand', name:item.brand } }; if (item.sku) node.sku = item.sku; if (price > 0) node.offers = { '@type':'Offer', price:String(price), priceCurrency:'INR', availability: Number(item.stock) === 0 ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock' }; add(node); },
    faqs(items) { if (items?.length) add({ '@context':'https://schema.org', '@type':'FAQPage', mainEntity:items.map(f => ({ '@type':'Question', name:f.question, acceptedAnswer:{ '@type':'Answer', text:f.answer } })) }); },
    breadcrumbs(items) { add({ '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:items.map((x,i) => ({ '@type':'ListItem', position:i+1, name:x.name, item:x.url })) }); },
    website() { const url=safe(window.SITE_CONFIG?.websiteUrl); if(url)add({'@context':'https://schema.org','@type':'WebSite',name:window.SITE_CONFIG.businessName,url}); }
  };
})();
