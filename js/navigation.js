(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('is-open', !open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('is-open'); toggle?.setAttribute('aria-expanded','false'); }));
  const header = document.querySelector('.site-header');
  const scroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  scroll(); window.addEventListener('scroll', scroll, { passive:true });
})();
