/* sherpa ticker: слева лента цифр → дельта из случайных тропинок → справа лента слов.
   Вставка: <div data-pv-ticker></div> + <script src=".../ticker.js"></script>
   Свои данные: data-nums="12 480|96%|…" data-words="SQL|Когорты|…"
   Подписи: data-label-left="…" data-label-right="…" (пустая строка — без подписи) */
(function () {
  var NUMS = ['Ищем CRM-маркетолога, опыт от 1 года', 'Требования: SQL, A/B-тесты', 'Growth Manager · EdTech', 'от 150 000 ₽ · гибрид', 'Знание юнит-экономики обязательно', 'Методист онлайн-курсов', 'Product Manager / middle', 'Опыт с Яндекс Директ и VK Рекламой', 'Будет плюсом: Amplitude, Metabase', 'Performance-маркетолог · Москва', 'Понимание P&L и когортного анализа', 'Проведение custdev-интервью'];
  var WORDS = ['CRM-маркетинг', 'Growth-маркетинг EdTech', 'Performance-маркетинг', 'Product-manager', 'Метрики и финансы', 'Методист'];
  var SKILLS = ['SQL', 'LTV', 'CAC', 'RFM', 'A/B', 'ДРР', 'CPL', 'NSM', 'P&L', 'Когорты', 'Custdev', 'RICE', 'UTM', 'CDP', 'ROMI', 'Retention', 'Директ', 'Воронка', 'Юнит-эк.', 'Атрибуция'];
  var LETTERS = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ', DIGITS = '0123456789', NOISE = '#%&*+=/<>?§¤@';
  var MONO = "'JetBrains Mono',ui-monospace,monospace";
  var H = 132, B = 44, N = 14, SPEED = 44;

  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function ss(a, b, x) { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); }

  function mount(root) {
    if (root.__pvt) return; root.__pvt = 1;
    var A = function (n, d) { var v = root.getAttribute(n); return v == null ? d : v; };
    var H = +A('data-h', 132), B = +A('data-b', 44), N = +A('data-lanes', 14), K = B / 44, SPEED = 44 * Math.sqrt(K);
    var nums = A('data-nums', '').split('|').filter(Boolean); if (!nums.length) nums = NUMS;
    var words = A('data-words', '').split('|').filter(Boolean); if (!words.length) words = WORDS;
    var ink = A('data-bg', '#141317'), fg = A('data-fg', '#ffffff'), acc = A('data-accent', '#ff2a1f'), paper = A('data-paper', '#f7f6f9');
    var labL = A('data-label-left', ''), labR = A('data-label-right', '');
    var AUTO = A('data-h', '') === 'auto';
    root.style.position = 'relative'; if (!AUTO) root.style.height = H + 'px'; root.style.overflow = 'hidden';
    root.setAttribute('role', 'img'); root.setAttribute('aria-label', words.join(', '));
    var host = root.shadowRoot || (root.attachShadow ? root.attachShadow({ mode: 'open' }) : root);
    var cv = document.createElement('canvas');
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    host.appendChild(cv);
    var ctx = cv.getContext('2d'), W = 0;
    var SEP = '    ·    ';
    var numStr = nums.join(SEP) + SEP, wordStr = words.join(SEP).toUpperCase() + SEP, numW = 0, wordW = 0;
    var FN = '500 ' + (12.5 * K).toFixed(1) + 'px ' + MONO, FW = '500 ' + (11.5 * K).toFixed(1) + 'px ' + MONO;

    var R = rng(20261010), lanes = [], perm = [];
    for (var i = 0; i < N; i++) perm.push(i);
    for (var i2 = N - 1; i2 > 0; i2--) { var j = Math.floor(R() * (i2 + 1)); var tmp = perm[i2]; perm[i2] = perm[j]; perm[j] = tmp; }
    for (var l = 0; l < N; l++) {
      lanes.push({
        s0: l, s1: perm[l],
        a0: R() * 0.16, a1: R() * 0.16,
        off: ((l + 0.5) / N * 2 - 1) * 0.85 + (R() * 2 - 1) * 0.25,
        w1: { amp: 0.18 + R() * 0.32, f: 0.6 + R() * 1.6, ph: R() * 6.28 },
        w2: { amp: R() * 0.12, f: 2 + R() * 3, ph: R() * 6.28 },
        th: (0.7 + R() * 1.3) * Math.sqrt(K) * +A('data-th', 1),
        sp: 0.9 + R() * 0.25
      });
    }
    var packets = [];
    var skills = A('data-skills', '').split('|').filter(Boolean); if (!skills.length) skills = SKILLS;
    var NP = Math.ceil(N * 0.6);
    for (var p = 0; p < NP; p++) packets.push({ lane: Math.floor(p * N / NP), u: (p * 0.618) % 1, seed: Math.floor(R() * 997) });

    if (AUTO) H = Math.max(160, root.clientHeight || 300);
    var CY = H / 2 + 6 * K, TOP = 12 * K, BOT = H - 6 * K;
    function resize() {
      W = root.clientWidth; if (AUTO) { H = Math.max(160, root.clientHeight); CY = H / 2 + 6 * K; TOP = 12 * K; BOT = H - 6 * K; }
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = FN; numW = ctx.measureText(numStr).width;
      ctx.font = FW; wordW = ctx.measureText(wordStr).width;
    }
    resize();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);
    if (window.ResizeObserver) new ResizeObserver(resize).observe(root);

    function slotY(s) { return CY + ((s + 0.5) / N - 0.5) * B; }
    function zone() { var m = W < 700; var g = +A('data-gap', m ? 0.24 : 0.30); return { xa: W * g, xb: W * (1 - g) }; }
    function laneU(L, x, z) { var span = z.xb - z.xa, a = z.xa + L.a0 * span * 0.5, b = z.xb - L.a1 * span * 0.5; return { u: (x - a) / (b - a), a: a, b: b }; }
    function bul(u) { var s = Math.sin(Math.PI * Math.min(1, Math.max(0, u))); return s * s * (3 - 2 * s); }
    function yAt(L, u, t) {
      var f = bul(u), base = slotY(L.s0) + (slotY(L.s1) - slotY(L.s0)) * ss(0, 1, u);
      var half = (BOT - TOP) / 2, mid = (TOP + BOT) / 2;
      var wav = L.off * 0.78 + L.w1.amp * 0.45 * Math.sin(Math.PI * 2 * L.w1.f * u + L.w1.ph + t * 0.12) + L.w2.amp * 0.5 * Math.sin(Math.PI * 2 * L.w2.f * u + L.w2.ph);
      var target = mid + Math.max(-1, Math.min(1, wav)) * half;
      return base + (target - base) * f;
    }
    function thAt(L, u) { var f = bul(u); return (B / N + 0.35) * (1 - f) + L.th * f; }

    function band(x0, x1, str, strW, off, font, y0) {
      if (x1 <= x0) return;
      ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, B); ctx.clip();
      ctx.fillStyle = ink; ctx.fillRect(x0, y0, x1 - x0, B);
      ctx.fillStyle = fg; ctx.font = font; ctx.textBaseline = 'middle';
      if (strW > 0) { var x = (off % strW) - strW; while (x < x1) { ctx.fillText(str, x, y0 + B / 2 + 0.5); x += strW; } }
      ctx.restore();
    }
    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

    var t0 = performance.now(), last = t0, reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function frame(now) {
      if (!root.isConnected) return;
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      var t = reduce ? 0 : (now - t0) / 1000, z = zone(), y0 = CY - B / 2;
      ctx.clearRect(0, 0, W, H);

      band(0, z.xa + 2, numStr, numW, t * SPEED, FN, y0);
      band(z.xb - 2, W, wordStr, wordW, t * SPEED - z.xb, FW, y0);
      var FD = 56 * K, gl = ctx.createLinearGradient(z.xa - FD, 0, z.xa, 0); gl.addColorStop(0, ink + '00'); gl.addColorStop(1, ink);
      ctx.fillStyle = gl; ctx.fillRect(z.xa - FD, y0, FD + 2, B);
      var gr = ctx.createLinearGradient(z.xb, 0, z.xb + FD, 0); gr.addColorStop(0, ink); gr.addColorStop(1, ink + '00');
      ctx.fillStyle = gr; ctx.fillRect(z.xb - 2, y0, FD + 2, B);

      ctx.fillStyle = ink;
      for (var i = 0; i < N; i++) {
        var L = lanes[i], g = laneU(L, 0, z), a = g.a, b = g.b, STEP = 2.5;
        var x0 = z.xa, x1 = z.xb;
        ctx.beginPath();
        for (var x = x0; x <= x1 + 0.1; x += STEP) { var u = (x - a) / (b - a); ctx.lineTo(x, yAt(L, u, t) - thAt(L, u) / 2); }
        for (var xr = x1; xr >= x0 - 0.1; xr -= STEP) { var ur = (xr - a) / (b - a); ctx.lineTo(xr, yAt(L, ur, t) + thAt(L, ur) / 2); }
        ctx.closePath(); ctx.fill();
      }

      var PF = Math.max(9.5, 7.5 * K); ctx.font = '600 ' + PF.toFixed(1) + 'px ' + MONO; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (var k = 0; k < packets.length; k++) {
        var P = packets[k], L2 = lanes[P.lane], g2 = laneU(L2, 0, z);
        if (!reduce) { P.u += dt * SPEED * L2.sp / (g2.b - g2.a); if (P.u > 1) { P.u -= 1; P.seed = Math.floor(Math.random() * 997); } }
        var u2 = P.u, f2 = bul(u2); if (f2 < 0.72) continue;
        var px = g2.a + u2 * (g2.b - g2.a), py = yAt(L2, u2, t);
        var scr = ss(0.40, 0.47, u2) * (1 - ss(0.56, 0.63, u2));
        var ch = skills[P.seed % skills.length];
        var tw = ctx.measureText(ch).width + PF * 1.1, th2 = PF * 1.75;
        ctx.globalAlpha = ss(0.72, 0.88, f2);
        ctx.fillStyle = scr > 0.5 ? acc : ink; rr(px - tw / 2, py - th2 / 2, tw, th2, th2 / 2); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.fillText(ch, px, py + 0.5);
      }
      ctx.globalAlpha = 1; ctx.textAlign = 'start';

      if (labL || labR) {
        ctx.font = '500 ' + (9.5 * Math.sqrt(K)).toFixed(1) + 'px ' + MONO; ctx.fillStyle = '#8b8794'; ctx.textBaseline = 'alphabetic';
        var ly = y0 - 9 * Math.sqrt(K);
        if (labL) { ctx.textAlign = 'right'; ctx.fillText(labL.toUpperCase(), z.xa - 10 * K, ly); }
        if (labR) { ctx.textAlign = 'left'; ctx.fillText(labR.toUpperCase(), z.xb + 10 * K, ly); }
        ctx.textAlign = 'start';
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  function scan() { [].forEach.call(document.querySelectorAll('[data-pv-ticker]'), mount); }
  window.PVTicker = { scan: scan, mount: mount };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
})();
