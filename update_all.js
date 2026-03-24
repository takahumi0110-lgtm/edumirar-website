const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'top-team.html', 'academy.html', 'partner.html', 'contact.html'];

const tickerHtml = `  <!-- Header Sponsor Ticker (index.html ONLY) -->
  <div class="header-sponsor-ticker">
    <div class="ticker-content">
      <img src="images/ラホーム.svg" alt="ラホーム">
      <img src="images/焼鳥スミス.svg" alt="焼鳥スミス">
      <img src="images/ラフテル.svg" alt="ラフテル">
      <img src="images/シャルマン研究所.svg" alt="シャルマン研究所">
      <img src="images/ネオファースト.svg" alt="ネオファースト">
      <img src="images/まさや.svg" alt="まさや">
      <img src="images/山口コスモデンタルクリニック.svg" alt="山口コスモデンタルクリニック">
      <img src="images/小原整骨院.svg" alt="小原整骨院">
      <img src="images/ゴベルナンテ.svg" alt="ゴベルナンテ">
      <!-- Duplicate for infinite scroll loop -->
      <img src="images/ラホーム.svg" alt="ラホーム">
      <img src="images/焼鳥スミス.svg" alt="焼鳥スミス">
      <img src="images/ラフテル.svg" alt="ラフテル">
      <img src="images/シャルマン研究所.svg" alt="シャルマン研究所">
      <img src="images/ネオファースト.svg" alt="ネオファースト">
      <img src="images/まさや.svg" alt="まさや">
      <img src="images/山口コスモデンタルクリニック.svg" alt="山口コスモデンタルクリニック">
      <img src="images/小原整骨院.svg" alt="小原整骨院">
      <img src="images/ゴベルナンテ.svg" alt="ゴベルナンテ">
    </div>
  </div>
`;

const newFooterHtml = `    <div class="container">
      <div class="footer-top-row">
        <div class="logo-area">
          <a href="index.html" style="display: flex; align-items: center; gap: 10px; color: #fff; text-decoration: none;">
            <img src="images/EDU-02.png" alt="EDUMIRAR" class="logo-icon" style="width: 45px; height: auto;">
            <span class="logo-text" style="font-family: var(--font-en); font-weight: 800; font-size: 1.5rem; letter-spacing: 1px;">EDUMIRAR OSAKA</span>
          </a>
        </div>
        <nav class="footer-nav">
          <a href="top-team.html">TOP TEAM</a>
          <a href="academy.html">ACADEMY</a>
          <a href="partner.html">PARTNER</a>
          <a href="contact.html">CONTACT</a>
          <a href="https://www.instagram.com/edumirar_osaka?igsh=d253eTNsYndmdXB6" target="_blank" rel="noopener noreferrer" class="sns-icon" aria-label="Instagram" style="font-size: 1.5rem;"><i class="fa-brands fa-instagram"></i></a>
        </nav>
      </div>

      <div class="footer-partners-ticker">
        <div class="ticker-content">
          <div class="footer-partner-logo"><img src="images/ラホーム.svg" alt="ラホーム"></div>
          <div class="footer-partner-logo"><img src="images/焼鳥スミス.svg" alt="焼鳥スミス"></div>
          <div class="footer-partner-logo"><img src="images/ラフテル.svg" alt="ラフテル"></div>
          <div class="footer-partner-logo"><img src="images/シャルマン研究所.svg" alt="シャルマン研究所"></div>
          <div class="footer-partner-logo"><img src="images/ネオファースト.svg" alt="ネオファースト"></div>
          <div class="footer-partner-logo"><img src="images/まさや.svg" alt="まさや"></div>
          <div class="footer-partner-logo"><img src="images/山口コスモデンタルクリニック.svg" alt="山口コスモデンタルクリニック"></div>
          <div class="footer-partner-logo"><img src="images/小原整骨院.svg" alt="小原整骨院"></div>
          <div class="footer-partner-logo"><img src="images/ゴベルナンテ.svg" alt="ゴベルナンテ"></div>
          <!-- Duplicate for infinite scroll loop -->
          <div class="footer-partner-logo"><img src="images/ラホーム.svg" alt="ラホーム"></div>
          <div class="footer-partner-logo"><img src="images/焼鳥スミス.svg" alt="焼鳥スミス"></div>
          <div class="footer-partner-logo"><img src="images/ラフテル.svg" alt="ラフテル"></div>
          <div class="footer-partner-logo"><img src="images/シャルマン研究所.svg" alt="シャルマン研究所"></div>
          <div class="footer-partner-logo"><img src="images/ネオファースト.svg" alt="ネオファースト"></div>
          <div class="footer-partner-logo"><img src="images/まさや.svg" alt="まさや"></div>
          <div class="footer-partner-logo"><img src="images/山口コスモデンタルクリニック.svg" alt="山口コスモデンタルクリニック"></div>
          <div class="footer-partner-logo"><img src="images/小原整骨院.svg" alt="小原整骨院"></div>
          <div class="footer-partner-logo"><img src="images/ゴベルナンテ.svg" alt="ゴベルナンテ"></div>
        </div>
      </div>

      <div class="copyright" style="text-align: center; margin-top: 30px; font-size: 0.8rem; opacity: 0.7;">
        &copy; 2026 EDUMIRAR All Rights Reserved.
      </div>
    </div>`;

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove SHOP from pc-nav
    content = content.replace(/<a href="#shop">SHOP<\/a>\s*/g, '');

    // 2. Remove SHOP from mobile menu
    content = content.replace(/<div class="mobile-menu-block" style="grid-column: span 2;">\s*<h3>SHOP<\/h3>\s*<ul>\s*<li><a href="#shop">オンラインショップ<\/a><\/li>\s*<\/ul>\s*<\/div>/g, '');

    // 3. Add Ticker to index.html ONLY
    if (file === 'index.html') {
        if (!content.includes('<div class="header-sponsor-ticker">')) {
            content = content.replace(/<header>/, tickerHtml + '<header>');
        }
    }

    // 4. Replace Footer content
    content = content.replace(/<footer>[\s\S]*?<\/footer>/, '<footer>\n' + newFooterHtml + '\n  </footer>');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Updated all HTML files.');
