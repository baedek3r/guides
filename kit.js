/* sherpa. — виджеты для Тильды.
   Каталог:      <div data-catalog="https://USER.github.io/guides/guides.json" data-guide-page="/guide"></div>
   Страница гайда: <div data-guide="https://USER.github.io/guides/guides.json" data-catalog-page="/#catalog"></div>
   Подключение:  <script src="https://USER.github.io/guides/kit.js"></script>
   Гайд выбирается по адресу страницы: /guide?g=crm */
(function () {
  if (window.PVKit) return;
  var me = document.currentScript && document.currentScript.src;
  var BASE = me ? me.replace(/[^/]*$/, '') : '';
  var INK = '#141317', RULE = '#dddae3', MUTED = '#7d7986', SOFT = '#4a4752', ACC = '#141317', ACC_D = '#141317';
  var CAT_COLORS = { 'Маркетинг': '#ff2a1f', 'Продукт': '#7c4dff', 'Финансы': '#1fd65f', 'Образование': '#2f5bff', 'Дизайн': '#ff3fa4', 'Аналитика': '#00b8d9', 'Разработка': '#ff8a00' };
  var PALETTE = ['#ff2a1f', '#7c4dff', '#1fd65f', '#2f5bff', '#ff3fa4', '#00b8d9', '#ff8a00'];
  function accentOf(g) { if (g.color) return g.color; if (CAT_COLORS[g.cat]) return CAT_COLORS[g.cat]; var h = 0, s = String(g.cat || g.id || ''); for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return PALETTE[h % PALETTE.length]; }
  window.PVAccent = accentOf;
  var MONO = "'JetBrains Mono',ui-monospace,monospace", UI = "'Onest','Helvetica Neue',Helvetica,Arial,sans-serif";

  if (!document.querySelector('link[data-pv-fonts]')) {
    var lf = document.createElement('link');
    lf.rel = 'stylesheet'; lf.setAttribute('data-pv-fonts', '');
    lf.href = 'https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&family=Manrope:wght@300;800&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(lf);
  }
  var css = document.createElement('style');
  css.textContent = [
    '.pv,.pv *{box-sizing:border-box}.pv{font-family:' + UI + ';color:' + INK + ';font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}',
    '.pv a{color:' + INK + ';text-decoration:none}',
    '.pv-mono{font-family:' + MONO + ';letter-spacing:.07em;text-transform:uppercase}',
    '.pv-chips{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:22px}',
    '.pv-chip{font:600 14.5px/1 ' + UI + ';letter-spacing:-.01em;padding:12px 18px;border:0;border-radius:999px;background:#e9e7ee;color:' + INK + ';cursor:pointer;white-space:nowrap;transition:all .2s}',
    '.pv-chip{display:inline-flex;align-items:center;gap:8px}.pv-n{font-family:' + MONO + ';font-size:11px;font-weight:500;letter-spacing:0;opacity:.5}.pv-chip:hover{background:#dddae3}.pv-chip[aria-pressed=true]{background:' + INK + ';color:#fff}',
    '.pv-pager{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:28px;flex-wrap:wrap}',
    '.pv-pg{min-width:40px;height:40px;padding:0 12px;border:0;border-radius:999px;background:#e9e7ee;color:' + INK + ';font:600 14px/1 ' + UI + ';cursor:pointer;transition:all .15s}',
    '.pv-pg:hover:not(:disabled){background:#dddae3}.pv-pg[aria-current=page]{background:' + INK + ';border-color:' + INK + ';color:#fff}.pv-pg:disabled{opacity:.35;cursor:default}',
    '.pv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,200px),1fr));gap:clamp(14px,1.4vw,20px)}','.pv-card>.pv-cv{height:100%}.pv-card>.pv-cv>div{height:100%}',
    '.pv-grid.sm{grid-template-columns:repeat(auto-fill,minmax(min(100%,190px),1fr))}',
    '.pv-card{display:grid;grid-row:span 2;grid-template-rows:subgrid;row-gap:0;background:#fff;border:0;border-radius:20px;overflow:hidden;transition:transform .3s,box-shadow .3s}',
    '.pv-card:hover{transform:translateY(-4px);box-shadow:0 26px 44px -30px rgba(20,19,23,.45)}',
    '.pv-card-b{display:flex;flex-direction:column;gap:10px;padding:14px 16px 16px;border-top:1px solid #efedf3}',
    '.pv-btn{display:inline-flex;align-items:center;gap:10px;padding:15px 22px;font:600 14.5px/1 ' + UI + ';letter-spacing:-.01em;border:0;border-radius:999px;cursor:pointer;transition:background .15s,color .15s,border-color .15s;white-space:nowrap}',
    '.pv-btn.dark{background:' + INK + ';color:#fff!important}.pv-btn.dark:hover{background:#2e2c34;border-color:#2e2c34}',
    '.pv-btn.line{background:#e9e7ee;color:' + INK + '!important}.pv-btn.line:hover{background:#dddae3}',
    '.pv-hero{display:grid;grid-template-columns:minmax(180px,250px) minmax(0,1fr);gap:clamp(20px,4vw,48px);align-items:start}',
    '.pv-spec{display:grid;grid-template-columns:minmax(90px,140px) minmax(0,1fr);gap:14px;padding:12px 0;border-bottom:1px solid #efedf3;align-items:baseline}.pv-spec:last-child{border-bottom:0}',
    '.pv-ws{display:grid;grid-template-columns:calc(400px + clamp(24px,3vw,48px)) minmax(0,1fr);gap:0;align-items:stretch}.pv-ws>div:first-child{padding-right:clamp(24px,3vw,48px)}.pv-ws>.pv-side{padding-left:clamp(24px,3vw,48px);border-left:1px solid ' + RULE + '}',
    '.pv-side{position:sticky;top:76px;display:flex;flex-direction:column}',
    '@media (max-width:980px){.pv-ws{grid-template-columns:minmax(0,1fr)}.pv-ws>div:first-child{padding:0 0 28px}.pv-ws>.pv-side{position:static;padding:28px 0 0;border-left:0;border-top:1px solid ' + RULE + '}}',
    '@media (max-width:680px){.pv-hero{grid-template-columns:minmax(0,1fr)}.pv-hero-cover{max-width:240px}}',
    '.pv-bar{display:flex;align-items:center;gap:12px 16px;flex-wrap:wrap;margin-bottom:22px}.pv-bar .pv-chips{margin:0;flex:1 1 auto;min-width:0}',
    '.pv-q{position:relative;flex:0 1 340px;min-width:220px}.pv-q input{width:100%;height:42px;padding:0 40px 0 42px;border:1px solid ' + RULE + ';border-radius:999px;background:#fff;font:500 14.5px/1 ' + UI + ';letter-spacing:-.01em;color:' + INK + ';outline:0;transition:border-color .15s,box-shadow .15s;-webkit-appearance:none}',
    '.pv-q input::placeholder{color:#8b8794}.pv-q input:focus{border-color:' + INK + ';box-shadow:0 0 0 3px rgba(20,19,23,.08)}.pv-q input::-webkit-search-cancel-button{display:none}',
    '.pv-q svg{position:absolute;left:15px;top:50%;transform:translateY(-50%);pointer-events:none}.pv-qx{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:30px;height:30px;border:0;border-radius:50%;background:#efedf3;color:' + INK + ';font:500 16px/1 ' + UI + ';cursor:pointer;display:none}.pv-qx.on{display:block}.pv-qx:hover{background:#dddae3}',
    '.pv-empty{padding:40px 20px;border-radius:20px;background:#fff;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center}',
    '.pv-sug{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.pv-sug button{padding:8px 13px;border:0;border-radius:999px;background:#efedf3;font:600 13px/1 ' + UI + ';color:' + INK + ';cursor:pointer}.pv-sug button:hover{background:#dddae3}',
    '.pv-card-m{display:none}',
    '@media (max-width:640px){.pv-bar{flex-direction:column;align-items:stretch;gap:12px}.pv-q{flex:none;min-width:0;order:-1}.pv-q input{height:46px;font-size:16px}',
    '.pv-bar .pv-chips{flex-wrap:nowrap;overflow-x:auto;margin:0 calc(-1 * clamp(16px,3vw,32px));padding:0 clamp(16px,3vw,32px);scrollbar-width:none}.pv-bar .pv-chips::-webkit-scrollbar{display:none}.pv-chip{padding:10px 14px;font-size:14px}',
    '.pv-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.pv-card{border-radius:12px}.pv-card:hover{transform:none;box-shadow:none}',
    '.pv-card .pv-cv>div{padding:10cqw 8cqw 8cqw!important;aspect-ratio:1/1!important}.pv-card .pv-cv-logo{font-size:9cqw!important;margin:0 0 6cqw!important;text-align:left!important}',
    '.pv-card .pv-cv-cat{font-size:6cqw!important;padding:2.4cqw 4.6cqw!important}.pv-card .pv-cv-big{font-size:14cqw!important}.pv-card .pv-cv-sub,.pv-card .pv-cv-meta{display:none!important}',
    '.pv-card-b{padding:8px 8px 10px;gap:4px}.pv-card-t{font-size:12px!important;line-height:1.2!important;letter-spacing:-.01em!important}.pv-card-m{display:block;font-size:10.5px;line-height:1.3;color:' + MUTED + '}.pv-card-go{display:none!important}}'
  ].join('');
  document.head.appendChild(css);

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function load(src) {
    return new Promise(function (res, rej) {
      if (document.querySelector('script[src="' + src + '"]')) return res();
      var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }
  var cache = {};
  function catalog(url) {
    url = new URL(url, location.href).href;
    if (!cache[url]) cache[url] = fetch(url, { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
      var list = (d.guides || d).filter(function (g) { return !g.hidden; });
      list.forEach(function (g, i) {
        g.idx = String(i + 1).padStart(2, '0');
        g.pdfUrl = new URL(g.pdf, url).href;
        g.testUrl = g.test ? new URL(g.test, url).href : '';
        g.teamText = (g.team || []).join(', ');
      });
      list.total = list.length;
      return list;
    });
    return cache[url];
  }
  function guideHref(page, g) { return (page || '') + (page && page.indexOf('?') > -1 ? '&' : '?') + 'g=' + encodeURIComponent(g.id); }

  function cover(g, total, compact) {
    var m = function (sz, c, extra) { return 'font-family:' + MONO + ';font-size:' + sz + 'cqw;letter-spacing:.08em;text-transform:uppercase;color:' + c + ';' + (extra || ''); };
    var pill = 'padding:1.1cqw 2cqw;border-radius:99cqw;background:#f3f2f6;color:' + INK + ';white-space:nowrap';
    return '<div class="pv-cv" style="container-type:inline-size;width:100%"><div style="position:relative;width:100%;aspect-ratio:' + (compact ? 'auto' : '3/4') + ';background:#fff;display:flex;flex-direction:column;padding:' + (compact ? '16cqw 8cqw 6.5cqw' : '8cqw 8cqw 6.5cqw') + ';font-family:' + UI + ';color:' + INK + '">' +
      '<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none"><div style="position:absolute;right:-20cqw;top:-20cqw;width:56cqw;height:56cqw;border-radius:50%;border:.3cqw solid #e8e7ec"></div><div style="position:absolute;right:-8cqw;top:-8cqw;width:34cqw;height:34cqw;border-radius:50%;background:#f1f0f3"></div></div>' +
      '<div class="pv-cv-logo" style="position:relative;text-align:center;font-family:Manrope,' + UI + ';font-size:' + (compact ? 7 : 6) + 'cqw;letter-spacing:-.05em;line-height:1;color:' + INK + ';margin:' + (compact ? '-8cqw 0 8cqw' : '0 0 8cqw') + '"><span style="font-weight:300">sher</span><span style="font-weight:800">pa.</span></div>' +
      '<div style="position:relative;margin-top:auto;display:flex;flex-direction:column;gap:3.4cqw">' +
        '<span class="pv-cv-cat" style="align-self:flex-start;padding:1.3cqw 2.4cqw;border-radius:99cqw;background:' + INK + ';' + m(2.3, '#fff') + '">' + esc(g.cat) + '</span>' +
        '<div class="pv-cv-big" style="font-weight:800;font-size:11.4cqw;line-height:.94;letter-spacing:-.045em"><span style="display:block">' + esc(g.big1) + '</span><span style="display:block;color:' + accentOf(g) + '">' + esc(g.big2) + '</span></div>' +
        '<div class="pv-cv-sub" style="font-size:4.1cqw;line-height:1.22;font-weight:500;letter-spacing:-.02em;color:' + SOFT + ';max-width:76cqw;text-wrap:balance">' + esc(g.sub) + '</div>' +
      '</div>' +
      '<div class="pv-cv-meta" style="position:relative;margin-top:7cqw;padding-top:4.2cqw;border-top:.25cqw solid #e6e3ec;display:grid;grid-template-columns:1.25fr 1fr;gap:4cqw">' +
        '<div style="display:flex;flex-direction:column;gap:1.6cqw"><span style="' + m(compact ? 2.8 : 2.1, '#8b8794') + '">Для кого</span><span style="font-size:' + (compact ? 4.6 : 3.3) + 'cqw;line-height:1.25;font-weight:600">' + esc(g.forShort) + '</span></div>' +
        '<div style="display:flex;flex-direction:column;gap:1.6cqw"><span style="' + m(compact ? 2.8 : 2.1, '#8b8794') + '">Уровень</span><span style="font-size:' + (compact ? 4.6 : 3.3) + 'cqw;line-height:1.25;font-weight:600">' + esc(g.level) + '</span></div>' +
      '</div>' +
      (compact ? '' : '<div style="position:relative;margin-top:4.6cqw;display:flex;justify-content:space-between;align-items:center;gap:3cqw;' + m(2.2, '#8b8794') + '"><span style="display:flex;gap:1.4cqw;flex-wrap:wrap"><span style="' + pill + '">' + g.pages + ' стр.</span><span style="' + pill + '">' + esc(g.chapters) + '</span></span>' + (g.author ? '<span style="color:' + INK + ';font-weight:500;text-transform:none;letter-spacing:0;font-size:2.6cqw">' + esc(g.author) + '</span>' : '') + '</div>') +
    '</div></div>';
  }
  function card(g, total, page) {
    return '<a class="pv-card" href="' + esc(guideHref(page, g)) + '">' + cover(g, total, true) +
      '<div class="pv-card-b"><span class="pv-card-t" style="font-size:14.5px;line-height:1.25;font-weight:600;letter-spacing:-.015em;text-wrap:balance">' + esc(g.title) + '</span><span class="pv-card-m">' + g.pages + ' стр. · ' + esc(g.level) + '</span><span class="pv-card-go" style="margin-top:auto;font-size:13.5px;font-weight:600;letter-spacing:-.01em;color:' + ACC + '">Открыть →</span></div></a>';
  }

  function mountCatalog(el) {
    var src = el.getAttribute('data-catalog');
    if (el.__pv === src) return; el.__pv = src;
    el.classList.add('pv');
    var page = el.getAttribute('data-guide-page') || '/guide';
    el.innerHTML = '<div class="pv-mono" style="font-size:11px;color:' + MUTED + '">Загружаем каталог…</div>';
    catalog(src).then(function (list) {
      var cats = []; list.forEach(function (g) { if (cats.indexOf(g.cat) < 0) cats.push(g.cat); });
      var cur = 'all', pg = 1, per = Math.max(1, +(el.getAttribute('data-per-page') || 8));
      function pager(n) {
        if (n <= 1) return '';
        var b = function (label, p, on, dis) { return '<button type="button" class="pv-pg" data-p="' + p + '"' + (dis ? ' disabled' : '') + ' aria-current="' + (on ? 'page' : 'false') + '">' + label + '</button>'; };
        var out = [b('←', pg - 1, false, pg === 1)];
        for (var i = 1; i <= n; i++) {
          if (n > 7 && i !== 1 && i !== n && Math.abs(i - pg) > 1) { if (out[out.length - 1] !== '…') out.push('…'); continue; }
          out.push(b(String(i), i, i === pg));
        }
        out.push(b('→', pg + 1, false, pg === n));
        return '<nav class="pv-pager">' + out.map(function (x) { return x === '…' ? '<span class="pv-mono" style="font-size:11px;color:' + MUTED + ';padding:0 4px">…</span>' : x; }).join('') + '</nav>';
      }
      var q = '', SUG = (el.getAttribute('data-suggest') || 'маркетинг|образование|продукт|EdTech|аналитика|финансы').split('|');
      function norm(s) { return String(s || '').toLowerCase().replace(/ё/g, 'е'); }
      list.forEach(function (g) { g.hay = norm([g.title, g.cat, g.big1, g.big2, g.sub, g.lead, g.forShort, g.forWho, g.level, g.caseName, g.teamText, (g.tags || []).join(' ')].join(' ')); });
      function match(g) {
        var ws = norm(q).split(/[\s,.;]+/).filter(Boolean);
        return ws.every(function (w) { var st = w.length > 5 ? w.slice(0, w.length - 2) : w; return g.hay.indexOf(st) > -1; });
      }
      el.innerHTML = '<div class="pv-bar"><div class="pv-chips"></div><label class="pv-q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg><input type="search" enterkeyhint="search" autocomplete="off" placeholder="Поиск: маркетинг, EdTech, SQL…" aria-label="Поиск по гайдам"><button type="button" class="pv-qx" aria-label="Очистить">×</button></label></div><div class="pv-res"></div>';
      var chipsEl = el.querySelector('.pv-chips'), res = el.querySelector('.pv-res'), inp = el.querySelector('.pv-q input'), qx = el.querySelector('.pv-qx');
      if (cats.length < 2) chipsEl.style.display = 'none';
      function setQ(v) { q = v; inp.value = v; pg = 1; render(); }
      var tm; inp.oninput = function () { clearTimeout(tm); tm = setTimeout(function () { q = inp.value; pg = 1; render(); }, 120); };
      inp.onkeydown = function (e) { if (e.key === 'Escape') setQ(''); if (e.key === 'Enter') inp.blur(); };
      qx.onclick = function () { setQ(''); inp.focus(); };
      function render() {
        var found = q.trim() ? list.filter(match) : list;
        qx.classList.toggle('on', !!q);
        chipsEl.innerHTML = [['all', 'Все', found.length]].concat(cats.map(function (c) { return [c, c, found.filter(function (g) { return g.cat === c; }).length]; })).map(function (c) {
          return '<button type="button" class="pv-chip" data-c="' + esc(c[0]) + '" aria-pressed="' + (cur === c[0]) + '"' + (c[2] || c[0] === 'all' || cur === c[0] ? '' : ' style="opacity:.45"') + '>' + esc(c[1]) + '<span class="pv-n">' + c[2] + '</span></button>';
        }).join('');
        var all = cur === 'all' ? found : found.filter(function (g) { return g.cat === cur; });
        var pages = Math.ceil(all.length / per); if (pg > pages) pg = pages || 1;
        var shown = all.slice((pg - 1) * per, pg * per);
        res.innerHTML = all.length ? '<div class="pv-grid">' + shown.map(function (g) { return card(g, list.total, page); }).join('') + '</div>' + pager(pages) :
          '<div class="pv-empty"><span style="font-size:17px;font-weight:600;letter-spacing:-.02em">' + (q ? 'По запросу «' + esc(q) + '» гайдов пока нет' : 'В этой категории пока пусто') + '</span><span style="font-size:14px;color:' + MUTED + '">Попробуйте другое слово:</span><div class="pv-sug">' + SUG.map(function (s) { return '<button type="button" data-s="' + esc(s) + '">' + esc(s) + '</button>'; }).join('') + '</div></div>';
        [].forEach.call(chipsEl.querySelectorAll('.pv-chip'), function (b) { b.onclick = function () { cur = b.getAttribute('data-c'); pg = 1; render(); }; });
        [].forEach.call(res.querySelectorAll('.pv-sug button'), function (b) { b.onclick = function () { cur = 'all'; setQ(b.getAttribute('data-s')); }; });
        [].forEach.call(res.querySelectorAll('.pv-pg'), function (b) { b.onclick = function () { pg = +b.getAttribute('data-p'); render(); var t = el.getBoundingClientRect().top + window.scrollY - 90; window.scrollTo({ top: t, behavior: 'smooth' }); }; });
      }
      render();
    }).catch(function (e) { console.warn('[pv]', e); el.innerHTML = '<div class="pv-mono" style="font-size:11px;color:' + MUTED + '">Не удалось загрузить каталог</div>'; });
  }

  function mountGuide(el) {
    var src = el.getAttribute('data-guide');
    var id = new URLSearchParams(location.search).get('g') || el.getAttribute('data-default') || '';
    var key = src + '|' + id;
    if (el.__pv === key) return; el.__pv = key;
    el.classList.add('pv');
    var page = el.getAttribute('data-guide-page') || location.pathname;
    var back = el.getAttribute('data-catalog-page') || '/#catalog';
    el.innerHTML = '<div class="pv-mono" style="font-size:11px;color:' + MUTED + '">Загружаем гайд…</div>';
    catalog(src).then(function (list) {
      var g = list.filter(function (x) { return x.id === id; })[0];
      if (!g) { el.innerHTML = '<div style="padding:40px 0;display:flex;flex-direction:column;gap:14px;align-items:flex-start"><span style="font-size:20px;font-weight:600">Гайд не найден</span><a class="pv-btn dark" href="' + esc(back) + '">В каталог</a></div>'; return; }
      document.title = g.title + ' — гайд';
      var specs = [['Для кого', g.forWho], ['Уровень', g.level], ['Объём', g.pages + ' стр. · ' + g.chapters], ['Собрали', g.teamText]].filter(function (s) { return s[1]; });
      var others = list.filter(function (x) { return x.id !== g.id; });
      el.innerHTML =
        '<section class="pv-hero" style="padding-bottom:clamp(24px,3vw,40px);border-bottom:1px solid ' + RULE + '">' +
          '<div class="pv-hero-cover" style="border-radius:20px;overflow:hidden;box-shadow:0 30px 60px -40px rgba(20,19,23,.45)">' + cover(g, list.total) + '</div>' +
          '<div style="display:flex;flex-direction:column;gap:18px;min-width:0">' +
            '<a href="' + esc(back) + '" style="font-size:14px;font-weight:600;color:' + MUTED + '">← Каталог · ' + esc(g.cat) + '</a>' +
            '<h1 style="margin:0;font-family:' + UI + ';font-weight:700;font-size:clamp(32px,4vw,56px);line-height:1;letter-spacing:-.05em;text-wrap:balance">' + esc(g.title) + '</h1>' +
            (g.lead ? '<p style="margin:0;max-width:62ch;font-size:15.5px;line-height:1.55;text-wrap:pretty">' + esc(g.lead) + '</p>' : '') +
            '<div style="background:#fff;border-radius:20px;padding:6px 20px">' + specs.map(function (s) { return '<div class="pv-spec"><span class="pv-mono" style="font-size:10px;color:' + MUTED + '">' + s[0] + '</span><span style="font-size:14.5px;line-height:1.45">' + esc(s[1]) + '</span></div>'; }).join('') + '</div>' +
            '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="pv-btn dark" href="' + esc(g.pdfUrl) + '" download target="_blank" rel="noopener">Скачать PDF</a></div>' +
          '</div>' +
        '</section>' +
        '<section id="pv-read" class="pv-ws" style="padding:clamp(20px,2.6vw,32px) 0">' +
          '<div style="min-width:0"><div style="display:flex;justify-content:space-between;gap:12px;padding:0 0 18px;align-items:baseline"><span style="font-weight:700;font-size:clamp(26px,3vw,40px);line-height:1;letter-spacing:-.05em">Читать онлайн</span></div><div data-flipbook="' + esc(g.pdfUrl) + '" data-title="' + esc(g.title) + '" data-height="240px" data-view="spread"></div></div>' +
          (g.testUrl ? '<aside id="pv-test" class="pv-side"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:0 0 18px;align-items:baseline"><span style="font-weight:700;font-size:clamp(26px,3vw,40px);line-height:1;letter-spacing:-.05em">Тестирование</span></div><div data-quiz="' + esc(g.testUrl) + '"></div></aside>' : '') +
        '</section>' +
        (others.length ? '<section style="padding:clamp(28px,3.4vw,48px) 0 0;border-top:1px solid ' + RULE + '"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:16px;margin-bottom:18px"><span style="font-weight:700;font-size:clamp(26px,3vw,40px);line-height:1;letter-spacing:-.05em">Другие гайды</span><a class="pv-btn line" href="' + esc(back) + '" style="padding:11px 18px;font-size:13.5px">Весь каталог →</a></div><div class="pv-grid sm">' + others.map(function (x) { return card(x, list.total, page); }).join('') + '</div></section>' : '');
      [].forEach.call(el.querySelectorAll('[data-jump]'), function (a) {
        a.onclick = function (e) { var t = document.getElementById(a.getAttribute('data-jump')); if (!t) return; e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }); };
      });
      load(BASE + 'flipbook.js?v=17'); if (g.testUrl) load(BASE + 'quiz.js?v=13');
    }).catch(function (e) { console.warn('[pv]', e); el.innerHTML = '<div class="pv-mono" style="font-size:11px;color:' + MUTED + '">Не удалось загрузить гайд</div>'; });
  }

  function mountStats(el) {
    var src = el.getAttribute('data-pv-stat-src') || (document.querySelector('[data-catalog],[data-guide]') || {}).getAttribute && (document.querySelector('[data-catalog]') || document.querySelector('[data-guide]')).getAttribute(document.querySelector('[data-catalog]') ? 'data-catalog' : 'data-guide');
    if (!src || el.__pv === src) return; el.__pv = src;
    catalog(src).then(function (list) {
      var kind = el.getAttribute('data-pv-stat');
      var n = kind === 'pages' ? list.reduce(function (s, g) { return s + (+g.pages || 0); }, 0) : kind === 'cats' ? list.map(function (g) { return g.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }).length : list.length;
      el.textContent = n.toLocaleString('ru-RU');
    });
  }

  function scan() {
    document.querySelectorAll('[data-pv-stat]').forEach(mountStats);
    document.querySelectorAll('[data-catalog]').forEach(mountCatalog);
    document.querySelectorAll('[data-guide]').forEach(mountGuide);
  }
  window.PVKit = { scan: scan, cover: cover, catalog: catalog };
  new MutationObserver(function () { clearTimeout(scan.t); scan.t = setTimeout(scan, 50); }).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
})();
