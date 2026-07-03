// Copper's Hobbies — Build Night Page — CONSOLE TEST
// Paste into DevTools console on any page. Refresh to remove.
(function () {
  'use strict';

  function isBuildNightPage() {
    return window.location.pathname === '/build-night';
  }


  // TODO: replace placeholder images with photos from this weekend's build night
  var IMGS = {
    hero  : 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAESBPhWPvS8DFDd5LppsRhYQuz4OZ0NFwT1V5axfiTjCZv8EuhCg6PScl0-MMv6Gdp4m2xtazAwsoDsYXMq8tMhIVvh172-EeCNwLESshs0j8clS96qKYxSCBRinrmfSUgeyQo=s1360-w1360-h1020',
    table : 'https://i0.wp.com/www.gunpla101.com/wp-content/uploads/2019/01/image1.jpg?resize=980%2C980&ssl=1'
  };

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-bn{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-bn *{box-sizing:border-box}',

    // Hero
    '.ch-bn-hero{position:relative;min-height:480px;display:flex;align-items:flex-end;background-size:cover;background-position:center;background-color:#2a2118}',
    '.ch-bn-hero-scrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,16,10,.82) 0%,rgba(20,16,10,.35) 55%,rgba(20,16,10,.15) 100%)}',
    '.ch-bn-hero-inner{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:0 32px 60px;width:100%}',
    '.ch-bn-hero-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9b98f;margin-bottom:14px}',
    '.ch-bn-hero-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(38px,5.5vw,66px);font-weight:500;color:#f6f1e7;margin:0 0 16px;line-height:1.1}',
    '.ch-bn-hero-meta{font-size:15px;color:#d4c9b8;margin:0;line-height:1.5}',
    '@media(max-width:720px){.ch-bn-hero-inner{padding:0 20px 44px}}',

    // About
    '.ch-bn-about{padding:72px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-bn-about-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 440px;gap:72px;align-items:center}',
    '@media(max-width:960px){.ch-bn-about-inner{grid-template-columns:1fr;gap:40px}}',
    '@media(max-width:720px){.ch-bn-about-inner{padding:0 20px}}',
    '.ch-bn-about-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:16px}',
    '.ch-bn-about-h2{font-family:"Cormorant Garamond",serif;font-size:36px;font-weight:500;color:#1f1c18;margin:0 0 24px;line-height:1.2}',
    '.ch-bn-about-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 18px}',
    '.ch-bn-about-p:last-child{margin-bottom:0}',
    '.ch-bn-about-img-wrap{border-radius:10px;overflow:hidden;aspect-ratio:1/1;background:#ede3d2}',
    '.ch-bn-about-img{width:100%;height:100%;object-fit:cover;display:block}',
    '@media(max-width:960px){.ch-bn-about-img-wrap{aspect-ratio:16/9}}',

    // Practical
    '.ch-bn-practical{padding:72px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-bn-practical-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:720px){.ch-bn-practical-inner{padding:0 20px}}',
    '.ch-bn-practical-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 40px;line-height:1.2}',
    '.ch-bn-practical-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}',
    '@media(max-width:680px){.ch-bn-practical-grid{grid-template-columns:1fr;gap:20px}}',
    '.ch-bn-card{background:#fff;border:1px solid #ece4d6;border-radius:10px;padding:28px 28px 28px 24px;border-left:3px solid #c9943a}',
    '.ch-bn-card-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#c9943a;margin:0 0 8px}',
    '.ch-bn-card-text{font-size:14.5px;color:#5e5850;line-height:1.65;margin:0}',

    // CTA
    '.ch-bn-cta{padding:72px 0;background:#fff;border-top:1px solid #ece4d6;text-align:center}',
    '.ch-bn-cta-inner{max-width:560px;margin:0 auto;padding:0 32px}',
    '@media(max-width:720px){.ch-bn-cta-inner{padding:0 20px}}',
    '.ch-bn-cta-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 14px;line-height:1.2}',
    '.ch-bn-cta-p{font-size:15px;color:#5e5850;line-height:1.65;margin:0 0 28px}',
    '.ch-bn-cta-btn{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:12px 28px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s}',
    '.ch-bn-cta-btn:hover{background:#b5832f}'
  ].join('');
  document.head.appendChild(styleEl);

  function init() {
    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
    var headerH = headerEl ? headerEl.getBoundingClientRect().height : 72;

    var container = document.createElement('div');
    container.id = 'ch-bn';

    var firstSection = main.firstElementChild;
    if (firstSection) {
      main.insertBefore(container, firstSection);
      var sib = container.nextElementSibling;
      while (sib) { sib.style.setProperty('display', 'none', 'important'); sib = sib.nextElementSibling; }
    } else {
      main.appendChild(container);
    }

    container.style.marginTop = headerH + 'px';

    main.style.minHeight = '0';
    main.style.paddingBottom = '0';
    document.querySelectorAll('.sqs-layout,.sqs-col-wid-12,.sqs-block').forEach(function(el) {
      el.style.minHeight = '0';
    });

    container.innerHTML =
      '<section class="ch-bn-hero" style="background-image:url(' + IMGS.hero + ')">' +
        '<div class="ch-bn-hero-scrim"></div>' +
        '<div class="ch-bn-hero-inner">' +
          '<span class="ch-bn-hero-eye">Every Sunday</span>' +
          '<h1 class="ch-bn-hero-h1">Community Build Night</h1>' +
          '<p class="ch-bn-hero-meta">Noon to 5 pm &nbsp;·&nbsp; Free &nbsp;·&nbsp; Drop in anytime &nbsp;·&nbsp; 935 Frederick Street</p>' +
        '</div>' +
      '</section>' +

      '<section class="ch-bn-about">' +
        '<div class="ch-bn-about-inner">' +
          '<div>' +
            '<span class="ch-bn-about-eye">What it is</span>' +
            '<h2 class="ch-bn-about-h2">A table, your kit, good company</h2>' +
            '<p class="ch-bn-about-p">Every Sunday the shop opens its back tables to anyone who wants to build. Scale models, Gunpla, miniatures, fine art — if you\'re working on something with your hands, you\'re welcome here. It started as a way for local builders to gather in one place and it\'s grown into a regular crew of regulars from all walks of life.</p>' +
            '<p class="ch-bn-about-p">Most Sundays there are six to ten people at the table, sometimes more. Skill levels run the full range — beginners sitting next to people who\'ve been building for decades, all happy to share a tip or two. Kids are welcome. There\'s no agenda, no instruction, no pressure.</p>' +
            '<p class="ch-bn-about-p">And if you\'ve got a backlog (everyone does), this is a great excuse to chip away at it.</p>' +
          '</div>' +
          '<div class="ch-bn-about-img-wrap">' +
            '<img class="ch-bn-about-img" src="' + IMGS.table + '" alt="Builders at the community table">' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-bn-practical">' +
        '<div class="ch-bn-practical-inner">' +
          '<h2 class="ch-bn-practical-h2">What to know before you show up</h2>' +
          '<div class="ch-bn-practical-grid">' +
            '<div class="ch-bn-card">' +
              '<p class="ch-bn-card-label">When</p>' +
              '<p class="ch-bn-card-text">Every Sunday, noon to 5 pm. Drop in any time — you don\'t have to stay the whole session. Most holidays are off; check the socials if you\'re unsure.</p>' +
            '</div>' +
            '<div class="ch-bn-card">' +
              '<p class="ch-bn-card-label">What to bring</p>' +
              '<p class="ch-bn-card-text">Your kit and tools. Something to drink. Snacks to share are always welcome — just keep it nut-free since you never know who\'s coming. A second project doesn\'t hurt either.</p>' +
            '</div>' +
            '<div class="ch-bn-card">' +
              '<p class="ch-bn-card-label">No kit? No problem</p>' +
              '<p class="ch-bn-card-text">The shop is open while you build, so you can pick something up off the shelf and start on it right there. Tools too, if you need them.</p>' +
            '</div>' +
            '<div class="ch-bn-card">' +
              '<p class="ch-bn-card-label">Sign up</p>' +
              '<p class="ch-bn-card-text">There isn\'t one. Just show up. The table is open to everyone — all ages, all experience levels, all subjects. We just ask that you be friendly.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-bn-cta">' +
        '<div class="ch-bn-cta-inner">' +
          '<h2 class="ch-bn-cta-h2">See you Sunday</h2>' +
          '<p class="ch-bn-cta-p">935 Frederick Street, Kitchener. Doors open at noon. No registration, no commitment — just bring something to build.</p>' +
          '<a href="/location" class="ch-bn-cta-btn">Join us</a>' +
        '</div>' +
      '</section>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
