/* sherpa. — мерцающие звёзды в тёмном футере.
   Звёзды ставятся только в пустые места: текст, иконки, кнопки и линии-разделители обходятся с отступом.
   Подключение: <script src=".../stars.js"></script> в любом месте страницы. Отключить для футера: data-no-stars. */
(function () {
  if (window.__shStars) return; window.__shStars = 1;
  var PAD = 14, EDGE = 8, CELL = 4, DENS = 2100, MAXN = 340, FPS = 40, TAU = Math.PI * 2;
  var RM = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var COLS = [[247, 246, 249], [247, 246, 249], [247, 246, 249], [236, 234, 242], [214, 208, 255], [255, 232, 212]];
  var sprites = {};

  function sprite(c) {
    var k = c.join(); if (sprites[k]) return sprites[k];
    var s = 64, cv = document.createElement('canvas'); cv.width = cv.height = s;
    var x = cv.getContext('2d'), g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2), p = 'rgba(' + k + ',';
    g.addColorStop(0, p + '1)'); g.addColorStop(.2, p + '.92)'); g.addColorStop(.34, p + '.32)');
    g.addColorStop(.6, p + '.06)'); g.addColorStop(1, p + '0)');
    x.fillStyle = g; x.fillRect(0, 0, s, s);
    return (sprites[k] = cv);
  }
  function alphaOf(col) { var m = col && col.match(/[\d.]+/g); return !m || m.length < 3 ? 0 : m.length > 3 ? +m[3] : 1; }
  function isDark(el) {
    var m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
    if (!m || m.length < 3 || (m.length > 3 && +m[3] < .5)) return false;
    return .2126 * m[0] + .7152 * m[1] + .0722 * m[2] < 60;
  }
  function ease(t) { return t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3); }

  function Field(ft) {
    var self = this;
    this.ft = ft; ft.setAttribute('data-stars', '');
    if (getComputedStyle(ft).position === 'static') ft.style.position = 'relative';
    ft.style.isolation = 'isolate';
    var cv = this.cv = document.createElement('canvas');
    cv.setAttribute('aria-hidden', 'true');
    cv.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;pointer-events:none;display:block;opacity:1';
    ft.appendChild(cv);
    this.ctx = cv.getContext('2d');
    this.stars = []; this.shoot = null; this.mouse = null; this.vis = false; this.start = 0; this.raf = 0; this.last = 0;
    this.nextShoot = 6 + Math.random() * 6;

    this.tick = function (now) { self.frame(now); };
    this.schedule = function () { clearTimeout(self.tm); self.tm = setTimeout(function () { self.layout(); }, 120); };

    this.ro = window.ResizeObserver ? new ResizeObserver(this.schedule) : null;
    if (this.ro) this.ro.observe(ft); else window.addEventListener('resize', this.schedule);
    this.mo = new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) if (list[i].target !== cv && !(list[i].addedNodes.length === 1 && list[i].addedNodes[0] === cv)) return self.schedule();
    });
    this.mo.observe(ft, { childList: true, subtree: true, characterData: true });
    this.io = window.IntersectionObserver ? new IntersectionObserver(function (e) {
      self.vis = e[e.length - 1].isIntersecting; self.run();
    }, { rootMargin: '120px' }) : null;
    if (this.io) this.io.observe(ft); else this.vis = true;

    ft.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      var r = cv.getBoundingClientRect(); self.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    }, { passive: true });
    ft.addEventListener('pointerleave', function () { self.mouse = null; }, { passive: true });
    document.addEventListener('visibilitychange', function () { self.run(); });
    if (RM.addEventListener) RM.addEventListener('change', function () { self.run(); self.draw(performance.now() / 1000); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(this.schedule);
    this.layout();
  }

  Field.prototype.free = function (x, y) {
    return x >= EDGE && y >= EDGE && x <= this.W - EDGE && y <= this.H - EDGE && !this.m[(y / CELL | 0) * this.gw + (x / CELL | 0)];
  };

  Field.prototype.layout = function () {
    var ft = this.ft, cv = this.cv;
    if (!ft.isConnected) return this.destroy();
    if (cv.parentNode !== ft) ft.appendChild(cv);
    var W = ft.clientWidth, H = ft.clientHeight; if (!W || !H) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    this.W = W; this.H = H; this.dpr = dpr;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);

    var gw = this.gw = Math.ceil(W / CELL) + 1, gh = Math.ceil(H / CELL) + 1, m = this.m = new Uint8Array(gw * gh);
    var fr = ft.getBoundingClientRect(), ox = fr.left + ft.clientLeft, oy = fr.top + ft.clientTop;
    function mark(l, t, r, b) {
      var x0 = Math.max(0, Math.floor((l - ox - PAD) / CELL)), x1 = Math.min(gw - 1, Math.floor((r - ox + PAD) / CELL));
      var y0 = Math.max(0, Math.floor((t - oy - PAD) / CELL)), y1 = Math.min(gh - 1, Math.floor((b - oy + PAD) / CELL));
      for (var y = y0; y <= y1; y++) for (var x = x0; x <= x1; x++) m[y * gw + x] = 1;
    }

    var range = document.createRange(), tw = document.createTreeWalker(ft, NodeFilter.SHOW_TEXT), n, rs, i;
    while ((n = tw.nextNode())) {
      if (!/\S/.test(n.nodeValue)) continue;
      range.selectNodeContents(n); rs = range.getClientRects();
      for (i = 0; i < rs.length; i++) if (rs[i].width && rs[i].height) mark(rs[i].left, rs[i].top, rs[i].right, rs[i].bottom);
    }
    var els = ft.querySelectorAll('*');
    for (i = 0; i < els.length; i++) {
      var e = els[i]; if (e === cv || e.ownerSVGElement) continue;
      var r = e.getBoundingClientRect(); if (!r.width && !r.height) continue;
      var cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
      if (/^(SVG|IMG|PICTURE|VIDEO|CANVAS|IFRAME|INPUT|BUTTON|SELECT|TEXTAREA)$/i.test(e.tagName) ||
          alphaOf(cs.backgroundColor) > 0 || cs.backgroundImage !== 'none' || cs.boxShadow !== 'none') { mark(r.left, r.top, r.right, r.bottom); continue; }
      var bt = alphaOf(cs.borderTopColor) && parseFloat(cs.borderTopWidth) || 0, bb = alphaOf(cs.borderBottomColor) && parseFloat(cs.borderBottomWidth) || 0;
      var bl = alphaOf(cs.borderLeftColor) && parseFloat(cs.borderLeftWidth) || 0, br = alphaOf(cs.borderRightColor) && parseFloat(cs.borderRightWidth) || 0;
      if (bt && bb && bl && br) { mark(r.left, r.top, r.right, r.bottom); continue; }
      if (bt) mark(r.left, r.top, r.right, r.top + bt);
      if (bb) mark(r.left, r.bottom - bb, r.right, r.bottom);
      if (bl) mark(r.left, r.top, r.left + bl, r.bottom);
      if (br) mark(r.right - br, r.top, r.right, r.bottom);
    }

    var freeCells = 0, x, y;
    for (y = Math.ceil(EDGE / CELL); y < Math.floor((H - EDGE) / CELL); y++)
      for (x = Math.ceil(EDGE / CELL); x < Math.floor((W - EDGE) / CELL); x++) if (!m[y * gw + x]) freeCells++;
    var target = Math.min(MAXN, Math.round(freeCells * CELL * CELL / DENS));

    var D = Math.sqrt(DENS) * .5, hs = D, hw = Math.ceil(W / hs) + 1, hash = {}, self = this;
    function near(px, py) {
      var cx = px / hs | 0, cy = py / hs | 0;
      for (var yy = cy - 1; yy <= cy + 1; yy++) for (var xx = cx - 1; xx <= cx + 1; xx++) {
        var b = hash[yy * hw + xx]; if (!b) continue;
        for (var k = 0; k < b.length; k++) { var dx = b[k].x - px, dy = b[k].y - py; if (dx * dx + dy * dy < D * D) return true; }
      }
      return false;
    }
    function put(s) { var key = (s.y / hs | 0) * hw + (s.x / hs | 0); (hash[key] || (hash[key] = [])).push(s); }
    var keep = [];
    for (i = 0; i < this.stars.length && keep.length < target; i++) {
      var s = this.stars[i];
      if (self.free(s.x, s.y) && !near(s.x, s.y)) { keep.push(s); put(s); }
    }
    for (var tries = 0; keep.length < target && tries < target * 40; tries++) {
      x = EDGE + Math.random() * (W - EDGE * 2); y = EDGE + Math.random() * (H - EDGE * 2);
      if (!this.free(x, y) || near(x, y)) continue;
      var ns = this.mk(x, y); keep.push(ns); put(ns);
    }
    this.stars = keep;
    if (this.shoot && !this.pathFree(this.shoot)) this.shoot = null;
    this.draw(performance.now() / 1000);
    this.run();
  };

  Field.prototype.mk = function (x, y) {
    var u = Math.random(), big = u > .935, mid = u > .7, c = COLS[Math.random() * COLS.length | 0];
    return {
      x: x, y: y, big: big, c: sprite(c), rgb: c.join(),
      r: big ? 1.15 + Math.random() * .5 : mid ? .75 + Math.random() * .35 : .42 + Math.random() * .3,
      b: big ? .62 + Math.random() * .3 : mid ? .4 + Math.random() * .3 : .22 + Math.random() * .3,
      sp: .45 + Math.random() * 1.25, ph: Math.random() * TAU,
      sp2: .06 + Math.random() * .14, ph2: Math.random() * TAU,
      d: Math.random() * 1.6, hov: 0
    };
  };

  Field.prototype.pathFree = function (p) {
    for (var t = 0; t <= p.L; t += 3) if (!this.free(p.x + p.dx * t, p.y + p.dy * t)) return false;
    return true;
  };
  Field.prototype.spawnShoot = function (t) {
    for (var a = 0; a < 60; a++) {
      var ang = (12 + Math.random() * 20) * Math.PI / 180, dir = Math.random() < .5 ? 1 : -1;
      var p = { x: EDGE + Math.random() * (this.W - EDGE * 2), y: EDGE + Math.random() * (this.H - EDGE * 2),
        dx: Math.cos(ang) * dir, dy: Math.sin(ang), L: 70 + Math.random() * 130, t0: t };
      p.TL = Math.min(70, p.L * .6); p.dur = (p.L + p.TL) / 340;
      if (this.pathFree(p)) return p;
    }
    return null;
  };

  Field.prototype.draw = function (t) {
    var ctx = this.ctx, W = this.W, H = this.H; if (!W) return;
    var still = RM.matches, intro = this.start ? t - this.start : 0, mo = this.mouse, R = 130;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < this.stars.length; i++) {
      var s = this.stars[i], w, k, a;
      if (still) { w = .75; k = 1; }
      else {
        w = .5 + .5 * Math.sin(t * s.sp + s.ph);
        k = ease((intro - s.d) / 1.1);
        var tgt = 0;
        if (mo) { var dx = s.x - mo.x, dy = s.y - mo.y, dd = Math.sqrt(dx * dx + dy * dy); if (dd < R) { tgt = 1 - dd / R; tgt *= tgt; } }
        s.hov += (tgt - s.hov) * .1;
      }
      if (k <= 0) continue;
      var slow = .55 + .45 * Math.sin(t * s.sp2 + s.ph2);
      a = s.b * (.28 + .72 * w * w * (still ? 1 : slow)) + s.hov * .5;
      a = Math.min(1, a) * k;
      var sc = 1 + s.hov * .45, size = s.r * sc * 6;
      ctx.globalAlpha = a;
      ctx.drawImage(s.c, s.x - size / 2, s.y - size / 2, size, size);
      if (s.big) {
        var g = (still ? .35 : Math.pow(w, 5) * slow) + s.hov * .6;
        if (g > .04) {
          var len = Math.min(PAD - 4, s.r * sc * (3 + 3.5 * Math.min(1, g)));
          ctx.globalAlpha = Math.min(1, g) * .75 * k;
          var gr = ctx.createLinearGradient(s.x - len, 0, s.x + len, 0);
          gr.addColorStop(0, 'rgba(' + s.rgb + ',0)'); gr.addColorStop(.5, 'rgba(' + s.rgb + ',1)'); gr.addColorStop(1, 'rgba(' + s.rgb + ',0)');
          ctx.fillStyle = gr; ctx.fillRect(s.x - len, s.y - .3, len * 2, .6);
          gr = ctx.createLinearGradient(0, s.y - len, 0, s.y + len);
          gr.addColorStop(0, 'rgba(' + s.rgb + ',0)'); gr.addColorStop(.5, 'rgba(' + s.rgb + ',1)'); gr.addColorStop(1, 'rgba(' + s.rgb + ',0)');
          ctx.fillStyle = gr; ctx.fillRect(s.x - .3, s.y - len, .6, len * 2);
        }
      }
    }
    var p = this.shoot;
    if (p && !still) {
      var v = ease((t - p.t0) / p.dur) * (p.L + p.TL), head = Math.min(v, p.L), tail = Math.max(0, v - p.TL);
      if (v >= p.L + p.TL - .5) this.shoot = null;
      else if (head > tail + .5) {
        var hx = p.x + p.dx * head, hy = p.y + p.dy * head, tx = p.x + p.dx * tail, ty = p.y + p.dy * tail;
        var fade = Math.sin(Math.PI * Math.min(1, v / (p.L + p.TL)));
        var lg = ctx.createLinearGradient(tx, ty, hx, hy);
        lg.addColorStop(0, 'rgba(247,246,249,0)'); lg.addColorStop(1, 'rgba(247,246,249,.85)');
        ctx.globalAlpha = fade; ctx.strokeStyle = lg; ctx.lineWidth = 1.1; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();
        if (v < p.L) { ctx.globalAlpha = fade; ctx.drawImage(sprite(COLS[0]), hx - 4, hy - 4, 8, 8); }
      }
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  };

  Field.prototype.frame = function (now) {
    this.raf = 0;
    if (!this.ok()) return;
    this.raf = requestAnimationFrame(this.tick);
    if (now - this.last < 1000 / FPS - 2) return;
    this.last = now;
    var t = now / 1000;
    if (!this.start) this.start = t;
    if (!this.shoot && t - this.start > this.nextShoot) {
      this.shoot = this.spawnShoot(t);
      this.nextShoot = t - this.start + 9 + Math.random() * 12;
    }
    this.draw(t);
  };
  Field.prototype.ok = function () { return this.ft.isConnected && this.vis && !document.hidden && !RM.matches && this.W; };
  Field.prototype.run = function () {
    if (this.ok()) { if (!this.raf) this.raf = requestAnimationFrame(this.tick); }
    else if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; }
  };
  Field.prototype.destroy = function () {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.ro && this.ro.disconnect(); this.mo.disconnect(); this.io && this.io.disconnect();
    var i = fields.indexOf(this); if (i > -1) fields.splice(i, 1);
  };

  var fields = [], pend = 0;
  function scan() {
    pend = 0;
    var fs = document.querySelectorAll('footer:not([data-stars]):not([data-no-stars])');
    for (var i = 0; i < fs.length; i++) if (isDark(fs[i])) fields.push(new Field(fs[i]));
  }
  function init() {
    scan();
    new MutationObserver(function () { if (!pend) pend = requestAnimationFrame(scan); })
      .observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();
