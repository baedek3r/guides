/* sherpa. — каталог «рабочий стол» и FAQ-переписка для Тильды.
   Каталог: <div data-pv-desk="https://baedek3r.github.io/guides/guides.json" data-guide-page="/guide"></div>
   FAQ:     <div data-pv-faq> … разметка .pvf-i из main.html … </div> */
(function () {
  if (window.__pvDesk) return; window.__pvDesk = 1;
  var CONT = 'Продолжить чтение', PK = 'pv-progress', EZ = 'cubic-bezier(.2,.8,.2,1)';
  var MONO = "'JetBrains Mono',ui-monospace,monospace";

  var CSS = [
    '.pvd{font-family:Onest,"Helvetica Neue",Helvetica,Arial,sans-serif;color:#141317;-webkit-font-smoothing:antialiased;font-size:15px;line-height:1.5}',
    '.pvd *{box-sizing:border-box}.pvd button{font:inherit;color:inherit;margin:0}.pvd a{text-decoration:none!important}',
    '.pvd-m{font-family:' + MONO + '}',
    '.pvd-win{display:flex;flex-direction:column;border:1px solid #dddae3;border-radius:16px;background:#fff;overflow:hidden;box-shadow:0 1px 0 rgba(20,19,23,.03),0 34px 70px -40px rgba(20,19,23,.32)}',
    '.pvd-bar{display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;padding:10px 14px;border-bottom:1px solid #e9e7ee;background:#fbfafc}',
    '.pvd-lights{display:flex;gap:8px;padding-right:6px}.pvd-lights i{width:12px;height:12px;border-radius:50%;box-shadow:inset 0 0 0 .5px rgba(0,0,0,.14)}',
    '.pvd-ib{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:0;border-radius:8px;background:transparent;cursor:pointer;color:#141317;transition:opacity .15s;padding:0}',
    '.pvd-ib:hover:not(:disabled){background:#efedf2}.pvd-ib:disabled{opacity:.32;cursor:default}',
    '.pvd-crumbs{flex:1 1 180px;min-width:0;display:flex;align-items:center;gap:2px;font-size:13px;overflow:hidden}',
    '.pvd-sep{color:#b3afbb}',
    '.pvd-crumb{min-width:0;border:0;background:transparent;padding:5px 7px;border-radius:7px;cursor:pointer;color:#6b6874!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.pvd-crumb:hover{background:#efedf2}.pvd-crumb.on{color:#141317!important;font-weight:600}',
    '.pvd-tools{display:flex;align-items:center;gap:8px;flex:1 1 240px;max-width:380px;margin-left:auto}',
    '.pvd-search{flex:1;min-width:0;display:flex;align-items:center;gap:8px;height:34px;padding:0 10px;border:1px solid #dddae3;border-radius:9px;background:#fff;color:#6b6874;margin:0}',
    '.pvd-search:focus-within{border-color:#141317}',
    '.pvd-search input{flex:1;min-width:0;height:100%;border:0;outline:0;background:transparent;font:inherit;font-size:14px;color:#141317;padding:0;margin:0;box-shadow:none}',
    '.pvd-seg{display:flex;flex:0 0 auto;padding:2px;border-radius:9px;background:#efedf2}',
    '.pvd-seg button{width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:0;border-radius:7px;cursor:pointer;background:transparent;color:#141317;padding:0}',
    '.pvd-seg button[aria-pressed="true"]{background:#fff;box-shadow:0 1px 2px rgba(20,19,23,.12)}',
    '.pvd-body{display:grid;grid-template-columns:252px minmax(0,1fr);height:clamp(520px,72vh,680px);min-height:0}',
    '.pvd-side{min-height:0;overflow:auto;padding:12px 8px 18px;border-right:1px solid #e9e7ee;background:#fbfafc}',
    '.pvd-sh{padding:2px 10px 10px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6b6874}',
    '.pvd-tr{display:flex;align-items:center;border-radius:8px}.pvd-tr:hover{background:#efedf2}.pvd-tr.on{background:#e6e3ec}',
    '.pvd-chev{flex:0 0 auto;width:24px;height:32px;display:flex;align-items:center;justify-content:center;border:0;background:transparent;cursor:pointer;color:#6b6874;padding:0}',
    '.pvd-chev svg{transition:transform .18s ease}.pvd-chev[aria-expanded="true"] svg{transform:rotate(90deg)}',
    '.pvd-tn{flex:1;min-width:0;display:flex;align-items:center;gap:8px;height:32px;padding:0 10px 0 0;border:0;background:transparent;cursor:pointer;text-align:left;font-size:14px;font-weight:500;color:#141317}',
    '.pvd-tr.on .pvd-tn{font-weight:600}',
    '.pvd-root{width:100%;display:flex;align-items:center;gap:8px;height:32px;padding:0 10px 0 8px;border:0;border-radius:8px;background:transparent;cursor:pointer;text-align:left;font-size:14px;font-weight:600;color:#141317}',
    '.pvd-root:hover{background:#efedf2}.pvd-root.on{background:#e6e3ec}',
    '.pvd-ell{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.pvd-nest{margin-left:14px;padding-left:6px;border-left:1px solid #e4e1ea}',
    '.pvd-sub{margin:2px 0 4px 11px;padding-left:6px;border-left:1px solid #e4e1ea;display:flex;flex-direction:column;gap:1px}',
    '.pvd-tf{width:100%;display:flex;align-items:center;gap:8px;height:30px;padding:0 8px;border:0;border-radius:7px;background:transparent;cursor:pointer;text-align:left;font-size:13.5px;color:#141317}',
    '.pvd-tf:hover{background:#efedf2}.pvd-tf.on{background:#e6e3ec;font-weight:600}',
    '.pvd-hr{height:1px;margin:12px 10px 10px;background:#e4e1ea}',
    '.pvd-nil{padding:6px 8px;font-size:11.5px;color:#6b6874}',
    '.pvd-main{min-width:0;min-height:0;display:grid;grid-template-columns:minmax(0,1fr)}',
    '.pvd.has-sel .pvd-main{grid-template-columns:minmax(0,1fr) clamp(240px,24vw,300px)}',
    '.pvd-pane{min-width:0;min-height:0;overflow:auto;background-color:#f7f6f9;background-image:radial-gradient(#dcd9e2 1px,transparent 1.3px);background-size:22px 22px;background-position:11px 11px}',
    '.pvd-in{padding:clamp(14px,2vw,26px);transform-origin:50% 0}',
    '.pvd-in.a1{animation:pvdA1 .4s ' + EZ + '}.pvd-in.a2{animation:pvdA2 .4s ' + EZ + '}',
    '@keyframes pvdA1{from{transform:scale(.985)}to{transform:none}}@keyframes pvdA2{from{transform:scale(1.015)}to{transform:none}}',
    '.pvd-in.a1 .pvd-it,.pvd-in.a2 .pvd-it{animation:pvdIt .38s ' + EZ + ' both}',
    '@keyframes pvdIt{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    '.pvd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:10px;align-content:start}',
    '.pvd-cont{margin-top:14px;padding-top:14px;border-top:1px solid #e4e1ea}',
    '.pvd-fold{display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 8px 14px;border:0;border-radius:14px;background:transparent;cursor:pointer;color:#141317}',
    '.pvd-fold:hover,.pvd-fold:focus-visible{background:rgba(255,255,255,.72);box-shadow:inset 0 0 0 1px #e4e1ea;outline:0}',
    '.pvd-fold svg{display:block;overflow:visible;margin-bottom:6px}',
    '.pvd-pp,.pvd-fl{transition:transform .34s ' + EZ + '}.pvd-fl{transform-box:fill-box;transform-origin:50% 100%}',
    '.pvd-fold:hover .pvd-pp,.pvd-fold:focus-visible .pvd-pp{transform:translateY(-10px)}',
    '.pvd-fold:hover .pvd-fl,.pvd-fold:focus-visible .pvd-fl{transform:skewX(-4deg) scaleY(.9)}',
    '.pvd-fn{font-size:15px;font-weight:600;letter-spacing:-.01em;line-height:1.25;white-space:nowrap}',
    '.pvd-files{display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:6px}',
    '.pvd a.pvd-file{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 6px 12px;border-radius:12px;text-align:center;color:#141317!important}',
    '.pvd a.pvd-file:hover{box-shadow:inset 0 0 0 1px #dddae3}.pvd a.pvd-file.on{background:#e6e3ec}',
    '.pvd-file svg{display:block;flex:0 0 auto;filter:drop-shadow(0 8px 12px rgba(20,19,23,.12))}',
    '.pvd-ft{max-width:100%;padding:2px 7px;border-radius:6px;font-size:13.5px;font-weight:500;line-height:1.3;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-wrap:balance}',
    '.pvd-file.on .pvd-ft{background:#141317;color:#f7f6f9}',
    '.pvd-pg{display:flex;flex-direction:column;align-items:center;gap:5px;width:100%;max-width:104px}',
    '.pvd-pb{position:relative;display:block;width:100%;height:4px;border-radius:2px;background:#e4e1ea;overflow:hidden}.pvd-pb i{position:absolute;left:0;top:0;bottom:0;border-radius:2px}',
    '.pvd-pt{font-size:11px;color:#6b6874;white-space:nowrap}',
    '.pvd-list{display:flex;flex-direction:column;gap:2px;padding:6px;border:1px solid #e4e1ea;border-radius:12px;background:#fff}',
    '.pvd-lh,.pvd a.pvd-row{display:grid;grid-template-columns:minmax(0,1fr) 120px 150px;gap:16px;align-items:center}',
    '.pvd-lh{padding:6px 12px 8px;border-bottom:1px solid #efedf2;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#6b6874}',
    '.pvd a.pvd-row{min-height:42px;padding:6px 12px;border-radius:8px;color:#141317!important}',
    '.pvd a.pvd-row:hover{box-shadow:inset 0 0 0 1px #dddae3}.pvd a.pvd-row.on{background:#141317;color:#f7f6f9!important}',
    '.pvd-row .m{font-size:13px;color:#6b6874;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pvd-row.on .m{color:#c9c5d1}',
    '.pvd-rt{min-width:0;display:flex;align-items:center;gap:10px}.pvd-rt b{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:500}',
    '.pvd-rp{display:flex;align-items:center;gap:8px;flex:0 0 auto;margin-left:auto}.pvd-rp .pvd-pb{width:56px}.pvd-rp span{min-width:3.5ch;text-align:right;font-size:11px}',
    '.pvd-narrow .pvd-lh,.pvd-narrow a.pvd-row{grid-template-columns:minmax(0,1fr)}.pvd-narrow .pvd-c2{display:none}',
    '.pvd-empty{display:flex;flex-direction:column;align-items:center;gap:12px;padding:64px 16px;text-align:center}',
    '.pvd-empty b{font-size:17px;font-weight:600;letter-spacing:-.01em}.pvd-empty span{max-width:40ch;font-size:14px;color:#4a4752;text-wrap:pretty}',
    '.pvd-bo{height:40px;padding:0 18px;border:1px solid #141317;border-radius:999px;background:transparent;cursor:pointer;font-size:14px;font-weight:600;color:#141317}.pvd-bo:hover{background:#141317;color:#f7f6f9}',
    '.pvd-pv{display:none;flex-direction:column;gap:18px;min-height:0;overflow:auto;padding:24px 20px;border-left:1px solid #e9e7ee;background:#fff}',
    '.pvd.has-sel .pvd-pv{display:flex}',
    '.pvd-pv svg{display:block;flex:0 0 auto;filter:drop-shadow(0 10px 16px rgba(20,19,23,.14))}',
    '.pvd-pvt{font-size:18px;font-weight:650;line-height:1.25;letter-spacing:-.02em;text-wrap:pretty}.pvd-pvs{font-size:14px;line-height:1.4;color:#4a4752;text-wrap:pretty}',
    '.pvd-dl{margin:0;display:flex;flex-direction:column;border-top:1px solid #efedf2}',
    '.pvd-dl div{display:grid;grid-template-columns:76px minmax(0,1fr);gap:10px;padding:9px 0;border-bottom:1px solid #efedf2;font-size:13px;line-height:1.35}',
    '.pvd-dl dt{font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:#6b6874;padding-top:2px}.pvd-dl dd{margin:0;color:#141317;text-wrap:pretty}',
    '.pvd-prg{display:flex;flex-direction:column;gap:8px}.pvd-prg .h{display:flex;justify-content:space-between;gap:12px;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:#6b6874}',
    '.pvd-prg .pvd-pb{height:6px;border-radius:3px;background:#efedf2}.pvd-prg .t{font-size:13px;color:#4a4752}',
    '.pvd a.pvd-go{display:flex;align-items:center;justify-content:center;gap:8px;height:46px;border-radius:999px;background:#141317;color:#f7f6f9!important;font-size:15px;font-weight:600}.pvd a.pvd-go:hover{background:#2e2c34}',
    '.pvd-hint{margin-top:-8px;text-align:center;font-size:11px;color:#6b6874}',
    '.pvd-st{display:flex;justify-content:space-between;gap:12px;padding:8px 14px;border-top:1px solid #e9e7ee;background:#fbfafc;font-size:11.5px;color:#6b6874}',
    '.pvd-st .l{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pvd-st .r{flex:0 0 auto;margin-left:auto}',
    '.pvd.at-root .pvd-st{display:none}',
    '@media (max-width:720px){.pvd-body{grid-template-columns:minmax(0,1fr);height:auto}.pvd-side{display:none}.pvd.has-sel .pvd-main{grid-template-columns:minmax(0,1fr)}.pvd.has-sel .pvd-pv{display:none}.pvd-st .r{display:none}.pvd-lh,.pvd a.pvd-row{grid-template-columns:minmax(0,1fr)}.pvd-c2,.pvd-rp{display:none}}',

    '.pvf{display:flex;flex-direction:column;gap:10px;font-family:Onest,"Helvetica Neue",Helvetica,Arial,sans-serif;color:#141317;-webkit-font-smoothing:antialiased}',
    '.pvf *{box-sizing:border-box}',
    '.pvf-time{padding-left:4px;font-size:13px;color:#6b6874}',
    '.pvf-i{display:flex;flex-direction:column}',
    '.pvf-q{align-self:flex-start;max-width:100%;display:flex;align-items:center;gap:14px;padding:0;margin:0;border:0;background:transparent;cursor:pointer;text-align:left;color:#141317;font:inherit}',
    '.pvf-b{position:relative;min-width:0;padding:10px 16px;border-radius:18px 18px 18px 6px;background:#efedf2;font-size:clamp(15px,1.2vw,16.5px);font-weight:500;line-height:1.35;letter-spacing:-.01em;text-wrap:pretty;transition:background-color .2s ease}',
    '.pvf-q:hover .pvf-b{background:#e4e1ea}.pvf-i.on .pvf-b{background:#dddae3}',
    '.pvf-st{position:absolute;transition:transform .35s cubic-bezier(.3,1.6,.5,1);transform:rotate(-12deg)}.pvf-i.on .pvf-st{transform:rotate(-12deg) scale(1.18)}',
    '.pvf-st.h{top:-11px;right:-9px}.pvf-st.s{top:-12px;left:-9px}',
    '.pvf-ic{flex:0 0 auto;color:#6b6874;transition:color .2s ease}.pvf-i.on .pvf-ic{color:#141317}',
    '.pvf-ic .v{transform-box:fill-box;transform-origin:center;transition:transform .28s ' + EZ + '}.pvf-i.on .pvf-ic .v{transform:scaleY(0)}',
    '.pvf-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .38s ' + EZ + '}.pvf-i.on .pvf-a{grid-template-rows:1fr}',
    '.pvf-a>div{min-height:0;overflow:hidden}',
    '.pvf-aw{display:flex;flex-direction:column;align-items:flex-start;gap:5px;padding:8px 0 6px clamp(28px,11%,84px)}',
    '.pvf-ab{max-width:min(520px,100%);padding:12px 18px;border-radius:18px 18px 18px 6px;background:#141317;color:#f7f6f9;font-size:clamp(15px,1.15vw,16px);line-height:1.5;text-wrap:pretty;transform-origin:0 0;opacity:0;transform:translateY(-6px) scale(.96);transition:opacity .25s ease,transform .38s ' + EZ + '}',
    '.pvf-i.on .pvf-ab{opacity:1;transform:none}',
    '.pvf-dots{display:none;align-items:center;gap:5px;height:24px;padding:0 2px}.pvf-dots i{width:7px;height:7px;border-radius:50%;background:#f7f6f9;animation:pvfDot 1.1s ease-in-out infinite}',
    '.pvf-dots i:nth-child(2){animation-delay:.15s}.pvf-dots i:nth-child(3){animation-delay:.3s}',
    '@keyframes pvfDot{0%,70%,100%{opacity:.3;transform:translateY(0)}35%{opacity:1;transform:translateY(-3px)}}',
    '.pvf-txt,.pvf-read,.pvf a.pvf-link{display:none}',
    '.pvf-i.typing .pvf-dots{display:inline-flex}.pvf-i.shown .pvf-txt,.pvf-i.shown .pvf-read{display:block}.pvf-i.shown a.pvf-link{display:inline-flex}',
    '.pvf a.pvf-link{align-items:center;gap:6px;margin-top:10px;padding:7px 14px;border-radius:999px;background:#f7f6f9;color:#141317!important;font-size:14px;font-weight:600;text-decoration:none!important}.pvf a.pvf-link:hover{background:#fff}',
    '.pvf-read{padding-left:6px;font-size:12px;color:#6b6874}',
    '.pvf-ask{display:flex;align-items:center;gap:12px;min-height:52px;margin-top:clamp(18px,2.4vw,30px);padding:6px 6px 6px 20px;border:1px solid #dddae3;border-radius:999px;background:#fff;color:#6b6874!important;text-decoration:none!important;transition:border-color .2s ease,color .2s ease}',
    '.pvf-ask:hover{border-color:#141317;color:#141317!important}.pvf-ask>span{flex:1;min-width:0;font-size:15px;line-height:1.35}',
    '.pvf-ask>i{flex:0 0 auto;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#141317;color:#f7f6f9}',
    '@media (prefers-reduced-motion:reduce){.pvd *,.pvf *{animation:none!important;transition:none!important}}'
  ].join('\n');

  function css() { if (document.getElementById('pvd-css')) return; var s = document.createElement('style'); s.id = 'pvd-css'; s.textContent = CSS; document.head.appendChild(s); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function progAll() { try { return JSON.parse(localStorage.getItem(PK) || '{}'); } catch (e) { return {}; } }
  function accentOf(g) { return window.PVAccent ? window.PVAccent(g) : (g.color || '#7c4dff'); }
  function reduce() { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function mob() { return window.matchMedia && matchMedia('(max-width:720px)').matches; }

  var I = {
    left: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5"/></svg>',
    right: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5"/></svg>',
    chev: '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5"/></svg>',
    search: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="7" cy="7" r="4.8"/><path d="m10.6 10.6 3.4 3.4"/></svg>',
    grid: '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><rect x="1" y="1" width="5" height="5" rx="1.4"/><rect x="8" y="1" width="5" height="5" rx="1.4"/><rect x="1" y="8" width="5" height="5" rx="1.4"/><rect x="8" y="8" width="5" height="5" rx="1.4"/></svg>',
    list: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M1.5 3h11M1.5 7h11M1.5 11h11"/></svg>',
    folder: '<svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" style="flex:0 0 auto"><path d="M1.5 2.2A1.2 1.2 0 0 1 2.7 1h4.1l1.6 1.8h6.9a1.2 1.2 0 0 1 1.2 1.2v8a1.2 1.2 0 0 1-1.2 1.2H2.7A1.2 1.2 0 0 1 1.5 12z" fill="#141317"/></svg>',
    mark: '<svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" style="flex:0 0 auto"><path d="M5.2 1h7.6c.7 0 1.2.5 1.2 1.2v10.4c0 .3-.4.5-.6.3L9 10.3l-4.4 2.6c-.2.2-.6 0-.6-.3V2.2C4 1.5 4.5 1 5.2 1z" fill="#ff9500"/></svg>',
    arrow: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>'
  };
  function mini(a) { return '<svg width="12" height="15" viewBox="0 0 12 15" aria-hidden="true" style="flex:0 0 auto"><path d="M1 1.8C1 1.4 1.4 1 1.8 1h5.7L11 4.5v8.7c0 .4-.4.8-.8.8H1.8a.8.8 0 0 1-.8-.8z" fill="' + a + '"/><path d="M7.5 1v2.7c0 .4.4.8.8.8H11z" fill="#fff" fill-opacity=".55"/></svg>'; }
  function doc(a, w, h) {
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 60 76" aria-hidden="true"><path d="M7 .5h33.5l19 19V69a6.5 6.5 0 0 1-6.5 6.5H7A6.5 6.5 0 0 1 .5 69V7A6.5 6.5 0 0 1 7 .5z" fill="#fff" stroke="#dddae3"/>' +
      '<path d="M40.5 .5V13a6.5 6.5 0 0 0 6.5 6.5h12.5" fill="' + a + '" fill-opacity=".22" stroke="#dddae3"/>' +
      '<rect x="9" y="24" width="26" height="3" rx="1.5" fill="#c9c5d1"/><rect x="9" y="31" width="40" height="3" rx="1.5" fill="#e9e7ee"/><rect x="9" y="37" width="34" height="3" rx="1.5" fill="#e9e7ee"/><rect x="9" y="43" width="38" height="3" rx="1.5" fill="#e9e7ee"/>' +
      '<rect x="9" y="55" width="25" height="13" rx="4" fill="' + a + '"/><text x="21.5" y="64.2" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7.5" font-weight="500" letter-spacing=".4" fill="#fff">PDF</text></svg>';
  }
  function bigFolder(cont, papers) {
    var back = cont ? '#dddae3' : '#3a3841';
    var pp = papers ? '<g class="pvd-pp"><rect x="15" y="17" width="66" height="52" rx="3" fill="' + (cont ? '#efedf2' : '#dddae3') + '" transform="rotate(-5 48 43)"/><rect x="22" y="14" width="66" height="52" rx="3" fill="#fff"' + (cont ? ' stroke="#e4e1ea"' : '') + '/><rect x="30" y="22" width="30" height="3" rx="1.5" fill="#c9c5d1"/><rect x="30" y="29" width="46" height="3" rx="1.5" fill="#e4e1ea"/><rect x="30" y="35" width="40" height="3" rx="1.5" fill="#e4e1ea"/></g>' : '';
    var front = cont
      ? '<path d="M5 27a4 4 0 0 1 4-4h86a4 4 0 0 1 4 4l-2.4 47.3a5 5 0 0 1-5 4.7H11.4a5 5 0 0 1-5-4.7z" fill="#fff" stroke="#d4d0db"/><path d="M76 23h12v24.5c0 .6-.7 1-1.2.6L82 44.6l-4.8 3.5c-.5.4-1.2 0-1.2-.6z" fill="#ff9500"/>'
      : '<path d="M5 27a4 4 0 0 1 4-4h86a4 4 0 0 1 4 4l-2.4 47.3a5 5 0 0 1-5 4.7H11.4a5 5 0 0 1-5-4.7z" fill="#141317"/><path d="M10 23.6h84" stroke="#fff" stroke-opacity=".16" stroke-linecap="round"/>';
    return '<svg width="104" height="84" viewBox="0 0 104 84" aria-hidden="true" style="filter:drop-shadow(0 10px 14px rgba(20,19,23,' + (cont ? '.12' : '.16') + '))">' +
      '<path d="M9 5h26.6a4 4 0 0 1 3 1.4L44.4 13H95a4 4 0 0 1 4 4v58a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" fill="' + back + '"/>' + pp + '<g class="pvd-fl">' + front + '</g></svg>';
  }

  var SHELL =
    '<div class="pvd-win">' +
      '<div class="pvd-bar">' +
        '<div class="pvd-lights" aria-hidden="true"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></div>' +
        '<div style="display:flex;gap:2px"><button type="button" class="pvd-ib" data-act="back" aria-label="Назад" title="Назад (Alt + ←)">' + I.left + '</button><button type="button" class="pvd-ib" data-act="fwd" aria-label="Вперёд" title="Вперёд (Alt + →)">' + I.right + '</button></div>' +
        '<nav class="pvd-crumbs pvd-m" aria-label="Путь"></nav>' +
        '<div class="pvd-tools"><label class="pvd-search">' + I.search + '<input type="search" placeholder="Поиск по каталогу" aria-label="Поиск по каталогу"></label>' +
          '<div class="pvd-seg" role="group" aria-label="Вид"><button type="button" data-act="grid" aria-label="Значки" title="Значки" aria-pressed="true">' + I.grid + '</button><button type="button" data-act="list" aria-label="Список" title="Список" aria-pressed="false">' + I.list + '</button></div></div>' +
      '</div>' +
      '<div class="pvd-body"><aside class="pvd-side" aria-label="Дерево направлений"></aside>' +
        '<div class="pvd-main"><div class="pvd-pane"><div class="pvd-in"></div></div><aside class="pvd-pv" aria-label="Свойства гайда"></aside></div></div>' +
      '<div class="pvd-st pvd-m"><span class="l" aria-live="polite"></span><span class="r"></span></div>' +
    '</div>';

  function Desk(el) {
    var S = { G: [], cats: [], dir: null, hist: [], fwd: [], sel: null, q: '', view: 'grid', open: {} };
    var page = el.getAttribute('data-guide-page') || '/guide', src = el.getAttribute('data-pv-desk');
    el.classList.add('pvd', 'at-root'); el.innerHTML = SHELL;
    var q = function (s) { return el.querySelector(s); };
    var R = { back: q('[data-act=back]'), fwd: q('[data-act=fwd]'), crumbs: q('.pvd-crumbs'), input: q('.pvd-search input'), bg: q('[data-act=grid]'), bl: q('[data-act=list]'),
      side: q('.pvd-side'), pane: q('.pvd-pane'), inner: q('.pvd-in'), pv: q('.pvd-pv'), sl: q('.pvd-st .l'), sr: q('.pvd-st .r') };

    function pr(id, pa) { var p = pa[id]; if (!p || !p.total || p.p < 2) return null; return { p: p.p, total: p.total, t: p.t || 0, pct: Math.min(100, Math.round(p.p / p.total * 100)) }; }
    function hrefOf(g, pa) { var p = pr(g.id, pa); return g.href + (p && p.pct < 98 ? '#pv-read' : ''); }

    function model() {
      var pa = progAll(), by = {};
      S.G.forEach(function (g) { (by[g.cat] = by[g.cat] || []).push(g); });
      by[CONT] = S.G.filter(function (g) { var p = pr(g.id, pa); return p && p.pct < 98; }).sort(function (a, b) { return pr(b.id, pa).t - pr(a.id, pa).t; });
      var qq = S.q.trim().toLowerCase(), isRoot = !qq && !S.dir;
      var files = isRoot ? [] : qq ? S.G.filter(function (g) { return [g.title, g.cat, g.sub, g.level, (g.tags || []).join(' ')].join(' ').toLowerCase().indexOf(qq) > -1; }) : (by[S.dir] || []);
      var sel = null; files.forEach(function (g) { if (g.id === S.sel) sel = g; });
      return { pa: pa, by: by, qq: qq, isRoot: isRoot, files: files, sel: sel };
    }

    function treeItem(c, M, cont) {
      var op = !!S.open[c], act = !M.qq && S.dir === c, list = M.by[c] || [];
      var h = '<div><div class="pvd-tr' + (act ? ' on' : '') + '"><button type="button" class="pvd-chev" data-act="tog" data-c="' + esc(c) + '" aria-expanded="' + op + '" aria-label="' + (op ? 'Свернуть ' : 'Развернуть ') + esc(c) + '">' + I.chev + '</button>' +
        '<button type="button" class="pvd-tn" data-act="tree" data-c="' + esc(c) + '">' + (cont ? I.mark : I.folder) + '<span class="pvd-ell">' + esc(c) + '</span></button></div>';
      if (op) {
        h += '<div class="pvd-sub">';
        list.forEach(function (g) { var on = act && S.sel === g.id; h += '<button type="button" class="pvd-tf' + (on ? ' on' : '') + '" data-act="tfile" data-c="' + esc(c) + '" data-id="' + esc(g.id) + '" title="' + esc(g.title) + '">' + mini(g.accent) + '<span class="pvd-ell">' + esc(g.title) + '</span></button>'; });
        if (!list.length) h += '<span class="pvd-nil pvd-m">пока пусто</span>';
        h += '</div>';
      }
      return h + '</div>';
    }

    function render(anim, sign) {
      var M = model(), sel = M.sel;
      el.classList.toggle('at-root', M.isRoot);
      el.classList.toggle('has-sel', !!sel && !mob());
      R.back.disabled = !S.hist.length; R.fwd.disabled = !S.fwd.length;
      R.bg.setAttribute('aria-pressed', S.view !== 'list'); R.bl.setAttribute('aria-pressed', S.view === 'list');

      var cr = [['каталог', '__root']];
      if (M.qq) cr.push(['поиск: «' + S.q.trim() + '»', '']); else if (S.dir) cr.push([S.dir, S.dir]);
      R.crumbs.innerHTML = cr.map(function (c, i) { return (i ? '<span class="pvd-sep" aria-hidden="true">/</span>' : '') + '<button type="button" class="pvd-crumb' + (i === cr.length - 1 ? ' on' : '') + '" data-act="crumb" data-c="' + esc(c[1]) + '">' + esc(c[0]) + '</button>'; }).join('');

      var st = R.side.scrollTop;
      R.side.innerHTML = '<div class="pvd-sh pvd-m">Обзор</div>' +
        '<button type="button" class="pvd-root' + (M.isRoot ? ' on' : '') + '" data-act="root"><span style="display:flex;color:#6b6874;transform:rotate(90deg)">' + I.chev + '</span>' + I.folder + '<span>каталог</span></button>' +
        '<div class="pvd-nest">' + S.cats.map(function (c) { return treeItem(c, M); }).join('') + '</div>' +
        '<div class="pvd-hr" aria-hidden="true"></div>' + treeItem(CONT, M, true);
      R.side.scrollTop = st;

      var h = '', n = 0, it = function () { return ' pvd-it" style="animation-delay:' + Math.min(n++, 14) * 22 + 'ms'; };
      if (M.isRoot) {
        h = '<div class="pvd-grid">' + S.cats.map(function (c) {
          return '<button type="button" class="pvd-fold' + it() + '" data-act="open" data-c="' + esc(c) + '" aria-label="Открыть папку «' + esc(c) + '»">' + bigFolder(false, true) + '<span class="pvd-fn">' + esc(c) + '</span></button>';
        }).join('') + '</div><div class="pvd-grid pvd-cont"><button type="button" class="pvd-fold' + it() + '" data-act="open" data-c="' + esc(CONT) + '" aria-label="Открыть папку «' + CONT + '»">' + bigFolder(true, M.by[CONT].length > 0) + '<span class="pvd-fn">' + CONT + '</span></button></div>';
      } else if (!M.files.length) {
        h = M.qq
          ? '<div class="pvd-empty"><b>Ничего не нашли по запросу «' + esc(S.q.trim()) + '»</b><span>Попробуйте другое слово — например, название профессии или инструмента.</span><button type="button" class="pvd-bo" data-act="clearq">Сбросить поиск</button></div>'
          : '<div class="pvd-empty"><b>Здесь пока пусто</b><span>Начните читать любой гайд — он появится в этой папке вместе с прогрессом, и вы вернётесь к той же странице.</span><button type="button" class="pvd-bo" data-act="root">К направлениям</button></div>';
      } else if (S.view === 'list') {
        h = '<div class="pvd-list" role="list"><div class="pvd-lh pvd-m" aria-hidden="true"><span>Название</span><span class="pvd-c2">Папка</span><span class="pvd-c2">Уровень</span></div>' +
          M.files.map(function (g) {
            var on = sel && sel.id === g.id, p = pr(g.id, M.pa);
            return '<a role="listitem" class="pvd-row' + (on ? ' on' : '') + it() + '" href="' + esc(hrefOf(g, M.pa)) + '" data-id="' + esc(g.id) + '">' +
              '<span class="pvd-rt"><svg width="14" height="17" viewBox="0 0 12 15" aria-hidden="true" style="flex:0 0 auto"><path d="M1 1.8C1 1.4 1.4 1 1.8 1h5.7L11 4.5v8.7c0 .4-.4.8-.8.8H1.8a.8.8 0 0 1-.8-.8z" fill="' + g.accent + '"/><path d="M7.5 1v2.7c0 .4.4.8.8.8H11z" fill="#fff" fill-opacity=".55"/></svg><b>' + esc(g.title) + '</b>' +
              (p ? '<span class="pvd-rp"><span class="pvd-pb"><i style="width:' + p.pct + '%;background:' + g.accent + '"></i></span><span class="m pvd-m">' + p.pct + '%</span></span>' : '') + '</span>' +
              '<span class="m pvd-c2">' + esc(g.cat) + '</span><span class="m pvd-c2">' + esc(g.level || '—') + '</span></a>';
          }).join('') + '</div>';
      } else {
        h = '<div class="pvd-files">' + M.files.map(function (g) {
          var on = sel && sel.id === g.id, p = pr(g.id, M.pa);
          return '<a class="pvd-file' + (on ? ' on' : '') + it() + '" href="' + esc(hrefOf(g, M.pa)) + '" data-id="' + esc(g.id) + '" title="' + esc(g.title) + '">' + doc(g.accent, 60, 76) +
            '<span class="pvd-ft">' + esc(g.title) + '</span>' +
            (p ? '<span class="pvd-pg"><span class="pvd-pb"><i style="width:' + p.pct + '%;background:' + g.accent + '"></i></span><span class="pvd-pt pvd-m">' + (p.pct >= 98 ? 'прочитано' : 'стр. ' + p.p + ' из ' + p.total) + '</span></span>' : '') + '</a>';
        }).join('') + '</div>';
      }
      R.inner.className = 'pvd-in' + (anim && !reduce() ? (sign < 0 ? ' a2' : ' a1') : '');
      R.inner.innerHTML = h;
      if (anim) { void R.inner.offsetWidth; R.pane.scrollTop = 0; }

      if (sel) {
        var sp = pr(sel.id, M.pa), sub = sel.sub ? sel.sub.charAt(0).toUpperCase() + sel.sub.slice(1) : '';
        var rows = [['Папка', sel.cat], ['Объём', sel.pages ? sel.pages + ' стр.' : ''], ['Уровень', sel.level], ['Состав', sel.chapters], ['Кейс', sel.caseName]].filter(function (r) { return r[1]; });
        R.pv.innerHTML = doc(sel.accent, 72, 92) +
          '<div style="display:flex;flex-direction:column;gap:6px"><span class="pvd-pvt">' + esc(sel.title) + '</span>' + (sub ? '<span class="pvd-pvs">' + esc(sub) + '</span>' : '') + '</div>' +
          '<dl class="pvd-dl">' + rows.map(function (r) { return '<div><dt class="pvd-m">' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl>' +
          (sp ? '<div class="pvd-prg"><div class="h pvd-m"><span>Прочитано</span><span style="color:#141317">' + sp.pct + '%</span></div><span class="pvd-pb"><i style="width:' + sp.pct + '%;background:' + sel.accent + '"></i></span><span class="t">' + (sp.pct >= 98 ? 'Гайд прочитан целиком' : 'Страница ' + sp.p + ' из ' + sp.total) + '</span></div>' : '') +
          '<a class="pvd-go" href="' + esc(hrefOf(sel, M.pa)) + '">' + (sp && sp.pct < 98 ? 'Продолжить чтение' : 'Открыть гайд') + I.arrow + '</a>' +
          '<span class="pvd-hint pvd-m">или кликните по файлу ещё раз</span>';
      } else R.pv.innerHTML = '';

      R.sl.textContent = sel ? 'Выбран: ' + sel.title : '';
      R.sr.textContent = 'Клик — выбрать · ещё клик — открыть · Backspace — наверх';
      narrow();
    }
    function narrow() { el.classList.toggle('pvd-narrow', el.classList.contains('has-sel') || R.pane.clientWidth < 640); }

    function nav(dir, o) {
      o = o || {}; var cur = S.dir || null;
      S.hist = o.hist || S.hist.concat([cur]); S.fwd = o.fwd || [];
      S.dir = dir; S.q = ''; R.input.value = ''; S.sel = o.sel || null;
      if (dir) S.open[dir] = true;
      render(true, (dir ? 1 : 0) >= (cur ? 1 : 0) ? 1 : -1);
    }
    function go(dir, sel) {
      if ((S.dir || null) === dir && !S.q.trim()) { S.sel = sel || null; render(false); return; }
      nav(dir, { sel: sel });
    }
    function back() { if (!S.hist.length) return; nav(S.hist[S.hist.length - 1], { hist: S.hist.slice(0, -1), fwd: [S.dir || null].concat(S.fwd) }); }
    function fwd() { if (!S.fwd.length) return; nav(S.fwd[0], { hist: S.hist.concat([S.dir || null]), fwd: S.fwd.slice(1) }); }
    function up() { if (S.q.trim()) { S.q = ''; R.input.value = ''; S.sel = null; render(true, -1); } else if (S.dir) go(null); }
    function known(c) { return c === CONT || S.cats.indexOf(c) > -1; }

    el.addEventListener('click', function (e) {
      var f = e.target.closest('a[data-id]');
      if (f && el.contains(f)) {
        if (mob()) return;
        e.preventDefault();
        if (S.sel === f.getAttribute('data-id')) { location.href = f.getAttribute('href'); return; }
        S.sel = f.getAttribute('data-id'); render(false); return;
      }
      var b = e.target.closest('[data-act]');
      if (!b || !el.contains(b)) { if (R.pane.contains(e.target) && S.sel) { S.sel = null; render(false); } return; }
      var a = b.getAttribute('data-act'), c = b.getAttribute('data-c');
      if (a === 'back') back();
      else if (a === 'fwd') fwd();
      else if (a === 'grid' || a === 'list') { S.view = a; render(false); }
      else if (a === 'root') go(null);
      else if (a === 'crumb') { if (c === '__root') go(null); else if (c) { S.sel = null; render(false); } }
      else if (a === 'open') go(c);
      else if (a === 'tog') { S.open[c] = !S.open[c]; render(false); }
      else if (a === 'tree') { if (!S.q.trim() && S.dir === c) { S.open[c] = !S.open[c]; render(false); } else go(c); }
      else if (a === 'tfile') go(c, b.getAttribute('data-id'));
      else if (a === 'clearq') { S.q = ''; R.input.value = ''; render(true, -1); }
    });
    R.input.addEventListener('input', function () {
      var was = !!S.q.trim(); S.q = R.input.value; S.sel = null;
      var now = !!S.q.trim(); render(was !== now, now ? 1 : -1);
    });
    el.addEventListener('keydown', function (e) {
      var typing = /^(INPUT|TEXTAREA)$/.test(e.target.tagName);
      if (e.altKey && e.key === 'ArrowLeft') { e.preventDefault(); back(); }
      else if (e.altKey && e.key === 'ArrowRight') { e.preventDefault(); fwd(); }
      else if (e.key === 'Backspace' && !typing) { e.preventDefault(); up(); }
      else if (e.key === 'Escape') { if (S.sel) { S.sel = null; render(false); } else if (S.q) { S.q = ''; R.input.value = ''; render(true, -1); } }
    });
    window.addEventListener('pv:cat', function (e) { if (!S.G.length) return; var c = e.detail; go(known(c) ? c : null); });
    var refresh = function () { if (S.G.length) render(false); };
    window.addEventListener('focus', refresh); window.addEventListener('storage', refresh); window.addEventListener('pageshow', refresh);
    if (window.ResizeObserver) new ResizeObserver(narrow).observe(R.pane); else window.addEventListener('resize', narrow);
    if (window.matchMedia) { var mq = matchMedia('(max-width:720px)'); (mq.addEventListener ? mq.addEventListener('change', refresh) : mq.addListener(refresh)); }

    fetch(src, { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
      S.G = (d.guides || []).map(function (g) { var o = {}; for (var k in g) o[k] = g[k]; o.accent = accentOf(g); o.href = page + (page.indexOf('?') > -1 ? '&' : '?') + 'g=' + encodeURIComponent(g.id); return o; });
      S.G.forEach(function (g) { if (g.cat && S.cats.indexOf(g.cat) < 0) S.cats.push(g.cat); });
      var c = new URLSearchParams(location.search).get('cat');
      if (c && known(c)) { S.dir = c; S.open[c] = true; }
      render(true, 1);
    }).catch(function () { R.inner.innerHTML = '<div class="pvd-empty"><b>Не удалось загрузить каталог</b><span>Обновите страницу через минуту.</span></div>'; });
  }

  function Faq(el) {
    el.classList.add('pvf');
    var t = el.querySelector('[data-faq-time]');
    if (t) t.textContent = 'Сегодня, ' + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    var items = [].slice.call(el.querySelectorAll('.pvf-i'));
    items.forEach(function (it, i) {
      var b = it.querySelector('.pvf-q'), a = it.querySelector('.pvf-a'), tm;
      if (a) { a.id = a.id || 'pvf-a-' + i; b.setAttribute('aria-controls', a.id); }
      var set = function (on) { b.setAttribute('aria-expanded', on); if (a) a.setAttribute('aria-hidden', !on); };
      set(it.classList.contains('on'));
      b.addEventListener('click', function () {
        clearTimeout(tm);
        if (it.classList.contains('on')) { it.classList.remove('on', 'typing', 'shown'); set(false); return; }
        it.classList.add('on'); set(true);
        if (reduce()) { it.classList.add('shown'); return; }
        it.classList.add('typing'); it.classList.remove('shown');
        var len = ((it.querySelector('.pvf-txt') || {}).textContent || '').length;
        tm = setTimeout(function () { it.classList.remove('typing'); it.classList.add('shown'); }, 520 + Math.min(700, len * 2.2));
      });
    });
  }

  function init() {
    css();
    [].forEach.call(document.querySelectorAll('[data-pv-desk]:not([data-pvd-on])'), function (el) { el.setAttribute('data-pvd-on', ''); Desk(el); });
    [].forEach.call(document.querySelectorAll('[data-pv-faq]:not([data-pvf-on])'), function (el) { el.setAttribute('data-pvf-on', ''); Faq(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.PVDesk = { scan: init };
})();
