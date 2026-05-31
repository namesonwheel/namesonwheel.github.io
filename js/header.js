// Header Component
(function () {
  const headerHTML = `
  <header class="site-header" id="site-header">
    <div class="header-inner">
      <a href="/" class="logo" aria-label="Names on Wheel Home">
        <div class="logo-icon">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="18" stroke="url(#logoGrad)" stroke-width="2.5"/>
            <circle cx="19" cy="19" r="3" fill="url(#logoGrad)"/>
            <line x1="19" y1="1" x2="19" y2="8" stroke="#FF6B6B" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="19" y1="30" x2="19" y2="37" stroke="#4ECDC4" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="1" y1="19" x2="8" y2="19" stroke="#FFE66D" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="30" y1="19" x2="37" y2="19" stroke="#A8E6CF" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="4.1" y1="4.1" x2="9.2" y2="9.2" stroke="#FF8B94" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="28.8" y1="28.8" x2="33.9" y2="33.9" stroke="#B5EAD7" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="33.9" y1="4.1" x2="28.8" y2="9.2" stroke="#C7CEEA" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="9.2" y1="28.8" x2="4.1" y2="33.9" stroke="#FFDAC1" stroke-width="2.5" stroke-linecap="round"/>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#FF6B6B"/>
                <stop offset="50%" stop-color="#9B59B6"/>
                <stop offset="100%" stop-color="#4ECDC4"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="logo-text">Names On <span class="logo-accent">Wheel</span></span>
      </a>

      <nav class="main-nav" role="navigation" aria-label="Main Navigation">
        <ul>
          <li><a href="#wheel-app">Spin Wheel</a></li>
          <li><a href="#wheel-types">Wheel Types</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>

      <div class="header-cta">
        <a href="#wheel-app" class="btn-spin-now">
          <span>Spin Now</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v6l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="8" cy="10" r="5" stroke="currentColor" stroke-width="1.5"/></svg>
        </a>
      </div>

      <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="mobile-menu" id="mobile-menu">
      <ul>
        <li><a href="#wheel-app">🎡 Spin Wheel</a></li>
        <li><a href="#wheel-types">🎨 Wheel Types</a></li>
        <li><a href="#how-it-works">📖 How It Works</a></li>
        <li><a href="#features">✨ Features</a></li>
        <li><a href="#faq">❓ FAQ</a></li>
      </ul>
    </div>
  </header>`;

  const placeholder = document.getElementById('header-placeholder');
  if (placeholder) {
    placeholder.outerHTML = headerHTML;
  }

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    const header = document.getElementById('site-header');
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Hamburger toggle
  document.addEventListener('click', (e) => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;
    if (e.target.closest('#hamburger')) {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.classList.toggle('active', isOpen);
    } else if (!e.target.closest('#mobile-menu')) {
      mobileMenu.classList.remove('open');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll for nav links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('mobile-menu')?.classList.remove('open');
    }
  });
})();
