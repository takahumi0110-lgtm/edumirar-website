import os
import re

html_files = ['index.html', 'top-team.html', 'academy.html', 'partner.html', 'contact.html']
basedir = r'c:\Users\porim\.gemini\antigravity\scratch\edumirar-website'

ticker_html = """  <!-- Header Sponsor Ticker (index.html ONLY) -->
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
"""

new_footer_html = """    <div class="container">
      <div class="footer-top-row">
        <div class="logo-area">
          <a href="index.html" style="display: flex; align-items: center; gap: 10px; color: #fff; text-decoration: none;">
            <img src="images/EDU-02.png" alt="EDUMIRAR" class="logo-icon">
            <span class="logo-text">EDUMIRAR OSAKA</span>
          </a>
        </div>
        <nav class="footer-nav">
          <a href="top-team.html">TOP TEAM</a>
          <a href="academy.html">ACADEMY</a>
          <a href="partner.html">PARTNER</a>
          <a href="contact.html">CONTACT</a>
          <a href="https://www.instagram.com/edumirar_osaka?igsh=d253eTNsYndmdXB6" target="_blank" rel="noopener noreferrer" class="sns-icon" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
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

      <div class="copyright">
        &copy; 2026 EDUMIRAR All Rights Reserved.
      </div>
    </div>"""

for file in html_files:
    path = os.path.join(basedir, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Remove SHOP from pc-nav
    content = re.sub(r'<a href="#shop">SHOP</a>\s*', '', content)
    
    # 2. Remove SHOP from mobile menu
    content = re.sub(r'<div class="mobile-menu-block" style="grid-column: span 2;">\s*<h3>SHOP</h3>\s*<ul>\s*<li><a href="#shop">オンラインショップ</a></li>\s*</ul>\s*</div>', '', content)
    
    # 3. Add Ticker to index.html ONLY
    if file == 'index.html':
        if '<div class="header-sponsor-ticker">' not in content:
            content = content.replace('  <!-- ================= HEADER (共通) ================= -->\n  <header>', ticker_html + '  <!-- ================= HEADER (共通) ================= -->\n  <header>')
    
    # 4. Replace Footer content
    # The footer is bounded by <div class="container"> and </footer> inside the <footer> tag
    content = re.sub(r'<div class="container">\s*<div class="sitemap-title">.*?</div>\s*</footer>', new_footer_html + '\n    </footer>', content, flags=re.DOTALL)
    
    # Alternatively, simply replace everything between <footer> and </footer>
    content = re.sub(r'<footer>.*?</footer>', '<footer>\n' + new_footer_html + '\n  </footer>', content, flags=re.DOTALL)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated all HTML files.")
