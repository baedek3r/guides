/* sherpa LED-лента: одна лента с точечным табло → буквы режутся на N полос → полосы петляют,
   перекручиваются и меняются местами → собираются в новую ленту с новыми словами.
   <div data-pv-led data-h="auto" data-b="54" data-lanes="5" data-gap="0.27" data-body="#f7f6f9" data-led="#141317" data-edge="#9a98a6" data-glow="0"
        data-label-left="Вакансии" data-label-right="Гайды" data-fx="drop-shadow(…)"></div>
   Свои данные: data-nums="…|…" (слева) · data-words="…|…" (справа) */
(function () {
  var NUMS = ['CRM-маркетолог · Москва', 'Growth Manager · EdTech', 'Product Manager / middle', 'Методист онлайн-курсов', 'Performance-маркетолог · удалёнка', 'Продуктовый аналитик · junior', 'Финансовый аналитик · гибрид', 'UX/UI-дизайнер · СПб', 'Project Manager · IT', 'Data Analyst · финтех', 'Instructional Designer', 'Маркетинг-аналитик · e-com', 'Product Designer / senior', 'Руководитель онлайн-школы', 'Бизнес-аналитик · банк'];
  var WORDS = ['CRM-маркетинг', 'Growth-маркетинг EdTech', 'Performance-маркетинг', 'Product-manager', 'Метрики и финансы', 'Методист'];
  var MONO = "'JetBrains Mono',ui-monospace,monospace", GC = {}, PI2 = 6.2832;
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function ss(a, b, x) { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); }
  function hsh(a, b) { var n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return n - Math.floor(n); }
  function mod(a, n) { return ((a % n) + n) % n; }
  function rgb(h) { h = h.replace('#', ''); return parseInt(h.slice(0, 2), 16) + ',' + parseInt(h.slice(2, 4), 16) + ',' + parseInt(h.slice(4, 6), 16); }
  // символ → столбцы битов: растеризуем шрифт с запасом ×4 и берём порог покрытия ячейки
  function glyph(ch, rows, cap, thr) {
    var k = ch + rows + '_' + cap, g = GC[k]; if (g) return g;
    var S = 4, fs = cap / 0.73 * S, adv = Math.ceil(fs * 0.6 / S), c = document.createElement('canvas'); c.width = adv * S; c.height = rows * S;
    var x = c.getContext('2d', { willReadFrequently: true }); x.font = '700 ' + fs.toFixed(1) + 'px ' + MONO; x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.fillStyle = '#000';
    x.fillText(ch, adv * S / 2, Math.round((rows + cap) / 2) * S);
    var d = x.getImageData(0, 0, c.width, c.height).data, m = [];
    for (var i = 0; i < adv; i++) { var b = 0; for (var j = 0; j < rows; j++) { var s = 0; for (var yy = 0; yy < S; yy++) for (var xx = 0; xx < S; xx++) s += d[((j * S + yy) * c.width + i * S + xx) * 4 + 3]; if (s > thr * 255 * S * S) b |= 1 << j; } m.push(b); }
    return GC[k] = m;
  }
  function strip(items, rows, cap, thr) {
    var out = [], mid = rows >> 1, dot = (1 << mid) | (1 << (mid - 1));
    items.forEach(function (s) { s = s.toUpperCase(); for (var i = 0; i < s.length; i++) { var g = glyph(s[i], rows, cap, thr); for (var j = 0; j < g.length; j++) out.push(g[j]); } out.push(0, 0, 0, 0, 0, dot, dot, 0, 0, 0, 0, 0); });
    return new Uint16Array(out);
  }

  function mount(root) {
    if (root.__led) return; root.__led = 1;
    var A = function (n, d) { var v = root.getAttribute(n); return v == null || v === '' ? d : v; };
    var list = function (n, d) { var v = (root.getAttribute(n) || '').split('|').filter(Boolean); return v.length ? v : d; };
    var MOB = window.innerWidth < 700, AUTO = root.getAttribute('data-h') === 'auto', H = AUTO ? 300 : +A('data-h', 300);
    var N = Math.max(3, Math.min(5, +A('data-lanes', 5))), RS = 3, RB = N * RS, CAP = Math.round(RB * 0.68);
    var B = +A('data-b', 54) * (MOB ? +A('data-m-scale', 0.8) : 1), GAP = +A('data-gap', 0.27) * (MOB ? 0.7 : 1), p = B / RB, TH = RS * p, E = p * 0.9, CPS = +A('data-cps', 12), SHIFT = +A('data-shift', 0);
    var led = rgb(A('data-led', '#ff2a1f')), body = A('data-body', '#0b0b0e'), edge = A('data-edge', '#3d3e45'), GLOW = A('data-glow', '1') !== '0';
    var nums = list('data-nums', NUMS), words = list('data-words', WORDS);
    root.style.position = 'relative'; if (!AUTO) root.style.height = H + 'px'; root.style.overflow = 'hidden';
    root.setAttribute('role', 'img'); root.setAttribute('aria-label', words.join(', '));
    if (MOB && AUTO) { root.style.flex = '0 0 auto'; root.style.height = A('data-m-height', '260px'); root.style.minHeight = '0'; var sec = root.parentElement; if (sec) { sec.style.height = 'auto'; sec.style.minHeight = '0'; } }
    var host = root.shadowRoot || (root.attachShadow ? root.attachShadow({ mode: 'open' }) : root);
    var cv = document.createElement('canvas'); cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block'; cv.style.filter = A('data-fx', ''); host.appendChild(cv);
    var labs = [A('data-label-left', ''), A('data-label-right', '')].map(function (txt, n) {
      if (!txt) return null; var el = document.createElement('span'); el.textContent = txt;
      el.style.cssText = 'position:absolute;' + (n ? 'right' : 'left') + ':clamp(16px,3vw,32px);font:500 11px ' + MONO + ';letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;color:' + A('data-label-color', '#c9c5d1');
      host.appendChild(el); return el;
    });
    var ctx = cv.getContext('2d'), W = 0, CY = 0, TOP = 0, BOT = 0;

    var R = rng(20261112), lanes = [], perm = [], i, tries = 0, fixed;
    do { perm = []; for (i = 0; i < N; i++) perm.push(i); for (i = N - 1; i > 0; i--) { var j0 = Math.floor(R() * (i + 1)), tmp = perm[i]; perm[i] = perm[j0]; perm[j0] = tmp; } fixed = 0; for (i = 0; i < N; i++) if (perm[i] === i) fixed++; } while (fixed > 0 && ++tries < 20);
    for (i = 0; i < N; i++) {
      var tw = [];
      lanes.push({
        s0: i, s1: perm[i], a0: R() * 0.2, a1: R() * 0.2, tw: tw,
        off: ((i + 0.5) / N * 2 - 1) * 0.9 + (R() * 2 - 1) * 0.08,
        w1: { amp: 0.22 + R() * 0.16, f: 0.9 + R() * 0.9, ph: R() * 6.28 },
        w2: { amp: 0.05 + R() * 0.05, f: 2.6 + R() * 1.8, ph: R() * 6.28 },
        w3: { amp: 0 * R(), f: 5 + R() * 3, ph: R() * 6.28 }
      });
    }
    var bmL, bmR;
    function build() { GC = {}; bmL = strip(nums, RB, CAP, 0.4); bmR = strip(words, RB, CAP, 0.4); }
    build();
    if (document.fonts) { try { document.fonts.load('700 32px "JetBrains Mono"', 'AЯ').then(build, function () {}); document.fonts.ready.then(build); } catch (e) {} }

    function resize() {
      W = root.clientWidth; if (AUTO) H = Math.max(160, root.clientHeight);
      CY = H / 2 + SHIFT; TOP = 8; BOT = H - 8 - E - p * 3;
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      labs.forEach(function (el) { if (el) el.style.top = Math.max(0, CY - B / 2 - 26) + 'px'; });
    }
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(root); else window.addEventListener('resize', resize);
    var vis = true; if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(root);

    function slotY(s) { return CY + ((s + 0.5) / N - 0.5) * B; }
    function bul(u) { var s = Math.sin(Math.PI * Math.min(1, Math.max(0, u))); return s * s * (3 - 2 * s); }
    function yAt(L, u, t) {
      var f = bul(u), base = slotY(L.s0) + (slotY(L.s1) - slotY(L.s0)) * ss(0, 1, u), half = Math.max(8, (BOT - TOP - TH * 1.6) / 2 - Math.abs(SHIFT)), mid = (TOP + BOT) / 2 + SHIFT;
      var wav = L.off * 0.85 + L.w1.amp * Math.sin(PI2 * L.w1.f * u + L.w1.ph + t * 0.2) + L.w2.amp * Math.sin(PI2 * L.w2.f * u + L.w2.ph - t * 0.14) + L.w3.amp * Math.sin(PI2 * L.w3.f * u + L.w3.ph + t * 0.3);
      return base + (mid + Math.tanh(wav * 1.15) * half - base) * f;
    }
    // перекрут ленты вокруг оси: 1 — лицом, 0 — ребром, <0 — изнанка
    function face(L, u, t) { for (var k = 0; k < L.tw.length; k++) { var q = L.tw[k], uc = q.u + 0.03 * Math.sin(t * 0.25 + q.ph), s = ss(uc - 0.045, uc + 0.045, u); if (s > 0 && s < 1) return Math.cos(PI2 * s); } return 1; }

    var PX = [], PT = [], PB = [], PE = [], PF = [], PS = [], DX = [], DY = [], DR = [], T = 0, y0 = 0, sheen = null, SHD = 'rgba(8,8,11,.11)', DIM = 'rgba(' + led + ',.09)';
    function lit(n) {
      if (!n) return; var k, r;
      if (GLOW) { ctx.beginPath(); for (k = 0; k < n; k++) { r = p * 0.8 * DR[k]; ctx.moveTo(DX[k] + r, DY[k]); ctx.arc(DX[k], DY[k], r, 0, PI2); } ctx.fillStyle = 'rgba(' + led + ',.2)'; ctx.fill(); }
      ctx.beginPath(); for (k = 0; k < n; k++) { r = p * 0.42 * DR[k]; ctx.moveTo(DX[k] + r, DY[k]); ctx.arc(DX[k], DY[k], r, 0, PI2); } ctx.fillStyle = 'rgb(' + led + ')'; ctx.fill();
      if (GLOW) { ctx.beginPath(); r = p * 0.11; for (k = 0; k < n; k++) ctx.rect(DX[k] - r - p * 0.06, DY[k] - r - p * 0.06, r * 2, r * 2); ctx.fillStyle = 'rgba(255,225,215,.6)'; ctx.fill(); }
    }
    function band(x0, x1, c0, c1, bm) {
      var s, c, j, x, nd = 0, len = bm.length, sft = Math.floor(T * CPS), rd = p * 0.17;
      ctx.fillStyle = SHD; for (s = 1; s <= 3; s++) ctx.fillRect(x0 + s * 0.5 * p, y0 + E + s * 0.9 * p, x1 - x0, B);
      ctx.fillStyle = edge; ctx.fillRect(x0, y0, x1 - x0, B + E);
      ctx.fillStyle = body; ctx.fillRect(x0, y0, x1 - x0, B); ctx.fillStyle = sheen; ctx.fillRect(x0, y0, x1 - x0, B);
      ctx.beginPath();
      for (c = c0; c < c1; c++) {
        x = (c + 0.5) * p; var m = bm[mod(c - sft, len)];
        for (j = 0; j < RB; j++) { var y = y0 + (j + 0.5) * p; if (m >> j & 1) { DX[nd] = x; DY[nd] = y; DR[nd] = 1; nd++; } else ctx.rect(x - rd, y - rd, rd * 2, rd * 2); }
      }
      ctx.fillStyle = DIM; ctx.fill(); lit(nd);
    }

    var t0 = performance.now(), reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function frame(now) {
      if (!root.isConnected) return;
      requestAnimationFrame(frame);
      if (!vis || W < 10) return;
      T = reduce ? 0 : Math.max(0, (now - t0) / 1000); y0 = CY - B / 2;
      var xa = W * GAP, xb = W - xa, ST = 3, n, k, x, c, j, s, cA = Math.ceil(xa / p - 0.5), cB = Math.ceil(xb / p - 0.5);
      var sft = Math.floor(T * CPS), tick = Math.floor(T * 8);
      ctx.clearRect(0, 0, W, H);
      sheen = ctx.createLinearGradient(0, 0, W, H * 0.3);
      for (k = 0; k < 3; k++) { s = Math.min(1, Math.max(0, (((T * 0.012 + k / 3) % 1) + 1) % 1)); sheen.addColorStop(Math.max(0, s - 0.07), 'rgba(255,255,255,0)'); sheen.addColorStop(s, 'rgba(255,255,255,.1)'); sheen.addColorStop(Math.min(1, s + 0.07), 'rgba(255,255,255,0)'); }

      band(-20, xa + 0.5, 0, cA, bmL);
      band(xb - 0.5, W + 20, cB, Math.ceil(W / p), bmR);
      for (var i = 0; i < N; i++) {
        var L = lanes[i], span = xb - xa, a = xa + L.a0 * span * 0.5, b = xb - L.a1 * span * 0.5, du = 1 / (b - a), eL = L.s0 === N - 1 ? 1 : 0, eR = L.s1 === N - 1 ? 1 : 0;
        n = 0;
        for (x = xa - 1; x < xb + 1 + ST; x += ST) {
          var xx = Math.min(x, xb + 1), u = (xx - a) * du, yc = yAt(L, u, T), sl = yAt(L, u + du, T) - yc, fc = face(L, u, T), hv = TH * Math.min(2, Math.sqrt(1 + sl * sl)) * Math.max(0.14, Math.abs(fc)) / 2;
          var ps = Math.max(bul(u), eL * (1 - ss(0, 0.5, u)) + eR * ss(0.5, 1, u));
          var tp = (L.s0 === 0 ? 1 - ss(0, 0.5, u) : 0) + (L.s1 === 0 ? ss(0.5, 1, u) : 0);
          PX[n] = xx; PT[n] = yc - hv - 0.8 * (1 - ps) * (1 - tp); PB[n] = yc + hv + 0.8 * (1 - ps); PE[n] = E * ps; PS[n] = ps; PF[n] = fc < 0; n++;
        }
        var path = function (k0, k1, e, sh, ins) { var ox = (sh || 0) * 0.5 * p, oy = (sh || 0) * 0.9 * p, iq = (ins || 0) * 1.8; ctx.beginPath(); for (k = k0; k <= k1; k++) ctx.lineTo(PX[k] + ox * PS[k], PT[k] + oy * PS[k] + iq * (1 - PS[k])); for (k = k1; k >= k0; k--) ctx.lineTo(PX[k] + ox * PS[k], PB[k] + e * PE[k] + oy * PS[k] - iq * (1 - PS[k])); ctx.closePath(); };
        ctx.save(); ctx.beginPath(); ctx.rect(xa + 1, 0, xb - xa - 2, H); ctx.clip();
        ctx.fillStyle = SHD; for (s = 1; s <= 3; s++) { path(0, n - 1, 1, s, 1); ctx.fill(); }
        path(0, n - 1, 1, 0, 1); ctx.fillStyle = edge; ctx.fill();
        ctx.restore();
        path(0, n - 1, 0); ctx.fillStyle = body; ctx.fill(); ctx.fillStyle = sheen; ctx.fill();
        for (var k0 = -1, q = 0; q <= n; q++) { if (q < n && PF[q]) { if (k0 < 0) k0 = q; } else if (k0 >= 0) { path(Math.max(0, k0 - 1), Math.min(n - 1, q), 0); ctx.fillStyle = edge; ctx.fill(); k0 = -1; } }

        // точки: слева — срез букв исходной ленты, справа — срез новой; в середине срезы перемешиваются
        var r0 = L.s0 * RS, r1 = L.s1 * RS, nd = 0, lenL = bmL.length, lenR = bmR.length;
        ctx.beginPath();
        for (c = cA; c < cB; c++) {
          x = (c + 0.5) * p; var u2 = (x - a) * du, fc2 = face(L, u2, T); if (fc2 < 0.3) continue;
          var yc2 = yAt(L, u2, T), sl2 = yAt(L, u2 + du, T) - yc2, dy = p * Math.min(2, Math.sqrt(1 + sl2 * sl2)) * fc2, rd = p * 0.17 * fc2;
          var kk = c - sft, mL = bmL[mod(kk, lenL)], mR = bmR[mod(kk, lenR)], w = ss(0.36, 0.64, u2), nz = Math.exp(-Math.pow((u2 - 0.5) / 0.13, 2));
          for (j = 0; j < RS; j++) {
            var bit = hsh(kk, r0 + j) < w ? (mR >> (r1 + j)) & 1 : (mL >> (r0 + j)) & 1, y = yc2 + (j - (RS - 1) / 2) * dy;
            if (nz > 0.05 && hsh(kk * 1.7 + tick * 3.1, r0 + j + 7.3) < nz * 0.05) bit ^= 1;
            if (bit) { DX[nd] = x; DY[nd] = y; DR[nd] = fc2; nd++; } else ctx.rect(x - rd, y - rd, rd * 2, rd * 2);
          }
        }
        ctx.fillStyle = DIM; ctx.fill(); lit(nd);
      }
    }
    requestAnimationFrame(frame);
  }
  function scan() { [].forEach.call(document.querySelectorAll('[data-pv-led]'), mount); }
  window.PVLed = { scan: scan, mount: mount };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
})();
