// Footer Component
(function () {
  const year = new Date().getFullYear();

  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-wave">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--footer-bg)"/>
      </svg>
    </div>
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="/" class="footer-logo">
          <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="18" stroke="url(#fLogoGrad)" stroke-width="2.5"/>
            <circle cx="19" cy="19" r="3" fill="url(#fLogoGrad)"/>
            <line x1="19" y1="1" x2="19" y2="8" stroke="#FF6B6B" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="19" y1="30" x2="19" y2="37" stroke="#4ECDC4" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="1" y1="19" x2="8" y2="19" stroke="#FFE66D" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="30" y1="19" x2="37" y2="19" stroke="#A8E6CF" stroke-width="2.5" stroke-linecap="round"/>
            <defs>
              <linearGradient id="fLogoGrad" x1="0" y1="0" x2="38" y2="38">
                <stop offset="0%" stop-color="#FF6B6B"/>
                <stop offset="100%" stop-color="#4ECDC4"/>
              </linearGradient>
            </defs>
          </svg>
          <span>Names On Wheel</span>
        </a>
        <p>The most fun and colorful free name picker wheel on the internet. Spin to pick a random name instantly!</p>
        <div class="footer-tags">
          <span>Wheel of Names</span>
          <span>Name Picker</span>
          <span>Random Spinner</span>
          <span>Free Tool</span>
        </div>
      </div>

      <div class="footer-links">
        <div class="footer-col">
          <h4>Wheel Tools</h4>
          <ul>
            <li><a href="/#wheel-app">Name Picker Wheel</a></li>
            <li><a href="/#wheel-types">Team Picker Wheel</a></li>
            <li><a href="/#wheel-types">Yes/No Wheel</a></li>
            <li><a href="/#wheel-types">Custom Prize Wheel</a></li>
            <li><a href="/#wheel-types">Number Wheel</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Use Cases</h4>
          <ul>
            <li><a href="/#use-cases">Classroom Picker</a></li>
            <li><a href="/#use-cases">Team Selection</a></li>
            <li><a href="/#use-cases">Giveaway Picker</a></li>
            <li><a href="/#use-cases">Decision Maker</a></li>
            <li><a href="/#use-cases">Game Spinner</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Information</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/cookies">Cookies Policy</a></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; ${year} NamesOnWheel.github.io — Free Wheel of Names Spinner. All Rights Reserved.</p>
      <p class="footer-keywords">wheel of names · name picker wheel · random name picker · name chooser wheel · free name spinner · wheel randomizer</p>
    </div>
  </footer>`;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.outerHTML = footerHTML;
  }
})();
