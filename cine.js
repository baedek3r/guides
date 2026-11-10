/* sherpa — плёночные эффекты.
   [data-pv-grain="0.8"] — живое зерно поверх блока (значение — непрозрачность).
   [data-pv-spot="540"] — пятно света (радиус, px) за курсором; слушает ближайший [data-pv-spot-host] или родителя.
   [data-pv-stage] — при скролле блок сжимается в скруглённую карточку. */
(function () {
  var tile, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function noise() {
    if (tile) return tile;
    var c = document.createElement('canvas'); c.width = c.height = 180;
    var x = c.getContext('2d'), d = x.createImageData(180, 180), a = d.data;
    for (var i = 0; i < a.length; i += 4) { var v = Math.random() * 255 | 0; a[i] = a[i + 1] = a[i + 2] = v; a[i + 3] = 12 + Math.random() * 30; }
    x.putImageData(d, 0, 0); return tile = 'url(' + c.toDataURL() + ')';
  }
  function watch(el, cb) { if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { cb(es[0].isIntersecting); }).observe(el); else cb(true); }
  function grain(el) {
    if (el.__g) return; el.__g = 1;
    var n = document.createElement('div');
    n.style.cssText = 'position:absolute;inset:0;pointer-events:none;background-image:' + noise() + ';background-size:180px 180px;opacity:' + (el.getAttribute('data-pv-grain') || '1');
    el.appendChild(n);
    if (reduce) return;
    var vis = false; watch(el, function (v) { vis = v; });
    setInterval(function () { if (vis) n.style.backgroundPosition = (Math.random() * 180 | 0) + 'px ' + (Math.random() * 180 | 0) + 'px'; }, 90);
  }
  function spot(el) {
    if (el.__s) return; el.__s = 1;
    var host = el.closest('[data-pv-spot-host]') || el.parentElement, R = +el.getAttribute('data-pv-spot') || 540, tx = 0, ty = 0, x = 0, y = 0, raf = 0, first = true;
    var n = document.createElement('div');
    n.style.cssText = 'position:absolute;left:0;top:0;width:' + R * 2 + 'px;height:' + R * 2 + 'px;margin:-' + R + 'px 0 0 -' + R + 'px;pointer-events:none;opacity:0;transition:opacity .5s ease;will-change:transform;background:radial-gradient(closest-side,rgba(130,158,255,.22),rgba(42,92,255,.08) 45%,rgba(42,92,255,0) 72%)';
    el.appendChild(n);
    function tick() { raf = 0; x += (tx - x) * 0.12; y += (ty - y) * 0.12; n.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)'; if (Math.abs(tx - x) + Math.abs(ty - y) > 0.5) raf = requestAnimationFrame(tick); }
    host.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = el.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top;
      if (first) { x = tx; y = ty; first = false; }
      n.style.opacity = '1'; if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
    host.addEventListener('pointerleave', function () { n.style.opacity = '0'; first = true; });
  }
  function stage(el) {
    if (el.__st || reduce) return; el.__st = 1;
    function on() {
      var r = el.parentElement.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height))), tf = p ? 'scale(' + (1 - 0.06 * p).toFixed(4) + ')' : 'none', br = (p * 44).toFixed(1) + 'px';
      if (el.style.transform !== tf) el.style.transform = tf; if (el.style.borderRadius !== br) el.style.borderRadius = br;
    }
    window.addEventListener('scroll', on, { passive: true });
    if (window.MutationObserver) new MutationObserver(on).observe(el, { attributes: true, attributeFilter: ['style'] });
    on();
  }
  function scan() { [].forEach.call(document.querySelectorAll('[data-pv-grain]'), grain); [].forEach.call(document.querySelectorAll('[data-pv-spot]'), spot); [].forEach.call(document.querySelectorAll('[data-pv-stage]'), stage); }
  window.PVCine = { scan: scan };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
})();
