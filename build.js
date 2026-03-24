const fs = require('fs');

const academyHtml = fs.readFileSync('academy.html', 'utf8');
const headerMatch = academyHtml.match(/<!-- ================= HEADER[\s\S]*?<\/header>/)[0];
const mobileMenuMatch = academyHtml.match(/<!-- Mobile Menu Overlay -->[\s\S]*?<\/div>\s*<\/div>/)[0];
const footerMatch = academyHtml.match(/<!-- ================= FOOTER[\s\S]*?<\/footer>/)[0];

const headMatch = academyHtml.match(/<head>[\s\S]*?<\/head>/)[0].replace(/<title>.*?<\/title>/, '<title>TITLE_PLACEHOLDER</title>').replace(/<style>[\s\S]*?<\/style>/, '');

function buildHtml(title, mainContent, bodyClass='') {
    const head = headMatch.replace('TITLE_PLACEHOLDER', title);
    const bodyAttr = bodyClass ? ` class="${bodyClass}"` : '';
    return `<!DOCTYPE html>
<html lang="ja">
${head}
<body${bodyAttr}>
${headerMatch}

${mobileMenuMatch}

${mainContent}

${footerMatch}

    <script src="js/script.js"></script>
</body>
</html>`;
}

// 1. INDEX.HTML
const indexMain = `  <main class="main-content">
    <section class="hero-top" style="background-image: url('images/EDU-08.svg');">
      <div class="hero-overlay"></div>
      <h1 class="hero-title">WELCOME TO EDUMIRAR</h1>
    </section>

    <section class="top-team-intro">
      <div class="container line-heading-container">
        <h2 class="line-heading">TOP TEAM</h2>
        <div class="intro-content">
          <p class="intro-text">EDUMIRAR OSAKA って？？</p>
          <div class="video-container">
            <img src="https://placehold.co/600x350/555/fff?text=VIDEO+THUMBNAIL" alt="Team Video">
            <div class="play-btn"><i class="fa-solid fa-play"></i></div>
            <a href="top-team.html" class="btn btn-outline btn-top-team">TOP TEAMページへ &gt;</a>
          </div>
        </div>
      </div>
    </section>

    <section class="features-sec">
      <div class="container line-heading-container">
        <h2 class="line-heading">FEATURES</h2>
        <p class="feature-head">EDUMIRARの特徴</p>

        <div class="feature-grid">
          <div class="feature-item fade-in">
            <div class="feature-text">
              <div class="f-number">1</div>
              <h3>サッカー・フットサルを通して...</h3>
              <p>ここに入る説明文テキストが入ります。</p>
            </div>
            <div class="feature-img">
              <img src="https://placehold.co/400x300/e0e0e0/888?text=Feature+Image+1" alt="Feature 1">
            </div>
          </div>
          <div class="feature-item fade-in">
            <div class="feature-text">
              <div class="f-number">2</div>
              <h3>第2のフットサルチーム作り</h3>
              <p>ここに入る説明文テキストが入ります。</p>
            </div>
            <div class="feature-img">
              <img src="https://placehold.co/400x300/e0e0e0/888?text=Feature+Image+2" alt="Feature 2">
            </div>
          </div>
          <div class="feature-item fade-in">
            <div class="feature-text">
              <div class="f-number">3</div>
              <h3>全国に繋ながる可能性</h3>
              <p>ここに入る説明文テキストが入ります。</p>
            </div>
            <div class="feature-img">
              <img src="https://placehold.co/400x300/e0e0e0/888?text=Feature+Image+3" alt="Feature 3">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="family-sec">
      <div class="container line-heading-container">
        <h2 class="line-heading">FAMILY</h2>
        <div class="family-inner">
          <div class="family-links">
            <a href="top-team.html" class="family-btn">
              <img src="images/EDU-06.png" alt="logo" class="fam-logo">
              <span>TOP TEAM<br>EDUMIRAR OSAKA</span>
            </a>
            <a href="academy.html" class="family-btn">
              <img src="images/EDU-06.png" alt="logo" class="fam-logo">
              <span>ACADEMY<br>EDUMIRAR ACADEMY</span>
            </a>
            <a href="academy.html#cram" class="family-btn">
              <img src="images/EDU-06.png" alt="logo" class="fam-logo">
              <span>LEARNING<br>MIRAR CRAM SCHOOL</span>
            </a>
          </div>
          <div class="family-image">
            <img src="https://placehold.co/500x350/aaa/fff?text=Family+Photo" alt="Family Team">
          </div>
        </div>
      </div>
    </section>

    <section class="match-info-sec" style="background-image: url('images/EDU-11.png');">
      <div class="match-overlay"></div>
      <div class="match-block fade-in">
        <h2 class="match-title">NEXT MATCH</h2>
        <p class="match-league">大阪府フットサルリーグ 4部 A</p>
        <p class="match-date">2025.12.07<span>(日)</span></p>
        <div class="match-teams">
          <div class="team"><img src="images/EDU-03.png" alt="EDUMIRAR"></div>
          <div class="match-vs-info">
            <p>13:50 KICK OFF</p>
            <p class="location">＠ マグフットサルスタジアム</p>
          </div>
          <div class="team opp-team"><div class="white-box"></div></div>
        </div>
      </div>

      <div class="match-block result-block fade-in">
        <h2 class="match-title">MATCH RESULT</h2>
        <p class="match-league">大阪府フットサルリーグ 4部 A</p>
        <p class="match-date">2025.11.23<span>(日)</span></p>
        <div class="match-teams">
          <div class="team"><img src="images/EDU-03.png" alt="EDUMIRAR"></div>
          <div class="match-score"><p class="score">1-4</p></div>
          <div class="team opp-team"><div class="white-box"></div></div>
        </div>
      </div>
    </section>

    <section class="top-sponsors">
      <div class="container">
        <p class="sponsor-msg">EDUMIRAR OSAKA を応援頂いている企業様</p>
        <div class="sponsor-grid">
          <img src="https://placehold.co/150x60/000/fff?text=Sponsor1" alt="Sponsor">
          <img src="https://placehold.co/150x60/fff/000?text=Sponsor2" alt="Sponsor">
          <img src="https://placehold.co/150x60/333/fff?text=Sponsor3" alt="Sponsor">
          <img src="https://placehold.co/150x60/111/fff?text=Sponsor4" alt="Sponsor">
          <img src="https://placehold.co/150x60/eee/333?text=Sponsor5" alt="Sponsor">
        </div>
        <div style="text-align: right;">
          <a href="partner.html" class="btn btn-sm btn-white">パートナー各社様はこちら &gt;</a>
        </div>
      </div>
    </section>
  </main>`;
fs.writeFileSync('index.html', buildHtml('EDUMIRAR OFFICIAL SITE', indexMain));

// 2. CONTACT.HTML
const contactMain = `  <main class="main-content contact-page">
      <div class="container">
          <h1 class="page-title text-white">お問い合わせ</h1>
          <div class="contact-grid">
              <div class="contact-card">
                  <div class="card-inner">
                      <h2 class="card-title badge">入団・体験</h2>
                      <p class="card-desc">入団希望・練習参加のお申し込みはコチラ</p>
                      <a href="#" class="btn btn-primary btn-full">エントリーフォーム &gt;</a>
                  </div>
              </div>
              <div class="contact-card">
                  <div class="card-inner">
                      <h2 class="card-title badge">練習試合</h2>
                      <p class="card-desc">トップチーム・アカデミーの練習試合申し込みお待ちしております。</p>
                      <a href="#" class="btn btn-primary btn-full">練習試合問い合わせ &gt;</a>
                  </div>
              </div>
              <div class="contact-card">
                  <div class="card-inner">
                      <h2 class="card-title badge">パートナー各種</h2>
                      <p class="card-desc">チーム・アカデミーパートナー<br>個人出資でご支援頂ける方はこちら</p>
                      <a href="#" class="btn btn-primary btn-full">パートナー問い合わせ &gt;</a>
                  </div>
              </div>
          </div>
      </div>
  </main>`;
fs.writeFileSync('contact.html', buildHtml('EDUMIRAR | CONTACT', contactMain, 'bg-primary'));

// 3. TOP-TEAM.HTML
const topTeamMain = `  <main class="main-content top-team-page">
      <section class="team-hero" style="background-image: url('images/EDU-09.png');">
          <div class="hero-overlay-center">
              <h1>EDUMIRAR OSAKA<br>TOP TEAM</h1>
          </div>
      </section>

      <section class="ranking-sec bg-dark text-white">
          <div class="container ranking-flex">
              <div class="ranking-left">
                  <p class="ranking-label">現在順位</p>
                  <h2 class="ranking-league">大阪府フットサルリーグ 4部 A</h2>
                  <div class="ranking-position">
                      <span class="rank-num">1</span> <span class="rank-unit">位</span> <span class="rank-sub">8勝0分け(全10試合)</span>
                  </div>
              </div>
              <div class="ranking-right">
                  <a href="#" class="btn-text-red">チームを応援したい方はコチラ &gt;</a>
                  <a href="contact.html" class="btn-text-red">選手としてプレーしたい人はコチラ &gt;</a>
              </div>
          </div>
      </section>

      <section class="message-sec bg-primary text-white">
          <div class="container message-flex">
              <div class="message-left">
                  <h2>EDUは<br>応援される<br>フットサルクラブへ</h2>
                  <img src="images/EDU-04.png" alt="Owl Logo" class="msg-logo" style="max-width: 250px; height: auto;">
              </div>
              <div class="message-right">
                  <p>EDUMIRAR OSAKA(社団法人)は、現在大阪府フットサル<br>リーグ4部に所属しております。2024年に設立しFリーグで<br>プレー経験のある監督を迎え全力でトレーニングに組み<br>シーズンを戦います。</p>
                  <p>チームテーマは「応援されるチーム」<br>スポンサー様や試合を見に来てくれる方を熱狂してくれる方<br>を増やし、フットサルや地域リーグを盛り上げる。<br>応援してくださる人たちにフットサルというチームスポーツを<br>通して全力で取り組む姿を見せることで感動を与える。<br>仕事をしながらプライベートの時間を削ってフットサルをプレー<br>している社会人だからこそ伝えることのできる感動や応援を<br>応援してくれる方に発信します。</p>
              </div>
          </div>
      </section>

      <section class="schedule-sec bg-light-pink text-center">
          <div class="container">
              <h2 class="section-title text-primary" style="margin-bottom: 5px;">年間スケジュール</h2>
              <p class="text-primary" style="margin-bottom: 30px;">練習試合、イベント参加をはじめ</p>

              <div class="calendar-slider">
                  <button class="slider-arrow prev">&lt;</button>
                  <div class="slider-track-container">
                      <div class="slider-track">
                          <div class="slide-item fade-opacity"><img src="https://placehold.co/200x250/fff/ccc?text=Calc+Prev" alt="Prev Month"></div>
                          <div class="slide-item active-slide">
                              <div class="calendar-header">2025.10</div>
                              <img src="https://placehold.co/300x250/fff/333?text=Main+Calendar" alt="Current Month">
                          </div>
                          <div class="slide-item fade-opacity"><img src="https://placehold.co/200x250/fff/ccc?text=Calc+Next" alt="Next Month"></div>
                      </div>
                  </div>
                  <button class="slider-arrow next">&gt;</button>
              </div>

              <div class="mt-4">
                  <a href="contact.html" class="btn btn-primary btn-sm">練習試合・体験会申し込み ▼</a>
              </div>
          </div>
      </section>

      <section class="match-info-sec" style="background-image: url('images/EDU-11.png');">
          <div class="match-overlay"></div>
          <div class="match-block">
              <h2 class="match-title">NEXT MATCH</h2>
              <p class="match-league">大阪府フットサルリーグ 4部 A</p>
              <p class="match-date">2025.12.07<span>(日)</span></p>
              <div class="match-teams">
                  <div class="team"><img src="images/EDU-03.png" alt="EDUMIRAR"></div>
                  <p>13:50 KICK OFF</p>
                  <div class="team opp-team"><div class="white-box"></div></div>
              </div>
          </div>
          <div class="match-block result-block">
              <h2 class="match-title">MATCH RESULT</h2>
              <p class="match-league">大阪府フットサルリーグ 4部 A</p>
              <p class="match-date">2025.11.23<span>(日)</span></p>
              <div class="match-teams">
                  <div class="team"><img src="images/EDU-03.png" alt="EM"></div>
                  <p class="score">1-4</p>
                  <div class="team opp-team"><div class="white-box"></div></div>
              </div>
          </div>
      </section>

      <section class="staff-sec bg-white">
          <div class="container pb-5 pt-5">
              <div class="staff-heading bg-primary text-white"><h2>選手・スタッフ</h2></div>
              <div class="staff-grid" style="min-height: 100px;"></div>

              <div class="staff-heading bg-primary text-white mt-5"><h2>監督</h2></div>
              <div class="coach-area" style="min-height: 100px;"></div>
          </div>
      </section>
  </main>`;
fs.writeFileSync('top-team.html', buildHtml('EDUMIRAR | TOP TEAM', topTeamMain));

// 4. PARTNER.HTML
const partnerMain = `  <main class="main-content partner-page">
      <section class="partner-hero">
          <div class="container hero-split">
              <div class="hero-left text-primary">
                  <p class="hero-subtext">フットサルと地域の未来を</p>
                  <h1 class="hero-maintext">EDUMIRARと</h1>
              </div>
              <div class="hero-img-right"><img src="images/EDU-10.png" alt="Team Photo"></div>
          </div>
      </section>

      <section class="partner-logos-sec bg-primary text-white">
          <div class="container text-center">
              <h2 class="title-with-icon"><img src="https://placehold.co/30x30/fff/000?text=Owl" alt="Owl"> PARTNER</h2>
              <div class="partner-grid">
                  <img src="https://placehold.co/180x80/000/fff?text=Sponsor1" alt="p1">
                  <img src="https://placehold.co/180x80/fff/000?text=Sponsor2" alt="p2">
                  <img src="https://placehold.co/180x80/333/fff?text=Sponsor3" alt="p3">
                  <img src="https://placehold.co/180x80/111/fff?text=Sponsor4" alt="p4">
                  <img src="https://placehold.co/180x80/eee/333?text=Sponsor5" alt="p5">
                  <img src="https://placehold.co/180x80/000/fff?text=Sponsor6" alt="p6">
              </div>
              <p class="sponsor-msg">EDUMIRAR OSAKA を応援頂いている企業様</p>
              <div class="text-right mt-3">
                  <a href="#" class="btn btn-outline-white">他協賛各社様のパートナー &gt;</a>
              </div>
          </div>
      </section>

      <section class="partner-plan bg-light-pink">
          <div class="container plan-flex">
              <div class="plan-info box-red">
                  <h2>GOLD PERTNER</h2>
                  <p class="small-text">トップチーム・アカデミー（育成年代）に<br>向けての支援を頂いている各社様です。</p>
                  <p class="highlight-text">トレーニングウェア 1 組 お渡しいたします</p>
                  <div class="plan-details">
                      <p>[ 必須事項 ]<br>・トレーニングウェア・掲出<br>・バックパネル・1枠<br>・HPバナー<br>・SNS拡散</p>
                  </div>
              </div>
              <div class="plan-img"><img src="https://placehold.co/400x300/eee/333?text=Training+Wear" alt="Training Wear"></div>
          </div>
          <div class="container text-right">
              <a href="#" class="btn btn-primary-dark">パートナー 各社様 ▼</a>
          </div>
      </section>

      <section class="partner-plan bg-primary-dark-alpha">
          <div class="container plan-flex">
              <div class="plan-info box-red">
                  <h2>SILVER PERTNER</h2>
                  <p class="small-text">トップチームのみで<br>支援を頂いてる各社様です。</p>
                  <p class="highlight-text">トレーニングウェア 1 組 お渡しいたします</p>
                  <div class="plan-details">
                      <p>[ 必須事項 ]<br>・トレーニングウェア・掲出<br>・バックパネル・1枠<br>・HPバナー<br>・SNS拡散</p>
                  </div>
              </div>
              <div class="plan-img"><img src="https://placehold.co/400x300/eee/333?text=Training+Wear" alt="Training Wear"></div>
          </div>
          <div class="container text-right">
              <a href="#" class="btn btn-primary-dark">パートナー 各社様 ▼</a>
          </div>
      </section>

      <section class="partner-plan bg-light-pink">
          <div class="container plan-flex">
              <div class="plan-info box-red">
                  <h2>BRONZE PERTNER</h2>
                  <p class="small-text">トップチームのみの<br>支援を頂いてる各社様です。</p>
                  <p class="highlight-text">トレーニングウェア 1 組 お渡しいたします</p>
                  <div class="plan-details">
                      <p>[ 必須事項 ]<br>・トレーニングウェア・掲出<br>・HPバナー<br>・SNS拡散</p>
                  </div>
              </div>
              <div class="plan-img"><img src="https://placehold.co/400x300/eee/333?text=Training+Wear" alt="Training Wear"></div>
          </div>
          <div class="container text-right">
              <a href="#" class="btn btn-primary-dark">パートナー 各社様 ▼</a>
          </div>
      </section>

      <section class="personal-fund bg-primary text-white">
          <div class="container plan-flex">
              <div class="fund-info">
                  <p class="hash-tag"># 推し選手にエールを</p>
                  <h2 class="fund-title">PERSONAL FUND</h2>
              </div>
              <div class="fund-img"><img src="https://placehold.co/400x300/ccc/333?text=Fund+Image" alt="Personal Fund"></div>
          </div>
          <div class="container text-right mt-3">
              <a href="#" class="btn btn-outline-white">個人出資の各社様 ▼</a>
          </div>
      </section>

      <section class="activity-sec bg-primary-dark-alpha text-white">
          <div class="container">
              <h2 class="activity-title">・活動実績</h2>
              <div class="activity-grid mt-3">
                  <div class="act-img">
                      <img src="https://placehold.co/300x300/eee/333?text=Activity1" alt="activity">
                  </div>
              </div>
          </div>
      </section>
  </main>`;
fs.writeFileSync('partner.html', buildHtml('EDUMIRAR | PARTNER', partnerMain));
console.log('Restored all HTML files successfully.');
