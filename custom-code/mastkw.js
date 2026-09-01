(function () {
  'use strict';
  if (window.location.pathname !== '/mastkw') return;

  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#ch-mast{font-family:"Work Sans",sans-serif;color:#1f1c18;line-height:1.6}',
    '#ch-mast *{box-sizing:border-box}',

    // Hero
    '.ch-mast-hero{width:100%;line-height:0}',
    '.ch-mast-hero img{width:100%;display:block;max-height:320px;object-fit:cover;object-position:center}',

    // Date chips
    '.ch-mast-dates{background:#1a7a8c;padding:28px 32px}',
    '.ch-mast-dates-inner{max-width:1100px;margin:0 auto;display:flex;gap:12px;flex-wrap:wrap;justify-content:center}',
    '@media(max-width:600px){.ch-mast-dates{padding:24px 20px}}',
    '.ch-mast-chip{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;padding:7px 18px;font-size:13px;color:#fff;font-weight:500}',
    '.ch-mast-chip strong{color:#fff;font-weight:700}',

    // About
    '.ch-mast-about{padding:72px 0;background:#fff;border-top:4px solid #1a7a8c}',
    '.ch-mast-about-inner{max-width:1100px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1fr 400px;gap:64px;align-items:start}',
    '@media(max-width:900px){.ch-mast-about-inner{grid-template-columns:1fr;gap:40px}}',
    '@media(max-width:600px){.ch-mast-about-inner{padding:0 20px}}',
    '.ch-mast-about-eyebrow{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1a7a8c;margin:0 0 12px}',
    '.ch-mast-about-h2{font-family:"Cormorant Garamond",serif;font-size:clamp(28px,4vw,40px);font-weight:600;color:#1f1c18;margin:0 0 24px;line-height:1.2;text-wrap:balance}',
    '.ch-mast-about-p{font-size:15px;color:#5e5850;line-height:1.8;margin:0 0 16px}',
    '.ch-mast-about-p:last-of-type{margin-bottom:24px}',
    '.ch-mast-link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:#1a7a8c;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:1px}',
    '.ch-mast-link:hover{color:#135f6e}',
    '.ch-mast-gallery img{width:100%;border-radius:10px;display:block;box-shadow:0 8px 32px rgba(0,0,0,.12)}',
    '@media(max-width:900px){.ch-mast-gallery{max-width:480px;margin:0 auto}}',

    // CTA
    '.ch-mast-cta{padding:72px 0;background:#1a7a8c}',
    '.ch-mast-cta-inner{max-width:700px;margin:0 auto;padding:0 32px;text-align:center}',
    '@media(max-width:600px){.ch-mast-cta-inner{padding:0 20px}}',
    '.ch-mast-cta-h2{font-family:"Cormorant Garamond",serif;font-size:clamp(26px,4vw,36px);font-weight:600;color:#fff;margin:0 0 14px;text-wrap:balance}',
    '.ch-mast-cta-p{font-size:15px;color:rgba(255,255,255,.8);margin:0 0 32px;line-height:1.7}',
    '.ch-mast-cta-btn{display:inline-flex;align-items:center;background:#fff;color:#1a7a8c;padding:13px 32px;border-radius:6px;font-family:"Work Sans",sans-serif;font-weight:700;font-size:15px;text-decoration:none;transition:background .2s,color .2s}',
    '.ch-mast-cta-btn:hover{background:#f0fafb}'
  ].join('');
  document.head.appendChild(styleEl);

  var main = document.querySelector('main, #page, .Site-inner') || document.body;
  var headerH = (function() {
    var total = 0;
    document.querySelectorAll('.header-announcement-bar-wrapper, .sqs-announcement-bar').forEach(function(el) {
      if (el.offsetHeight > 0) total += el.offsetHeight;
    });
    return total || 72;
  })();

  var container = document.createElement('div');
  container.id = 'ch-mast';
  container.style.marginTop = headerH + 'px';

  var firstSection = main.firstElementChild;
  if (firstSection) {
    main.insertBefore(container, firstSection);
    var sib = container.nextElementSibling;
    while (sib) { sib.style.setProperty('display', 'none', 'important'); sib = sib.nextElementSibling; }
  } else {
    main.appendChild(container);
  }

  main.style.minHeight = '0';
  main.style.paddingBottom = '0';
  document.querySelectorAll('#itemPagination').forEach(function(el) {
    el.style.setProperty('display', 'none', 'important');
  });

  container.innerHTML =
    '<div class="ch-mast-hero">' +
      '<img src="https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/9cd48603-8ced-4192-8085-5255906ce4a6/MASTkw+Banner.png?content-type=image%2Fpng" alt="MASTkw — Midtown Artist Sale &amp; Tour">' +
    '</div>' +

    '<div class="ch-mast-dates">' +
      '<div class="ch-mast-dates-inner">' +
        '<span class="ch-mast-chip"><strong>Saturday Sep 26:</strong>&nbsp; 10am &ndash; 5pm</span>' +
        '<span class="ch-mast-chip"><strong>Sunday Sep 27:</strong>&nbsp; 12 noon &ndash; 4pm</span>' +
        '<span class="ch-mast-chip"><strong>Where:</strong>&nbsp; Midtown Kitchener-Waterloo</span>' +
      '</div>' +
    '</div>' +

    '<div class="ch-mast-about">' +
      '<div class="ch-mast-about-inner">' +
        '<div class="ch-mast-about-text">' +
          '<p class="ch-mast-about-eyebrow">About the tour</p>' +
          '<h2 class="ch-mast-about-h2">Almost 40 years in the community</h2>' +
          '<p class="ch-mast-about-p">The Midtown Artist Sale &amp; Tour (formerly Mary Allen Studio Tour) came from humble beginnings in 1989, when Margaret Rowell of the Historical Society hosted a walking tour of the historic neighbourhood and commented on the number of artistic people living in the area.</p>' +
          '<p class="ch-mast-about-p">While the tour has grown over the years to include homes beyond Waterloo\'s Mary Allen neighbourhood &mdash; including Avondale, Menno, and Kitchener\'s Belmont Village &mdash; the goal remains the same: to encourage neighbours to get to know the talented artists living and working here.</p>' +
          '<p class="ch-mast-about-p">Waterloo is a city full of talented people who embrace all manner of the arts: yarn, clay, beads, paint, canvas, photos, drums, found items, wood, and whatever the imagination can conjure. It is truly inspiring to visit the locations on this tour and marvel in the creativity.</p>' +
          '<a class="ch-mast-link" href="https://www.mastkw.ca/" target="_blank" rel="noopener">Explore the full tour at mastkw.ca &rarr;</a>' +
        '</div>' +
        '<div class="ch-mast-gallery">' +
          '<img src="https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/ba85e99d-b0b9-4639-9661-85ebcd4acb84/MASTkw+sample+art.png?content-type=image%2Fpng" alt="Sample artwork from MASTkw artists">' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div class="ch-mast-cta">' +
      '<div class="ch-mast-cta-inner">' +
        '<h2 class="ch-mast-cta-h2">Copper\'s Hobbies is a proud sponsor</h2>' +
        '<p class="ch-mast-cta-p">We\'re honoured to support the local arts community. If you\'re heading out on the tour this September, swing by and see us at 935 Frederick Street in Kitchener — we\'d love to see you.</p>' +
        '<a class="ch-mast-cta-btn" href="https://www.mastkw.ca/" target="_blank" rel="noopener">Visit mastkw.ca</a>' +
      '</div>' +
    '</div>';

})();
