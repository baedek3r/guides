/* baedeker. — виджеты для Тильды.
   Каталог:      <div data-catalog="https://USER.github.io/guides/guides.json" data-guide-page="/guide"></div>
   Страница гайда: <div data-guide="https://USER.github.io/guides/guides.json" data-catalog-page="/#catalog"></div>
   Подключение:  <script src="https://USER.github.io/guides/kit.js"></script>
   Гайд выбирается по адресу страницы: /guide?g=crm */
(function () {
  if (window.PVKit) return;
  var me = document.currentScript && document.currentScript.src;
  var BASE = me ? me.replace(/[^/]*$/, '') : '';
  var INK = '#141317', RULE = '#dddae3', MUTED = '#7d7986', SOFT = '#4a4752', ACC = 'oklch(0.6 0.22 293)', ACC_D = 'oklch(0.5 0.22 293)';
  var MONO = "'JetBrains Mono',ui-monospace,monospace", UI = "'Onest','Helvetica Neue',Helvetica,Arial,sans-serif";

  if (!document.querySelector('link[data-pv-fonts]')) {
    var lf = document.createElement('link');
    lf.rel = 'stylesheet'; lf.setAttribute('data-pv-fonts', '');
    lf.href = 'https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(lf);
  }
  var css = document.createElement('style');
  css.textContent = [
    '.pv,.pv *{box-sizing:border-box}.pv{font-family:' + UI + ';color:' + INK + ';font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}',
    '.pv a{color:' + INK + ';text-decoration:none}',
    '.pv-mono{font-family:' + MONO + ';letter-spacing:.07em;text-transform:uppercase}',
    '.pv-chips{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:22px}',
    '.pv-chip{font:500 10.5px/1 ' + MONO + ';letter-spacing:.06em;text-transform:uppercase;padding:10px 14px;border:1px solid ' + RULE + ';border-radius:999px;background:transparent;color:' + MUTED + ';cursor:pointer;white-space:nowrap;transition:all .2s}',
    '.pv-chip:hover{border-color:' + INK + ';color:' + INK + '}.pv-chip[aria-pressed=true]{background:' + ACC + ';border-color:' + ACC + ';color:#fff}',
    '.pv-pager{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:28px;flex-wrap:wrap}',
    '.pv-pg{min-width:40px;height:40px;padding:0 10px;border:1px solid ' + RULE + ';background:#fff;color:' + INK + ';font:500 12px/1 ' + MONO + ';cursor:pointer;transition:all .15s}',
    '.pv-pg:hover:not(:disabled){border-color:' + INK + '}.pv-pg[aria-current=page]{background:' + INK + ';border-color:' + INK + ';color:#fff}.pv-pg:disabled{opacity:.35;cursor:default}',
    '.pv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,200px),1fr));gap:clamp(14px,1.4vw,20px)}','.pv-card>.pv-cv{height:100%}.pv-card>.pv-cv>div{height:100%}',
    '.pv-grid.sm{grid-template-columns:repeat(auto-fill,minmax(min(100%,190px),1fr))}',
    '.pv-card{display:grid;grid-row:span 2;grid-template-rows:subgrid;row-gap:0;background:#fff;border:1px solid ' + RULE + ';transition:transform .3s,box-shadow .3s,border-color .3s}',
    '.pv-card:hover{transform:translateY(-4px);box-shadow:0 26px 44px -30px rgba(20,19,23,.45);border-color:#c9c5d1}',
    '.pv-card-b{display:flex;flex-direction:column;gap:10px;padding:12px 14px 14px;border-top:1px solid #e9e7ee}',
    '.pv-btn{display:inline-flex;align-items:center;gap:10px;padding:15px 21px;font:500 11.5px/1 ' + MONO + ';letter-spacing:.08em;text-transform:uppercase;border:1px solid ' + INK + ';cursor:pointer;transition:background .15s,color .15s,border-color .15s;white-space:nowrap}',
    '.pv-btn.dark{background:' + INK + ';color:#fff!important}.pv-btn.dark:hover{background:' + ACC_D + ';border-color:' + ACC_D + '}',
    '.pv-btn.line{background:transparent}.pv-btn.line:hover{background:' + INK + ';color:#fff!important}',
    '.pv-hero{display:grid;grid-template-columns:minmax(180px,250px) minmax(0,1fr);gap:clamp(20px,4vw,48px);align-items:start}',
    '.pv-spec{display:grid;grid-template-columns:minmax(90px,140px) minmax(0,1fr);gap:14px;padding:10px 0;border-bottom:1px solid ' + RULE + ';align-items:baseline}',
    '.pv-ws{display:grid;grid-template-columns:minmax(0,1fr) minmax(340px,410px);gap:clamp(14px,1.6vw,22px);align-items:start}',
    '.pv-side{position:sticky;top:76px;display:flex;flex-direction:column}',
    '@media (max-width:1100px){.pv-ws{grid-template-columns:minmax(0,1fr)}.pv-side{position:static}}',
    '@media (max-width:680px){.pv-hero{grid-template-columns:minmax(0,1fr)}.pv-hero-cover{max-width:240px}}'
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
      '<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none"><div style="position:absolute;right:-22cqw;top:-22cqw;width:74cqw;height:74cqw;border-radius:50%;border:.3cqw solid #ece8f7"></div><div style="position:absolute;right:-8cqw;top:-8cqw;width:46cqw;height:46cqw;border-radius:50%;background:#f4f1fc"></div></div>' +
      '<div style="position:relative;margin-top:auto;display:flex;flex-direction:column;gap:3.4cqw">' +
        '<span style="align-self:flex-start;padding:1.3cqw 2.4cqw;border-radius:99cqw;background:' + INK + ';' + m(2.3, '#fff') + '">' + esc(g.cat) + '</span>' +
        '<div style="font-weight:800;font-size:11.4cqw;line-height:.94;letter-spacing:-.045em"><span style="display:block">' + esc(g.big1) + '</span><span style="display:block;color:' + ACC_D + '">' + esc(g.big2) + '</span></div>' +
        '<div style="font-size:4.1cqw;line-height:1.22;font-weight:500;letter-spacing:-.02em;color:' + SOFT + ';max-width:76cqw;text-wrap:balance">' + esc(g.sub) + '</div>' +
      '</div>' +
      '<div style="position:relative;margin-top:7cqw;padding-top:4.2cqw;border-top:.25cqw solid #e6e3ec;display:grid;grid-template-columns:1.25fr 1fr;gap:4cqw">' +
        '<div style="display:flex;flex-direction:column;gap:1.4cqw"><span style="' + m(2.1, '#8b8794') + '">Для кого</span><span style="font-size:3.3cqw;line-height:1.25;font-weight:600">' + esc(g.forShort) + '</span></div>' +
        '<div style="display:flex;flex-direction:column;gap:1.4cqw"><span style="' + m(2.1, '#8b8794') + '">Уровень</span><span style="font-size:3.3cqw;line-height:1.25;font-weight:600">' + esc(g.level) + '</span></div>' +
      '</div>' +
      '<div style="position:relative;margin-top:4.6cqw;display:flex;justify-content:space-between;align-items:center;gap:3cqw;' + m(2.2, '#8b8794') + '"><span style="display:flex;gap:1.4cqw;flex-wrap:wrap"><span style="' + pill + '">' + g.pages + ' стр.</span><span style="' + pill + '">' + esc(g.chapters) + '</span></span>' + (g.author ? '<span style="color:' + INK + ';font-weight:500;text-transform:none;letter-spacing:0;font-size:2.6cqw">' + esc(g.author) + '</span>' : '') + '</div>' +
    '</div></div>';
  }
  function card(g, total, page) {
    return '<a class="pv-card" href="' + esc(guideHref(page, g)) + '">' + cover(g, total, true) +
      '<div class="pv-card-b"><span style="font-size:14.5px;line-height:1.25;font-weight:600;letter-spacing:-.015em;text-wrap:balance">' + esc(g.title) + '</span><span class="pv-mono" style="margin-top:auto;font-size:10px;color:' + ACC_D + '">Открыть →</span></div></a>';
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
      function render() {
        var chips = '<div class="pv-chips">' + [['all', 'Все', list.length]].concat(cats.map(function (c) { return [c, c, list.filter(function (g) { return g.cat === c; }).length]; })).map(function (c) {
          return '<button type="button" class="pv-chip" data-c="' + esc(c[0]) + '" aria-pressed="' + (cur === c[0]) + '">' + esc(c[1]) + ' ' + c[2] + '</button>';
        }).join('') + '</div>';
        var all = cur === 'all' ? list : list.filter(function (g) { return g.cat === cur; });
        var pages = Math.ceil(all.length / per); if (pg > pages) pg = pages || 1;
        var shown = all.slice((pg - 1) * per, pg * per);
        el.innerHTML = (cats.length > 1 ? chips : '') + '<div class="pv-grid">' + shown.map(function (g) { return card(g, list.total, page); }).join('') + '</div>' + pager(pages);
        [].forEach.call(el.querySelectorAll('.pv-chip'), function (b) { b.onclick = function () { cur = b.getAttribute('data-c'); pg = 1; render(); }; });
        [].forEach.call(el.querySelectorAll('.pv-pg'), function (b) { b.onclick = function () { pg = +b.getAttribute('data-p'); render(); var t = el.getBoundingClientRect().top + window.scrollY - 90; window.scrollTo({ top: t, behavior: 'smooth' }); }; });
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
      var specs = [['Для кого', g.forWho], ['Уровень', g.level], ['Объём', g.pages + ' стр. · ' + g.chapters], ['Собрали', g.teamText], ['Сквозной кейс', g.caseName]].filter(function (s) { return s[1]; });
      var others = list.filter(function (x) { return x.id !== g.id; });
      el.innerHTML =
        '<section class="pv-hero" style="padding-bottom:clamp(24px,3vw,40px);border-bottom:1px solid ' + RULE + '">' +
          '<div class="pv-hero-cover" style="border:1px solid ' + RULE + ';box-shadow:0 30px 60px -40px rgba(20,19,23,.45)">' + cover(g, list.total) + '</div>' +
          '<div style="display:flex;flex-direction:column;gap:18px;min-width:0">' +
            '<a class="pv-mono" href="' + esc(back) + '" style="font-size:11px;color:' + MUTED + '">← Каталог · ' + esc(g.cat) + '</a>' +
            '<h1 style="margin:0;font-family:' + MONO + ';font-weight:400;font-size:clamp(26px,3vw,42px);line-height:1.06;letter-spacing:-.045em;text-wrap:balance">' + esc(g.title) + '</h1>' +
            (g.lead ? '<p style="margin:0;max-width:62ch;font-size:15.5px;line-height:1.55;text-wrap:pretty">' + esc(g.lead) + '</p>' : '') +
            '<div style="border-top:1px solid ' + INK + '">' + specs.map(function (s) { return '<div class="pv-spec"><span class="pv-mono" style="font-size:10px;color:' + MUTED + '">' + s[0] + '</span><span style="font-size:14.5px;line-height:1.45">' + esc(s[1]) + '</span></div>'; }).join('') + '</div>' +
            '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="pv-btn dark" href="#pv-read" data-jump="pv-read">Читать онлайн →</a><a class="pv-btn line" href="' + esc(g.pdfUrl) + '" download target="_blank" rel="noopener">Скачать PDF</a>' + (g.testUrl ? '<a class="pv-btn line" href="#pv-test" data-jump="pv-test" style="border-color:' + RULE + ';color:' + SOFT + '">Тест</a>' : '') + '</div>' +
          '</div>' +
        '</section>' +
        '<section id="pv-read" class="pv-ws" style="padding:clamp(20px,2.6vw,32px) 0">' +
          '<div style="min-width:0"><div data-flipbook="' + esc(g.pdfUrl) + '" data-title="' + esc(g.title) + '" data-height="min(82vh,900px)"></div></div>' +
          (g.testUrl ? '<aside id="pv-test" class="pv-side"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:0 2px 10px;min-height:46px"><span style="font-family:' + MONO + ';font-size:19px;letter-spacing:-.03em">Тест по гайду</span><span class="pv-mono" style="font-size:10px;color:' + MUTED + '">по желанию</span></div><div data-quiz="' + esc(g.testUrl) + '" style="min-height:440px"></div></aside>' : '') +
        '</section>' +
        (others.length ? '<section style="padding:clamp(28px,3.4vw,48px) 0 0;border-top:1px solid ' + RULE + '"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:16px;margin-bottom:18px"><span style="font-family:' + MONO + ';font-size:20px;letter-spacing:-.03em">Другие гайды</span><a class="pv-mono" href="' + esc(back) + '" style="font-size:11px;border-bottom:1px solid ' + INK + ';padding-bottom:3px">Весь каталог</a></div><div class="pv-grid sm">' + others.map(function (x) { return card(x, list.total, page); }).join('') + '</div></section>' : '');
      [].forEach.call(el.querySelectorAll('[data-jump]'), function (a) {
        a.onclick = function (e) { var t = document.getElementById(a.getAttribute('data-jump')); if (!t) return; e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }); };
      });
      load(BASE + 'flipbook.js'); if (g.testUrl) load(BASE + 'quiz.js');
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
