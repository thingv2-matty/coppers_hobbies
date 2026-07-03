// Copper's Hobbies — Search Engine
(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────────────────────
  var COLLECTIONS = [
    { key: 'models',   name: 'Models & Supplies', url: '/coppers-hobbies-szOJ2' },
    { key: 'art',      name: 'Art Supplies',       url: '/art-supplies' },
    { key: 'diecasts', name: 'Diecasts',           url: '/diecasts' },
    { key: 'gaming',   name: 'Gaming',             url: '/gaming-1' },
    { key: 'toys',     name: 'Toys & Puzzles',     url: '/toys-and-puzzles' }
  ];

  var SYNONYMS = {
    'hg gundam kits' : 'HG 1/144',
    'hg gundam'      : 'HG 1/144',
    'mg gundam'      : 'MG 1/100',
    'rg gundam'      : 'RG 1/144',
    'pg gundam'      : 'PG 1/60',
    'eg gundam'      : 'Entry Grade',
    'sd gundam'      : 'SD BB',
    'gunpla'         : 'Gundam',
    'gundum'         : 'Gundam',
    'gundam kits'    : 'Gundam',
    'model kits'     : 'kit',
    'model kit'      : 'kit',
    'paint brushes'  : 'brush',
    'airbrush paint' : 'airbrush',
    'tamiya kits'    : 'Tamiya',
    'bandai kits'    : 'Bandai',
    'dnd'            : 'Dungeons',
    'd&d'            : 'Dungeons'
  };

  var KNOWN_BRANDS = [
    'Abteilung502','Academy','AFV','AFV Club','AK','AK Interactive','Albion Alloys','All Game Terrain and Woodland Scenics',
    'Alpha Abrasives','AMT','Amusing Hobby','Aoshima','Arma','Arma Hobby','Army Painter','Asuka',
    'Bandai','Bare Metal Foil','Bob Smith Industries','Border','Border Model','Bronco','Bud Nosen Wood',
    'Classy Hobby','Copper State Models','Dragon','DSPIAE',
    'Eduard','Evergreen','Excel','Flex-Pad',
    'Fujimi','Gaahleri','Gamers Grass','Gecko','Gecko Models',
    'GodHand','Gofer Racing','Good Smile Company','Great Wall Hobby','GSI Creos','Gunze',
    'Hasegawa','Heller','HiQ Parts','HK Models','Hobby Boss',
    'ICM','Italeri','Iwata',
    'K&S Metals','Kinetic','Kotare',
    'Lifecolor','Magic Factory','Many Minis','Master Box','Master Tools','Matho Models','Mathos Models',
    'Meng','MicroScale','Microscale','Milliput','MiniArt','Mission Models','Moebius','Molotow','MPC','Mr Hobby','Mr. Hobby',
    'Pit Road','Platz','Plastruct','Polar Lights',
    'Revell','Revell Germany','RFM','Roden','Ryefield Model',
    'Salvinos','Scale75','SMS','SNAA','Suyata',
    'Takom','Tamiya','Testors','Trumpeter',
    'Ultra Pro','ZM','Zoukei-Mura',
    'Ammo by MIG','Fine Molds','Minicraft','Monogram','Atlantis','Round 2',
    'Vallejo',
    'Andrea Color','Apollon','Arches','Armadillo Art','Armour Products','Art Alternatives',
    'ATI',
    'Beam Paints',
    'Canson','Citadel','Conte a Paris','Copic','COPIC',"Crafter's Companion",
    'DAS','Daler Rowney','Daler-Rowney','Derwent','Dimensions',
    'Edding',
    'FC Art','Fiskars',
    'Gamblin','Generals','Golden','Gotrick','Gotrick / Apollon','Apollon','Grafix',
    'Jack Richeson & Co.','Jacquard',
    'Linocut','Liquitex','Lyra',
    'Milliput','Molotow',
    'Pebeo','Plaid','POSCA','Prang','Princeton Artist Brush Co.','Prism Studio','Prismacolor',
    'Quilled Creations',
    'Reaper','Rosemary & Co.','Royal & Langnickel','Royal Langnickel','Royal Talens',
    'Sakura','Speedball','Staedtler','Stamperia','Strathmore',
    'Tombow',
    'Uniball',
    'Vallejo','W R Memory Keepers','Winsor & Newton','WOW',
    'Yasutomo',
    'Greenlight','Johnny Lightning',
    'Privateer Press',
    'Airfix','AMT','GSI Creos','Gunze'
  ];

  function getBrand(product) {
    var cats = product.cats || [];
    for (var i = 0; i < cats.length; i++) {
      if (KNOWN_BRANDS.indexOf(cats[i]) !== -1) return cats[i];
    }
    return null;
  }

  var SCALE_DENOMS = [6,8,9,10,12,14,16,18,20,22,24,25,32,35,43,48,50,54,56,64,72,76,87,96,
                      100,108,120,125,144,160,200,250,285,300,350,400,450,500,600,700,720,800,
                      1000,1200,1250,1700,2400,3000,3200];

  function extractScale(text) {
    if (!text) return null;
    var patterns = [
      /\b1[\/:](\d{1,4})\b/,
      /\b1\s(\d{1,4})\b/,
      /\b1[-](\d{1,4})\b/,
      /\(1\/(\d{1,4})\)/,
      /\b(\d{1,4})[:\s]?scale\b/i,
      /scale[:\s]?(\d{1,4})\b/i
    ];
    for (var i = 0; i < patterns.length; i++) {
      var m = patterns[i].exec(text);
      if (m) {
        var n = parseInt(m[1]);
        if (SCALE_DENOMS.indexOf(n) !== -1) return '1:' + n;
      }
    }
    return null;
  }

  var CACHE_KEY = 'ch_search_v4';
  var CACHE_TTL = 24 * 60 * 60 * 1000;
  var CACHE_STORE = window.sessionStorage;

  // ── State ───────────────────────────────────────────────────────────────────
  var allProducts  = [];
  var fuseInstance = null;
  var indexReady   = false;
  var flyout       = null;
  var searchInput  = null;
  var debounce     = null;
  var activeIndex  = -1;

  var filters         = { collections: {}, inStockOnly: false, brands: {}, categories: {}, scales: {}, priceMin: null, priceMax: null };
  var _filterOnChange = null;
  var sortBy          = 'default';
  var colSearch = '';
  var srPage    = 1;
  var colPage   = 1;
  var perPage   = window.innerWidth < 768 ? 12 : 24;

  // ── CSS ─────────────────────────────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '.sqs-search-ui-text-input{position:relative!important}',
    '#ch-flyout{position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:9998;background:#fff;border:1px solid #ece4d6;border-radius:0 0 8px 8px;box-shadow:0 8px 24px rgba(31,28,24,.12);max-height:440px;overflow-y:auto;display:none}',
    '#ch-flyout.on{display:block}',
    '.ch-fr{display:grid;grid-template-columns:52px 1fr auto;gap:12px;align-items:center;padding:10px 16px;border-bottom:1px solid #f5f0e8;text-decoration:none;color:inherit}',
    '.ch-fr:last-of-type{border-bottom:none}',
    '.ch-fr:hover,.ch-fr.act{background:#faf7f1}',
    '.ch-fi{width:52px;height:52px;border-radius:6px;background:#faf7f1;flex-shrink:0;background-size:cover;background-position:center}',
    '.ch-ft{font-family:"Work Sans",sans-serif;font-size:13px;color:#1f1c18;line-height:1.3}',
    '.ch-fm{font-family:"Work Sans",sans-serif;font-size:11px;color:#8a8273;margin-top:2px}',
    '.ch-fp{font-family:"Cormorant Garamond",serif;font-size:15px;font-weight:600;color:#1f1c18;white-space:nowrap}',
    '.ch-fso{color:#c9943a;font-size:10px;font-family:"Work Sans",sans-serif;letter-spacing:.04em}',
    '.ch-fall{padding:10px 16px;text-align:center;border-top:1px solid #ece4d6;font-family:"Work Sans",sans-serif;font-size:13px;color:#c9943a;cursor:pointer;display:block}',
    '.ch-fall:hover{background:#faf7f1}',
    '#ch-sr{max-width:1200px;margin:0 auto;padding:16px 8px 40px}',
    '#ch-sr h1{font-family:"Cormorant Garamond",serif;font-size:32px;font-weight:500;color:#1f1c18;margin:0 0 6px}',
    '.ch-rc{font-family:"Work Sans",sans-serif;font-size:13px;color:#8a8273;margin:0 0 24px}',
    '#ch-sl{display:grid;grid-template-columns:200px 1fr;gap:24px;align-items:start}',
    '@media(max-width:720px){#ch-sl{grid-template-columns:1fr}}',
    '#ch-sf{position:sticky;top:24px;max-height:calc(100vh - 80px);overflow-y:auto;padding-right:4px;scrollbar-width:thin}',
    '@media(max-width:720px){#ch-sf{display:none!important}}',
    '@media(max-width:720px){#ch-sl{grid-template-columns:1fr}}',
    '#ch-mobile-filter{position:fixed;bottom:0;left:0;right:0;max-height:85dvh;z-index:9990;background:#fff;border-radius:16px 16px 0 0;box-shadow:0 -4px 30px rgba(31,28,24,.15);overflow-y:auto;transform:translateY(100%);transition:transform .3s ease;pointer-events:none}',
    '#ch-mobile-filter.open{transform:translateY(0);pointer-events:all}',
    '#ch-mobile-filter #ch-sf{display:block!important;padding:20px 16px;max-height:none!important;overflow-y:visible!important}',
    '.ch-filter-scrim{display:none;position:fixed;inset:0;background:rgba(28,24,18,.45);z-index:9989}',
    '.ch-filter-scrim.open{display:block;cursor:pointer}',
    '#ch-sf-close-bar{display:none}',
    '@media(max-width:720px){#ch-sf-close-bar{display:flex;width:100%;justify-content:space-between;align-items:center;padding:0 0 16px;border-bottom:1px solid #ece4d6;margin-bottom:16px}}',
    '.ch-filter-btn{display:none}',
    '@media(max-width:720px){.ch-filter-btn{display:flex;align-items:center;gap:6px;background:none;border:1.5px solid #2c2820;color:#1f1c18;padding:7px 14px;border-radius:6px;font-family:"Work Sans",sans-serif;font-size:13px;cursor:pointer}}',
    '.ch-filter-badge{background:#c9943a;color:#fff;font-size:10px;font-weight:700;border-radius:10px;padding:1px 6px;margin-left:2px}',
    '.ch-fg-hd{cursor:pointer;display:flex;justify-content:space-between;align-items:center;user-select:none;margin:0 0 10px}',
    '.ch-fg-hd h3{margin:0}',
    '.ch-fg.collapsible .ch-fg-hd::after{content:"▴";font-size:14px;color:#8a8273;flex-shrink:0;margin-left:8px;line-height:1}',
    '.ch-fg.collapsible.collapsed .ch-fg-hd::after{content:"▾"}',
    '.ch-fg.collapsed .ch-fg-bd{display:none}',
    '.ch-fg{margin-bottom:28px}',
    '.ch-fg h3{font-family:"Work Sans",sans-serif;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#8a8273;margin:0 0 10px}',
    '.ch-fo{display:flex;align-items:flex-start;gap:8px;margin-bottom:8px;cursor:pointer;font-family:"Work Sans",sans-serif;font-size:13px;color:#1f1c18;line-height:1.4}',
    '.ch-fo input{accent-color:#c9943a;cursor:pointer;flex-shrink:0;margin-top:2px}',
    '.ch-it{display:flex;align-items:center;gap:10px;font-family:"Work Sans",sans-serif;font-size:13px;color:#1f1c18}',
    '.ch-tg{position:relative;display:inline-block;width:36px;height:20px;flex-shrink:0}',
    '.ch-tg input{opacity:0;width:0;height:0;position:absolute}',
    '.ch-ts{position:absolute;inset:0;background:#ddd;border-radius:20px;cursor:pointer;transition:.2s}',
    '.ch-tg input:checked+.ch-ts{background:#c9943a}',
    '.ch-ts:before{content:"";position:absolute;width:16px;height:16px;left:2px;bottom:2px;background:#fff;border-radius:50%;transition:.2s}',
    '.ch-tg input:checked+.ch-ts:before{transform:translateX(16px)}',
    '#ch-sg{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:20px}',
    '.ch-card{text-decoration:none;color:inherit;display:flex;flex-direction:column;border:1px solid #ece4d6;border-radius:10px;overflow:hidden;background:#fff;transition:transform .2s ease,box-shadow .2s ease}',
    '.ch-card:hover{transform:translateY(-4px);box-shadow:0 10px 28px rgba(31,28,24,.1)}',
    '.ch-oos{opacity:.55}',
    '.ch-oos:hover{opacity:.7}',
    '.ch-cw{aspect-ratio:1;overflow:hidden;background:#faf7f1;flex-shrink:0;position:relative}',
    '.ch-ci{width:100%;height:100%;background-size:cover;background-position:center}',
    '.ch-sold-ov{position:absolute;inset:0;background:rgba(250,247,241,.4);display:flex;align-items:center;justify-content:center}',
    '.ch-sold-ov span{background:rgba(31,28,24,.72);color:#faf7f1;padding:5px 12px;font-family:"Work Sans",sans-serif;font-size:10px;font-weight:500;border-radius:4px;text-transform:uppercase;letter-spacing:.08em}',
    '.ch-card-body{padding:12px;display:flex;flex-direction:column;flex:1}',
    '.ch-card-dept{font-family:"Work Sans",sans-serif;font-size:10px;color:#8a8273;text-transform:uppercase;letter-spacing:.07em;padding-bottom:9px;border-bottom:1px solid #ece4d6;margin-bottom:9px}',
    '.ch-card-info{padding-bottom:9px;border-bottom:1px solid #ece4d6;margin-bottom:9px}',
    '.ch-card-name{font-family:"Work Sans",sans-serif;font-size:13px;color:#1f1c18;line-height:1.4;height:54.6px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;margin-bottom:4px}',
    '.ch-card-brand{font-family:"Work Sans",sans-serif;font-size:11px;color:#5e5850;margin:0}',
    '.ch-card-brand b{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.06em;color:#8a8273;margin-right:4px}',
    '.ch-card-foot{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:auto}',
    '.ch-card-price{font-family:"Cormorant Garamond",serif;font-size:17px;font-weight:600;color:#1f1c18}',
    '.ch-bdg{font-family:"Work Sans",sans-serif;font-size:10px;font-weight:500;padding:3px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap}',
    '.ch-bdg-in{background:#edf5ed;color:#3d7a3d}',
    '.ch-bdg-out{background:#fdf5ec;color:#c9943a}',
    '.ch-none{text-align:center;padding:60px 20px;font-family:"Work Sans",sans-serif;color:#8a8273;grid-column:1/-1}',
    '.ch-clr{background:none;border:none;color:#c9943a;cursor:pointer;text-decoration:underline;font-family:"Work Sans",sans-serif;font-size:inherit}',
    '.ch-price-row{display:flex;align-items:center;gap:6px;margin-bottom:14px}',
    '.ch-price-box{display:flex;align-items:center;gap:2px;border:1px solid #ece4d6;border-radius:6px;padding:4px 7px;min-width:0;flex:1}',
    '.ch-price-box span{font-family:"Work Sans",sans-serif;font-size:12px;color:#8a8273;flex-shrink:0}',
    '.ch-price-box input{width:100%;border:none;outline:none;font-family:"Cormorant Garamond",serif;font-size:16px;color:#1f1c18;background:none;-moz-appearance:textfield}',
    '.ch-price-box input::-webkit-outer-spin-button,.ch-price-box input::-webkit-inner-spin-button{-webkit-appearance:none}',
    '.ch-price-dash{font-family:"Work Sans",sans-serif;font-size:13px;color:#8a8273;flex-shrink:0}',
    '.ch-range-wrap{position:relative;height:20px;margin:4px 0}',
    '.ch-range-track{position:absolute;top:50%;left:0;right:0;height:4px;background:#ece4d6;border-radius:2px;transform:translateY(-50%)}',
    '.ch-range-fill{position:absolute;top:0;height:100%;background:#c9943a;border-radius:2px}',
    '.ch-range-input{position:absolute;width:100%;height:4px;background:none;-webkit-appearance:none;appearance:none;pointer-events:none;top:50%;transform:translateY(-50%);margin:0}',
    '.ch-range-input::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#c9943a;border:2px solid #fff;box-shadow:0 1px 4px rgba(31,28,24,.2);pointer-events:all;cursor:pointer}',
    '.ch-range-input::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#c9943a;border:2px solid #fff;box-shadow:0 1px 4px rgba(31,28,24,.2);pointer-events:all;cursor:pointer;border:none}',
    '.ch-pages{display:flex;align-items:center;justify-content:center;gap:4px;padding:32px 0 8px;grid-column:1/-1;flex-wrap:wrap}',
    '.ch-pg-btn{background:none;border:1.5px solid #ece4d6;color:#5e5850;padding:6px 11px;border-radius:6px;font-family:"Work Sans",sans-serif;font-size:13px;cursor:pointer;transition:background .15s,border-color .15s;min-width:36px}',
    '.ch-pg-btn:hover:not([disabled]):not(.ch-pg-cur){border-color:#c9943a;color:#c9943a}',
    '.ch-pg-btn[disabled]{opacity:.3;cursor:not-allowed}',
    '.ch-pg-cur{background:#1f1c18!important;border-color:#1f1c18!important;color:#fff!important;font-weight:600}',
    '.ch-pg-nav{padding:6px 14px;border-color:#2c2820;color:#1f1c18}',
    '.ch-pg-ellipsis{font-family:"Work Sans",sans-serif;font-size:13px;color:#8a8273;padding:0 4px}',
    '.ch-sg-toolbar{grid-column:1/-1;display:flex;flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:8px;margin-bottom:12px}',
    '.ch-pp-row{display:flex;align-items:center;gap:8px}',
    '@media(max-width:720px){.ch-pp-row{width:100%;justify-content:flex-end}}',
    '.ch-pp-label{font-family:"Work Sans",sans-serif;font-size:12px;color:#8a8273}',
    '.ch-pp-btn{background:none;border:1px solid #ece4d6;color:#8a8273;padding:3px 9px;border-radius:4px;font-family:"Work Sans",sans-serif;font-size:12px;cursor:pointer}',
    '.ch-pp-btn.active{background:#1f1c18;border-color:#1f1c18;color:#fff}',
    '.ch-pp-btn:hover:not(.active){border-color:#c9943a;color:#c9943a}',
    '.ch-col-search{display:flex;gap:10px;margin-bottom:20px}',
    '.ch-col-search input{flex:1;border:1px solid #ece4d6;border-radius:8px;padding:10px 16px;font-family:"Work Sans",sans-serif;font-size:14px;color:#1f1c18;outline:none}',
    '.ch-col-search input:focus{border-color:#c9943a}',
    '#ch-pills{display:flex;flex-wrap:wrap;gap:6px;padding-bottom:10px;grid-column:1/-1}',
    '@media(max-width:720px){#ch-pills{display:none!important}}',
    '#ch-pills-mobile{display:none}',
    '#ch-mobile-filter #ch-pills-mobile{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;padding-bottom:14px;border-bottom:1px solid #ece4d6}',
    '#ch-mobile-filter #ch-pills-mobile:empty{display:none!important;margin:0;padding:0;border:none}',
    '.ch-pill{display:inline-flex;align-items:center;gap:4px;background:#1f1c18;color:#faf7f1;padding:4px 8px 4px 12px;border-radius:20px;font-family:"Work Sans",sans-serif;font-size:11px;font-weight:500;letter-spacing:.02em;line-height:1.3}',
    '.ch-pill-x{background:none;border:none;color:#faf7f1;cursor:pointer;font-size:14px;line-height:1;padding:0 2px;opacity:.6;flex-shrink:0;display:flex;align-items:center}',
    '.ch-pill-x:hover{opacity:1}',
    '.ch-pill-clear{background:none;border:none;font-family:"Work Sans",sans-serif;font-size:11px;color:#8a8273;cursor:pointer;padding:4px 6px;text-decoration:underline;align-self:center;flex-shrink:0}',
    '.ch-sort-label{font-family:"Work Sans",sans-serif;font-size:12px;color:#8a8273;white-space:nowrap}',
    '@media(max-width:720px){.ch-sort-label{font-size:12px;color:#8a8273}}',
    '.ch-sort-sel{font-family:"Work Sans",sans-serif;font-size:12px;color:#5e5850;border:1px solid #ece4d6;border-radius:4px;padding:3px 8px;background:#fff;cursor:pointer}',
    '@media(max-width:720px){.ch-sort-sel{border:1.5px solid #2c2820;color:#1f1c18;padding:8px 12px;border-radius:6px;font-size:13px}}'
  ].join('');
  document.head.appendChild(styleEl);

  var hpStyle = document.createElement('style');
  hpStyle.textContent = [
    // Homepage skeleton
    '#ch-home{font-family:"Work Sans",sans-serif;line-height:1}',
    // Hero
    '.ch-hp-hero{background:#faf7f1;padding:0}',
    '.ch-hp-hero-inner{max-width:1200px;margin:0 auto;padding:60px 32px;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}',
    '@media(max-width:820px){.ch-hp-hero-inner{grid-template-columns:1fr;gap:36px;padding:40px 20px}}',
    '.ch-hp-h1{font-family:"Cormorant Garamond",serif;font-size:clamp(36px,5vw,60px);font-weight:500;color:#1f1c18;line-height:1.1;margin:0 0 20px;text-wrap:balance}',
    '.ch-hp-sub{font-size:16.5px;color:#5e5850;line-height:1.65;margin:0 0 32px;max-width:460px}',
    '.ch-hp-hero-btns{display:flex;gap:12px;flex-wrap:wrap}',
    '.ch-hp-btn-primary{display:inline-flex;align-items:center;background:#c9943a;color:#fff;padding:12px 24px;border-radius:6px;font-weight:600;font-size:15px;text-decoration:none;transition:background .2s}',
    '.ch-hp-btn-primary:hover{background:#b5832e}',
    '.ch-hp-btn-outline{display:inline-flex;align-items:center;border:1.5px solid #2c2820;color:#2c2820;padding:11px 24px;border-radius:6px;font-weight:600;font-size:15px;text-decoration:none;transition:background .15s,color .15s}',
    '.ch-hp-btn-outline:hover{background:#2c2820;color:#faf7f1}',
    '.ch-hp-hero-img-wrap{position:relative;border-radius:10px;overflow:hidden;aspect-ratio:4/3;background:#f0e6d3}',
    '.ch-hp-hero-img{width:100%;height:100%;background-size:cover;background-position:center;background-color:#ede3d2}',
    '.ch-hp-hero-badge{position:absolute;bottom:20px;left:20px;background:rgba(31,28,24,.82);color:#f6f1e7;padding:12px 16px;border-radius:8px}',
    '.ch-hp-badge-addr{display:block;font-family:"Cormorant Garamond",serif;font-size:18px;font-weight:600}',
    '.ch-hp-badge-sub{display:block;font-size:11px;color:#c9b98f;margin-top:3px}',
    // Category section
    '.ch-hp-cats{padding:56px 0;background:#fff;border-top:1px solid #ece4d6;border-bottom:1px solid #ece4d6}',
    '.ch-hp-cats-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:820px){.ch-hp-cats-inner{padding:0 20px}}',
    '.ch-hp-cats-hd{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:36px}',
    '.ch-hp-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0}',
    '.ch-hp-link{font-size:13px;color:#a9772a;text-decoration:none;font-weight:500;white-space:nowrap}',
    '.ch-hp-link:hover{color:#c9943a}',
    'html{scroll-behavior:smooth}',
    '.ch-hp-cats-section{display:flex;flex-direction:column;gap:24px}',
    '.ch-hp-cats-row{display:flex;justify-content:center;flex-wrap:wrap;gap:16px 28px}',
    '.ch-hp-cat{display:flex;flex-direction:column;align-items:center;text-decoration:none;color:#39342c;gap:10px;cursor:pointer}',
    '.ch-hp-cat:hover .ch-hp-cat-circle{transform:scale(1.06);box-shadow:0 4px 18px rgba(31,28,24,.13)}',
    '.ch-hp-cat-circle{width:84px;height:84px;border-radius:50%;background:linear-gradient(135deg,#f5ede0,#e8d9c4);border:1.5px solid #e0d4bc;display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s;flex-shrink:0}',
    '.ch-hp-cat-circle svg{width:30px;height:30px}',
    '.ch-hp-cat-label{font-size:12px;font-weight:600;color:#39342c;text-align:center;line-height:1.35;max-width:80px}',
    // Featured section
    '.ch-hp-feat{padding:56px 0;background:#faf7f1}',
    '.ch-hp-feat-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:820px){.ch-hp-feat-inner{padding:0 20px}}',
    '.ch-hp-feat-hd{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:28px}',
    '.ch-hp-feat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}',
    '@media(max-width:900px){.ch-hp-feat-grid{grid-template-columns:repeat(2,1fr)}}',
    '@media(max-width:480px){.ch-hp-feat-grid{grid-template-columns:1fr}}',
    '.ch-hp-pcard{text-decoration:none;color:inherit;display:flex;flex-direction:column;border:1px solid #ece4d6;border-radius:10px;overflow:hidden;background:#fff;transition:transform .2s,box-shadow .2s}',
    '.ch-hp-pcard:hover{transform:translateY(-4px);box-shadow:0 10px 28px rgba(31,28,24,.1)}',
    '.ch-hp-pcard-img{aspect-ratio:1;background-size:cover;background-position:center;background-color:#f5f0e8}',
    '.ch-hp-pcard-body{padding:14px}',
    '.ch-hp-pcard-name{font-size:13px;color:#1f1c18;line-height:1.4;margin:0 0 8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:36px}',
    '.ch-hp-pcard-price{font-family:"Cormorant Garamond",serif;font-size:18px;font-weight:600;color:#1f1c18}',
    // Community section
    '.ch-hp-community{padding:72px 0;background:linear-gradient(180deg,#f6ecd8,#f0e4c7)}',
    '.ch-hp-comm-inner{max-width:960px;margin:0 auto;padding:0 32px}',
    '@media(max-width:820px){.ch-hp-comm-inner{padding:0 20px}}',
    '.ch-hp-comm-intro{text-align:center;margin-bottom:48px}',
    '.ch-hp-comm-h2{font-family:"Cormorant Garamond",serif;font-size:clamp(30px,4.5vw,44px);font-weight:500;color:#1f1c18;margin:0 0 18px;text-wrap:balance;line-height:1.15}',
    '.ch-hp-comm-sub{font-size:16px;color:#6a5f49;line-height:1.65;margin:0 auto;max-width:560px}',
    '.ch-hp-comm-cards{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '@media(max-width:640px){.ch-hp-comm-cards{grid-template-columns:1fr}}',
    '.ch-hp-comm-card{background:#fff;border-radius:12px;border:1px solid #ecdcc0;overflow:hidden}',
    '.ch-hp-comm-card-img{height:200px;background-size:cover;background-position:center;background-color:#ede3d2}',
    '.ch-hp-comm-card-body{padding:24px}',
    '.ch-hp-comm-badge{display:inline-block;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.02em;margin-bottom:14px}',
    '.ch-hp-comm-badge-gold{background:#c9943a;color:#fff}',
    '.ch-hp-comm-badge-cream{background:#f0e7d6;border:1px solid #e2d4ba;color:#39342c}',
    '.ch-hp-comm-card-h3{font-family:"Cormorant Garamond",serif;font-size:27px;font-weight:600;color:#1f1c18;margin:0 0 12px;line-height:1.2}',
    '.ch-hp-comm-card-p{font-size:14.5px;color:#5e5850;line-height:1.65;margin:0 0 16px}',
    '.ch-hp-comm-card-link{font-size:14px;color:#a9772a;font-weight:600;text-decoration:none}',
    '.ch-hp-comm-card-link:hover{color:#c9943a}',
    // Brands bar
    '.ch-hp-brands{padding:48px 0;background:#fff;border-top:1px solid #ece4d6}',
    '.ch-hp-brands-inner{max-width:1100px;margin:0 auto;padding:0 32px}',
    '@media(max-width:820px){.ch-hp-brands-inner{padding:0 20px}}',
    '.ch-hp-brands-hd{display:flex;justify-content:flex-start;align-items:baseline;margin-bottom:28px}',
    '.ch-hp-brands-row{display:grid;grid-template-columns:repeat(8,1fr);align-items:center}',
    '.ch-hp-brand-logo-wrap{display:flex;align-items:center;justify-content:center;padding:10px 6px;border-right:1px solid #e8e0d4}',
    '.ch-hp-brand-logo-wrap:last-child{border-right:none}',
    '.ch-hp-brand-logo{height:72px;max-width:100%;object-fit:contain;display:block}',
    '@media(max-width:720px){.ch-hp-brands-row{grid-template-columns:repeat(2,1fr);gap:8px}.ch-hp-brand-logo-wrap{border-right:none;border-bottom:1px solid #e8e0d4;padding:12px 8px}.ch-hp-brand-logo-wrap:nth-child(7),.ch-hp-brand-logo-wrap:nth-child(8){border-bottom:none}}',
    // Friends & Cohorts
    '.ch-hp-friends{padding:44px 0;background:#faf7f1;border-top:1px solid #ece4d6;text-align:center}',
    '.ch-hp-friends-inner{max-width:900px;margin:0 auto;padding:0 32px}',
    '@media(max-width:820px){.ch-hp-friends-inner{padding:0 20px}}',
    '.ch-hp-friends-label{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;font-style:italic;color:#1f1c18;margin:0 0 10px}',
    '.ch-hp-friends-sub{font-family:"Work Sans",sans-serif;font-size:15px;color:#8a8273;margin:0 0 28px}',
    '.ch-hp-friends-row{display:flex;flex-wrap:wrap;justify-content:center;gap:20px}',
    '.ch-hp-friend{text-decoration:none;display:flex;flex-direction:column;align-items:center;gap:8px;width:170px}',
    '.ch-hp-friend-img-wrap{width:170px;height:118px;background:#fff;border:1px solid #ece4d6;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:8px;box-sizing:border-box}',
    '.ch-hp-friend-img{max-width:100%;max-height:100%;object-fit:contain;display:block}',
    '.ch-hp-friend-name{font-family:"Work Sans",sans-serif;font-size:13px;font-weight:600;color:#5e5850;text-align:center;line-height:1.3}',
    '.ch-hp-friend:hover .ch-hp-friend-img-wrap{border-color:#c9943a}',
    '@media(max-width:720px){.ch-hp-friends-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}.ch-hp-friend{width:auto}.ch-hp-friend-img-wrap{width:100%;height:90px}}',
    // Store info section
    '.ch-hp-store{padding:60px 0;background:#faf7f1;border-top:1px solid #ece4d6}',
    '.ch-hp-store-inner{max-width:900px;margin:0 auto;padding:0 32px}',
    '@media(max-width:820px){.ch-hp-store-inner{padding:0 20px}}',
    '.ch-hp-map-wrap{height:280px;border-radius:10px;overflow:hidden;border:1px solid #ece4d6;margin-bottom:32px}',
    '.ch-hp-map-wrap iframe{width:100%;height:100%;display:block;border:none}',
    '.ch-hp-store-h2{font-family:"Cormorant Garamond",serif;font-size:34px;font-weight:500;color:#1f1c18;margin:0 0 14px}',
    '.ch-hp-store-p{font-size:15px;color:#5e5850;line-height:1.65;margin:0}',
    '.ch-hp-store-details{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:28px;padding-top:28px;border-top:1px solid #ece4d6}',
    '@media(max-width:600px){.ch-hp-store-details{grid-template-columns:1fr}}',
    '.ch-hp-store-label{font-size:12px;font-weight:600;color:#a9772a;text-transform:uppercase;letter-spacing:.1em;margin:0 0 8px}',
    '.ch-hp-store-hours{font-size:14.5px;color:#1f1c18;line-height:1.9;margin:0;font-variant-numeric:tabular-nums}',
    '.ch-hp-store-addr{font-size:14.5px;color:#1f1c18;line-height:1.9;margin:0}',
    '.ch-hp-store-dir{display:inline-block;margin-top:12px;font-family:"Work Sans",sans-serif;font-size:13px;font-weight:600;color:#a9772a;text-decoration:none}',
    '.ch-hp-store-dir:hover{color:#c9943a}'
  ].join('');
  document.head.appendChild(hpStyle);

  // ── Status bar (no-op in production) ────────────────────────────────────────
  function showStatus(msg) {}
  function hideStatus() {}

  // ── Fuse.js loader ──────────────────────────────────────────────────────────
  function loadFuse(cb) {
    if (window.Fuse) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  // ── Index builder ───────────────────────────────────────────────────────────
  function extractItems(data, col) {
    var catMap = {};
    var nested = data.nestedCategories;
    if (nested && nested.categories) {
      nested.categories.forEach(function(c) { catMap[c.id] = c.displayName; });
    }
    return (data.items || []).map(function(item) {
      var v     = item.variants && item.variants[0];
      var stock = !item.variants || !item.variants.length || item.variants.some(function(variant) {
        return variant.unlimited || (variant.qtyInStock > 0);
      });
      var topPrice = item.priceMoney && parseFloat(item.priceMoney.value) > 0 ? item.priceMoney.value : null;
      var varPrice = v && v.priceMoney && parseFloat(v.priceMoney.value) > 0 ? v.priceMoney.value : null;
      var varCents = v && v.price > 0 ? (v.price / 100).toFixed(2) : null;
      var price = topPrice || varPrice || varCents || '0.00';
      var title = item.title || '';
      return {
        id   : item.id,
        t    : title,
        u    : item.fullUrl || '',
        img  : item.assetUrl || '',
        p    : price,
        s    : stock,
        c    : col.key,
        cn   : col.name,
        cats : (item.categoryIds || []).map(function(id) { return catMap[id]; }).filter(Boolean),
        scale: extractScale(title)
      };
    });
  }

  function fetchPage(url, offset) {
    return fetch(url + '?format=json' + (offset ? '&offset=' + offset : ''), { credentials: 'same-origin' })
      .then(function(r) { return r.ok ? r.json() : Promise.reject(r.status); });
  }

  function fetchCollection(col) {
    var products = [];
    function next(offset) {
      return fetchPage(col.url, offset).then(function(data) {
        products = products.concat(extractItems(data, col));
        showStatus('Indexing ' + col.name + '… (' + products.length + ' products)');
        if (data.pagination && data.pagination.nextPage) {
          return next(data.pagination.nextPageOffset);
        }
        return products;
      });
    }
    return next(0);
  }

  function buildIndex() {
    var cacheLoaded = false;
    try {
      var raw = CACHE_STORE.getItem(CACHE_KEY);
      if (raw) {
        var cached = JSON.parse(raw);
        if (Date.now() - cached.ts < CACHE_TTL && cached.products && cached.products.length > 0) {
          allProducts  = cached.products;
          fuseInstance = makeFuse(allProducts);
          indexReady   = true;
          cacheLoaded  = true;
        }
      }
    } catch(e) {}

    if (cacheLoaded) {
      if (isSearchPage()) renderSearchResults();
      if (isCollectionPage()) renderCollectionPage();
      if (isShopAllPage()) renderShopAll();
      return Promise.resolve();
    }

    ['ch_search_v1', 'ch_search_v2'].forEach(function(k) { try { localStorage.removeItem(k); } catch(e) {} });

    var promises = COLLECTIONS.map(function(col) {
      return fetchCollection(col).then(function(products) {
        allProducts  = allProducts.concat(products);
        fuseInstance = makeFuse(allProducts);
        indexReady   = true;
        if (searchInput && searchInput.value.trim() && flyout && flyout.classList.contains('on')) {
          refreshFlyout(searchInput.value);
        }
        if (isSearchPage() && getQuery() && document.getElementById('ch-sr')) renderSearchResults();
        if (isCollectionPage() && document.getElementById('ch-col')) renderCollectionPage();
      });
    });

    return Promise.all(promises)
      .then(function() {
        fuseInstance = makeFuse(allProducts);
        hideStatus();
        try {
          CACHE_STORE.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), products: allProducts }));
        } catch(e) {}
        if (isSearchPage()) renderSearchResults();
        if (isCollectionPage()) renderCollectionPage();
        if (isShopAllPage()) renderShopAll();
      })
      .catch(function(err) { hideStatus(); console.error('[CH Search] Build failed:', err); });
  }

  function makeFuse(products) {
    return new Fuse(products, {
      keys          : [{ name: 't', weight: 3 }, { name: 'cats', weight: 1 }],
      threshold     : 0.3,
      includeScore  : true,
      minMatchCharLength: 2,
      ignoreLocation: true
    });
  }

  // ── Search ──────────────────────────────────────────────────────────────────
  function runSearch(query, limit) {
    if (!fuseInstance || !query.trim()) return [];
    var q = query.toLowerCase().trim();
    Object.keys(SYNONYMS).forEach(function(k) {
      if (q.indexOf(k) !== -1) q = q.replace(k, SYNONYMS[k]);
    });
    var results = fuseInstance.search(q, { limit: limit || 200 });
    results.sort(function(a, b) {
      if (a.item.s && !b.item.s) return -1;
      if (!a.item.s && b.item.s) return 1;
      return (a.score || 0) - (b.score || 0);
    });
    return results.map(function(r) { return r.item; });
  }

  // ── Flyout ──────────────────────────────────────────────────────────────────
  function initFlyout() {
    searchInput = document.querySelector('input.search-input');
    if (!searchInput) return;

    var sqPre = document.querySelector('.sqs-search-preview-ui');
    if (sqPre) sqPre.style.setProperty('display', 'none', 'important');

    flyout = document.createElement('div');
    flyout.id = 'ch-flyout';
    var anchor = searchInput.closest('.sqs-search-ui-text-input') || searchInput.parentNode;
    anchor.appendChild(flyout);

    searchInput.addEventListener('input', function() {
      clearTimeout(debounce);
      debounce = setTimeout(function() { refreshFlyout(searchInput.value); }, 220);
    });

    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveCursor(1); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); moveCursor(-1); }
      if (e.key === 'Escape')    { closeFlyout(); }
      if (e.key === 'Enter')     { onEnter(e); }
    });

    flyout.addEventListener('mousedown', function(e) { e.preventDefault(); });
    flyout.addEventListener('click', function(e) {
      var link = e.target.closest('a.ch-fr');
      if (link) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = link.href;
      }
    });

    document.addEventListener('click', function(e) {
      if (flyout && !flyout.contains(e.target) && e.target !== searchInput) closeFlyout();
    });
  }

  function refreshFlyout(query) {
    if (!query.trim()) { closeFlyout(); return; }
    if (!indexReady) {
      flyout.innerHTML = '<span class="ch-fall" style="cursor:default;color:#8a8273">Building index, please wait…</span>';
      flyout.classList.add('on');
      return;
    }
    var results = runSearch(query, 5);
    activeIndex = -1;
    if (!results.length) {
      flyout.innerHTML = '<span class="ch-fall" style="cursor:default;color:#8a8273">No results for "' + esc(query) + '"</span>';
      flyout.classList.add('on');
      return;
    }
    flyout.innerHTML = results.map(function(p) {
      var sold = !p.s ? ' <span class="ch-fso">· Sold Out</span>' : '';
      return '<a class="ch-fr" href="' + p.u + '">' +
        '<div class="ch-fi"' + (p.img ? ' style="background-image:url(' + p.img + ')"' : '') + '></div>' +
        '<div><div class="ch-ft">' + esc(p.t) + '</div><div class="ch-fm">' + esc(p.cn) + sold + '</div></div>' +
        '<div class="ch-fp">$' + esc(String(p.p)) + '</div>' +
      '</a>';
    }).join('') +
    '<a class="ch-fall" href="/search?q=' + encodeURIComponent(query) + '">See all results for "' + esc(query) + '" →</a>';
    flyout.classList.add('on');
  }

  function moveCursor(dir) {
    var items = flyout.querySelectorAll('.ch-fr');
    if (!items.length) return;
    if (activeIndex >= 0) items[activeIndex].classList.remove('act');
    activeIndex = Math.max(-1, Math.min(items.length - 1, activeIndex + dir));
    if (activeIndex >= 0) items[activeIndex].classList.add('act');
  }

  function onEnter(e) {
    var items = flyout ? flyout.querySelectorAll('.ch-fr') : [];
    if (activeIndex >= 0 && items[activeIndex]) {
      e.preventDefault();
      window.location.href = items[activeIndex].href;
    }
  }

  function closeFlyout() {
    if (flyout) flyout.classList.remove('on');
    activeIndex = -1;
  }

  // ── Search results page ─────────────────────────────────────────────────────
  function isSearchPage() { return window.location.pathname === '/search'; }

  function getQuery() { return new URLSearchParams(window.location.search).get('q') || ''; }

  function initSearchPage() {
    if (!isSearchPage()) return;
    _srLastQuery = ''; _srSidebarBuilt = false;
    if (searchInput) searchInput.value = getQuery();

    var container = document.createElement('div');
    container.id = 'ch-sr';
    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var firstSection = main.firstElementChild;
    if (firstSection) {
      main.insertBefore(container, firstSection);
    } else {
      main.appendChild(container);
    }

    var sib = container.nextElementSibling;
    while (sib) { sib.style.setProperty('display', 'none', 'important'); sib = sib.nextElementSibling; }

    ['.sqs-search-page-output', '.sqs-search-page-more-wrapper',
     '[data-controller="SearchResultsController"]', '.search-results-inner',
     '.search-collection', '.search-results', '[class*="search-results"]'].forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) {
        el.style.setProperty('display', 'none', 'important');
      });
    });

    if (indexReady) {
      renderSearchResults();
    } else {
      container.innerHTML = '<p style="text-align:center;padding:60px;font-family:\'Work Sans\',sans-serif;color:#8a8273">Building search index…</p>';
    }
  }

  var _srLastQuery = '';
  var _srSidebarBuilt = false;

  function renderSearchResults() {
    var container = document.getElementById('ch-sr');
    if (!container) return;
    var q = getQuery();
    if (!q.trim()) {
      container.innerHTML = '<h1>Search</h1><p class="ch-rc">Enter a term above to search across all departments.</p>';
      return;
    }
    if (q !== _srLastQuery) { _srLastQuery = q; container.innerHTML = ''; srPage = 1; _srSidebarBuilt = false; }

    var all      = runSearch(q, 300);
    var pr       = getPriceRange(all);
    var brands   = getUniqueBrands(all);
    var cats     = getUniqueNonBrandCats(all);
    var scales   = getUniqueScales(all);
    var isMobile = window.innerWidth < 768;

    var hasRealData = all.length > 0 && (brands.length > 0 || cats.length > 0 || pr.max > 0);

    if (!_srSidebarBuilt && hasRealData) {
      _srSidebarBuilt = true;
      var filtered = applyFilters(all);
      var countTxt = filtered.length + ' result' + (filtered.length !== 1 ? 's' : '');
      if (all.length !== filtered.length) countTxt += ' (filtered from ' + all.length + ')';
      container.innerHTML =
        '<h1>Results for "' + esc(q) + '"</h1>' +
        '<p class="ch-rc" id="ch-sr-count">' + countTxt + '</p>' +
        '<div id="ch-sl">' +
          renderSidebar({ brands: brands, cats: cats, scales: scales, priceRange: pr, showDept: true, activeCols: getActiveCollectionKeys(all) }) +
          '<div id="ch-sg"></div>' +
        '</div>';
      wireFilters(container, pr, function() { srPage = 1; refreshSRGrid(all, pr, isMobile); });
      refreshSRGrid(all, pr, isMobile);
    } else if (_srSidebarBuilt) {
      refreshSRGrid(all, pr, isMobile);
    } else {
      container.innerHTML = '<p style="text-align:center;padding:60px;font-family:\'Work Sans\',sans-serif;color:#8a8273">Building search index…</p>';
    }

    function refreshSRGrid(allItems, priceRange, mob) {
      var filt   = applyFilters(allItems);
      var sorted = applySort(filt);
      var tp = Math.ceil(sorted.length / perPage);
      if (srPage > tp) srPage = 1;
      var pg = sorted.slice((srPage - 1) * perPage, srPage * perPage);
      var cnt = sorted.length + ' result' + (sorted.length !== 1 ? 's' : '');
      if (allItems.length !== sorted.length) cnt += ' (filtered from ' + allItems.length + ')';
      var countEl = document.getElementById('ch-sr-count');
      if (countEl) countEl.textContent = cnt;
      var sg = document.getElementById('ch-sg');
      if (sg) sg.innerHTML = renderPerPage(mob) + renderCards(pg) + renderPagination(sorted.length, srPage);
      wirePillButtons(function() { srPage = 1; refreshSRGrid(allItems, priceRange, mob); });
      wireSortSelect(function() { srPage = 1; refreshSRGrid(allItems, priceRange, mob); });
      wirePerPage(container, function() { srPage = 1; refreshSRGrid(allItems, priceRange, mob); });
      wirePagination(container, 'ch-sr', function(p) { srPage = p; refreshSRGrid(allItems, priceRange, mob); });
      wireMobileFilterPanel(container);
    }
  }

  function applyFilters(products) {
    var activeCols   = Object.keys(filters.collections).filter(function(k) { return filters.collections[k]; });
    var activeBrands = Object.keys(filters.brands).filter(function(k) { return filters.brands[k]; });
    var activeCats   = Object.keys(filters.categories).filter(function(k) { return filters.categories[k]; });
    var activeScales = Object.keys(filters.scales).filter(function(k) { return filters.scales[k]; });
    return products.filter(function(p) {
      if (filters.inStockOnly && !p.s) return false;
      if (activeCols.length && activeCols.indexOf(p.c) === -1) return false;
      if (activeBrands.length && !activeBrands.some(function(b) { return (p.cats||[]).indexOf(b) !== -1; })) return false;
      if (activeCats.length && !activeCats.some(function(c) { return (p.cats||[]).indexOf(c) !== -1; })) return false;
      if (activeScales.length && activeScales.indexOf(p.scale || '') === -1) return false;
      if (filters.priceMin !== null && (parseFloat(p.p) || 0) < filters.priceMin) return false;
      if (filters.priceMax !== null && (parseFloat(p.p) || 0) > filters.priceMax) return false;
      return true;
    });
  }

  function applySort(products) {
    if (sortBy === 'default') return products;
    var s = products.slice();
    switch (sortBy) {
      case 'price-asc':  s.sort(function(a,b){ return (parseFloat(a.p)||0)-(parseFloat(b.p)||0); }); break;
      case 'price-desc': s.sort(function(a,b){ return (parseFloat(b.p)||0)-(parseFloat(a.p)||0); }); break;
      case 'name-asc':   s.sort(function(a,b){ return a.t.localeCompare(b.t); }); break;
      case 'name-desc':  s.sort(function(a,b){ return b.t.localeCompare(a.t); }); break;
      case 'brand-asc':  s.sort(function(a,b){ return (getBrand(a)||'').localeCompare(getBrand(b)||''); }); break;
      case 'brand-desc': s.sort(function(a,b){ return (getBrand(b)||'').localeCompare(getBrand(a)||''); }); break;
    }
    return s;
  }

  function getUniqueBrands(products) {
    var seen = {}, brands = [];
    products.forEach(function(p) {
      (p.cats||[]).forEach(function(c) {
        if (KNOWN_BRANDS.indexOf(c) !== -1 && !seen[c]) { seen[c] = true; brands.push(c); }
      });
    });
    return brands.sort();
  }

  function getUniqueNonBrandCats(products) {
    var seen = {}, cats = [];
    products.forEach(function(p) {
      (p.cats||[]).forEach(function(c) {
        if (c && KNOWN_BRANDS.indexOf(c) === -1 && !seen[c]) { seen[c] = true; cats.push(c); }
      });
    });
    return cats.sort();
  }

  function getUniqueScales(products) {
    var seen = {}, scales = [];
    products.forEach(function(p) {
      if (p.scale && p.c !== 'art' && !seen[p.scale]) { seen[p.scale] = true; scales.push(p.scale); }
    });
    return scales.sort(function(a, b) { return parseInt(a.slice(2)) - parseInt(b.slice(2)); });
  }

  function getActiveCollectionKeys(products) {
    var seen = {};
    products.forEach(function(p) { seen[p.c] = true; });
    return seen;
  }

  function getPriceRange(products) {
    var min = Infinity, max = 0;
    products.forEach(function(p) {
      var price = parseFloat(p.p) || 0;
      if (price > 0) { if (price < min) min = price; if (price > max) max = price; }
    });
    return { min: min === Infinity ? 0 : Math.floor(min), max: Math.ceil(max) };
  }

  function renderSidebar(opts) {
    var brands = opts.brands || [];
    var cats   = opts.cats   || [];
    var scales = opts.scales || [];
    var pr     = opts.priceRange || { min: 0, max: 500 };

    function checklist(items, cls, activeMap) {
      if (!items.length) return '';
      return '<div>' +
        items.map(function(v) {
          return '<label class="ch-fo"><input type="checkbox" class="' + cls + '" value="' + esc(v) + '"' + (activeMap[v] ? ' checked' : '') + '> ' + esc(v) + '</label>';
        }).join('') + '</div>';
    }

    function section(label, content) {
      return '<div class="ch-fg collapsible collapsed"><div class="ch-fg-hd"><h3>' + label + '</h3></div><div class="ch-fg-bd">' + content + '</div></div>';
    }

    var priceSection = pr.max > 0
      ? '<div class="ch-fg"><div class="ch-fg-hd" style="cursor:default"><h3 style="flex:1">Price</h3></div><div class="ch-fg-bd">' +
          '<div class="ch-price-row">' +
            '<div class="ch-price-box"><span>$</span><input type="number" id="ch-price-min" min="' + pr.min + '" max="' + pr.max + '" step="1" placeholder="' + pr.min + '" value="' + (filters.priceMin !== null ? filters.priceMin : pr.min) + '"></div>' +
            '<span class="ch-price-dash">—</span>' +
            '<div class="ch-price-box"><span>$</span><input type="number" id="ch-price-max" min="' + pr.min + '" max="' + pr.max + '" step="1" placeholder="' + pr.max + '" value="' + (filters.priceMax !== null ? filters.priceMax : pr.max) + '"></div>' +
          '</div>' +
          '<div class="ch-range-wrap"><div class="ch-range-track"><div class="ch-range-fill" id="ch-slider-fill"></div></div>' +
            '<input type="range" class="ch-range-input" id="ch-range-min" min="' + pr.min + '" max="' + pr.max + '" step="1" value="' + (filters.priceMin !== null ? filters.priceMin : pr.min) + '">' +
            '<input type="range" class="ch-range-input" id="ch-range-max" min="' + pr.min + '" max="' + pr.max + '" step="1" value="' + (filters.priceMax !== null ? filters.priceMax : pr.max) + '">' +
          '</div></div></div>'
      : '';

    return '<div id="ch-sf">' +
      '<div class="ch-sf-close" id="ch-sf-close-bar"><button id="ch-sf-close" style="background:none;border:none;font-family:\'Work Sans\',sans-serif;font-size:14px;font-weight:600;color:#1f1c18;cursor:pointer;padding:0">Filters ×</button><button class="ch-clr" style="font-size:11px;padding:0">Clear all</button></div>' +
      '<div id="ch-pills-mobile"></div>' +
      '<div class="ch-fg"><div class="ch-fg-hd" style="cursor:default"><h3 style="flex:1">Availability</h3></div><div class="ch-fg-bd">' +
      '<label class="ch-it"><label class="ch-tg"><input type="checkbox" id="ch-instock"' + (filters.inStockOnly ? ' checked' : '') + '><span class="ch-ts"></span></label> In stock only</label>' +
      '</div></div>' +
      priceSection +
      (opts.showDept ? section('Department', COLLECTIONS.filter(function(col) {
          return !opts.activeCols || opts.activeCols[col.key];
        }).map(function(col) {
          return '<label class="ch-fo"><input type="checkbox" class="fc-col" value="' + col.key + '"' + (filters.collections[col.key] ? ' checked' : '') + '> ' + esc(col.name) + '</label>';
        }).join('')) : '') +
      (brands.length ? section('Brand', checklist(brands, 'fc-brand', filters.brands)) : '') +
      (cats.length ? section('Category', checklist(cats, 'fc-cat', filters.categories)) : '') +
      (scales.length ? section('Scale', checklist(scales, 'fc-scale', filters.scales)) : '') +
    '</div>';
  }

  function wireFilters(container, priceRange, onFilterChange) {
    function syncPills() {
      var mobileEl = document.getElementById('ch-pills-mobile');
      if (mobileEl) {
        mobileEl.innerHTML = renderFilterPills(false);
        wirePillButtons(onFilterChange, mobileEl);
      }
    }
    function onChange() { onFilterChange(); syncPills(); }
    _filterOnChange = onChange;

    var instockCb = container.querySelector('#ch-instock');
    if (instockCb) instockCb.addEventListener('change', function() { filters.inStockOnly = this.checked; onChange(); });

    container.querySelectorAll('.fc-col').forEach(function(cb) {
      cb.addEventListener('change', function() { filters.collections[cb.value] = cb.checked; onChange(); });
    });
    container.querySelectorAll('.fc-brand').forEach(function(cb) {
      cb.addEventListener('change', function() { filters.brands[cb.value] = cb.checked; onChange(); });
    });
    container.querySelectorAll('.fc-cat').forEach(function(cb) {
      cb.addEventListener('change', function() { filters.categories[cb.value] = cb.checked; onChange(); });
    });
    container.querySelectorAll('.fc-scale').forEach(function(cb) {
      cb.addEventListener('change', function() { filters.scales[cb.value] = cb.checked; onChange(); });
    });
    container.querySelectorAll('.ch-clr').forEach(function(btn) {
      btn.addEventListener('click', function() {
        filters = { collections: {}, inStockOnly: false, brands: {}, categories: {}, scales: {}, priceMin: null, priceMax: null };
        onChange();
      });
    });
    container.querySelectorAll('.ch-fg.collapsible .ch-fg-hd').forEach(function(hd) {
      hd.addEventListener('click', function() { hd.parentElement.classList.toggle('collapsed'); });
    });

    var rangeMin = container.querySelector('#ch-range-min');
    var rangeMax = container.querySelector('#ch-range-max');
    var inputMin = container.querySelector('#ch-price-min');
    var inputMax = container.querySelector('#ch-price-max');
    var fill     = container.querySelector('#ch-slider-fill');
    if (!rangeMin || !rangeMax || !priceRange) return;

    var absMin = priceRange.min, absMax = priceRange.max;
    function updateFill() {
      var lo = ((parseFloat(rangeMin.value) - absMin) / (absMax - absMin)) * 100;
      var hi = ((parseFloat(rangeMax.value) - absMin) / (absMax - absMin)) * 100;
      fill.style.left = lo + '%'; fill.style.width = (hi - lo) + '%';
    }
    updateFill();

    var priceTimer = null;
    function onPrice() {
      clearTimeout(priceTimer);
      priceTimer = setTimeout(function() {
        var lo = parseFloat(rangeMin.value), hi = parseFloat(rangeMax.value);
        filters.priceMin = lo > absMin ? lo : null;
        filters.priceMax = hi < absMax ? hi : null;
        onChange();
      }, 300);
    }

    rangeMin.addEventListener('input', function() {
      if (parseFloat(rangeMin.value) > parseFloat(rangeMax.value)) rangeMin.value = rangeMax.value;
      inputMin.value = rangeMin.value; updateFill(); onPrice();
    });
    rangeMax.addEventListener('input', function() {
      if (parseFloat(rangeMax.value) < parseFloat(rangeMin.value)) rangeMax.value = rangeMin.value;
      inputMax.value = rangeMax.value; updateFill(); onPrice();
    });
    inputMin.addEventListener('change', function() {
      var v = Math.max(absMin, Math.min(parseFloat(inputMin.value)||absMin, parseFloat(rangeMax.value)));
      inputMin.value = rangeMin.value = v; updateFill(); onPrice();
    });
    inputMax.addEventListener('change', function() {
      var v = Math.min(absMax, Math.max(parseFloat(inputMax.value)||absMax, parseFloat(rangeMin.value)));
      inputMax.value = rangeMax.value = v; updateFill(); onPrice();
    });
  }

  function renderPagination(total, currentPage) {
    var pages = Math.ceil(total / perPage);
    if (pages <= 1) return '';
    var numsMap = {}; numsMap[1] = true; numsMap[pages] = true;
    for (var i = Math.max(2, currentPage - 2); i <= Math.min(pages - 1, currentPage + 2); i++) numsMap[i] = true;
    var nums = Object.keys(numsMap).map(Number).sort(function(a,b){return a-b;});
    var html = '<div class="ch-pages">';
    html += '<button class="ch-pg-btn ch-pg-nav" data-pg="' + (currentPage - 1) + '"' + (currentPage <= 1 ? ' disabled' : '') + '>← Prev</button>';
    var prev = 0;
    nums.forEach(function(p) {
      if (prev > 0 && p > prev + 1) html += '<span class="ch-pg-ellipsis">…</span>';
      html += '<button class="ch-pg-btn' + (p === currentPage ? ' ch-pg-cur' : '') + '" data-pg="' + p + '">' + p + '</button>';
      prev = p;
    });
    html += '<button class="ch-pg-btn ch-pg-nav" data-pg="' + (currentPage + 1) + '"' + (currentPage >= pages ? ' disabled' : '') + '>Next →</button>';
    html += '</div>';
    return html;
  }

  function wirePagination(container, scrollTarget, onPage) {
    container.querySelectorAll('.ch-pg-btn:not([disabled]):not(.ch-pg-cur)').forEach(function(btn) {
      btn.addEventListener('click', function() {
        onPage(parseInt(btn.dataset.pg));
        setTimeout(function() {
          var target = document.getElementById(scrollTarget) || container;
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      });
    });
  }

  function getActiveFilterCount() {
    var n = (filters.inStockOnly ? 1 : 0) + (filters.priceMin !== null ? 1 : 0) + (filters.priceMax !== null ? 1 : 0);
    ['brands','categories','scales','collections'].forEach(function(k) {
      n += Object.keys(filters[k]).filter(function(v){ return filters[k][v]; }).length;
    });
    return n;
  }

  function renderFilterPills(withClearAll) {
    var pills = [];
    if (filters.inStockOnly) pills.push({ label: 'In stock', type: 'instock', key: '' });
    Object.keys(filters.collections).forEach(function(k) {
      if (!filters.collections[k]) return;
      for (var i = 0; i < COLLECTIONS.length; i++) {
        if (COLLECTIONS[i].key === k) { pills.push({ label: COLLECTIONS[i].name, type: 'collections', key: k }); break; }
      }
    });
    Object.keys(filters.brands).forEach(function(k) { if (filters.brands[k]) pills.push({ label: k, type: 'brands', key: k }); });
    Object.keys(filters.categories).forEach(function(k) { if (filters.categories[k]) pills.push({ label: k, type: 'categories', key: k }); });
    Object.keys(filters.scales).forEach(function(k) { if (filters.scales[k]) pills.push({ label: k, type: 'scales', key: k }); });
    if (filters.priceMin !== null || filters.priceMax !== null) {
      var priceLabel;
      if (filters.priceMin !== null && filters.priceMax !== null) priceLabel = '$' + filters.priceMin + ' – $' + filters.priceMax;
      else if (filters.priceMax !== null) priceLabel = 'Under $' + filters.priceMax;
      else priceLabel = 'Over $' + filters.priceMin;
      pills.push({ label: priceLabel, type: 'price', key: '' });
    }
    if (!pills.length) return '';
    var html = pills.map(function(pill) {
      return '<span class="ch-pill" data-type="' + pill.type + '" data-key="' + esc(pill.key) + '">' +
        esc(pill.label) + '<button class="ch-pill-x" aria-label="Remove filter">×</button>' +
      '</span>';
    }).join('');
    if (withClearAll) html += '<button class="ch-pill-clear">Clear all</button>';
    return html;
  }

  function renderPerPage(isMobile) {
    var opts = isMobile ? [6, 12, 18, 24] : [12, 24, 36, 48];
    var fc = getActiveFilterCount();
    var badge = fc > 0 ? '<span class="ch-filter-badge">' + fc + '</span>' : '';
    var sortOpts = [
      ['default','Default'],['price-asc','Price: Low → High'],['price-desc','Price: High → Low'],
      ['name-asc','Name: A → Z'],['name-desc','Name: Z → A'],
      ['brand-asc','Brand: A → Z'],['brand-desc','Brand: Z → A']
    ];
    var sortHtml = '<span class="ch-sort-label">Sort:</span>' +
      '<select id="ch-sort" class="ch-sort-sel">' +
      sortOpts.map(function(o) {
        return '<option value="' + o[0] + '"' + (sortBy === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
      }).join('') + '</select>';
    return (isMobile ? '' : '<div id="ch-pills">' + renderFilterPills(true) + '</div>') +
      '<div class="ch-sg-toolbar">' +
      sortHtml +
      '<button class="ch-filter-btn" id="ch-filter-btn">⊟ Filters' + badge + '</button>' +
      '<div class="ch-pp-row">' +
      '<span class="ch-pp-label">Show per page:</span>' +
      opts.map(function(n) {
        return '<button class="ch-pp-btn' + (n === perPage ? ' active' : '') + '" data-pp="' + n + '">' + n + '</button>';
      }).join('') +
      '</div>' +
    '</div>';
  }

  var _sfOrigHost = null;

  function wireMobileFilterPanel(container) {
    if (window.innerWidth > 720) return;

    var scrim = document.getElementById('ch-filter-scrim');
    if (!scrim) {
      scrim = document.createElement('div');
      scrim.id = 'ch-filter-scrim';
      scrim.className = 'ch-filter-scrim';
      document.body.appendChild(scrim);
    }

    var panel = document.getElementById('ch-mobile-filter');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'ch-mobile-filter';
      document.body.appendChild(panel);
    }

    var btn = container.querySelector('#ch-filter-btn');

    function openPanel() {
      var sf = document.getElementById('ch-sf');
      if (sf && sf.parentNode !== panel) {
        _sfOrigHost = sf.parentNode;
        panel.appendChild(sf);
      }
      panel.classList.add('open');
      scrim.classList.add('open');
      document.body.style.overflow = 'hidden';
      var closeBtn = panel.querySelector('#ch-sf-close');
      if (closeBtn) { var cb = closeBtn.cloneNode(true); closeBtn.parentNode.replaceChild(cb, closeBtn); cb.addEventListener('click', closePanel); cb.addEventListener('touchend', function(e) { e.preventDefault(); closePanel(); }); }
      var clearBar = panel.querySelector('#ch-sf-close-bar .ch-clr');
      if (clearBar) { clearBar.addEventListener('click', function() {
        filters = { collections: {}, inStockOnly: false, brands: {}, categories: {}, scales: {}, priceMin: null, priceMax: null };
        closePanel();
      }); }
    }

    function closePanel() {
      panel.classList.remove('open');
      scrim.classList.remove('open');
      document.body.style.overflow = '';
      var sf = document.getElementById('ch-sf');
      if (sf && _sfOrigHost && sf.parentNode === panel) {
        _sfOrigHost.insertBefore(sf, _sfOrigHost.querySelector('#ch-sg') || null);
      }
    }

    if (btn) {
      var newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', openPanel);
    }
    var newScrim = scrim.cloneNode(false);
    scrim.parentNode.replaceChild(newScrim, scrim);
    scrim = newScrim;
    scrim.className = 'ch-filter-scrim';
    scrim.addEventListener('click', closePanel);
    scrim.addEventListener('touchend', function(e) { e.preventDefault(); closePanel(); });
  }

  function syncSidebarCheckboxes() {
    var sf = document.getElementById('ch-sf');
    if (!sf) return;
    var instockCb = sf.querySelector('#ch-instock');
    if (instockCb) instockCb.checked = filters.inStockOnly;
    sf.querySelectorAll('.fc-brand').forEach(function(cb) { cb.checked = !!filters.brands[cb.value]; });
    sf.querySelectorAll('.fc-cat').forEach(function(cb) { cb.checked = !!filters.categories[cb.value]; });
    sf.querySelectorAll('.fc-scale').forEach(function(cb) { cb.checked = !!filters.scales[cb.value]; });
    sf.querySelectorAll('.fc-col').forEach(function(cb) { cb.checked = !!filters.collections[cb.value]; });
    var rangeMin = sf.querySelector('#ch-range-min');
    var rangeMax = sf.querySelector('#ch-range-max');
    var inputMin = sf.querySelector('#ch-price-min');
    var inputMax = sf.querySelector('#ch-price-max');
    var fill     = sf.querySelector('#ch-slider-fill');
    if (rangeMin && rangeMax) {
      var absMin = parseFloat(rangeMin.min) || 0;
      var absMax = parseFloat(rangeMax.max) || 0;
      var prMin  = filters.priceMin !== null ? filters.priceMin : absMin;
      var prMax  = filters.priceMax !== null ? filters.priceMax : absMax;
      rangeMin.value = prMin; rangeMax.value = prMax;
      if (inputMin) inputMin.value = prMin;
      if (inputMax) inputMax.value = prMax;
      if (fill && absMax > absMin) {
        var lo = ((prMin - absMin) / (absMax - absMin)) * 100;
        var hi = ((prMax - absMin) / (absMax - absMin)) * 100;
        fill.style.left = lo + '%'; fill.style.width = (hi - lo) + '%';
      }
    }
  }

  function wirePillButtons(onGridRefresh, el) {
    var pillsEl = el || document.getElementById('ch-pills');
    if (!pillsEl) return;
    pillsEl.querySelectorAll('.ch-pill').forEach(function(pill) {
      pill.querySelector('.ch-pill-x').addEventListener('click', function(e) {
        e.stopPropagation();
        var type = pill.dataset.type, key = pill.dataset.key;
        if (type === 'instock') filters.inStockOnly = false;
        else if (type === 'price') { filters.priceMin = null; filters.priceMax = null; }
        else if (filters[type]) filters[type][key] = false;
        syncSidebarCheckboxes();
        if (_filterOnChange) _filterOnChange();
        else onGridRefresh();
      });
    });
    var clearBtn = pillsEl.querySelector('.ch-pill-clear');
    if (clearBtn) clearBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      filters = { collections: {}, inStockOnly: false, brands: {}, categories: {}, scales: {}, priceMin: null, priceMax: null };
      syncSidebarCheckboxes();
      if (_filterOnChange) _filterOnChange();
      else onGridRefresh();
    });
  }

  function wireSortSelect(onSortChange) {
    var sel = document.getElementById('ch-sort');
    if (sel) sel.addEventListener('change', function() { sortBy = sel.value; onSortChange(); });
  }

  function wirePerPage(container, onChangePerPage) {
    container.querySelectorAll('.ch-pp-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        perPage = parseInt(btn.dataset.pp);
        onChangePerPage();
      });
    });
  }

  function renderCards(products) {
    if (!products.length) {
      return '<div class="ch-none">No results match your filters. <button class="ch-clr">Clear filters</button></div>';
    }
    return products.map(function(p) {
      var brand    = getBrand(p);
      var imgStyle = p.img ? ' style="background-image:url(' + p.img + ')"' : '';
      var oosClass = !p.s ? ' ch-oos' : '';
      var badge    = p.s
        ? '<span class="ch-bdg ch-bdg-in">In Stock</span>'
        : '<span class="ch-bdg ch-bdg-out">Out of Stock</span>';
      var overlay  = !p.s
        ? '<div class="ch-sold-ov"><span>Out of Stock</span></div>'
        : '';
      var brandRow = brand
        ? '<div class="ch-card-brand"><b>Brand</b>' + esc(brand) + '</div>'
        : '<div class="ch-card-brand">&nbsp;</div>';
      return '<a class="ch-card' + oosClass + '" href="' + esc(p.u) + '">' +
        '<div class="ch-cw"><div class="ch-ci"' + imgStyle + '></div>' + overlay + '</div>' +
        '<div class="ch-card-body">' +
          '<div class="ch-card-dept">' + esc(p.cn) + '</div>' +
          '<div class="ch-card-info">' +
            '<div class="ch-card-name">' + esc(p.t) + '</div>' +
            brandRow +
          '</div>' +
          '<div class="ch-card-foot">' +
            '<span class="ch-card-price">$' + esc(String(p.p)) + '</span>' +
            badge +
          '</div>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  // ── Collection pages ────────────────────────────────────────────────────────
  function getCollectionForPage() {
    var path = window.location.pathname.replace(/\/$/, '');
    for (var i = 0; i < COLLECTIONS.length; i++) {
      var colUrl = COLLECTIONS[i].url;
      if (path === colUrl) return COLLECTIONS[i];
      if (path.indexOf(colUrl + '/') === 0) {
        var firstSegment = path.slice(colUrl.length + 1).split('/')[0];
        if (firstSegment === 'p') return null; // product page, not collection
        return COLLECTIONS[i];
      }
    }
    return null;
  }

  function isCollectionPage() { return !!getCollectionForPage() && !isSearchPage(); }

  function getCollectionCatFromUrl(col) {
    var remainder = window.location.pathname.slice(col.url.length).replace(/^\//, '');
    var slug = remainder.split('/')[0];
    return (slug && slug !== 'p' && !/^\d+$/.test(slug)) ? slug : null;
  }

  function renderCollectionPage() {
    var container = document.getElementById('ch-col');
    if (!container) return;
    var col = getCollectionForPage();
    if (!col) return;

    var colProducts = allProducts.filter(function(p) { return p.c === col.key; });

    var urlCat = getCollectionCatFromUrl(col);
    if (urlCat) {
      var urlCatNorm = urlCat.replace(/-/g, ' ').toLowerCase();
      colProducts = colProducts.filter(function(p) {
        return (p.cats||[]).some(function(c) { return c.toLowerCase() === urlCatNorm; });
      });
    }

    var pr = getPriceRange(colProducts);
    var isMobile = window.innerWidth < 768;

    function getColFiltered() {
      var base = colSearch.trim()
        ? colProducts.filter(function(p) { return p.t.toLowerCase().indexOf(colSearch.toLowerCase()) !== -1; })
        : colProducts;
      return applyFilters(base);
    }

    function refreshColGrid() {
      var filt   = getColFiltered();
      var sorted = applySort(filt);
      var tp = Math.ceil(sorted.length / perPage);
      if (colPage > tp) colPage = 1;
      var pg = sorted.slice((colPage - 1) * perPage, colPage * perPage);
      var cnt = sorted.length + ' product' + (sorted.length !== 1 ? 's' : '');
      if (colProducts.length !== sorted.length) cnt += ' (filtered from ' + colProducts.length + ')';
      var countEl = document.getElementById('ch-col-count');
      if (countEl) countEl.textContent = cnt;
      var sg = document.getElementById('ch-sg');
      if (sg) sg.innerHTML = renderPerPage(isMobile) + renderCards(pg) + renderPagination(sorted.length, colPage);
      wirePillButtons(function() { colPage = 1; refreshColGrid(); });
      wireSortSelect(function() { colPage = 1; refreshColGrid(); });
      wirePerPage(container, function() { colPage = 1; refreshColGrid(); });
      wirePagination(container, 'ch-col', function(p) { colPage = p; refreshColGrid(); });
      wireMobileFilterPanel(container);
    }

    var hasColData = colProducts.length > 0;
    if (!document.getElementById('ch-sf') && hasColData) {
      container.innerHTML =
        '<div class="ch-col-search"><input type="text" placeholder="Search in ' + esc(col.name) + '…" id="ch-col-q" value="' + esc(colSearch) + '"></div>' +
        '<p class="ch-rc" id="ch-col-count"></p>' +
        '<div id="ch-sl">' +
          renderSidebar({ brands: getUniqueBrands(colProducts), cats: getUniqueNonBrandCats(colProducts), scales: getUniqueScales(colProducts), priceRange: pr, showDept: false }) +
          '<div id="ch-sg"></div>' +
        '</div>';
      wireFilters(container, pr, function() { colPage = 1; refreshColGrid(); });
      var colQInput = container.querySelector('#ch-col-q');
      if (colQInput) {
        var colDebounce = null;
        colQInput.addEventListener('input', function() {
          clearTimeout(colDebounce);
          colDebounce = setTimeout(function() { colSearch = colQInput.value; colPage = 1; refreshColGrid(); }, 280);
        });
      }
    } else if (!hasColData) {
      return;
    }
    refreshColGrid();
  }

  function initCollectionPage() {
    if (!isCollectionPage()) return;
    colSearch = ''; colPage = 1;

    ['.products-simple', '.ProductList', '.products-flex', '.sqs-store-collection',
     '[data-controller="ProductsController"]', '.collection-content',
     '.products-v2', '[class*="ProductList"]'].forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) {
        el.style.setProperty('display', 'none', 'important');
      });
    });

    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var firstSection = main.firstElementChild;
    var container = document.createElement('div');
    container.id = 'ch-col';
    var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
    var headerH  = headerEl ? headerEl.getBoundingClientRect().height : 72;
    container.style.cssText = 'max-width:1200px;margin:0 auto;padding:' + (headerH + 20) + 'px 8px 40px';
    if (firstSection) {
      main.insertBefore(container, firstSection);
      var sib = container.nextElementSibling;
      while (sib) { sib.style.setProperty('display', 'none', 'important'); sib = sib.nextElementSibling; }
    } else {
      main.appendChild(container);
    }

    if (indexReady) {
      renderCollectionPage();
    } else {
      container.innerHTML = '<p style="text-align:center;padding:60px;font-family:\'Work Sans\',sans-serif;color:#8a8273">Loading products…</p>';
    }
  }

  // ── Homepage ─────────────────────────────────────────────────────────────────
  // Paste your Squarespace CDN image URLs here after uploading photos
  var HP_IMG = {
    hero       : 'https://images.squarespace-cdn.com/content/6227ef6f1be14312f370c9fe/4dd756d5-74ed-4832-a2d5-8ce2fb2eac2a/storefront.jpg?content-type=image%2Fjpeg',   // storefront photo
    buildNight : '',   // Sunday Build Night photo
    richard    : ''    // Richard painting photo
  };

  // Top row: 5 model kit categories
  var HP_CATS_MODELS = [
    { label: 'Cars',            href: '/coppers-hobbies-szOJ2/cars',              icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#8a6535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15h14v-3L17 7H7L5 12v3z"/><circle cx="8.5" cy="18.5" r="1.5"/><circle cx="15.5" cy="18.5" r="1.5"/><path d="M8 10h8"/></svg>' },
    { label: 'Military',        href: '/coppers-hobbies-szOJ2/military',          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#8a6535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.5 7.5H22l-6.5 4.5 2.5 7.5L12 17.5 6 21.5l2.5-7.5L2 9.5h7.5z"/></svg>' },
    { label: 'Aircraft',        href: '/coppers-hobbies-szOJ2/aircraft',          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#8a6535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 14l-9-8-9 8 3-.5 1.5 3.5L12 16l4.5 1 1.5-3.5z"/><line x1="12" y1="6" x2="12" y2="20"/></svg>' },
    { label: 'Ships',           href: '/coppers-hobbies-szOJ2/ships',             icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#8a6535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="2"/><line x1="12" y1="8" x2="12" y2="16"/><path d="M5 13h14M7 17a5 5 0 0010 0"/></svg>' },
    { label: 'Gundam & Mecha',  href: '/coppers-hobbies-szOJ2/sci-fi-and-space',  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#8a6535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="7" rx="1.5"/><rect x="5" y="10" width="14" height="9" rx="1.5"/><path d="M9 19l-2 3m8-3l2 3M3 13.5h2m14 0h2"/><circle cx="10.5" cy="14" r="1" fill="#8a6535"/><circle cx="13.5" cy="14" r="1" fill="#8a6535"/></svg>' }
  ];
  // Bottom row: 4 art supply categories
  var HP_CATS_ART = [
    { label: 'Paints',          href: '/art-supplies/painting-supplies',          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#8a6535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="5" width="8" height="14" rx="1.5"/><path d="M11 5V3h2v2m-3 4h4m-4 3.5h4"/><path d="M12 19v2"/></svg>' },
    { label: 'Brushes',         href: '/art-supplies/brushes',                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#8a6535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 4l3 3-11 11a4 4 0 01-5-5L17 4z"/><path d="M5 20c0 1.5 2 2.5 3 1.5"/><line x1="13.5" y1="7.5" x2="16.5" y2="10.5"/></svg>' },
    { label: 'Drawing',         href: '/art-supplies/drawing-supplies',           icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#8a6535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4L8 20l-5 1 1-5L17 3z"/><line x1="14.5" y1="5.5" x2="18.5" y2="9.5"/></svg>' },
    { label: 'Paper & Canvas',  href: '/art-supplies/paintingdrawing-surfaces',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#8a6535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>' }
  ];

  function isHomePage() { return window.location.pathname === '/'; }
  function isShopAllPage() { return window.location.pathname === '/shopall'; }

  function initHomePage() {
    if (!isHomePage()) return;
    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
    var headerH  = headerEl ? headerEl.getBoundingClientRect().height : 72;
    var container = document.createElement('div');
    container.id = 'ch-home';
    var firstSection = main.firstElementChild;
    if (firstSection) {
      main.insertBefore(container, firstSection);
      var sib = container.nextElementSibling;
      while (sib) { sib.style.setProperty('display', 'none', 'important'); sib = sib.nextElementSibling; }
    } else {
      main.appendChild(container);
    }
    container.innerHTML = '<div style="padding-top:' + headerH + 'px;min-height:200px;display:flex;align-items:center;justify-content:center;font-family:\'Work Sans\',sans-serif;color:#8a8273">Loading…</div>';
    fetch('/?format=json', { credentials: 'same-origin' })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var featured = (data.items || []).slice(0, 4).map(function(item) {
          var v = (item.variants && item.variants[0]) || (item.structuredContent && item.structuredContent.variants && item.structuredContent.variants[0]);
          var price = v && v.priceMoney && parseFloat(v.priceMoney.value) > 0 ? v.priceMoney.value : '0.00';
          return { t: item.title || '', u: item.fullUrl || '', img: item.assetUrl || '', p: price };
        });
        renderHomePage(container, headerH, featured);
      })
      .catch(function() { renderHomePage(container, headerH, []); });
  }

  function renderHomePage(container, headerH, featured) {
    var heroImg = HP_IMG.hero ? 'background-image:url(' + HP_IMG.hero + ')' : 'background-color:#ede3d2';

    function makeTile(c) {
      return '<a href="' + c.href + '" class="ch-hp-cat">' +
        '<div class="ch-hp-cat-circle">' + c.icon + '</div>' +
        '<span class="ch-hp-cat-label">' + esc(c.label) + '</span>' +
      '</a>';
    }

    var featCards = featured.length
      ? featured.map(function(p) {
          var imgStyle = p.img ? 'background-image:url(' + p.img + ')' : 'background-color:#f5f0e8';
          return '<a class="ch-hp-pcard" href="' + esc(p.u) + '">' +
            '<div class="ch-hp-pcard-img" style="' + imgStyle + '"></div>' +
            '<div class="ch-hp-pcard-body">' +
              '<div class="ch-hp-pcard-name">' + esc(p.t) + '</div>' +
              '<div class="ch-hp-pcard-price">$' + esc(String(p.p)) + '</div>' +
            '</div>' +
          '</a>';
        }).join('')
      : '<div style="grid-column:1/-1;text-align:center;padding:40px 20px;font-family:\'Work Sans\',sans-serif;color:#8a8273">Featured products loading…</div>';

    var BRANDS = [
      { name: 'Tamiya',          img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/504ce903-e23a-4ed3-b248-a832debb517b/download.png?format=500w' },
      { name: 'Bandai',          img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/a44d08b5-b066-4cd9-a738-f533b3789f32/bandailogoNew00.jpg?format=1000w' },
      { name: 'Revell',          img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/8e3494e5-0a41-49de-bee5-18ff3d18bf7e/revell+smaller.jpg?format=500w' },
      { name: 'Hasegawa',        img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/721314a5-a148-4617-8788-f3905d2b5587/Hasegawa.png?format=500w' },
      { name: 'Iwata',           img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/2eee7a15-d036-42d6-bfe7-9267ea26dd45/download+%2840%29.png?format=500w' },
      { name: 'Winsor & Newton', img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/3a94e14d-6885-48f7-afee-9c124bc34425/download+%289%29.png?format=500w' },
      { name: 'Liquitex',        img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/724fd0c5-5df2-41fe-b4d9-c3caf216ccae/download+%2817%29.png?format=500w' },
      { name: 'Vallejo',         img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/8930cbd5-9111-4767-bee4-1eea71633a52/download+%281%29.png?format=500w' }
    ];
    var brandsHtml = BRANDS.map(function(b) {
      return '<div class="ch-hp-brand-logo-wrap"><img class="ch-hp-brand-logo" src="' + b.img + '" alt="' + esc(b.name) + '"></div>';
    }).join('');

    var FRIENDS = [
      { name: 'Richard Zajac Art',     img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/1646871826324-JL14ADV93R9UP5U6SSQ0/blue+jay+1.JPG?format=750w',                                                              href: 'https://www.richardzajacart.com' },
      { name: 'Little Shop of Heroes', img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/1646872352725-IY0BFEAZI7S5ULBSIUUN/lsof.jpg?format=750w',                                                                   href: 'https://www.facebook.com/people/Little-Shop-Of-Heroes/100054529897208/' },
      { name: 'IPMS Hamilton',         img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/1647388211440-DJ767HTLMFPEXD81A4V7/cwhm-logo-no-background.png?format=1000w',                                               href: 'https://www.ipmshamilton.ca' },
      { name: 'IPMS Canada',           img: 'https://images.squarespace-cdn.com/content/v1/6227ef6f1be14312f370c9fe/f74eb026-fecf-4333-9a96-c7b26b45fe27/IPMS.png?format=750w',                                                                 href: 'https://www.ipmscanada.com' }
    ];
    var friendsHtml = FRIENDS.map(function(f) {
      return '<a class="ch-hp-friend" href="' + f.href + '" target="_blank" rel="noopener">' +
        '<div class="ch-hp-friend-img-wrap"><img class="ch-hp-friend-img" src="' + f.img + '" alt="' + esc(f.name) + '"></div>' +
        '<span class="ch-hp-friend-name">' + esc(f.name) + '</span>' +
      '</a>';
    }).join('');

    container.innerHTML =
      // Hero
      '<section class="ch-hp-hero">' +
        '<div class="ch-hp-hero-inner" style="padding-top:' + (headerH + 24) + 'px">' +
          '<div>' +
            '<h1 class="ch-hp-h1">The hobby shop for people who care how it turns out.</h1>' +
            '<p class="ch-hp-sub">Scale models, paints, tools and art supplies — chosen and stocked by two people who build, paint and obsess over this hobby right alongside you, in the heart of Kitchener.</p>' +
            '<div class="ch-hp-hero-btns">' +
              '<a href="/shopall" class="ch-hp-btn-primary">Shop the store</a>' +
              '<a href="#ch-hp-store" class="ch-hp-btn-outline">Visit us in Kitchener</a>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="ch-hp-hero-img-wrap">' +
              '<div class="ch-hp-hero-img" style="' + heroImg + '"></div>' +
              '<div class="ch-hp-hero-badge">' +
                '<span class="ch-hp-badge-addr">935 Frederick St</span>' +
                '<span class="ch-hp-badge-sub">Where Frederick meets Victoria</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +
      // Category tiles — two staggered rows (5 model kit + 4 art)
      '<section class="ch-hp-cats">' +
        '<div class="ch-hp-cats-inner">' +
          '<div class="ch-hp-cats-hd">' +
            '<h2 class="ch-hp-h2">Browse by category</h2>' +
            '<a href="/shopall" class="ch-hp-link">All categories →</a>' +
          '</div>' +
          '<div class="ch-hp-cats-section">' +
            '<div class="ch-hp-cats-row">' + HP_CATS_MODELS.map(makeTile).join('') + '</div>' +
            '<div class="ch-hp-cats-row">' + HP_CATS_ART.map(makeTile).join('') + '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +
      // Featured products
      '<section class="ch-hp-feat">' +
        '<div class="ch-hp-feat-inner">' +
          '<div class="ch-hp-feat-hd">' +
            '<h2 class="ch-hp-h2">A few of our favourites</h2>' +
            '<a href="/shopall" class="ch-hp-link">Browse the full shop →</a>' +
          '</div>' +
          '<div class="ch-hp-feat-grid">' + featCards + '</div>' +
        '</div>' +
      '</section>' +
      // Brands we carry
      '<section class="ch-hp-brands">' +
        '<div class="ch-hp-brands-inner">' +
          '<div class="ch-hp-brands-hd"><h2 class="ch-hp-h2">Brands we carry</h2></div>' +
          '<div class="ch-hp-brands-row">' + brandsHtml + '</div>' +
        '</div>' +
      '</section>' +
      // Friends & Cohorts
      '<section class="ch-hp-friends">' +
        '<div class="ch-hp-friends-inner">' +
          '<p class="ch-hp-friends-label">Friends & Cohorts</p>' +
          '<p class="ch-hp-friends-sub">A small business that supports other local small businesses</p>' +
          '<div class="ch-hp-friends-row">' + friendsHtml + '</div>' +
        '</div>' +
      '</section>' +
      // Store info
      '<section class="ch-hp-store" id="ch-hp-store">' +
        '<div class="ch-hp-store-inner">' +
          '<div class="ch-hp-map-wrap">' +
            '<iframe src="https://maps.google.com/maps?q=935+Frederick+Street+Kitchener+ON+Canada&output=embed&z=16" loading="lazy" title="Copper\'s Hobbies location"></iframe>' +
          '</div>' +
          '<h2 class="ch-hp-store-h2">Come see us</h2>' +
          '<p class="ch-hp-store-p">We\'re always growing our collection and not everything is listed online — come by in person to see the full inventory. Or order online with $20 flat-rate shipping anywhere in Canada.</p>' +
          '<div class="ch-hp-store-details">' +
            '<div>' +
              '<p class="ch-hp-store-label">Hours</p>' +
              '<p class="ch-hp-store-hours">Mon–Fri&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10–6<br>Saturday&nbsp;&nbsp;&nbsp;&nbsp;10–5<br>Sunday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11–5</p>' +
            '</div>' +
            '<div>' +
              '<p class="ch-hp-store-label">Find us</p>' +
              '<p class="ch-hp-store-addr">935 Frederick Street<br>Kitchener, ON&nbsp;&nbsp;N2B 2B9<br>519-570-0001</p>' +
              '<a href="https://maps.google.com/?q=935+Frederick+Street+Kitchener+ON+Canada" target="_blank" rel="noopener" class="ch-hp-store-dir">Get directions →</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  // ── Shop All ─────────────────────────────────────────────────────────────────
  function initShopAllPage() {
    if (!isShopAllPage()) return;
    colSearch = ''; colPage = 1;
    ['.products-simple', '.ProductList', '.products-flex', '.sqs-store-collection',
     '[data-controller="ProductsController"]', '.collection-content',
     '.products-v2', '[class*="ProductList"]', '.system-page'].forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) {
        el.style.setProperty('display', 'none', 'important');
      });
    });
    var main = document.querySelector('main, #page, .Site-inner') || document.body;
    var firstSection = main.firstElementChild;
    var container = document.createElement('div');
    container.id = 'ch-shopall';
    var headerEl = document.querySelector('.Site-header, header, [class*="Header"]');
    var headerH  = headerEl ? headerEl.getBoundingClientRect().height : 72;
    container.style.cssText = 'max-width:1200px;margin:0 auto;padding:' + (headerH + 20) + 'px 8px 40px';
    if (firstSection) {
      main.insertBefore(container, firstSection);
      var sib = container.nextElementSibling;
      while (sib) { sib.style.setProperty('display', 'none', 'important'); sib = sib.nextElementSibling; }
    } else {
      main.appendChild(container);
    }
    // Squarespace sets min-height on layout containers for blank/404 pages,
    // which inflates the footer gap. Zero them out on /shopall only.
    main.style.minHeight = '0';
    main.style.paddingBottom = '0';
    document.querySelectorAll('.sqs-layout,.sqs-col-wid-12,.sqs-block').forEach(function(el) {
      el.style.minHeight = '0';
    });
    if (indexReady) {
      renderShopAll();
    } else {
      container.innerHTML = '<p style="text-align:center;padding:60px;font-family:\'Work Sans\',sans-serif;color:#8a8273">Loading products…</p>';
    }
  }

  function renderShopAll() {
    var container = document.getElementById('ch-shopall');
    if (!container) return;
    var pr       = getPriceRange(allProducts);
    var isMobile = window.innerWidth < 768;
    var brands   = getUniqueBrands(allProducts);
    var cats     = getUniqueNonBrandCats(allProducts);
    var scales   = getUniqueScales(allProducts);
    var activeCols = {};
    allProducts.forEach(function(p) { activeCols[p.c] = true; });

    function getFiltered() {
      var base = colSearch.trim()
        ? allProducts.filter(function(p) { return p.t.toLowerCase().indexOf(colSearch.toLowerCase()) !== -1; })
        : allProducts;
      return applyFilters(base);
    }

    function refreshGrid() {
      var filt   = getFiltered();
      var sorted = applySort(filt);
      var tp = Math.ceil(sorted.length / perPage);
      if (colPage > tp) colPage = 1;
      var pg = sorted.slice((colPage - 1) * perPage, colPage * perPage);
      var cnt = sorted.length + ' product' + (sorted.length !== 1 ? 's' : '');
      if (allProducts.length !== sorted.length) cnt += ' (filtered from ' + allProducts.length + ')';
      var countEl = document.getElementById('ch-sa-count');
      if (countEl) countEl.textContent = cnt;
      var sg = document.getElementById('ch-sg');
      if (sg) sg.innerHTML = renderPerPage(isMobile) + renderCards(pg) + renderPagination(sorted.length, colPage);
      wirePillButtons(function() { colPage = 1; refreshGrid(); });
      wireSortSelect(function() { colPage = 1; refreshGrid(); });
      wirePerPage(container, function() { colPage = 1; refreshGrid(); });
      wirePagination(container, 'ch-shopall', function(p) { colPage = p; refreshGrid(); });
      wireMobileFilterPanel(container);
    }

    if (!document.getElementById('ch-sf')) {
      container.innerHTML =
        '<h1 style="font-family:\'Cormorant Garamond\',serif;font-size:32px;font-weight:500;color:#1f1c18;margin:0 0 6px">The Full Shop</h1>' +
        '<div class="ch-col-search"><input type="text" placeholder="Search all products…" id="ch-sa-q" value="' + esc(colSearch) + '"></div>' +
        '<p class="ch-rc" id="ch-sa-count"></p>' +
        '<div id="ch-sl">' +
          renderSidebar({ brands: brands, cats: cats, scales: scales, priceRange: pr, showDept: true, activeCols: activeCols }) +
          '<div id="ch-sg"></div>' +
        '</div>';
      wireFilters(container, pr, function() { colPage = 1; refreshGrid(); });
      var saQ = container.querySelector('#ch-sa-q');
      if (saQ) {
        var saDebounce = null;
        saQ.addEventListener('input', function() {
          clearTimeout(saDebounce);
          saDebounce = setTimeout(function() { colSearch = saQ.value; colPage = 1; refreshGrid(); }, 280);
        });
      }
    }
    refreshGrid();
  }

  // ── Utility ─────────────────────────────────────────────────────────────────
  function esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── Init ────────────────────────────────────────────────────────────────────
  function init() {
    loadFuse(function() {
      initFlyout();
      initSearchPage();
      initCollectionPage();
      initHomePage();
      initShopAllPage();
      buildIndex();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
