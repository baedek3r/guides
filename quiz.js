/* Тест по гайду. Вставка: <div data-quiz="https://…/crm.json"></div><script src="quiz.js"></script>
   Типы вопросов: single (один ответ), multi (несколько), number (задача с числовым ответом). */
(function () {
  if (window.QuizKit) return;
  var INK = '#141317', PAPER = '#f7f6f9', RULE = '#dddae3', MUTED = '#7d7986', SOFT = '#4a4752', ACC = '#141317', ACC_BG = '#f0eef4', BAD = '#a14b4b', BAD_BG = '#f8eeee';
  var MONO = "'JetBrains Mono',ui-monospace,monospace", UI = "'Onest','Helvetica Neue',Helvetica,Arial,sans-serif";
  var st = document.createElement('style');
  st.textContent = '.qz-o{transition:background .15s,border-color .15s}.qz-o:hover:not([disabled]){border-color:' + INK + '!important}' +
    '.qz-b{transition:background .15s,color .15s,border-color .15s}.qz-b:hover:not(:disabled){background:#2e2c34!important;border-color:#2e2c34!important;color:#fff!important}.qz-b:disabled{opacity:.35;cursor:default}' +
    '.qz-g{transition:background .15s,color .15s,border-color .15s}.qz-g:hover{border-color:' + INK + '!important;color:' + INK + '!important}' +
    '.qz-i:focus{outline:none;border-color:' + INK + '!important}';
  document.head.appendChild(st);
  var TYPES = { single: 'Один ответ', multi: 'Несколько ответов', number: 'Задача' };

  function h(tag, css, attrs, kids) {
    var e = document.createElement(tag);
    if (css) Object.assign(e.style, css);
    if (attrs) for (var k in attrs) { if (k === 'text') e.textContent = attrs[k]; else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  var mono = function (size, color) { return { whiteSpace: 'nowrap', font: '500 ' + (size || 10.5) + 'px/1.3 ' + MONO, letterSpacing: '.07em', textTransform: 'uppercase', color: color || MUTED }; };
  function primary(label, on, extra) { return h('button', Object.assign({ padding: '10px 16px', border: '1px solid ' + INK, background: INK, color: '#fff', font: '600 12.5px/1 ' + UI, letterSpacing: '-.01em', textTransform: 'none', borderRadius: '999px', whiteSpace: 'nowrap', cursor: 'pointer' }, extra || {}), { class: 'qz-b', type: 'button', text: label, onclick: on }); }
  function ghost(label, on) { return h('button', { padding: '10px 14px', border: '1px solid #e9e7ee', background: '#e9e7ee', color: SOFT, font: '600 12.5px/1 ' + UI, letterSpacing: '-.01em', textTransform: 'none', borderRadius: '999px', whiteSpace: 'nowrap', cursor: 'pointer' }, { class: 'qz-g', type: 'button', text: label, onclick: on }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function num(s) { return parseFloat(String(s).replace(/\s|\u00a0/g, '').replace(',', '.')); }
  function fmt(n) { return String(n).replace('.', ','); }
  function plural(n, a, b, c) { var m = n % 10, mm = n % 100; return m === 1 && mm !== 11 ? a : m >= 2 && m <= 4 && (mm < 10 || mm >= 20) ? b : c; }

  function mount(root) {
    var url = root.getAttribute('data-quiz');
    if (!url) return;
    if (root.__qz) { if (root.__qz.url === url) return; }
    var S = root.__qz = { url: url, data: null, phase: 'intro', mode: 0, order: [], i: 0, res: {}, sel: [], checked: false, val: '' };
    Object.assign(root.style, { background: '#fff', border: 0, borderRadius: '24px', overflow: 'hidden', fontFamily: UI, color: INK, display: 'flex', flexDirection: 'column' });
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
      S.order = list.map(function (qi) {
        var q = S.qs[qi], o = q.o ? shuffle(q.o.map(function (_, k) { return k; })) : null;
        return { qi: qi, o: o };
      });
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

    function render() {
      root.innerHTML = '';
      if (S.phase === 'intro') return intro();
      if (S.phase === 'q') return question();
      result();
    }

    function intro() {
      var counts = { single: 0, multi: 0, number: 0 };
      S.qs.forEach(function (q) { counts[q.type || 'single']++; });
      var n = S.modes[S.mode];
      var wrap = h('div', { flex: 1, display: 'flex', flexDirection: 'column', gap: '18px', padding: '20px' });
      wrap.appendChild(h('p', { margin: 0, fontSize: '18px', lineHeight: 1.4, fontWeight: 500, letterSpacing: '-.02em', textWrap: 'pretty' }, { text: 'Хотите проверить свои знания? Пожалуйста. Вот тест.' }));
      var b = best();
      wrap.appendChild(h('div', { display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: 'auto' }, null, [
        primary('Начать тест', function () { start(shuffle(S.qs.map(function (_, i) { return i; })).slice(0, n)); }, { background: ACC, borderColor: ACC }),
        b ? h('span', mono(), { text: 'Лучший результат: ' + b + '%' }) : null
      ]));
      root.appendChild(wrap);
    }

    function question() {
      var c = cur(), q = c.q, type = q.type || 'single', total = S.order.length;
      var score = Object.keys(S.res).filter(function (k) { return S.res[k]; }).length;
      root.appendChild(h('div', { height: '3px', background: '#efedf3' }, null, [h('div', { height: '3px', width: ((S.i + (S.checked ? 1 : 0)) / total * 100) + '%', background: ACC, transition: 'width .3s ease' })]));
      var wrap = h('div', { flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px' });
      wrap.appendChild(h('div', { display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }, null, [
        h('span', { display: 'flex', gap: '12px', flexWrap: 'wrap' }, null, [h('span', mono(10.5, INK), { text: 'Вопрос ' + (S.i + 1) + ' / ' + total }), h('span', mono(10.5, ACC), { text: TYPES[type] })]),
        h('span', mono(), { text: 'Верно: ' + score })
      ]));
      wrap.appendChild(h('h3', { margin: 0, fontSize: '16px', lineHeight: 1.35, fontWeight: 600, letterSpacing: '-.015em', textWrap: 'pretty' }, { text: q.q }));
      if (q.d && q.d.length) {
        var tbl = h('div', { borderTop: '1px solid ' + INK });
        q.d.forEach(function (r) { tbl.appendChild(h('div', { display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '16px', padding: '8px 0', borderBottom: '1px solid ' + RULE, fontSize: '14px' }, null, [h('span', { color: SOFT }, { text: r[0] }), h('span', { font: '500 13px/1.4 ' + MONO }, { text: r[1] })])); });
        wrap.appendChild(tbl);
      }
      var answers = Array.isArray(q.a) ? q.a : [q.a];
      if (type === 'number') {
        var ok = S.checked && S.res[S.i];
        var inp = h('input', { flex: '1 1 160px', minWidth: 0, height: '40px', padding: '0 12px', border: '1px solid ' + (S.checked ? (ok ? ACC : BAD) : RULE), background: S.checked ? (ok ? ACC_BG : BAD_BG) : '#fff', font: '500 18px/1 ' + MONO, color: INK }, { class: 'qz-i', type: 'text', inputmode: 'decimal', placeholder: 'Ваш ответ', value: S.val, 'aria-label': 'Ответ' });
        if (S.checked) inp.disabled = true;
        inp.oninput = function () { S.val = inp.value; btnCheck.disabled = !inp.value.trim(); };
        inp.onkeydown = function (e) { if (e.key === 'Enter') check(); };
        var row = h('div', { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }, null, [inp, q.unit ? h('span', { font: '500 14px/1 ' + MONO, color: MUTED }, { text: q.unit }) : null]);
        wrap.appendChild(row);
        if (S.checked && !ok) wrap.appendChild(h('div', { fontSize: '14px' }, null, ['Правильный ответ: ', h('b', { font: '600 14px/1 ' + MONO }, { text: fmt(q.a) + (q.unit ? ' ' + q.unit : '') })]));
        if (!S.checked) setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (e) {} }, 30);
      } else {
        var list = h('div', { display: 'flex', flexDirection: 'column', gap: '8px' });
        c.it.o.forEach(function (oi, k) {
          var on = S.sel.indexOf(oi) > -1, right = answers.indexOf(oi) > -1;
          var bg = '#fff', bd = on ? INK : RULE, markC = on ? INK : MUTED, mark = type === 'multi' ? (on ? '■' : '□') : 'ABCDEFG'[k];
          if (S.checked) {
            if (right) { bg = ACC_BG; bd = ACC; markC = ACC; mark = '✓'; }
            else if (on) { bg = BAD_BG; bd = BAD; markC = BAD; mark = '×'; }
            else { bd = RULE; markC = '#b9b5c2'; }
          }
          var b = h('button', { display: 'grid', gridTemplateColumns: '18px minmax(0,1fr)', gap: '8px', alignItems: 'baseline', textAlign: 'left', padding: '10px 12px', borderRadius: '12px', fontSize: '13.5px', lineHeight: 1.4, border: '1px solid ' + bd, background: bg, color: INK, cursor: S.checked ? 'default' : 'pointer', fontSize: '15px', lineHeight: 1.4, fontFamily: UI }, { class: 'qz-o', type: 'button' }, [
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
      var foot = h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '6px' });
      var btnCheck;
      if (!S.checked) {
        if (type !== 'single') {
          btnCheck = primary('Проверить', check);
          btnCheck.disabled = type === 'number' ? !String(S.val).trim() : !S.sel.length;
          foot.appendChild(h('span', mono(), { text: type === 'multi' ? 'Отметьте все верные варианты' : 'Десятичные через запятую' }));
          foot.appendChild(btnCheck);
        }
      } else {
        var good = S.res[S.i];
        var exp = h('div', { flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '8px' }, null, [
          h('p', { margin: 0, fontSize: '14px', lineHeight: 1.5, color: SOFT }, null, [h('span', Object.assign(mono(10.5, good ? ACC : BAD), { marginRight: '8px' }), { text: good ? 'Верно' : 'Неверно' }), q.e || '']),
          q.p ? h('button', Object.assign({ alignSelf: 'flex-start', padding: 0, border: 0, background: 'none', cursor: 'pointer', borderBottom: '1px solid ' + RULE, paddingBottom: '2px' }, mono(10, INK)), { type: 'button', text: 'Перечитать: ' + (q.ch ? 'гл. ' + q.ch + ', ' : '') + 'с. ' + q.p + ' ↗', onclick: function () { goto(q.p); } }) : null
        ]);
        foot.appendChild(exp);
        foot.appendChild(primary(S.i >= S.order.length - 1 ? 'Результат →' : 'Дальше →', next));
      }
      wrap.appendChild(foot);
      root.appendChild(wrap);
    }

    function result() {
      var total = S.order.length, wrong = [], score = 0;
      S.order.forEach(function (it, k) { if (S.res[k]) score++; else wrong.push(it.qi); });
      var pct = Math.round(score / total * 100); saveBest(pct);
      var wrap = h('div', { flex: 1, display: 'flex', flexDirection: 'column', gap: '18px', padding: '20px' });
      wrap.appendChild(h('div', { display: 'flex', justifyContent: 'space-between', gap: '12px' }, null, [h('span', mono(), { text: 'Результат' }), h('span', mono(), { text: 'Лучший: ' + best() + '%' })]));
      wrap.appendChild(h('div', { display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }, null, [
        h('span', { font: '700 clamp(44px,5vw,64px)/.9 ' + UI, letterSpacing: '-.06em' }, null, [String(score), h('span', { color: '#b9b5c2' }, { text: '/' + total })]),
        h('span', { font: '600 18px/1 ' + UI, color: pct >= 80 ? ACC : MUTED }, { text: pct + '%' })
      ]));
      wrap.appendChild(h('p', { margin: 0, maxWidth: '52ch', fontSize: '14px', lineHeight: 1.5 }, { text: pct >= 90 ? 'Теория на месте. Можно переходить к практике и артефактам портфолио.' : pct >= 60 ? 'Хорошая база. Вернитесь к главам ниже, в каждой есть практика.' : 'Стоит перечитать главы ниже: на этих понятиях держится весь сквозной кейс.' }));
      if (wrong.length) {
        var by = {};
        wrong.forEach(function (qi) { var q = S.qs[qi], k = q.p || 0; (by[k] = by[k] || { ch: q.ch, p: q.p, n: 0 }).n++; });
        var rows = Object.keys(by).map(function (k) { return by[k]; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 6);
        var box = h('div', { borderTop: '1px solid ' + INK }, null, [h('div', Object.assign({ padding: '10px 0' }, mono(10)), { text: 'Что перечитать' })]);
        rows.forEach(function (r) {
          box.appendChild(h('button', { display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '12px', width: '100%', textAlign: 'left', padding: '10px 0', border: 0, borderTop: '1px solid ' + RULE, background: 'none', cursor: r.p ? 'pointer' : 'default', color: INK, fontFamily: UI, fontSize: '14px' }, { type: 'button', onclick: function () { goto(r.p); } }, [
            h('span', null, { text: (r.ch ? 'Глава ' + r.ch : 'Без главы') + (r.p ? ' · с. ' + r.p : '') }),
            h('span', mono(10.5, BAD), { text: r.n + ' ' + plural(r.n, 'ошибка', 'ошибки', 'ошибок') })
          ]));
        });
        wrap.appendChild(box);
      }
      wrap.appendChild(h('div', { display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 'auto' }, null, [
        wrong.length ? primary('Повторить ошибки · ' + wrong.length, function () { start(shuffle(wrong)); }, { background: ACC, borderColor: ACC }) : null,
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
