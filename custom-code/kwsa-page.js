// Copper's Hobbies — KWSA Community Partner Page
(function () {
  'use strict';

  function isKWSAPage() {
    return window.location.pathname === '/art-classes/kwsa-kitchenerwaterloo-society-of-artists';
  }

  if (!isKWSAPage()) return;

  var LOGO = 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/0d410eaf-ca88-4978-8ee9-8a21a5a93458/kwsa_logo_horizontal.png?content-type=image%2Fpng';

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-kwsa{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-kwsa *{box-sizing:border-box}',

    // Identity header
    '.ch-kw-identity{background:#fff;border-bottom:1px solid #ece4d6;padding:52px 32px 44px;text-align:center}',
    '.ch-kw-identity-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:28px}',
    '.ch-kw-logo{max-width:460px;width:90%;height:auto;display:block;margin:0 auto}',
    '.ch-kw-tagline{font-family:"Cormorant Garamond",serif;font-size:21px;font-weight:400;font-style:italic;color:#5e5850;margin:22px 0 0}',
    '@media(max-width:600px){.ch-kw-identity{padding:40px 20px 36px}.ch-kw-tagline{font-size:18px}}',

    // About
    '.ch-kw-about{padding:72px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-kw-about-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 280px;gap:64px;align-items:start}',
    '@media(max-width:880px){.ch-kw-about-inner{grid-template-columns:1fr;gap:40px}}',
    '@media(max-width:600px){.ch-kw-about-inner{padding:0 20px}}',
    '.ch-kw-about-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:16px}',
    '.ch-kw-about-h2{font-family:"Cormorant Garamond",serif;font-size:36px;font-weight:500;color:#1f1c18;margin:0 0 24px;line-height:1.2;text-wrap:balance}',
    '.ch-kw-about-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 16px}',
    '.ch-kw-about-p:last-child{margin-bottom:0}',
    '.ch-kw-stats{display:flex;flex-direction:column;gap:14px}',
    '.ch-kw-stat{background:#fff;border:1px solid #ece4d6;border-radius:10px;padding:22px 20px;text-align:center}',
    '.ch-kw-stat-num{font-family:"Cormorant Garamond",serif;font-size:38px;font-weight:500;color:#c9943a;line-height:1;display:block;margin-bottom:5px}',
    '.ch-kw-stat-label{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#8a8273}',
    '@media(max-width:880px){.ch-kw-stats{flex-direction:row}.ch-kw-stat{flex:1}}',
    '@media(max-width:480px){.ch-kw-stats{flex-direction:column}}',

    // Shows
    '.ch-kw-shows{padding:72px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-kw-shows-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:600px){.ch-kw-shows-inner{padding:0 20px}}',
    '.ch-kw-shows-eye{display:block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9943a;margin-bottom:16px}',
    '.ch-kw-shows-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 36px;line-height:1.2}',
    '.ch-kw-show-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}',
    '@media(max-width:640px){.ch-kw-show-grid{grid-template-columns:1fr}}',
    '.ch-kw-show-card{background:#faf7f1;border:1px solid #ece4d6;border-radius:10px;padding:28px}',
    '.ch-kw-show-title{font-family:"Cormorant Garamond",serif;font-size:22px;font-weight:500;color:#1f1c18;margin:0 0 10px;line-height:1.2}',
    '.ch-kw-show-dates{font-size:12px;font-weight:700;color:#c9943a;margin:0 0 10px;text-transform:uppercase;letter-spacing:.07em}',
    '.ch-kw-show-venue{font-size:14px;color:#5e5850;line-height:1.65;margin:0}',

    // Getting involved
    '.ch-kw-involved{padding:72px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-kw-involved-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:600px){.ch-kw-involved-inner{padding:0 20px}}',
    '.ch-kw-involved-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 36px;line-height:1.2}',
    '.ch-kw-inv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}',
    '@media(max-width:780px){.ch-kw-inv-grid{grid-template-columns:1fr 1fr}}',
    '@media(max-width:480px){.ch-kw-inv-grid{grid-template-columns:1fr}}',
    '.ch-kw-inv-card{background:#fff;border:1px solid #ece4d6;border-radius:10px;padding:26px 24px;border-left:3px solid #c9943a}',
    '.ch-kw-inv-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#c9943a;margin:0 0 10px}',
    '.ch-kw-inv-h3{font-family:"Cormorant Garamond",serif;font-size:20px;font-weight:500;color:#1f1c18;margin:0 0 10px;line-height:1.2}',
    '.ch-kw-inv-p{font-size:14px;color:#5e5850;line-height:1.65;margin:0}',

    // Location + CTA
    '.ch-kw-cta{padding:72px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-kw-cta-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 320px;gap:64px;align-items:center}',
    '@media(max-width:880px){.ch-kw-cta-inner{grid-template-columns:1fr;gap:36px}}',
    '@media(max-width:600px){.ch-kw-cta-inner{padding:0 20px}}',
    '.ch-kw-cta-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 14px;line-height:1.2;text-wrap:balance}',
    '.ch-kw-cta-p{font-size:15px;color:#5e5850;line-height:1.75;margin:0 0 24px}',
    '.ch-kw-cta-btn{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:12px 28px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s}',
    '.ch-kw-cta-btn:hover{background:#b5832f}',
    '.ch-kw-loc-card{background:#faf7f1;border:1px solid #ece4d6;border-radius:10px;padding:28px;display:flex;flex-direction:column;gap:12px}',
    '.ch-kw-loc-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#c9943a;margin:0}',
    '.ch-kw-loc-name{font-family:"Cormorant Garamond",serif;font-size:19px;font-weight:500;color:#1f1c18;margin:0;line-height:1.2}',
    '.ch-kw-loc-detail{font-size:14px;color:#5e5850;line-height:1.65;margin:0}',
    '.ch-kw-loc-divider{border:none;border-top:1px solid #ece4d6;margin:0}',
    '.ch-kw-loc-note{font-size:13px;color:#8a8273;margin:0;line-height:1.55}'
  ].join('');
  document.head.appendChild(styleEl);

  function init() {
    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
    var headerH = headerEl ? headerEl.getBoundingClientRect().height : 72;

    var container = document.createElement('div');
    container.id = 'ch-kwsa';

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
    document.querySelectorAll('#itemPagination').forEach(function(el) {
      el.style.setProperty('display', 'none', 'important');
    });

    container.innerHTML =

      '<section class="ch-kw-identity">' +
        '<span class="ch-kw-identity-eye">A Copper\'s Community Partner</span>' +
        '<img class="ch-kw-logo" src="' + LOGO + '" alt="Kitchener-Waterloo Society of Artists">' +
        '<p class="ch-kw-tagline">Connecting Art, Artists &amp; Community</p>' +
      '</section>' +

      '<section class="ch-kw-about">' +
        '<div class="ch-kw-about-inner">' +
          '<div>' +
            '<span class="ch-kw-about-eye">About KWSA</span>' +
            '<h2 class="ch-kw-about-h2">The region\'s oldest and largest arts organization</h2>' +
            '<p class="ch-kw-about-p">The Kitchener-Waterloo Society of Artists is a vibrant community of 100+ artists, united by a passion for creation and connection. Established in 1931, KWSA is dedicated to bringing the creative process out of the studio and into the heart of the community.</p>' +
            '<p class="ch-kw-about-p">KWSA is for <em>all</em> visual artists — whether you are a professional, a student, or a dedicated hobbyist. No matter your background or discipline, you are welcome here.</p>' +
            '<p class="ch-kw-about-p">Their mission is to create an exciting and dynamic community where artists can connect, create, and play — through regular member meetings, collaborative projects, and shows.</p>' +
          '</div>' +
          '<div class="ch-kw-stats">' +
            '<div class="ch-kw-stat"><span class="ch-kw-stat-num">100+</span><span class="ch-kw-stat-label">Active Artists</span></div>' +
            '<div class="ch-kw-stat"><span class="ch-kw-stat-num">1931</span><span class="ch-kw-stat-label">Established</span></div>' +
            '<div class="ch-kw-stat"><span class="ch-kw-stat-num">KW</span><span class="ch-kw-stat-label">Region</span></div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-kw-shows">' +
        '<div class="ch-kw-shows-inner">' +
          '<span class="ch-kw-shows-eye">On Now</span>' +
          '<h2 class="ch-kw-shows-h2">Current Exhibitions</h2>' +
          '<div class="ch-kw-show-grid">' +
            '<div class="ch-kw-show-card">' +
              '<h3 class="ch-kw-show-title">&#8220;Florals &amp; Fauna&#8221;</h3>' +
              '<p class="ch-kw-show-dates">April 23 – August 20, 2026</p>' +
              '<p class="ch-kw-show-venue">Williams Fresh Cafe<br>170 University Ave W, Waterloo</p>' +
            '</div>' +
            '<div class="ch-kw-show-card">' +
              '<h3 class="ch-kw-show-title">&#8220;Pop of Colour&#8221;</h3>' +
              '<p class="ch-kw-show-dates">June 30 – September 8, 2026</p>' +
              '<p class="ch-kw-show-venue">Charlie West Condo Front Gallery<br>60 Charles St W, Kitchener</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-kw-involved">' +
        '<div class="ch-kw-involved-inner">' +
          '<h2 class="ch-kw-involved-h2">Getting Involved</h2>' +
          '<div class="ch-kw-inv-grid">' +
            '<div class="ch-kw-inv-card">' +
              '<p class="ch-kw-inv-label">Monthly Meetings</p>' +
              '<h3 class="ch-kw-inv-h3">First Wednesday of every month</h3>' +
              '<p class="ch-kw-inv-p">Held at 44 Gaukel Creative Workspace in downtown Kitchener. Members get updates on shows and news — plus guest speakers, demos, and a chance to connect.</p>' +
            '</div>' +
            '<div class="ch-kw-inv-card">' +
              '<p class="ch-kw-inv-label">Shows &amp; Exhibitions</p>' +
              '<h3 class="ch-kw-inv-h3">Open to all members</h3>' +
              '<p class="ch-kw-inv-p">Announced regularly and open to all members. A platform to display your work, build your CV, sell your art, and connect with art lovers across the region.</p>' +
            '</div>' +
            '<div class="ch-kw-inv-card">' +
              '<p class="ch-kw-inv-label">Workshops &amp; Learning</p>' +
              '<h3 class="ch-kw-inv-h3">Member-driven, low-cost</h3>' +
              '<p class="ch-kw-inv-p">From field trips to specialized workshops, KWSA offers low-cost ways to build new skills. Events are created by members and open to the community and beyond.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ch-kw-cta">' +
        '<div class="ch-kw-cta-inner">' +
          '<div>' +
            '<h2 class="ch-kw-cta-h2">Interested in connecting with KWSA?</h2>' +
            '<p class="ch-kw-cta-p">Whether you\'re looking to join as a member, submit to a show, or simply learn more about what KWSA does, reach out directly — they\'re a welcoming group.</p>' +
            '<a href="https://www.kwsa.ca" class="ch-kw-cta-btn" target="_blank" rel="noopener">Visit Their Website</a>' +
          '</div>' +
          '<div class="ch-kw-loc-card">' +
            '<p class="ch-kw-loc-label">Find Them</p>' +
            '<p class="ch-kw-loc-name">44 Gaukel Creative Workspace</p>' +
            '<p class="ch-kw-loc-detail">Downtown Kitchener<br>Near the Victoria Park ION Station</p>' +
            '<hr class="ch-kw-loc-divider">' +
            '<p class="ch-kw-loc-note">Free parking weekends &amp; after 5 pm on weekdays<br>(accessible from Joseph St.)</p>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
