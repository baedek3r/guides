/* Тест по гайду. Вставка: <div data-quiz="https://…/crm.json" data-accent="#ff2a1f"></div><script src="quiz.js"></script>
   Типы вопросов: single (один ответ), multi (несколько), number (задача с числовым ответом). */
(function () {
  if (window.QuizKit) return;
  var BG = '#ffffff', CARD = '#f5f4f7', LINE = '#efedf3', LINE2 = '#dddae3', FG = '#141317', DIM = '#4a4752', FAINT = '#8b8794',
      OK = '#12863b', OK_BG = '#ebf6ef', BAD = '#d1281c', BAD_BG = '#fcedeb';
  var MONO = "'JetBrains Mono',ui-monospace,monospace", UI = "'Onest','Helvetica Neue',Helvetica,Arial,sans-serif";
  var st = document.createElement('style');
  st.textContent = '.qz-o{transition:background .15s,box-shadow .15s}.qz-o:hover:not([disabled]){background:#ecebf0!important}' +
    '.qz-b{transition:background .15s,opacity .15s}.qz-b:hover:not(:disabled){background:#2e2c34!important}.qz-b:disabled{opacity:.3;cursor:default}' +
    '.qz-g{transition:background .15s}.qz-g:hover{background:#dddae3!important}' +
    '.qz-m{transition:background .15s,color .15s}.qz-m:hover:not([aria-pressed=true]){color:' + FG + '!important}' +
    '.qz-i:focus{outline:none;border-color:' + FG + '!important}.qz-i::placeholder{color:' + FAINT + '}' +
    '.qz-l{transition:color .15s,border-color .15s}.qz-l:hover{color:' + FG + '!important;border-color:' + FG + '!important}' +
    '.qz-deco{position:absolute;top:22px;right:24px;display:grid;gap:9px;pointer-events:none}.qz-deco i{display:block;width:15px;height:15px;border-radius:50%;box-sizing:border-box}' +
    '.qz-paper{position:absolute;inset:0;pointer-events:none;background-image:repeating-linear-gradient(0deg,transparent 0,transparent 23px,#f1eff4 23px,#f1eff4 24px),repeating-linear-gradient(90deg,transparent 0,transparent 23px,#f1eff4 23px,#f1eff4 24px);-webkit-mask-image:radial-gradient(120% 90% at 100% 0,#000 0,transparent 62%);mask-image:radial-gradient(120% 90% at 100% 0,#000 0,transparent 62%)}' +
    '@media (max-width:640px){.qz-cta{width:100%;justify-content:center}.qz-pad{padding:20px!important}.qz-deco{top:18px;right:18px;gap:7px}.qz-deco i{width:12px;height:12px}.qz-deco .qz-c4,.qz-deco .qz-r5{display:none!important}}';
  document.head.appendChild(st);
  var TYPES = { single: 'Один ответ', multi: 'Несколько ответов', number: 'Задача' };

  function h(tag, css, attrs, kids) {
    var e = document.createElement(tag);
    if (css) Object.assign(e.style, css);
    if (attrs) for (var k in attrs) { if (k === 'text') e.textContent = attrs[k]; else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  var mono = function (size, color) { return { whiteSpace: 'nowrap', font: '500 ' + (size || 10.5) + 'px/1.3 ' + MONO, letterSpacing: '.08em', textTransform: 'uppercase', color: color || FAINT }; };
  function primary(label, on, extra) { return h('button', Object.assign({ display: 'inline-flex', alignItems: 'center', gap: '10px', height: '44px', padding: '0 22px', border: 0, background: FG, color: '#fff', font: '600 14px/1 ' + UI, letterSpacing: '-.01em', borderRadius: '999px', whiteSpace: 'nowrap', cursor: 'pointer' }, extra || {}), { class: 'qz-b', type: 'button', text: label, onclick: on }); }
  function ghost(label, on) { return h('button', { height: '44px', padding: '0 20px', border: 0, background: '#e9e7ee', color: FG, font: '600 14px/1 ' + UI, letterSpacing: '-.01em', borderRadius: '999px', whiteSpace: 'nowrap', cursor: 'pointer' }, { class: 'qz-g', type: 'button', text: label, onclick: on }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function num(s) { return parseFloat(String(s).replace(/\s|\u00a0/g, '').replace(',', '.')); }
  function fmt(n) { return String(n).replace('.', ','); }
  function plural(n, a, b, c) { var m = n % 10, mm = n % 100; return m === 1 && mm !== 11 ? a : m >= 2 && m <= 4 && (mm < 10 || mm >= 20) ? b : c; }
  function mins(n) { return Math.max(1, Math.round(n * 0.75)); }

  function mount(root) {
    var url = root.getAttribute('data-quiz');
    if (!url) return;
    if (root.__qz) { if (root.__qz.url === url) return; }
    var ACC = root.getAttribute('data-accent') || '#ff2a1f';
    var S = root.__qz = { url: url, data: null, phase: 'intro', mode: 0, order: [], i: 0, res: {}, sel: [], checked: false, val: '' };
    Object.assign(root.style, { position: 'relative', background: BG, border: 0, borderRadius: '20px', overflow: 'hidden', fontFamily: UI, color: FG, display: 'flex', flexDirection: 'column' });
    root.innerHTML = '';
    root.appendChild(h('div', Object.assign({ padding: '28px' }, mono()), { text: 'Загружаем тест…' }));
    fetch(url).then(function (r) { return r.json(); }).then(function (d) {
      if (root.__qz !== S) return;
      S.data = d; S.qs = d.questions || [];
      S.modes = [20, 50].filter(function (n) { return n < S.qs.length; }).concat([S.qs.length]);
      render();
    }).catch(function (e) { console.warn('[quiz]', e); root.innerHTML = ''; root.appendChild(h('div', Object.assign({ padding: '28px' }, mono()), { text: 'Не удалось загрузить тест' })); });

    var bestKey = 'quiz-best:' + url;
    function best() { try { return +localStorage.getItem(bestKey) || 0; } catch (e) { return 0; } }
    function saveBest(p) { try { if (p > best()) localStorage.setItem(bestKey, String(p)); } catch (e) {} }

    function start(list) {
      S.order = list.map(function (qi) { var q = S.qs[qi]; return { qi: qi, o: q.o ? shuffle(q.o.map(function (_, k) { return k; })) : null }; });
      S.i = 0; S.res = {}; S.sel = []; S.checked = false; S.val = ''; S.phase = 'q';
      render();
      var top = root.getBoundingClientRect().top + window.scrollY - 90;
      if (Math.abs(window.scrollY - top) > 300) window.scrollTo({ top: top, behavior: 'smooth' });
    }
    function cur() { var it = S.order[S.i]; return { it: it, q: S.qs[it.qi] }; }
    function correct(q) {
      if (q.type === 'number') { var v = num(S.val), tol = q.tol != null ? q.tol : Math.max(Math.abs(q.a) * 0.005, 0.01); return !isNaN(v) && Math.abs(v - q.a) <= tol; }
      var a = (Array.isArray(q.a) ? q.a : [q.a]).slice().sort().join(','), s = S.sel.slice().sort().join(',');
      return a === s;
    }
    function check() {
      var c = cur(); if (S.checked) return;
      if (c.q.type === 'number' ? !String(S.val).trim() : !S.sel.length) return;
      S.checked = true; S.res[S.i] = correct(c.q); render();
    }
    function next() {
      if (S.i >= S.order.length - 1) { S.phase = 'result'; render(); return; }
      S.i++; S.sel = []; S.checked = false; S.val = ''; render();
    }
    function goto(p) { if (!p) return; window.dispatchEvent(new CustomEvent('flipbook:goto', { detail: { page: p } })); }

    function head(left, right) {
      return h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', fontSize: '13px', fontWeight: 600, letterSpacing: '-.01em' }, null, [
        h('span', { color: FG }, { text: left }), right ? h('span', { color: FAINT, fontWeight: 500 }, { text: right }) : null
      ]);
    }
    function render() {
      root.innerHTML = '';
      if (S.phase === 'intro') return intro();
      if (S.phase === 'q') return question();
      result();
    }

    function intro() {
      var b = best(), n = S.modes[S.mode];
      var wrap = h('div', { position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '26px 26px 24px' }, { class: 'qz-pad' });
      wrap.appendChild(h('div', null, { class: 'qz-paper', 'aria-hidden': 'true' }));
      var deco = h('div', null, { class: 'qz-deco', 'aria-hidden': 'true' }), PICK = [1, 3, 0, 2, -1];
      PICK.forEach(function (p, r) {
        var row = h('div', { display: 'flex', alignItems: 'center', gap: 'inherit' }, { class: r === 4 ? 'qz-r5' : '' });
        row.appendChild(h('span', { width: '16px', font: '500 9px/1 ' + MONO, color: FAINT, textAlign: 'right' }, { text: String(r + 1).padStart(2, '0') }));
        for (var c = 0; c < 4; c++) {
          var fill = p === c, cur = r === 3 && fill;
          row.appendChild(h('i', { background: fill ? (cur ? ACC : FG) : '#fff', border: fill ? '0' : '1.5px ' + (p < 0 ? 'dashed ' : 'solid ') + LINE2 }, { class: c === 3 ? 'qz-c4' : '' }));
        }
        deco.appendChild(row);
      });
      deco.insertBefore(h('div', { display: 'flex', gap: 'inherit', paddingLeft: '25px' }, null, ['A', 'B', 'C', 'D'].map(function (l, c) { return h('span', { width: '15px', font: '500 9px/1 ' + MONO, color: FAINT, textAlign: 'center' }, { class: c === 3 ? 'qz-c4' : '', text: l }); })), deco.firstChild);
      wrap.appendChild(deco);
      var hd = head('Тест по гайду', ''); hd.style.position = 'relative'; wrap.appendChild(hd);
      wrap.appendChild(h('div', { position: 'relative', margin: '34px 0 0', font: '800 clamp(48px,4.6vw,68px)/.9 ' + UI, letterSpacing: '-.055em', color: FG }, null, [
        h('span', { display: 'block' }, { text: 'Проверь' }), h('span', { display: 'block', color: ACC }, { text: 'себя' })
      ]));
      wrap.appendChild(h('p', { position: 'relative', margin: '20px 0 0', maxWidth: '36ch', fontSize: '14.5px', lineHeight: 1.5, color: DIM, textWrap: 'pretty' }, { text: 'Вопросы идут по главам гайда. После каждого ответа — короткий разбор и страница, где это объясняется.' }));
      if (S.modes.length > 1) {
        var seg = h('div', { display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '22px' }, { role: 'radiogroup', 'aria-label': 'Длина теста' });
        S.modes.forEach(function (m, k) {
          var on = S.mode === k, all = k === S.modes.length - 1;
          seg.appendChild(h('button', { height: '36px', padding: '0 14px', border: 0, borderRadius: '999px', background: on ? FG : '#efedf3', color: on ? '#fff' : DIM, font: '600 13px/1 ' + UI, letterSpacing: '-.01em', cursor: 'pointer' }, { class: 'qz-m', type: 'button', role: 'radio', 'aria-checked': String(on), 'aria-pressed': String(on), text: (all ? 'Все ' : '') + m + ' ' + plural(m, 'вопрос', 'вопроса', 'вопросов'), onclick: function () { S.mode = k; render(); } }));
        });
        wrap.appendChild(seg);
      }
      var cta = primary('Начать тест', function () { start(shuffle(S.qs.map(function (_, i) { return i; })).slice(0, n)); });
      cta.classList.add('qz-cta');
      wrap.appendChild(h('div', { position: 'relative', display: 'flex', alignItems: 'center', gap: '14px 18px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '28px' }, null, [cta, b ? h('span', { fontSize: '13px', fontWeight: 500, color: FAINT }, null, ['Лучший результат ', h('b', { color: b >= 80 ? OK : FG, fontWeight: 700 }, { text: b + '%' })]) : null]));
      root.appendChild(wrap);
    }

    function question() {
      var c = cur(), q = c.q, type = q.type || 'single', total = S.order.length;
      var score = Object.keys(S.res).filter(function (k) { return S.res[k]; }).length;
      root.appendChild(h('div', { height: '3px', background: LINE }, null, [h('div', { height: '3px', width: ((S.i + (S.checked ? 1 : 0)) / total * 100) + '%', background: ACC, transition: 'width .3s ease' })]));
      var wrap = h('div', { flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', padding: '22px' }, { class: 'qz-pad' });
      wrap.appendChild(head('Вопрос ' + (S.i + 1) + ' из ' + total, TYPES[type]));
      wrap.appendChild(h('h3', { margin: 0, fontSize: '16.5px', lineHeight: 1.38, fontWeight: 600, letterSpacing: '-.015em', textWrap: 'pretty', color: FG }, { text: q.q }));
      if (q.d && q.d.length) {
        var tbl = h('div', { borderTop: '1px solid ' + LINE2 });
        q.d.forEach(function (r) { tbl.appendChild(h('div', { display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '16px', padding: '8px 0', borderBottom: '1px solid ' + LINE, fontSize: '14px' }, null, [h('span', { color: DIM }, { text: r[0] }), h('span', { font: '500 13px/1.4 ' + MONO, color: FG }, { text: r[1] })])); });
        wrap.appendChild(tbl);
      }
      var answers = Array.isArray(q.a) ? q.a : [q.a];
      var btnCheck;
      if (type === 'number') {
        var ok = S.checked && S.res[S.i];
        var inp = h('input', { flex: '1 1 160px', minWidth: 0, height: '48px', padding: '0 14px', borderRadius: '12px', border: '1px solid ' + (S.checked ? (ok ? OK : BAD) : LINE2), background: S.checked ? (ok ? OK_BG : BAD_BG) : '#fff', font: '500 18px/1 ' + MONO, color: FG }, { class: 'qz-i', type: 'text', inputmode: 'decimal', placeholder: 'Ваш ответ', value: S.val, 'aria-label': 'Ответ' });
        if (S.checked) inp.disabled = true;
        inp.oninput = function () { S.val = inp.value; if (btnCheck) btnCheck.disabled = !inp.value.trim(); };
        inp.onkeydown = function (e) { if (e.key === 'Enter') check(); };
        wrap.appendChild(h('div', { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }, null, [inp, q.unit ? h('span', { font: '500 14px/1 ' + MONO, color: DIM }, { text: q.unit }) : null]));
        if (S.checked && !ok) wrap.appendChild(h('div', { fontSize: '14px', color: DIM }, null, ['Правильный ответ: ', h('b', { font: '600 14px/1 ' + MONO, color: FG }, { text: fmt(q.a) + (q.unit ? ' ' + q.unit : '') })]));
        if (!S.checked) setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (e) {} }, 30);
      } else {
        var list = h('div', { display: 'flex', flexDirection: 'column', gap: '8px' });
        c.it.o.forEach(function (oi, k) {
          var on = S.sel.indexOf(oi) > -1, right = answers.indexOf(oi) > -1;
          var bg = CARD, bd = on ? FG : CARD, markC = on ? FG : FAINT, txt = FG, mark = type === 'multi' ? (on ? '■' : '□') : 'ABCDEFG'[k];
          if (S.checked) {
            if (right) { bg = OK_BG; bd = OK; markC = OK; mark = '✓'; }
            else if (on) { bg = BAD_BG; bd = BAD; markC = BAD; mark = '×'; }
            else { bd = CARD; markC = '#c9c5d1'; txt = FAINT; }
          }
          var b = h('button', { display: 'grid', gridTemplateColumns: '18px minmax(0,1fr)', gap: '10px', alignItems: 'baseline', textAlign: 'left', minHeight: '48px', padding: '13px 14px', borderRadius: '14px', border: '1px solid ' + bd, background: bg, color: txt, cursor: S.checked ? 'default' : 'pointer', fontSize: '15px', lineHeight: 1.4, fontFamily: UI }, { class: 'qz-o', type: 'button' }, [
            h('span', { font: '500 12px/1.4 ' + MONO, color: markC }, { text: mark }), h('span', null, { text: q.o[oi] })
          ]);
          if (S.checked) b.setAttribute('disabled', '');
          b.onclick = function () {
            if (S.checked) return;
            if (type === 'multi') { S.sel = on ? S.sel.filter(function (x) { return x !== oi; }) : S.sel.concat([oi]); render(); }
            else { S.sel = [oi]; check(); }
          };
          list.appendChild(b);
        });
        wrap.appendChild(list);
      }
      var foot = h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px 16px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid ' + LINE });
      if (!S.checked) {
        if (type !== 'single') {
          btnCheck = primary('Проверить', check);
          btnCheck.disabled = type === 'number' ? !String(S.val).trim() : !S.sel.length;
          foot.appendChild(h('span', mono(10, FAINT), { text: type === 'multi' ? 'Отметьте все верные' : 'Десятичные через запятую' }));
          foot.appendChild(btnCheck);
        } else foot.appendChild(h('span', mono(10, FAINT), { text: 'Выберите один вариант' }));
      } else {
        var good = S.res[S.i];
        foot.appendChild(h('div', { flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '10px' }, null, [
          h('span', mono(10.5, good ? OK : BAD), { text: good ? 'Верно' : 'Неверно' }),
          q.e ? h('p', { margin: 0, fontSize: '14px', lineHeight: 1.5, color: DIM, textWrap: 'pretty' }, { text: q.e }) : null,
          q.p ? h('button', Object.assign({ alignSelf: 'flex-start', padding: '0 0 2px', border: 0, borderBottom: '1px solid ' + LINE2, background: 'none', cursor: 'pointer' }, mono(10, DIM)), { class: 'qz-l', type: 'button', text: 'Перечитать: ' + (q.ch ? 'гл. ' + q.ch + ', ' : '') + 'с. ' + q.p, onclick: function () { goto(q.p); } }) : null
        ]));
        var nb = primary(S.i >= S.order.length - 1 ? 'Результат' : 'Дальше', next); nb.classList.add('qz-cta');
        foot.appendChild(nb);
      }
      wrap.appendChild(foot);
      root.appendChild(wrap);
    }

    function result() {
      var total = S.order.length, wrong = [], score = 0;
      S.order.forEach(function (it, k) { if (S.res[k]) score++; else wrong.push(it.qi); });
      var pct = Math.round(score / total * 100); saveBest(pct);
      var col = pct >= 80 ? OK : pct >= 60 ? FG : BAD;
      var wrap = h('div', { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', padding: '26px' }, { class: 'qz-pad' });
      wrap.appendChild(head('Результат', 'Лучший ' + best() + '%'));
      wrap.appendChild(h('div', { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }, null, [
        h('span', { font: '700 clamp(56px,6vw,76px)/.85 ' + UI, letterSpacing: '-.06em', color: col }, { text: pct + '%' }),
        h('span', mono(11, DIM), { text: score + ' из ' + total + ' верно' })
      ]));
      wrap.appendChild(h('div', { height: '4px', borderRadius: '4px', background: LINE, overflow: 'hidden' }, null, [h('div', { height: '100%', width: pct + '%', background: col })]));
      wrap.appendChild(h('p', { margin: 0, maxWidth: '48ch', fontSize: '14.5px', lineHeight: 1.5, color: DIM, textWrap: 'pretty' }, { text: pct >= 90 ? 'Теория на месте. Можно переходить к практике и артефактам портфолио.' : pct >= 60 ? 'Хорошая база. Вернитесь к главам ниже — в каждой есть практика.' : 'Стоит перечитать главы ниже: на этих понятиях держится весь сквозной кейс.' }));
      if (wrong.length) {
        var by = {};
        wrong.forEach(function (qi) { var q = S.qs[qi], k = q.p || 0; (by[k] = by[k] || { ch: q.ch, p: q.p, n: 0 }).n++; });
        var rows = Object.keys(by).map(function (k) { return by[k]; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 6);
        var box = h('div', null, null, [h('div', Object.assign({ paddingBottom: '10px' }, mono(10, FAINT)), { text: 'Что перечитать' })]);
        rows.forEach(function (r) {
          box.appendChild(h('button', { display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '12px', width: '100%', minHeight: '44px', alignItems: 'center', textAlign: 'left', padding: '0', border: 0, borderTop: '1px solid ' + LINE, background: 'none', cursor: r.p ? 'pointer' : 'default', color: FG, fontFamily: UI, fontSize: '14px' }, { class: 'qz-o', type: 'button', onclick: function () { goto(r.p); } }, [
            h('span', null, { text: (r.ch ? 'Глава ' + r.ch : 'Без главы') + (r.p ? ' · с. ' + r.p : '') }),
            h('span', mono(10.5, BAD), { text: r.n + ' ' + plural(r.n, 'ошибка', 'ошибки', 'ошибок') })
          ]));
        });
        wrap.appendChild(box);
      }
      wrap.appendChild(h('div', { display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid ' + LINE }, null, [
        wrong.length ? primary('Повторить ошибки · ' + wrong.length, function () { start(shuffle(wrong)); }) : null,
        ghost('Пройти заново', function () { S.phase = 'intro'; render(); })
      ]));
      root.appendChild(wrap);
    }
  }

  function scan() { document.querySelectorAll('[data-quiz]').forEach(mount); }
  window.QuizKit = { mount: mount, scan: scan };
  new MutationObserver(function () { clearTimeout(scan.t); scan.t = setTimeout(scan, 50); }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-quiz'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
})();
