/* sherpa. — виджеты для Тильды.
   Каталог:      <div data-catalog="https://USER.github.io/guides/guides.json" data-guide-page="/guide"></div>
   Страница гайда: <div data-guide="https://USER.github.io/guides/guides.json" data-catalog-page="/#catalog"></div>
   Подключение:  <script src="https://USER.github.io/guides/kit.js"></script>
   Гайд выбирается по адресу страницы: /guide?g=crm */
(function () {
  if (window.PVKit) return;
  var me = document.currentScript && document.currentScript.src;
  var BASE = me ? me.replace(/[^/]*$/, '') : '';
  var INK = 'var(--pv-ink,#141317)', RULE = 'var(--pv-rule,#dddae3)', MUTED = 'var(--pv-muted,#7d7986)', SOFT = 'var(--pv-soft,#4a4752)', ACC = INK, ACC_D = INK, CARD = 'var(--pv-card,#fff)', CHIP = 'var(--pv-chip,#e9e7ee)';
  var CINK = '#141317', CSOFT = '#4a4752';
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
    ':root{--pv-bg:#f7f6f9;--pv-ink:#141317;--pv-rule:#dddae3;--pv-muted:#7d7986;--pv-soft:#4a4752;--pv-card:#ffffff;--pv-chip:#e9e7ee;--pv-chip-h:#dddae3;--pv-bg2:#faf9fb;--pv-rule2:#e6e3ea;--pv-grid:#e9e7ee;--pv-tk-ink:#141317;--pv-tk-fg:#ffffff;color-scheme:light}',
    ':root[data-theme=dark]{--pv-bg:#0e0d11;--pv-ink:#f1f0f4;--pv-rule:#29272f;--pv-muted:#8f8b99;--pv-soft:#b8b4c1;--pv-card:#17161b;--pv-chip:#221f27;--pv-chip-h:#2d2a33;--pv-bg2:#131217;--pv-rule2:#24222a;--pv-grid:#17161b;--pv-tk-ink:#f1f0f4;--pv-tk-fg:#0e0d11;color-scheme:dark}',
    'html,body{background:var(--pv-bg)}body,body *{transition-property:background-color,border-color,color;transition-duration:0s}html.pv-tt body,html.pv-tt body *{transition-duration:.25s!important}',
    '::view-transition-group(pv-cover){animation-duration:.5s;animation-timing-function:cubic-bezier(.2,.8,.2,1)}::view-transition-old(root),::view-transition-new(root){animation-duration:.22s}',
    '@media (prefers-reduced-motion:reduce){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}}',
    '.pv-hero-cover{view-transition-name:pv-cover}',
    '.pv-ic{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:34px;min-width:34px;padding:0 10px;border:1px solid var(--pv-rule);border-radius:8px;background:var(--pv-card);color:var(--pv-ink);font:500 13px/1 ' + UI + ';cursor:pointer;transition:background .15s,border-color .15s}.pv-ic:hover{background:var(--pv-chip)}',
    '.pv-kbd{white-space:nowrap;font:500 10.5px/1 ' + MONO + ';padding:3px 5px;border:1px solid var(--pv-rule);border-radius:4px;color:var(--pv-muted);background:var(--pv-bg)}',
    '.pv-k{position:fixed;inset:0;z-index:10000;display:flex;justify-content:center;align-items:flex-start;padding:12vh 16px 16px;background:rgba(14,13,17,0);backdrop-filter:blur(0);transition:background .16s,backdrop-filter .16s;font-family:' + UI + ';color:var(--pv-ink);-webkit-font-smoothing:antialiased}',
    '.pv-k.on{background:rgba(14,13,17,.38);backdrop-filter:blur(3px)}.pv-k-p{width:min(640px,100%);max-height:72vh;display:flex;flex-direction:column;background:var(--pv-card);border:1px solid var(--pv-rule);border-radius:12px;box-shadow:0 30px 80px -30px rgba(14,13,17,.55);overflow:hidden;opacity:0;transform:translateY(-6px) scale(.985);transition:opacity .16s,transform .16s}.pv-k.on .pv-k-p{opacity:1;transform:none}',
    '.pv-k-i{display:flex;align-items:center;gap:12px;padding:0 16px;border-bottom:1px solid var(--pv-rule)}.pv-k-i input{flex:1;height:54px;border:0;outline:0;background:transparent;color:var(--pv-ink);font:400 16px/1 ' + UI + ';letter-spacing:-.01em}.pv-k-i input::placeholder{color:var(--pv-muted)}',
    '.pv-k-l{overflow:auto;padding:6px;overscroll-behavior:contain}.pv-k-h{padding:10px 10px 6px;font:500 10px/1 ' + MONO + ';letter-spacing:.08em;text-transform:uppercase;color:var(--pv-muted)}',
    '.pv-k-r{display:grid;grid-template-columns:22px minmax(0,1fr) auto;align-items:center;gap:12px;width:100%;min-height:46px;padding:6px 10px;border:0;border-radius:8px;background:transparent;color:var(--pv-ink);text-align:left;cursor:pointer;font:inherit}.pv-k-r[aria-selected=true]{background:var(--pv-chip)}',
    '.pv-k-r b{display:block;font-weight:500;font-size:14px;line-height:1.3;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pv-k-r small{display:block;font-size:12px;line-height:1.3;color:var(--pv-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pv-k-r mark{background:transparent;color:inherit;font-weight:700}',
    '.pv-k-x{cursor:pointer;transition:background .15s,color .15s}.pv-k-x:hover{background:var(--pv-chip);color:var(--pv-ink)}','.pv-sg{white-space:nowrap;height:26px;padding:0 9px;border:1px solid var(--pv-rule);border-radius:6px;background:transparent;color:var(--pv-ink);font:500 12px/1 ' + UI + ';cursor:pointer;transition:background .15s}.pv-sg:hover{background:var(--pv-chip)}.pv-lnk{border:0;background:none;padding:0;font:inherit;font-weight:600;color:var(--pv-ink);text-decoration:underline;text-underline-offset:3px;cursor:pointer}','.pv-k-sw{width:22px;height:22px;border-radius:5px;display:flex;align-items:center;justify-content:center;font:700 10px/1 ' + MONO + ';color:#fff}.pv-k-t{font:500 11px/1 ' + MONO + ';color:var(--pv-muted)}',
    '.pv-k-f{display:flex;gap:14px;padding:10px 16px;border-top:1px solid var(--pv-rule);font-size:12px;color:var(--pv-muted)}.pv-k-f span{display:inline-flex;align-items:center;gap:6px}.pv-k-e{padding:28px 12px;text-align:center;font-size:14px;color:var(--pv-muted)}',
    '.pv-pop{position:fixed;z-index:9000;width:300px;padding:16px;background:var(--pv-card);color:var(--pv-ink);border:1px solid var(--pv-rule);border-radius:10px;box-shadow:0 24px 60px -28px rgba(14,13,17,.45);font-family:' + UI + ';font-size:13px;line-height:1.45;pointer-events:none;opacity:0;transform:translateY(4px);transition:opacity .14s,transform .14s;-webkit-font-smoothing:antialiased}.pv-pop.on{opacity:1;transform:none}',
    '.pv-pop-f{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;padding:12px 0;border-top:1px solid var(--pv-rule);border-bottom:1px solid var(--pv-rule)}.pv-pop-f span{display:block;font:500 9.5px/1.2 ' + MONO + ';letter-spacing:.08em;text-transform:uppercase;color:var(--pv-muted);margin-bottom:3px}',
    '.pv-tag{display:inline-flex;padding:4px 7px;border-radius:5px;background:var(--pv-chip);font:500 11px/1 ' + MONO + ';color:var(--pv-ink)}',
    '.pv-prog{display:block;height:3px;border-radius:2px;background:var(--pv-chip);overflow:hidden}.pv-prog i{display:block;height:100%;border-radius:2px}',
    '@media (max-width:420px){.pv-pulse{grid-template-columns:minmax(0,1fr)!important}}','.pv-Lw{display:block}',
    '.pv-L{background:var(--pv-card);border:1px solid var(--pv-rule);border-radius:12px;overflow:hidden}.pv-L .pv-k-i{position:sticky;top:0}.pv-L .pv-k-l{overflow:visible;padding:6px}',
    '.pv-Lc{display:flex;gap:6px;flex-wrap:wrap;padding:10px 12px;border-bottom:1px solid var(--pv-rule)}.pv-Lc button{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 10px;border:1px solid var(--pv-rule);border-radius:6px;background:transparent;color:var(--pv-ink);font:500 12.5px/1 ' + UI + ';cursor:pointer;transition:background .15s,border-color .15s}.pv-Lc button:hover{background:var(--pv-chip)}.pv-Lc button[aria-pressed=true]{background:var(--pv-ink);border-color:var(--pv-ink);color:var(--pv-bg)}.pv-Lc button i{font:500 10.5px/1 ' + MONO + ';font-style:normal;opacity:.55}',
    'a.pv-k-r{text-decoration:none!important;color:var(--pv-ink)!important}.pv-k-r .pv-go{display:none}.pv-k-r[aria-selected=true] .pv-go{display:inline}.pv-k-r[aria-selected=true] .pv-k-t2{display:none}',
    '.pv-Ld{position:sticky;top:76px;background:var(--pv-card);border:1px solid var(--pv-rule);border-radius:12px;padding:16px;font-size:13px;line-height:1.45}',
    '@media (max-width:640px){.pv-L .pv-k-f{display:none}.pv-L .pv-k-r{min-height:52px}}',
    '.pv-pulse{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--pv-rule);border:1px solid var(--pv-rule);border-radius:10px;overflow:hidden}.pv-pulse>div{background:var(--pv-card);padding:14px 16px;display:flex;flex-direction:column;gap:6px;min-width:0}',
    '.pv-up{color:#12a150}.pv-dn{color:#e5341f}:root[data-theme=dark] .pv-up{color:#3ddc84}',
    '.pv,.pv *{box-sizing:border-box}.pv{font-family:' + UI + ';color:' + INK + ';font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}',
    '.pv a{color:' + INK + ';text-decoration:none}',
    '.pv-mono{font-family:' + MONO + ';letter-spacing:.07em;text-transform:uppercase}',
    '.pv-chips{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:22px}',
    '.pv-chip{font:500 13.5px/1 ' + UI + ';letter-spacing:-.01em;padding:8px 12px;border:0;border-radius:8px;background:var(--pv-chip,#e9e7ee);color:' + INK + ';cursor:pointer;white-space:nowrap;transition:all .2s}',
    '.pv-chip{display:inline-flex;align-items:center;gap:8px}.pv-n{font-family:' + MONO + ';font-size:11px;font-weight:500;letter-spacing:0;opacity:.5}.pv-chip:hover{background:var(--pv-chip-h,#dddae3)}.pv-chip[aria-pressed=true]{background:' + INK + ';color:var(--pv-bg,#fff)}',
    '.pv-pager{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:28px;flex-wrap:wrap}',
    '.pv-pg{min-width:32px;height:32px;padding:0 10px;border:0;border-radius:8px;background:var(--pv-chip,#e9e7ee);color:' + INK + ';font:500 13px/1 ' + UI + ';cursor:pointer;transition:all .15s}',
    '.pv-pg:hover:not(:disabled){background:var(--pv-chip-h,#dddae3)}.pv-pg[aria-current=page]{background:' + INK + ';border-color:' + INK + ';color:var(--pv-bg,#fff)}.pv-pg:disabled{opacity:.35;cursor:default}',
    '.pv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(max(140px,calc((100% - 60px)/6)),1fr));gap:12px}','.pv-card>.pv-cv{height:100%}.pv-card>.pv-cv>div{height:100%}',
    '.pv-grid.sm{grid-template-columns:repeat(auto-fill,minmax(min(100%,190px),1fr))}',
    '.pv-card{display:grid;grid-row:span 2;grid-template-rows:subgrid;row-gap:0;background:' + CARD + ';border:0;border-radius:10px;overflow:hidden;transition:transform .3s,box-shadow .3s}',
    '.pv-card:hover{box-shadow:0 0 0 1px var(--pv-muted,#c9c5d1)}',
    '.pv-card-b{display:flex;flex-direction:column;gap:6px;padding:10px 12px 12px;border-top:1px solid var(--pv-chip,#efedf3)}',
    '.pv-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;font:500 13.5px/1 ' + UI + ';letter-spacing:-.01em;border:0;border-radius:8px;cursor:pointer;transition:background .15s,color .15s,border-color .15s;white-space:nowrap}',
    '.pv-btn.dark{background:' + INK + ';color:var(--pv-bg,#fff)!important}.pv-btn.dark:hover{background:var(--pv-soft,#2e2c34);border-color:var(--pv-soft,#2e2c34)}',
    '.pv-btn.line{background:var(--pv-chip,#e9e7ee);color:' + INK + '!important}.pv-btn.line:hover{background:var(--pv-chip-h,#dddae3)}',
    '.pv-hero{display:grid;grid-template-columns:minmax(180px,250px) minmax(0,1fr);gap:clamp(20px,4vw,48px);align-items:start}',
    '.pv-spec{display:grid;grid-template-columns:minmax(90px,140px) minmax(0,1fr);gap:14px;padding:12px 0;border-bottom:1px solid var(--pv-chip,#efedf3);align-items:baseline}.pv-spec:last-child{border-bottom:0}',
    '.pv-ws{display:grid;grid-template-columns:calc(400px + clamp(24px,3vw,48px)) minmax(0,1fr);gap:0;align-items:stretch}.pv-ws>div:first-child{padding-right:clamp(24px,3vw,48px)}.pv-ws>.pv-side{padding-left:clamp(24px,3vw,48px);border-left:1px solid ' + RULE + '}',
    '.pv-side{position:sticky;top:76px;display:flex;flex-direction:column}',
    '@media (max-width:980px){.pv-ws{grid-template-columns:minmax(0,1fr)}.pv-ws>div:first-child{padding:0 0 28px}.pv-ws>.pv-side{position:static;padding:28px 0 0;border-left:0;border-top:1px solid ' + RULE + '}}',
    '@media (max-width:680px){.pv-hero{grid-template-columns:minmax(0,1fr)}.pv-hero-cover{max-width:240px}}',
    '.pv-bar{display:flex;align-items:center;gap:12px 16px;flex-wrap:wrap;margin-bottom:22px}.pv-bar .pv-chips{margin:0;flex:1 1 auto;min-width:0}',
    '.pv-q{position:relative;flex:0 1 340px;min-width:220px}.pv-q input{width:100%;height:36px;padding:0 36px 0 38px;border:1px solid ' + RULE + ';border-radius:8px;background:' + CARD + ';font:500 14.5px/1 ' + UI + ';letter-spacing:-.01em;color:' + INK + ';outline:0;transition:border-color .15s,box-shadow .15s;-webkit-appearance:none}',
    '.pv-q input::placeholder{color:var(--pv-muted,#8b8794)}.pv-q input:focus{border-color:' + INK + ';box-shadow:0 0 0 3px rgba(20,19,23,.08)}.pv-q input::-webkit-search-cancel-button{display:none}',
    '.pv-q svg{position:absolute;left:15px;top:50%;transform:translateY(-50%);pointer-events:none}.pv-qx{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:30px;height:30px;border:0;border-radius:50%;background:var(--pv-chip,#efedf3);color:' + INK + ';font:500 16px/1 ' + UI + ';cursor:pointer;display:none}.pv-qx.on{display:block}.pv-qx:hover{background:var(--pv-chip-h,#dddae3)}',
    '.pv-empty{padding:40px 20px;border-radius:10px;background:' + CARD + ';display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center}',
    '.pv-sug{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.pv-sug button{padding:7px 11px;border:0;border-radius:6px;background:var(--pv-chip,#efedf3);font:600 13px/1 ' + UI + ';color:' + INK + ';cursor:pointer}.pv-sug button:hover{background:var(--pv-chip-h,#dddae3)}',
    '.pv-card-m{display:none}','@media (max-width:640px){.pv-k-lbl,.pv-ic .pv-kbd{display:none}.pv-k{padding-top:8px}.pv-k-p{max-height:86vh}}',
    '.pv-fbtn{display:none}.pv-sheet{position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-end;background:rgba(20,19,23,0);transition:background .2s;font-family:' + UI + ';color:' + INK + '}.pv-sheet.on{background:rgba(20,19,23,.4)}',
    '.pv-sheet-p{width:100%;background:' + CARD + ';border-radius:14px 14px 0 0;padding:8px 16px calc(16px + env(safe-area-inset-bottom));transform:translateY(100%);transition:transform .25s cubic-bezier(.2,.8,.2,1);max-height:80vh;overflow:auto}.pv-sheet.on .pv-sheet-p{transform:none}',
    '.pv-sheet-h{width:36px;height:4px;border-radius:4px;background:var(--pv-chip-h,#dddae3);margin:0 auto 14px}.pv-opt{display:flex;align-items:center;gap:12px;width:100%;min-height:52px;padding:0 4px;border:0;border-bottom:1px solid var(--pv-chip,#efedf3);background:none;font:600 16px/1.2 ' + UI + ';letter-spacing:-.015em;color:' + INK + ';text-align:left;cursor:pointer}.pv-opt:last-child{border-bottom:0}',
    '.pv-opt i{width:20px;height:20px;border-radius:50%;border:1.6px solid var(--pv-muted,#c9c5d1);flex:none;position:relative}.pv-opt[aria-checked=true] i{border-color:' + INK + '}.pv-opt[aria-checked=true] i:after{content:"";position:absolute;inset:3.5px;border-radius:50%;background:' + INK + '}.pv-opt .pv-n{margin-left:auto}',
    '@media (max-width:640px){.pv-bar{flex-wrap:nowrap;gap:8px;margin-bottom:16px}.pv-bar .pv-chips{display:none!important}.pv-q{flex:1 1 auto;min-width:0}.pv-q input{height:46px;font-size:16px}',
    '.pv-fbtn{display:inline-flex;align-items:center;gap:8px;flex:none;height:46px;max-width:46%;padding:0 14px 0 16px;border:0;border-radius:8px;background:' + INK + ';color:var(--pv-bg,#fff);font:600 14px/1 ' + UI + ';letter-spacing:-.01em;cursor:pointer}.pv-fbtn span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.pv-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.pv-card{border-radius:10px;box-shadow:0 1px 0 var(--pv-chip,#e9e7ee)}.pv-card:hover{transform:none;box-shadow:0 1px 0 var(--pv-chip,#e9e7ee)}',
    '.pv-card .pv-cv>div{padding:10cqw 8cqw 8cqw!important;aspect-ratio:1/1!important}.pv-card .pv-cv-logo{font-size:9cqw!important;margin:0 0 6cqw!important;text-align:left!important}',
    '.pv-card .pv-cv-cat{font-size:5.4cqw!important;padding:2.2cqw 4.2cqw!important}.pv-card .pv-cv-big{font-size:13cqw!important}.pv-card .pv-cv-sub,.pv-card .pv-cv-meta{display:none!important}',
    '.pv-card-b{padding:12px 12px 12px;gap:6px}.pv-card-t{font-size:13.5px!important;line-height:1.25!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.pv-card-m{display:block;font-size:11.5px;line-height:1.3;color:' + MUTED + '}',
    '.pv-card-go{margin-top:6px!important;display:flex!important;align-items:center;justify-content:center;height:36px;border-radius:8px;background:' + INK + ';color:var(--pv-bg,#fff)!important;font-size:13px!important}}'
  ].join('');
  document.head.appendChild(css);

  var PDF_NAMES = {};
  function saveBlob(blob, name) { var u = URL.createObjectURL(blob), a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 4000); }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[download]'); if (!a) return;
    var href = a.href; if (!/\.pdf(\?|#|$)/i.test(href)) return;
    e.preventDefault();
    var name = a.getAttribute('data-filename') || PDF_NAMES[href] || decodeURIComponent(href.split('/').pop().split('?')[0]);
    if (a.dataset.busy) return; a.dataset.busy = '1'; a.style.opacity = '.6';
    fetch(href, { mode: 'cors' }).then(function (r) { if (!r.ok) throw r.status; return r.blob(); })
      .then(function (b) { saveBlob(b, name); })
      .catch(function () { window.open(href, '_blank', 'noopener'); })
      .then(function () { delete a.dataset.busy; a.style.opacity = ''; });
  }, true);
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function load(src) {
    return new Promise(function (res, rej) {
      if (document.querySelector('script[src="' + src + '"]')) return res();
      var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }
  var cache = {}, PVG = {};
  var PK = 'pv-progress';
  function progAll() { try { return JSON.parse(localStorage.getItem(PK) || '{}'); } catch (e) { return {}; } }
  function prog(id) { var p = progAll()[id]; if (!p || !p.total || p.p < 2) return null; return { p: p.p, total: p.total, t: p.t, pct: Math.min(100, Math.round(p.p / p.total * 100)) }; }
  function saveProg(id, p, total) { try { var a = progAll(); a[id] = { p: p, total: total, t: Date.now() }; localStorage.setItem(PK, JSON.stringify(a)); } catch (e) {} }
  function quizBest(g) { try { return g.testUrl ? +localStorage.getItem('quiz-best:' + g.testUrl) || 0 : 0; } catch (e) { return 0; } }
  function fmt(n) { return Number(n).toLocaleString('ru-RU'); }
  function readTime(g) { var m = Math.round((+g.pages || 0) * 2.5); return m < 60 ? m + ' мин' : '≈ ' + (Math.round(m / 30) / 2).toString().replace('.', ',') + ' ч'; }
  function catalog(url) {
    url = new URL(url, location.href).href;
    if (!cache[url]) cache[url] = fetch(url, { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
      var list = (d.guides || d).filter(function (g) { return !g.hidden; });
      list.forEach(function (g, i) {
        g.idx = String(i + 1).padStart(2, '0');
        g.pdfUrl = new URL(g.pdf, url).href; g.pdfName = 'sherpa — ' + g.title.replace(/[\\/:*?"<>|]/g, ' ').replace(/\s+/g, ' ').trim() + '.pdf'; PDF_NAMES[g.pdfUrl] = g.pdfName;
        g.testUrl = g.test ? new URL(g.test, url).href : '';
        g.teamText = (g.team || []).join(', ');
        g.href = ''; PVG[g.id] = g;
      });
      list.total = list.length;
      return list;
    });
    return cache[url];
  }
  function guideHref(page, g) { return (page || '') + (page && page.indexOf('?') > -1 ? '&' : '?') + 'g=' + encodeURIComponent(g.id); }

  function cover(g, total, compact) {
    var m = function (sz, c, extra) { return 'font-family:' + MONO + ';font-size:' + sz + 'cqw;letter-spacing:.08em;text-transform:uppercase;color:' + c + ';' + (extra || ''); };
    var pill = 'padding:1.1cqw 2cqw;border-radius:1.2cqw;background:#f3f2f6;color:' + CINK + ';white-space:nowrap';
    return '<div class="pv-cv" style="container-type:inline-size;width:100%"><div style="position:relative;width:100%;aspect-ratio:' + (compact ? 'auto' : '3/4') + ';background:#fff;display:flex;flex-direction:column;padding:' + (compact ? '16cqw 8cqw 6.5cqw' : '8cqw 8cqw 6.5cqw') + ';font-family:' + UI + ';color:' + CINK + '">' +
      '<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none"><div style="position:absolute;right:-20cqw;top:-20cqw;width:56cqw;height:56cqw;border-radius:50%;border:.3cqw solid #e8e7ec"></div><div style="position:absolute;right:-8cqw;top:-8cqw;width:34cqw;height:34cqw;border-radius:50%;background:#f1f0f3"></div></div>' +
      '<div class="pv-cv-logo" style="position:relative;text-align:center;font-family:Manrope,' + UI + ';font-size:' + (compact ? 7 : 6) + 'cqw;letter-spacing:-.05em;line-height:1;color:' + CINK + ';margin:' + (compact ? '-8cqw 0 8cqw' : '0 0 8cqw') + '"><span style="font-weight:300">sher</span><span style="font-weight:800">pa.</span></div>' +
      '<div style="position:relative;margin-top:auto;display:flex;flex-direction:column;gap:3.4cqw">' +
        '<span class="pv-cv-cat" style="align-self:flex-start;padding:1.3cqw 2.4cqw;border-radius:1.2cqw;background:' + CINK + ';' + m(2.3, '#fff') + '">' + esc(g.cat) + '</span>' +
        '<div class="pv-cv-big" style="font-weight:800;font-size:11.4cqw;line-height:.94;letter-spacing:-.045em"><span style="display:block">' + esc(g.big1) + '</span><span style="display:block;color:' + accentOf(g) + '">' + esc(g.big2) + '</span></div>' +
        '<div class="pv-cv-sub" style="font-size:4.1cqw;line-height:1.22;font-weight:500;letter-spacing:-.02em;color:' + CSOFT + ';max-width:76cqw;text-wrap:balance">' + esc(g.sub) + '</div>' +
      '</div>' +
      '<div class="pv-cv-meta" style="position:relative;margin-top:7cqw;padding-top:4.2cqw;border-top:.25cqw solid #e6e3ec;display:grid;grid-template-columns:1.25fr 1fr;gap:4cqw">' +
        '<div style="display:flex;flex-direction:column;gap:1.6cqw"><span style="' + m(compact ? 2.8 : 2.1, '#8b8794') + '">Для кого</span><span style="font-size:' + (compact ? 4.6 : 3.3) + 'cqw;line-height:1.25;font-weight:600">' + esc(g.forShort) + '</span></div>' +
        '<div style="display:flex;flex-direction:column;gap:1.6cqw"><span style="' + m(compact ? 2.8 : 2.1, '#8b8794') + '">Уровень</span><span style="font-size:' + (compact ? 4.6 : 3.3) + 'cqw;line-height:1.25;font-weight:600">' + esc(g.level) + '</span></div>' +
      '</div>' +
      (compact ? '' : '<div style="position:relative;margin-top:4.6cqw;display:flex;justify-content:space-between;align-items:center;gap:3cqw;' + m(2.2, '#8b8794') + '"><span style="display:flex;gap:1.4cqw;flex-wrap:wrap"><span style="' + pill + '">' + g.pages + ' стр.</span><span style="' + pill + '">' + esc(g.chapters) + '</span></span>' + (g.author ? '<span style="color:' + CINK + ';font-weight:500;text-transform:none;letter-spacing:0;font-size:2.6cqw">' + esc(g.author) + '</span>' : '') + '</div>') +
    '</div></div>';
  }
  function card(g, total, page) {
    var pr = prog(g.id), pb = pr ? '<span style="display:flex;flex-direction:column;gap:5px"><span class="pv-prog"><i style="width:' + pr.pct + '%;background:' + accentOf(g) + '"></i></span><span style="font:500 10.5px/1 ' + MONO + ';color:' + MUTED + '">' + (pr.pct >= 98 ? 'Прочитано' : 'Прочитано ' + pr.pct + '%') + '</span></span>' : '';
    return '<a class="pv-card" data-id="' + esc(g.id) + '" href="' + esc(guideHref(page, g)) + '">' + cover(g, total, true) +
      '<div class="pv-card-b">' + pb + '<span class="pv-card-t" style="font-size:13px;line-height:1.3;font-weight:500;letter-spacing:-.015em;text-wrap:balance">' + esc(g.title) + '</span><span class="pv-card-m">' + g.pages + ' стр. · ' + esc(g.level) + '</span><span class="pv-card-go" style="margin-top:auto;font-size:13.5px;font-weight:600;letter-spacing:-.01em;color:' + ACC + '">Открыть →</span></div></a>';
  }

  function mountCatalog(el) {
    var src = el.getAttribute('data-catalog');
    if (el.__pv === src) return; el.__pv = src;
    el.classList.add('pv');
    var page = el.getAttribute('data-guide-page') || '/guide';
    el.innerHTML = '<div class="pv-mono" style="font-size:11px;color:' + MUTED + '">Загружаем каталог…</div>';
    var excl = el.getAttribute('data-exclude') || '';
    catalog(src).then(function (list) {
      if (excl) { var tot = list.total; list = list.filter(function (g) { return g.id !== excl; }); list.total = tot; }
      var cats = []; list.forEach(function (g) { if (cats.indexOf(g.cat) < 0) cats.push(g.cat); });
      var cur = 'all', pg = 1, per = Math.max(1, +(el.getAttribute('data-per-page') || 10));
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
      el.innerHTML = '<div class="pv-bar"><div class="pv-chips"></div><label class="pv-q"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" style="color:' + INK + '" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg><input type="search" enterkeyhint="search" autocomplete="off" placeholder="Поиск: маркетинг, EdTech, SQL…" aria-label="Поиск по гайдам"><button type="button" class="pv-qx" aria-label="Очистить">×</button></label>' + (cats.length > 1 ? '<button type="button" class="pv-fbtn" aria-haspopup="dialog"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M1.5 3.5h11M3.5 7h7M5.5 10.5h3"/></svg><span>Все</span></button>' : '') + '</div><div class="pv-res"></div>';
      var chipsEl = el.querySelector('.pv-chips'), res = el.querySelector('.pv-res'), inp = el.querySelector('.pv-q input'), qx = el.querySelector('.pv-qx');
      if (cats.length < 2) chipsEl.style.display = 'none';
      function setQ(v) { q = v; inp.value = v; pg = 1; render(); }
      var tm; inp.oninput = function () { clearTimeout(tm); tm = setTimeout(function () { q = inp.value; pg = 1; render(); }, 120); };
      inp.onkeydown = function (e) { if (e.key === 'Escape') setQ(''); if (e.key === 'Enter') inp.blur(); };
      qx.onclick = function () { setQ(''); inp.focus(); };
      var fbtn = el.querySelector('.pv-fbtn');
      function counts(found) { return [['all', 'Все категории', found.length]].concat(cats.map(function (c) { return [c, c, found.filter(function (g) { return g.cat === c; }).length]; })); }
      if (fbtn) fbtn.onclick = function () {
        var found = q.trim() ? list.filter(match) : list;
        var sh = document.createElement('div'); sh.className = 'pv-sheet'; sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-label', 'Категория');
        sh.innerHTML = '<div class="pv-sheet-p"><div class="pv-sheet-h"></div><div style="font:700 20px/1.1 ' + UI + ';letter-spacing:-.03em;margin:0 4px 6px">Категория</div>' + counts(found).map(function (c) { return '<button type="button" class="pv-opt" role="radio" data-c="' + esc(c[0]) + '" aria-checked="' + (cur === c[0]) + '"><i></i>' + esc(c[1]) + '<span class="pv-n" style="font-family:' + MONO + ';font-size:12px;opacity:.5">' + c[2] + '</span></button>'; }).join('') + '</div>';
        document.body.appendChild(sh); var ov = document.body.style.overflow; document.body.style.overflow = 'hidden';
        requestAnimationFrame(function () { sh.classList.add('on'); });
        function close() { sh.classList.remove('on'); document.body.style.overflow = ov; setTimeout(function () { sh.remove(); }, 250); }
        sh.onclick = function (ev) { if (ev.target === sh) close(); };
        [].forEach.call(sh.querySelectorAll('.pv-opt'), function (b) { b.onclick = function () { cur = b.getAttribute('data-c'); pg = 1; render(); close(); }; });
      };
      function render() {
        var found = q.trim() ? list.filter(match) : list;
        qx.classList.toggle('on', !!q);
        if (fbtn) fbtn.querySelector('span').textContent = cur === 'all' ? 'Все' : cur;
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
      var pr = prog(g.id), mk = g.market, qb = quizBest(g);
      var pulse = mk ? '<div style="display:flex;flex-direction:column;gap:10px"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px"><span class="pv-mono" style="font-size:10px;color:' + MUTED + '">Пульс рынка</span><span style="font-size:12px;color:' + MUTED + '">' + esc(mk.source) + ' · ' + esc(mk.updated) + '</span></div><div class="pv-pulse">' +
        '<div><span class="pv-mono" style="font-size:10px;color:' + MUTED + '">Вакансий за месяц</span><span style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap"><b style="font-size:26px;line-height:1;font-weight:700;letter-spacing:-.04em">' + fmt(mk.vacancies) + '</b><span class="' + (mk.trend >= 0 ? 'pv-up' : 'pv-dn') + '" style="font:600 12px/1 ' + MONO + '">' + (mk.trend >= 0 ? '↑' : '↓') + Math.abs(mk.trend) + '%</span></span></div>' +
        '<div><span class="pv-mono" style="font-size:10px;color:' + MUTED + '">Зарплата</span><b style="font-size:17px;line-height:1.2;font-weight:600;letter-spacing:-.02em">' + esc(mk.salary) + '</b></div>' +
        '<div style="grid-column:1/-1"><span class="pv-mono" style="font-size:10px;color:' + MUTED + '">Чаще всего просят</span><span style="display:flex;gap:6px;flex-wrap:wrap">' + (mk.skills || []).map(function (s) { return '<span class="pv-tag">' + esc(s) + '</span>'; }).join('') + '</span></div>' +
        '</div></div>' : '';
      var cont = pr && pr.pct < 98 ? '<a class="pv-btn line" href="#pv-read" data-jump="pv-read">Продолжить · стр. ' + pr.p + '</a>' : '';
      var stat = pr || qb ? '<div style="display:flex;gap:16px;flex-wrap:wrap;font:500 11px/1.4 ' + MONO + ';color:' + MUTED + '">' + (pr ? '<span style="display:flex;align-items:center;gap:8px"><span class="pv-prog" style="width:80px"><i style="width:' + pr.pct + '%;background:' + accentOf(g) + '"></i></span>Прочитано ' + pr.pct + '%</span>' : '') + (qb ? '<span>Тест: лучший результат ' + qb + '%</span>' : '') + '</div>' : '';
      el.innerHTML =
        '<section class="pv-hero" style="padding-bottom:clamp(24px,3vw,40px);border-bottom:1px solid ' + RULE + '">' +
          '<div class="pv-hero-cover" style="border-radius:10px;overflow:hidden;box-shadow:0 30px 60px -40px rgba(20,19,23,.45)">' + cover(g, list.total) + '</div>' +
          '<div style="display:flex;flex-direction:column;gap:18px;min-width:0">' +
            '<a href="' + esc(back) + '" style="font-size:14px;font-weight:600;color:' + MUTED + '">← Каталог · ' + esc(g.cat) + '</a>' +
            '<h1 style="margin:0;font-family:' + UI + ';font-weight:700;font-size:clamp(32px,4vw,56px);line-height:1;letter-spacing:-.05em;text-wrap:balance">' + esc(g.title) + '</h1>' +
            (g.lead ? '<p style="margin:0;max-width:62ch;font-size:15.5px;line-height:1.55;text-wrap:pretty">' + esc(g.lead) + '</p>' : '') +
            '<div style="background:' + CARD + ';border-radius:10px;padding:6px 20px">' + specs.map(function (s) { return '<div class="pv-spec"><span class="pv-mono" style="font-size:10px;color:' + MUTED + '">' + s[0] + '</span><span style="font-size:14.5px;line-height:1.45">' + esc(s[1]) + '</span></div>'; }).join('') + '</div>' +
            pulse + '<div style="display:flex;gap:10px;flex-wrap:wrap">' + cont + '<a class="pv-btn dark" href="' + esc(g.pdfUrl) + '" download="' + esc(g.pdfName) + '" data-filename="' + esc(g.pdfName) + '" target="_blank" rel="noopener">Скачать PDF</a></div>' + stat +
          '</div>' +
        '</section>' +
        '<section id="pv-read" class="pv-ws" style="padding:clamp(20px,2.6vw,32px) 0">' +
          '<div style="min-width:0"><div style="display:flex;justify-content:space-between;gap:12px;padding:0 0 18px;align-items:baseline"><span style="font-weight:700;font-size:clamp(26px,3vw,40px);line-height:1.05;letter-spacing:-.05em;white-space:nowrap">Читать онлайн</span></div><div data-flipbook="' + esc(g.pdfUrl) + '" data-title="' + esc(g.title) + '" data-height="240px" data-view="spread"' + (pr && pr.pct < 98 ? ' data-start="' + pr.p + '"' : '') + '></div></div>' +
          (g.testUrl ? '<aside id="pv-test" class="pv-side"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:0 0 18px;align-items:baseline"><span style="font-weight:700;font-size:clamp(26px,3vw,40px);line-height:1;letter-spacing:-.05em">Тестирование</span></div><div data-quiz="' + esc(g.testUrl) + '" data-accent="' + esc(accentOf(g)) + '"></div></aside>' : '') +
        '</section>' +
        (others.length ? '<section style="padding:clamp(28px,3.4vw,48px) 0 0;border-top:1px solid ' + RULE + '"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:16px;margin-bottom:18px"><span style="font-weight:700;font-size:clamp(26px,3vw,40px);line-height:1;letter-spacing:-.05em">Другие гайды</span><a class="pv-btn line" href="' + esc(back) + '" style="padding:11px 18px;font-size:13.5px">Весь каталог</a></div><div class="pv-more" data-catalog="' + esc(src) + '" data-guide-page="' + esc(page) + '" data-exclude="' + esc(g.id) + '" data-per-page="' + esc(el.getAttribute('data-more-per-page') || '8') + '"></div></section>' : '');
      var more = el.querySelector('.pv-more'); if (more) mountCatalog(more);
      el.addEventListener('pv:page', function (e) { var d = e.detail || {}; if (d.total && d.page) saveProg(g.id, d.page, d.total); });
      [].forEach.call(el.querySelectorAll('[data-jump]'), function (a) {
        a.onclick = function (e) { var t = document.getElementById(a.getAttribute('data-jump')); if (!t) return; e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }); };
      });
      load(BASE + 'flipbook.js?v=18'); if (g.testUrl) load(BASE + 'quiz.js?v=18');
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


  /* ---------- тема ---------- */
  var TK = 'pv-theme', mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  function themePref() { try { return localStorage.getItem(TK) || ''; } catch (e) { return ''; } }
  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function applyTheme(anim) {
    var p = themePref(), d = p ? p === 'dark' : !!(mq && mq.matches), h = document.documentElement;
    if (anim) { h.classList.add('pv-tt'); setTimeout(function () { h.classList.remove('pv-tt'); }, 320); }
    h.setAttribute('data-theme', d ? 'dark' : 'light');
    document.querySelectorAll('[data-pv-theme]').forEach(paintToggle);
  }
  function setTheme(v) { try { v ? localStorage.setItem(TK, v) : localStorage.removeItem(TK); } catch (e) {} applyTheme(true); }
  function toggleTheme() { setTheme(isDark() ? 'light' : 'dark'); }
  var SUN = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="3"/><path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1"/></svg>';
  var MOON = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M13.6 9.8A5.8 5.8 0 0 1 6.2 2.4a5.8 5.8 0 1 0 7.4 7.4Z"/></svg>';
  function paintToggle(el) {
    if (!el.__pvt) { el.__pvt = 1; el.innerHTML = '<button type="button" class="pv-ic"></button>'; el.firstChild.onclick = toggleTheme; }
    var b = el.firstChild, d = isDark(); b.innerHTML = d ? SUN : MOON; b.setAttribute('aria-label', d ? 'Светлая тема' : 'Тёмная тема'); b.title = d ? 'Светлая тема' : 'Тёмная тема';
  }
  applyTheme(false);
  if (mq) (mq.addEventListener ? mq.addEventListener('change', function () { if (!themePref()) applyTheme(true); }) : mq.addListener(function () { if (!themePref()) applyTheme(true); }));

  /* ---------- ⌘K ---------- */
  var MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  function srcAttr() { var e = document.querySelector('[data-catalog-list]'); if (e) return e.getAttribute('data-catalog-list'); e = document.querySelector('[data-catalog]'); if (e) return e.getAttribute('data-catalog'); e = document.querySelector('[data-guide]'); if (e) return e.getAttribute('data-guide'); return BASE + 'guides.json'; }
  function pageAttr() { var e = document.querySelector('[data-guide-page]'); return e ? e.getAttribute('data-guide-page') : (document.querySelector('[data-guide]') ? location.pathname : '/guide'); }
  function catAttr() { var e = document.querySelector('[data-catalog-page]'); return e ? e.getAttribute('data-catalog-page') : (document.getElementById('catalog') ? '#catalog' : '/#catalog'); }
  function nrm(s) { return String(s || '').toLowerCase().replace(/ё/g, 'е'); }
  function hl(text, ws) { var t = esc(text); ws.forEach(function (w) { if (w.length < 2) return; var i = nrm(t).indexOf(w); if (i > -1) t = t.slice(0, i) + '<mark>' + t.slice(i, i + w.length) + '</mark>' + t.slice(i + w.length); }); return t; }
  var LRU = 'йцукенгшщзхъфывапролджэячсмитьбю', LEN = "qwertyuiop[]asdfghjkl;'zxcvbnm,.";
  function swapLayout(s) { return s.split('').map(function (ch) { var i = LEN.indexOf(ch); if (i > -1) return LRU[i]; i = LRU.indexOf(ch); return i > -1 ? LEN[i] : ch; }).join(''); }
  function lev(a, b) { if (Math.abs(a.length - b.length) > 3) return 9; var p = [], i, j; for (j = 0; j <= b.length; j++) p[j] = j; for (i = 1; i <= a.length; i++) { var c = [i]; for (j = 1; j <= b.length; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[b.length]; }
  function suggest(q, list) {
    var words = [], freq = {};
    list.forEach(function (g) { (g.tags || []).concat([g.cat]).forEach(function (t) { var n = nrm(t); freq[t] = (freq[t] || 0) + 1; if (words.indexOf(t) < 0) words.push(t); }); });
    var alts = [], sw = swapLayout(q);
    if (sw !== q && list.some(function (g) { return g.hay.indexOf(sw) > -1; })) alts.push(sw);
    var best = null, bd = 9, lim = q.length <= 4 ? 1 : 2;
    words.forEach(function (t) { var d = lev(nrm(t), q); if (d > 0 && d <= lim && d < bd) { bd = d; best = t; } });
    if (best && alts.indexOf(nrm(best)) < 0) alts.push(best);
    var tg = function (s) { var o = {}; s = ' ' + s + ' '; for (var i = 0; i < s.length - 2; i++) o[s.substr(i, 3)] = 1; return o; }, qt = tg(q);
    var picks = list.map(function (g) { var h = tg(g.hay), n = 0; for (var t in qt) if (h[t]) n++; return { g: g, n: n }; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 3).map(function (x) { return x.g; });
    var cats = []; list.forEach(function (g) { if (cats.indexOf(g.cat) < 0) cats.push(g.cat); });
    var cn = cats.map(nrm), top = Object.keys(freq).filter(function (t) { return cn.indexOf(nrm(t)) < 0; }).sort(function (a, b) { return freq[b] - freq[a]; }).slice(0, 4);
    return { alts: alts.slice(0, 2), picks: picks, chips: cats.slice(0, 4).concat(top) };
  }
  function emptyHtml(raw, s) {
    return '<div style="padding:14px 10px 6px;display:flex;flex-direction:column;gap:12px;font-size:14px;line-height:1.45">' +
      '<span>По запросу «' + esc(raw) + '» точных совпадений нет.' + (s.alts.length ? ' Возможно, вы имели в виду ' + s.alts.map(function (a) { return '<button type="button" class="pv-lnk" data-s="' + esc(a) + '">' + esc(a) + '</button>'; }).join(' или ') + '?' : '') + '</span>' +
      '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span style="font-size:12px;color:var(--pv-muted);margin-right:2px">Попробуйте:</span>' + s.chips.map(function (c) { return '<button type="button" class="pv-sg" data-s="' + esc(c) + '">' + esc(c) + '</button>'; }).join('') + '</div></div>';
  }
  function mountK(el) {
    if (el.__pvk) return; el.__pvk = 1;
    el.innerHTML = '<button type="button" class="pv-ic" aria-label="Поиск по гайдам"><svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg><span class="pv-k-lbl">Поиск</span><span class="pv-kbd">' + (MAC ? '⌘K' : 'Ctrl K') + '</span></button>';
    el.firstChild.onclick = openK;
  }
  var KO = null;
  function openK() {
    if (KO) return;
    var ov = document.createElement('div'); ov.className = 'pv-k'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Поиск');
    ov.innerHTML = '<div class="pv-k-p"><label class="pv-k-i"><svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" style="color:var(--pv-muted)"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg><input type="text" autocomplete="off" spellcheck="false" placeholder="Профессия, навык или термин: SQL, LTV, Figma…" aria-label="Поиск"><button type="button" class="pv-kbd pv-k-x" aria-label="Закрыть" title="Закрыть">esc</button></label><div class="pv-k-l" role="listbox"></div><div class="pv-k-f"><span><span class="pv-kbd">↑</span><span class="pv-kbd">↓</span>выбрать</span><span><span class="pv-kbd">↵</span>открыть</span><span style="margin-left:auto">sherpa.</span></div></div>';
    document.body.appendChild(ov); KO = ov;
    var ofl = document.body.style.overflow; document.body.style.overflow = 'hidden';
    var inp = ov.querySelector('input'), lst = ov.querySelector('.pv-k-l'), items = [], sel = 0, list = [];
    var prev = document.activeElement;
    requestAnimationFrame(function () { ov.classList.add('on'); inp.focus(); });
    function close() { if (!KO) return; KO = null; ov.classList.remove('on'); document.body.style.overflow = ofl; setTimeout(function () { ov.remove(); }, 170); if (prev && prev.focus) prev.focus(); }
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(); });
    ov.querySelector('.pv-k-x').onclick = function (e) { e.preventDefault(); close(); };
    function go(it) { if (!it) return; if (it.run) { it.run(); close(); return; } close(); location.href = it.href; }
    function draw() {
      var q = nrm(inp.value.trim()), ws = q.split(/[\s,.;]+/).filter(Boolean), page = pageAttr(), groups = [];
      var gl = list.map(function (g) {
        if (!ws.length) return { g: g, s: 0 };
        var s = 0, tag = '';
        for (var i = 0; i < ws.length; i++) {
          var w = ws[i], st = w.length > 5 ? w.slice(0, w.length - 2) : w, ti = nrm(g.title), hit = 0;
          if (ti.indexOf(w) === 0) hit = 6; else if (ti.indexOf(st) > -1) hit = 4; else if (nrm(g.cat).indexOf(st) > -1) hit = 3;
          var tg = (g.tags || []).filter(function (t) { return nrm(t).indexOf(st) > -1; })[0]; if (tg) { hit = Math.max(hit, nrm(tg) === w ? 4 : 2); tag = tag || tg; }
          if (!hit && g.hay.indexOf(st) > -1) hit = 1;
          if (!hit) return null; s += hit;
        }
        return { g: g, s: s, tag: tag };
      }).filter(Boolean).sort(function (a, b) { return b.s - a.s; });
      var mk = function (x) { var g = x.g, pr = prog(g.id); return { href: guideHref(page, g), html: '<span class="pv-k-sw" style="background:' + accentOf(g) + '">' + esc(g.cat.slice(0, 1)) + '</span><span style="min-width:0"><b>' + hl(g.title, ws) + '</b><small>' + esc(g.cat) + ' · ' + esc(g.level) + ' · ' + g.pages + ' стр.' + (pr ? ' · прочитано ' + pr.pct + '%' : '') + '</small></span><span class="pv-k-t">' + (x.tag ? '#' + esc(x.tag) : '↵') + '</span>' }; };
      if (!ws.length) {
        var pa = progAll(), cont = list.filter(function (g) { var p = prog(g.id); return p && p.pct < 98; }).sort(function (a, b) { return (pa[b.id].t || 0) - (pa[a.id].t || 0); }).slice(0, 3);
        if (cont.length) groups.push(['Продолжить чтение', cont.map(function (g) { var it = mk({ g: g }); it.href += '#pv-read'; return it; })]);
        groups.push(['Все гайды', gl.map(mk)]);
      } else if (gl.length) groups.push(['Гайды', gl.map(mk)]);
      var emp = ''; if (ws.length && !gl.length) { var sg = suggest(q, list); emp = emptyHtml(inp.value.trim(), sg); groups.push(['Возможно, подойдёт', sg.picks.map(function (g) { return mk({ g: g }); })]); }
      var acts = [{ t: 'Перейти в каталог', k: 'каталог все гайды', href: catAttr(), ic: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>' }]
        .filter(function (a) { return !ws.length || ws.every(function (w) { return nrm(a.t + ' ' + a.k).indexOf(w) > -1; }); })
        .map(function (a) { return { href: a.href, run: a.run, html: '<span class="pv-k-sw" style="color:var(--pv-ink);background:var(--pv-chip)">' + a.ic + '</span><span><b>' + esc(a.t) + '</b></span><span class="pv-k-t">↵</span>' }; });
      if (acts.length) groups.push(['Действия', acts]);
      items = []; var html = emp;
      groups.forEach(function (gr) { html += '<div class="pv-k-h">' + gr[0] + '</div>'; gr[1].forEach(function (it) { html += '<button type="button" class="pv-k-r" role="option" data-i="' + items.length + '">' + it.html + '</button>'; items.push(it); }); });
      if (!items.length) html = '<div class="pv-k-e">Ничего не нашли по запросу «' + esc(inp.value) + '»</div>';
      lst.innerHTML = html; sel = 0; mark();
      [].forEach.call(lst.querySelectorAll('[data-s]'), function (b) { b.onclick = function () { inp.value = b.getAttribute('data-s'); draw(); inp.focus(); }; });
      [].forEach.call(lst.querySelectorAll('.pv-k-r'), function (b) { b.onmousemove = function () { var i = +b.getAttribute('data-i'); if (i !== sel) { sel = i; mark(true); } }; b.onclick = function () { go(items[+b.getAttribute('data-i')]); }; });
    }
    function mark(noScroll) {
      var rows = lst.querySelectorAll('.pv-k-r'); [].forEach.call(rows, function (r, i) { r.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
      var r = rows[sel]; if (r && !noScroll) { var top = r.offsetTop, bot = top + r.offsetHeight; if (top < lst.scrollTop + 30) lst.scrollTop = Math.max(0, top - 30); else if (bot > lst.scrollTop + lst.clientHeight) lst.scrollTop = bot - lst.clientHeight + 6; }
    }
    inp.oninput = draw;
    ov.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (items.length) { sel = (sel + 1) % items.length; mark(); } }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (items.length) { sel = (sel - 1 + items.length) % items.length; mark(); } }
      else if (e.key === 'Enter') { e.preventDefault(); go(items[sel]); }
      else if (e.key === 'Tab') { e.preventDefault(); inp.focus(); }
    });
    lst.innerHTML = '<div class="pv-k-e">Загружаем…</div>';
    catalog(srcAttr()).then(function (l) { list = l; list.forEach(function (g) { if (!g.hay) g.hay = nrm([g.title, g.cat, g.big1, g.big2, g.sub, g.lead, g.forShort, g.forWho, g.level, g.caseName, g.teamText, (g.tags || []).join(' ')].join(' ')); }); if (KO === ov) draw(); });
  }
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && !e.altKey && (e.key === 'k' || e.key === 'K' || e.key === 'л' || e.key === 'Л')) { e.preventDefault(); KO ? null : openK(); return; }
    if (e.key === '/' && !KO && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '') && !(document.activeElement || {}).isContentEditable) { e.preventDefault(); openK(); }
  });

  /* ---------- превью при наведении ---------- */
  var FINE = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches, POP = null, popT = 0, popFor = null, lastScroll = 0, MX = 0, MY = 0;
  document.addEventListener('mousemove', function (e) { MX = e.clientX; MY = e.clientY; }, { passive: true });
  function popHtml(g, thumb, foot) {
    var pr = prog(g.id), mk = g.market, qb = quizBest(g);
    return '<div style="display:flex;flex-direction:column;gap:10px">' +
      (thumb ? '<div style="width:96px;border-radius:6px;overflow:hidden;box-shadow:0 0 0 1px var(--pv-rule),0 12px 24px -16px rgba(20,19,23,.5)">' + cover(g, 0) + '</div>' : '') +
      '<div style="display:flex;align-items:center;gap:8px;font:500 10px/1 ' + MONO + ';letter-spacing:.08em;text-transform:uppercase;color:' + MUTED + '"><i style="width:8px;height:8px;border-radius:2px;background:' + accentOf(g) + '"></i>' + esc(g.cat) + ' · ' + esc(g.level) + '</div>' +
      '<div style="font-size:15px;line-height:1.25;font-weight:600;letter-spacing:-.02em;text-wrap:balance">' + esc(g.title) + '</div>' +
      (g.lead ? '<div style="color:' + SOFT + ';display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden">' + esc(g.lead) + '</div>' : '') +
      '<div class="pv-pop-f"><div><span>Объём</span>' + g.pages + ' стр.</div><div><span>Чтение</span>' + readTime(g) + '</div><div style="grid-column:1/-1"><span>Структура</span>' + esc(g.chapters) + '</div>' + (g.teamText ? '<div style="grid-column:1/-1"><span>Собрали</span>' + esc(g.teamText) + '</div>' : '') + '</div>' +
      (mk ? '<div style="display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><span><b style="font-weight:700;font-size:16px;letter-spacing:-.03em">' + fmt(mk.vacancies) + '</b> <span style="color:' + MUTED + '">вакансий</span></span><span class="' + (mk.trend >= 0 ? 'pv-up' : 'pv-dn') + '" style="font:600 11px/1 ' + MONO + '">' + (mk.trend >= 0 ? '↑' : '↓') + Math.abs(mk.trend) + '% за месяц</span></div><div style="color:' + SOFT + '">' + esc(mk.salary) + '</div><div style="display:flex;gap:5px;flex-wrap:wrap">' + (mk.skills || []).slice(0, 4).map(function (s) { return '<span class="pv-tag">' + esc(s) + '</span>'; }).join('') + '</div></div>' : '') +
      (pr || qb ? '<div style="display:flex;flex-direction:column;gap:6px;padding-top:10px;border-top:1px solid ' + RULE + '">' + (pr ? '<span class="pv-prog"><i style="width:' + pr.pct + '%;background:' + accentOf(g) + '"></i></span><span style="font:500 10.5px/1 ' + MONO + ';color:' + MUTED + '">Прочитано ' + pr.pct + '% · стр. ' + pr.p + ' из ' + pr.total + '</span>' : '') + (qb ? '<span style="font:500 10.5px/1 ' + MONO + ';color:' + MUTED + '">Тест: ' + qb + '%</span>' : '') + '</div>' : '') +
      (foot || '') +
    '</div>';
  }
  function hidePop() { clearTimeout(popT); popFor = null; if (POP) POP.classList.remove('on'); }
  function placePop() {
    var w = POP.offsetWidth, ph = POP.offsetHeight, vw = window.innerWidth, vh = window.innerHeight, O = 16, M = 12;
    var x = MX + O + w <= vw - M ? MX + O : MX - O - w;
    var y = MY + O + ph <= vh - M ? MY + O : MY - O - ph;
    x = Math.max(M, Math.min(vw - w - M, x)); y = Math.max(M, Math.min(vh - ph - M, y));
    POP.style.left = x + 'px'; POP.style.top = y + 'px';
  }
  if (FINE) {
    document.addEventListener('mouseover', function (e) {
      var c = e.target.closest && e.target.closest('.pv-card, .pv-row'); if (Date.now() - lastScroll < 250) return; if (c === popFor) return;
      if (!c) { if (popFor) hidePop(); return; }
      var g = PVG[c.getAttribute('data-id')]; if (!g) { if (popFor) hidePop(); return; }
      hidePop(); popFor = c;
      popT = setTimeout(function () {
        if (popFor !== c) return;
        if (!POP) { POP = document.createElement('div'); POP.className = 'pv-pop'; POP.setAttribute('aria-hidden', 'true'); document.body.appendChild(POP); }
        POP.innerHTML = popHtml(g); placePop(); requestAnimationFrame(function () { if (popFor === c) POP.classList.add('on'); });
      }, 650);
    });
    window.addEventListener('scroll', function () { lastScroll = Date.now(); hidePop(); }, { passive: true });
  }

  /* ---------- переход каталог → гайд ---------- */
  function vtQuiet(e) { var vt = e.viewTransition; if (!vt) return; ['ready', 'finished', 'updateCallbackDone'].forEach(function (p) { if (vt[p] && vt[p].catch) vt[p].catch(function () {}); }); }
  window.addEventListener('pagereveal', vtQuiet); window.addEventListener('pageswap', vtQuiet);
  window.addEventListener('unhandledrejection', function (e) { var r = e.reason; if (r && /transition/i.test(String(r.message || r)) && /skipped|aborted|invalid state/i.test(String(r.message || r))) e.preventDefault(); });
  document.addEventListener('click', function (e) {
    var c = e.target.closest && e.target.closest('a.pv-card'); if (!c || e.metaKey || e.ctrlKey || e.shiftKey) return;
    hidePop();
    document.querySelectorAll('.pv-card .pv-cv').forEach(function (x) { x.style.viewTransitionName = ''; });
    var cv = c.querySelector('.pv-cv'); if (cv) cv.style.viewTransitionName = 'pv-cover';
  }, true);
  window.addEventListener('pageshow', function () { document.querySelectorAll('.pv-card .pv-cv').forEach(function (x) { x.style.viewTransitionName = ''; }); });
  try {
    if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules') && !document.querySelector('script[data-pv-spec]')) {
      var sr = document.createElement('script'); sr.type = 'speculationrules'; sr.setAttribute('data-pv-spec', '');
      sr.textContent = JSON.stringify({ prerender: [{ where: { selector_matches: 'a.pv-card' }, eagerness: 'moderate' }] });
      document.head.appendChild(sr);
    }
  } catch (e) {}


  /* ---------- каталог-список ---------- */
  function mountList(el) {
    var src = el.getAttribute('data-catalog-list'); if (el.__pv === src) return; el.__pv = src;
    el.classList.add('pv');
    var page = el.getAttribute('data-guide-page') || '/guide', cards = el.getAttribute('data-cards-page') || '';
    el.innerHTML = '<div class="pv-mono" style="font-size:11px;color:' + MUTED + '">Загружаем каталог…</div>';
    catalog(src).then(function (list) {
      list.forEach(function (g) { if (!g.hay) g.hay = nrm([g.title, g.cat, g.big1, g.big2, g.sub, g.lead, g.forShort, g.forWho, g.level, g.caseName, g.teamText, (g.tags || []).join(' ')].join(' ')); });
      var cats = []; list.forEach(function (g) { if (cats.indexOf(g.cat) < 0) cats.push(g.cat); });
      var cur = 'all', sel = 0, rows = [];
      el.innerHTML = '<div class="pv-Lw"><div class="pv-L"><label class="pv-k-i" style="background:var(--pv-card);z-index:2"><svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" style="color:var(--pv-muted)"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg><input type="search" enterkeyhint="search" autocomplete="off" spellcheck="false" placeholder="Профессия, навык или термин: SQL, LTV, Figma…" aria-label="Поиск по гайдам"><span class="pv-k-t pv-Ln"></span></label>' +
        (cats.length > 1 ? '<div class="pv-Lc" role="group" aria-label="Категории"></div>' : '') +
        '<div class="pv-k-l" role="listbox"></div>' +
        '<div class="pv-k-f"><span><span class="pv-kbd">↑</span><span class="pv-kbd">↓</span>выбрать</span><span><span class="pv-kbd">↵</span>открыть</span>' + (cards ? '<a href="' + esc(cards) + '" style="margin-left:auto;color:var(--pv-ink);font-weight:500">Полный каталог →</a>' : '') + '</div></div></div>';
      var inp = el.querySelector('input'), lst = el.querySelector('.pv-k-l'), chips = el.querySelector('.pv-Lc'), det = el.querySelector('.pv-Ld'), cnt = el.querySelector('.pv-Ln');
      function detail(g) {
        if (!det) return;
        if (!g) { det.innerHTML = ''; return; }
        var pr = prog(g.id), href = guideHref(page, g) + (pr && pr.pct < 98 ? '#pv-read' : '');
        det.innerHTML = popHtml(g, true, '<div style="display:flex;gap:8px;flex-wrap:wrap;padding-top:4px"><a class="pv-btn dark" href="' + esc(href) + '" style="padding:9px 14px;font-size:13px">' + (pr && pr.pct < 98 ? 'Продолжить · стр. ' + pr.p : 'Открыть гайд') + ' →</a></div>');
      }
      function mark(scroll) {
        var rs = lst.querySelectorAll('.pv-k-r');
        [].forEach.call(rs, function (r, i) { r.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
        detail(rows[sel]);
        var r = rs[sel]; if (r && scroll) { var b = r.getBoundingClientRect(); if (b.top < 90) window.scrollBy(0, b.top - 90); else if (b.bottom > window.innerHeight - 20) window.scrollBy(0, b.bottom - window.innerHeight + 20); }
      }
      function draw() {
        var q = nrm(inp.value.trim()), ws = q.split(/[\s,.;]+/).filter(Boolean);
        var found = list.map(function (g) {
          if (!ws.length) return { g: g, s: 0, tag: '' };
          var s = 0, tag = '';
          for (var i = 0; i < ws.length; i++) {
            var w = ws[i], st = w.length > 5 ? w.slice(0, w.length - 2) : w, ti = nrm(g.title), hit = 0;
            if (ti.indexOf(w) === 0) hit = 6; else if (ti.indexOf(st) > -1) hit = 4; else if (nrm(g.cat).indexOf(st) > -1) hit = 3;
            var tg = (g.tags || []).filter(function (t) { return nrm(t).indexOf(st) > -1; })[0]; if (tg) { hit = Math.max(hit, nrm(tg) === w ? 4 : 2); tag = tag || tg; }
            if (!hit && g.hay.indexOf(st) > -1) hit = 1;
            if (!hit) return null; s += hit;
          }
          return { g: g, s: s, tag: tag };
        }).filter(Boolean);
        if (ws.length) found.sort(function (a, b) { return b.s - a.s; });
        if (chips) chips.innerHTML = [['all', 'Все', found.length]].concat(cats.map(function (c) { return [c, c, found.filter(function (x) { return x.g.cat === c; }).length]; })).map(function (c) { return '<button type="button" data-c="' + esc(c[0]) + '" aria-pressed="' + (cur === c[0]) + '"' + (c[2] || c[0] === 'all' || cur === c[0] ? '' : ' style="opacity:.4"') + '>' + esc(c[1]) + '<i>' + c[2] + '</i></button>'; }).join('');
        if (cur !== 'all' && found.length && !found.some(function (x) { return x.g.cat === cur; })) { cur = 'all'; return draw(); }
        var shown = cur === 'all' ? found : found.filter(function (x) { return x.g.cat === cur; });
        cnt.textContent = shown.length + ' ' + (shown.length % 10 === 1 && shown.length % 100 !== 11 ? 'гайд' : shown.length % 10 >= 2 && shown.length % 10 <= 4 && (shown.length % 100 < 10 || shown.length % 100 >= 20) ? 'гайда' : 'гайдов');
        var groups = [];
        if (!ws.length && cur === 'all') {
          var pa = progAll(), cont = list.filter(function (g) { var p = prog(g.id); return p && p.pct < 98; }).sort(function (a, b) { return (pa[b.id].t || 0) - (pa[a.id].t || 0); }).slice(0, 3);
          if (cont.length) groups.push(['Продолжить чтение', cont.map(function (g) { return { g: g, tag: '', cont: 1 }; })]);
          cats.forEach(function (c) { groups.push([c, shown.filter(function (x) { return x.g.cat === c; })]); });
        } else groups.push([ws.length ? 'Найдено' : cur, shown]);
        var emp = ''; if (ws.length && !shown.length) { var sg = suggest(q, list); emp = emptyHtml(inp.value.trim(), sg); groups = [['Возможно, подойдёт', sg.picks.map(function (g) { return { g: g, tag: '' }; })]]; }
        rows = []; var html = emp;
        groups.forEach(function (gr) {
          if (!gr[1].length) return;
          html += '<div class="pv-k-h">' + esc(gr[0]) + '</div>';
          gr[1].forEach(function (x) {
            var g = x.g, pr = prog(g.id), href = guideHref(page, g) + (x.cont ? '#pv-read' : '');
            var right = x.tag ? '<span class="pv-k-t pv-k-t2">#' + esc(x.tag) + '</span>' : pr ? '<span class="pv-k-t2" style="display:flex;align-items:center;gap:8px"><span class="pv-prog" style="width:48px"><i style="width:' + pr.pct + '%;background:' + accentOf(g) + '"></i></span><span class="pv-k-t">' + pr.pct + '%</span></span>' : '<span class="pv-k-t pv-k-t2">' + g.pages + ' стр.</span>';
            html += '<a class="pv-k-r pv-row" role="option" data-id="' + esc(g.id) + '" data-i="' + rows.length + '" href="' + esc(href) + '"><span class="pv-k-sw" style="background:' + accentOf(g) + '">' + esc(g.cat.slice(0, 1)) + '</span><span style="min-width:0"><b>' + hl(g.title, ws) + '</b><small>' + esc(g.level) + ' · ' + esc(g.forShort || g.chapters) + '</small></span><span style="display:flex;align-items:center;gap:10px">' + right + '<span class="pv-k-t pv-go">' + (x.cont ? 'Продолжить ↵' : 'Открыть ↵') + '</span></span></a>';
            rows.push(g);
          });
        });
        if (!rows.length) html = '<div class="pv-k-e">Ничего не нашли по запросу «' + esc(inp.value) + '»</div>';
        lst.innerHTML = html; if (sel >= rows.length) sel = 0; mark(false);
        [].forEach.call(lst.querySelectorAll('.pv-k-r'), function (a) { a.onmouseenter = function () { var i = +a.getAttribute('data-i'); if (i !== sel) { sel = i; mark(false); } }; });
        if (chips) [].forEach.call(chips.querySelectorAll('button'), function (b) { b.onclick = function () { cur = b.getAttribute('data-c'); sel = 0; draw(); }; });
        [].forEach.call(lst.querySelectorAll('[data-s]'), function (b) { b.onclick = function () { inp.value = b.getAttribute('data-s'); cur = 'all'; sel = 0; draw(); inp.focus(); }; });
      }
      var tm; inp.oninput = function () { clearTimeout(tm); tm = setTimeout(function () { sel = 0; draw(); }, 80); };
      inp.onkeydown = function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); if (rows.length) { sel = (sel + 1) % rows.length; mark(true); } }
        else if (e.key === 'ArrowUp') { e.preventDefault(); if (rows.length) { sel = (sel - 1 + rows.length) % rows.length; mark(true); } }
        else if (e.key === 'Enter') { e.preventDefault(); var a = lst.querySelectorAll('.pv-k-r')[sel]; if (a) location.href = a.href; }
        else if (e.key === 'Escape') { inp.value = ''; sel = 0; draw(); }
      };
      draw();
    }).catch(function (e) { console.warn('[pv]', e); el.innerHTML = '<div class="pv-mono" style="font-size:11px;color:' + MUTED + '">Не удалось загрузить каталог</div>'; });
  }
  /* ---------- переливающиеся буквы ---------- */
  var JUICE = ['#c6ff00', '#ff2bd6', '#00e5ff', '#ffd400', '#ff5a1f', '#5cff8a', '#8a5cff', '#ff2a1f'];
  function mountJuice(el) {
    if (el.__pvj) return; el.__pvj = 1;
    var txt = el.textContent, base = el.getAttribute('data-base') || '#ff2a1f', pal = (el.getAttribute('data-pv-juice') || '').split(',').filter(Boolean); if (!pal.length) pal = JUICE;
    el.setAttribute('aria-label', txt); el.textContent = '';
    var L = [];
    txt.split('').forEach(function (ch) {
      var s = document.createElement('span'); s.setAttribute('aria-hidden', 'true'); s.textContent = ch;
      if (ch.trim()) { s.style.cssText = 'color:' + base + ';transition:color .6s cubic-bezier(.3,.7,.3,1)'; L.push(s); }
      el.appendChild(s);
    });
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var last = -1;
    function tick() {
      if (!el.isConnected) return;
      if (!document.hidden) {
        for (var i = 0; i < 1; i++) {
          var j; do { j = Math.floor(Math.random() * L.length); } while (j === last && L.length > 1); last = j;
          var c = L[j], cur = c.style.color, nc; do { nc = pal[Math.floor(Math.random() * pal.length)]; } while (pal.length > 1 && cur.indexOf(nc) > -1);
          c.style.color = nc;
          (function (c) { setTimeout(function () { c.style.color = base; }, 900 + Math.random() * 500); })(c);
        }
      }
      setTimeout(tick, 280 + Math.random() * 220);
    }
    setTimeout(tick, 400);
  }
  /* ---------- печатающийся заголовок ---------- */
  var TYPE_DEF = [
    ['собранные из ', 'реальных вакансий'],
    ['которые показывают ', 'первый день на работе'],
    ['чтобы понять, ', 'подходит ли тебе профессия'],
    ['где каждый навык взят ', 'из требований работодателей'],
    ['с которыми проще ', 'пройти собеседование'],
    ['чтобы сменить ', 'профессию без лишних курсов'],
    ['которые объясняют, ', 'за что платят деньги'],
    ['с честными ', 'зарплатами и вилками'],
    ['чтобы знать, ', 'с чего начать завтра'],
    ['проверенные ', 'практиками из индустрии'],
    ['с картой ', 'роста от джуна до лида'],
    ['чтобы говорить ', 'на языке команды'],
    ['с кейсами ', 'из реальных компаний'],
    ['которые читаются ', 'за один вечер']
  ];
  function mountType(el) {
    if (el.__pvt2) return; el.__pvt2 = 1;
    var pre = el.getAttribute('data-prefix') || 'Гайды по профессиям, ', base = el.getAttribute('data-base') || '#ff2a1f';
    var hold = +(el.getAttribute('data-hold') || 10000), P = TYPE_DEF;
    try { var cu = JSON.parse(el.getAttribute('data-phrases') || 'null'); if (cu && cu.length) P = cu; } catch (e) {}
    el.setAttribute('aria-label', pre + P[0][0] + P[0][1]);
    el.innerHTML = '';
    var a = document.createElement('span'); a.setAttribute('aria-hidden', 'true'); a.textContent = pre;
    var plain = document.createElement('span'); plain.setAttribute('aria-hidden', 'true');
    var hi = document.createElement('span'); hi.setAttribute('aria-hidden', 'true'); hi.style.cssText = 'color:inherit';
    var car = document.createElement('span'); car.setAttribute('aria-hidden', 'true');
    car.style.cssText = 'display:inline-block;width:.06em;min-width:2px;height:.92em;margin-left:.06em;vertical-align:-.1em;background:currentColor;border-radius:1px;animation:pvCaret 1s steps(1) infinite';
    el.appendChild(a); el.appendChild(plain); el.appendChild(hi); el.appendChild(car);
    if (!document.getElementById('pv-caret-kf')) { var st = document.createElement('style'); st.id = 'pv-caret-kf'; st.textContent = '@keyframes pvCaret{0%,49%{opacity:1}50%,100%{opacity:0}}'; document.head.appendChild(st); }
    var letters = [];
    function setText(n, ph) {
      var full = ph[0] + ph[1], s = full.slice(0, n), p1 = s.slice(0, ph[0].length), p2 = s.slice(ph[0].length);
      plain.textContent = p1;
      while (letters.length > p2.length) hi.removeChild(letters.pop());
      while (letters.length < p2.length) { var L = document.createElement('span'); L.textContent = p2[letters.length]; L.style.transition = 'color .6s cubic-bezier(.3,.7,.3,1)'; hi.appendChild(L); letters.push(L); }
    }
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pi = 0; setText(P[0][0].length + P[0][1].length, P[0]);
    if (reduce) { car.style.display = 'none'; return; }
    // flicker: one letter at a time
    (function flick() {
      return;
      var pool = letters.filter(function (l) { return l.textContent.trim(); });
      if (!document.hidden && pool.length) { var c = pool[Math.floor(Math.random() * pool.length)], nc = JUICE[Math.floor(Math.random() * JUICE.length)]; c.style.color = nc; setTimeout(function () { c.style.color = ''; }, 900 + Math.random() * 500); }
      setTimeout(flick, 280 + Math.random() * 220);
    })();
    function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
    function vis() { return new Promise(function (r) { if (!document.hidden) return r(); var f = function () { if (!document.hidden) { document.removeEventListener('visibilitychange', f); r(); } }; document.addEventListener('visibilitychange', f); }); }
    function steady(on) { car.style.animation = on ? 'pvCaret 1s steps(1) infinite' : 'none'; car.style.opacity = '1'; }
    (async function loop() {
      while (el.isConnected) {
        steady(true); await wait(hold); await vis();
        var ph = P[pi], n = ph[0].length + ph[1].length; steady(false);
        while (n > 0) { n = Math.max(0, n - 3); setText(n, ph); await wait(10); }
        await wait(180);
        pi = (pi + 1) % P.length; ph = P[pi]; var tot = ph[0].length + ph[1].length;
        el.setAttribute('aria-label', pre + ph[0] + ph[1]);
        for (var i = 1; i <= tot; i++) { setText(i, ph); var ch = (ph[0] + ph[1])[i - 1]; await wait(ch === ' ' ? 18 + Math.random() * 16 : ch === ',' ? 70 : 9 + Math.random() * 11); }
      }
    })();
  }
  function scan() {
    document.querySelectorAll('[data-pv-type]').forEach(mountType);
    document.querySelectorAll('[data-pv-juice]').forEach(mountJuice);
    document.querySelectorAll('[data-catalog-list]').forEach(mountList);
    document.querySelectorAll('[data-pv-theme]').forEach(paintToggle);
    document.querySelectorAll('[data-pv-cmdk]').forEach(mountK);
    document.querySelectorAll('[data-pv-stat]').forEach(mountStats);
    document.querySelectorAll('[data-catalog]').forEach(mountCatalog);
    document.querySelectorAll('[data-guide]').forEach(mountGuide);
  }
  window.PVKit = { scan: scan, cover: cover, catalog: catalog, openSearch: openK, toggleTheme: toggleTheme, setTheme: setTheme };
  new MutationObserver(function () { clearTimeout(scan.t); scan.t = setTimeout(scan, 50); }).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
})();
