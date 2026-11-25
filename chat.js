/*
******************************************************************************
 ARCHIVO: chat.js  (FRONTEND · ARCHIVO NUEVO)
 DÓNDE VA: GitHub, en la MISMA carpeta (raíz) que index.html: repositorio bontamx/bonta.mx
 TIPO: NUEVO
 PASOS:
   1. GitHub > Add file > Create new file > nombre: chat.js > pega todo esto > Commit.
   2. En index.html agrega UNA línea justo antes de </body>:
          <script src="chat.js"></script>
      (están las instrucciones exactas en CODE_CAMBIOS.txt). Commit, espera 1-2 min y Ctrl+F5.
 NOTA: solo funciona en la versión de GitHub (usa WEB_APP_URL de index.html). Dentro de Apps Script
       no se carga, y la página se ve igual que antes.
 ESTADO: probado solo con simulación; NO probado por ti con el servidor real.
******************************************************************************
*/
(function () {
  'use strict';
  var URL_API = (typeof WEB_APP_URL !== 'undefined' && WEB_APP_URL) ? WEB_APP_URL : '';
  if (!URL_API || document.getElementById('bchat')) return;   // sin servidor: no se muestra

  var sesion = (function () {
    try {
      var s = sessionStorage.getItem('bchat_s');
      if (!s) { s = 'v' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); sessionStorage.setItem('bchat_s', s); }
      return s;
    } catch (e) { return 'v' + Math.random().toString(36).slice(2, 12); }
  })();

  var css = '' +
    '#bchat-btn{position:fixed;right:16px;bottom:18px;z-index:45;width:56px;height:56px;border-radius:50%;border:0;background:var(--olive,#4a5a2e);color:var(--cream,#fbf7ee);font-size:1.6rem;display:grid;place-items:center;box-shadow:var(--shadow-up,0 14px 30px rgba(54,48,30,.16));cursor:pointer;transition:transform .2s}' +
    '#bchat-btn:hover{transform:scale(1.06)}' +
    '#bchat{position:fixed;right:16px;bottom:86px;z-index:46;width:min(380px,calc(100vw - 32px));height:min(520px,calc(100vh - 110px));display:none;flex-direction:column;background:var(--paper,#fffdf8);border:1px solid var(--line,#e6dcc7);border-radius:var(--radius,18px);box-shadow:var(--shadow-up,0 14px 30px rgba(54,48,30,.16));overflow:hidden;font-family:var(--sans,system-ui,sans-serif);color:var(--ink,#2b2a22)}' +
    '#bchat.abierto{display:flex}' +
    '#bchat header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--olive,#4a5a2e);color:var(--cream,#fbf7ee)}' +
    '#bchat header strong{font-family:var(--serif,Georgia,serif);font-size:1.05rem}' +
    '#bchat header button{background:none;border:0;color:inherit;font-size:1.4rem;cursor:pointer;line-height:1;padding:4px 8px}' +
    '#bchat-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:var(--cream,#fbf7ee)}' +
    '.bc-m{max-width:86%;padding:9px 12px;border-radius:14px;font-size:.93rem;line-height:1.4;white-space:pre-wrap;word-wrap:break-word}' +
    '.bc-b{align-self:flex-start;background:#fff;border:1px solid var(--line,#e6dcc7)}' +
    '.bc-u{align-self:flex-end;background:var(--olive-soft,#e8ecdc);border:1px solid var(--line,#e6dcc7)}' +
    '.bc-wa{display:inline-block;margin-top:6px;padding:7px 12px;border-radius:999px;background:var(--olive,#4a5a2e);color:#fff;text-decoration:none;font-weight:700;font-size:.85rem}' +
    '#bchat-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 8px;background:var(--cream,#fbf7ee)}' +
    '#bchat-chips button{border:1px solid var(--line,#e6dcc7);background:#fff;color:var(--olive-dark,#364320);border-radius:999px;padding:6px 11px;font-size:.82rem;cursor:pointer}' +
    '#bchat form{display:flex;gap:6px;padding:10px;border-top:1px solid var(--line,#e6dcc7);background:var(--paper,#fffdf8)}' +
    '#bchat input,#bchat textarea{flex:1;min-width:0;border:1px solid var(--line,#e6dcc7);border-radius:12px;padding:9px 11px;font:inherit;font-size:16px;background:#fff;color:inherit}' +
    '#bchat form button{border:0;border-radius:12px;background:var(--olive,#4a5a2e);color:#fff;padding:0 14px;font-weight:700;cursor:pointer}' +
    '#bchat form button:disabled{opacity:.5;cursor:default}' +
    '#bchat-sug{display:none;flex-direction:column;gap:6px;padding:10px;border-top:1px solid var(--line,#e6dcc7);background:var(--paper,#fffdf8)}' +
    '#bchat-sug.abierto{display:flex}' +
    '#bchat-sug select{border:1px solid var(--line,#e6dcc7);border-radius:12px;padding:8px;font:inherit;font-size:16px;background:#fff}' +
    '#bchat-sug textarea{min-height:64px;resize:vertical}' +
    '#bchat-sug .fila{display:flex;gap:6px}' +
    '#bchat-sug button{border:0;border-radius:12px;padding:9px 14px;font-weight:700;cursor:pointer}' +
    '#bchat-sug .ok{background:var(--olive,#4a5a2e);color:#fff}' +
    '#bchat-sug .no{background:#fff;border:1px solid var(--line,#e6dcc7);color:var(--ink,#2b2a22)}' +
    '#bchat small{display:block;text-align:center;color:var(--muted,#66634f);font-size:.72rem;padding:0 10px 8px;background:var(--paper,#fffdf8)}';

  var estilo = document.createElement('style'); estilo.textContent = css; document.head.appendChild(estilo);

  function el(tag, attrs, texto) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (texto != null) n.textContent = texto;
    return n;
  }

  var btn = el('button', { id: 'bchat-btn', type: 'button', 'aria-label': 'Abrir chat de ayuda', 'aria-expanded': 'false' }, '💬');
  var caja = el('section', { id: 'bchat', role: 'dialog', 'aria-label': 'Asistente virtual de Bonta' });
  var cab = el('header'); cab.appendChild(el('strong', {}, 'Pregúntale a Bonta'));
  var cerrar = el('button', { type: 'button', 'aria-label': 'Cerrar chat' }, '×'); cab.appendChild(cerrar);
  var msgs = el('div', { id: 'bchat-msgs', 'aria-live': 'polite' });
  var chips = el('div', { id: 'bchat-chips' });
  var form = el('form', { autocomplete: 'off' });
  var campo = el('input', { type: 'text', maxlength: '500', placeholder: 'Escribe tu pregunta…', 'aria-label': 'Tu pregunta' });
  var enviar = el('button', { type: 'submit' }, 'Enviar');
  form.appendChild(campo); form.appendChild(enviar);

  var sug = el('div', { id: 'bchat-sug' });
  var tipo = el('select', { 'aria-label': 'Tipo de mensaje' });
  ['Sugerencia', 'Queja', 'Duda', 'Aplauso'].forEach(function (t) { tipo.appendChild(el('option', { value: t }, t)); });
  var texto = el('textarea', { maxlength: '1000', placeholder: 'Cuéntanos qué podemos mejorar…', 'aria-label': 'Tu mensaje' });
  var contacto = el('input', { type: 'text', maxlength: '120', placeholder: 'Tu correo o WhatsApp (opcional)', 'aria-label': 'Contacto opcional' });
  var fila = el('div', { 'class': 'fila' });
  var mandar = el('button', { type: 'button', 'class': 'ok' }, 'Enviar');
  var cancelar = el('button', { type: 'button', 'class': 'no' }, 'Cancelar');
  fila.appendChild(mandar); fila.appendChild(cancelar);
  [tipo, texto, contacto, fila].forEach(function (n) { sug.appendChild(n); });

  var nota = el('small', {}, 'Asistente automático: puede equivocarse. Tu mensaje se procesa con IA de Google/Groq. No escribas datos de pago.');
  [cab, msgs, chips, form, sug, nota].forEach(function (n) { caja.appendChild(n); });
  document.body.appendChild(caja); document.body.appendChild(btn);

  var historial = [];
  var ocupado = false;

  function burbuja(t, quien, waUrl) {
    var b = el('div', { 'class': 'bc-m ' + (quien === 'u' ? 'bc-u' : 'bc-b') }, t);   // textContent: nunca HTML
    if (waUrl && /^https:\/\/wa\.me\//.test(waUrl)) {
      var a = el('a', { 'class': 'bc-wa', href: waUrl, target: '_blank', rel: 'noopener' }, 'Escribir por WhatsApp');
      b.appendChild(document.createElement('br')); b.appendChild(a);
    }
    msgs.appendChild(b); msgs.scrollTop = msgs.scrollHeight;
    return b;
  }

  function llamar(cuerpo) {
    return fetch(URL_API, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(cuerpo) }).then(function (r) { return r.json(); });
  }

  function preguntar(t) {
    t = String(t || '').replace(/\s+/g, ' ').trim();
    if (!t || ocupado) return;
    ocupado = true; enviar.disabled = true; chips.style.display = 'none';
    burbuja(t, 'u');
    var espera = burbuja('Escribiendo…', 'b');
    llamar({ action: 'chat', chat: { mensaje: t, historial: historial.slice(-6), sesion: sesion } }).then(function (r) {
      espera.remove();
      if (r && r.ok) {
        burbuja(r.respuesta, 'b', r.waUrl);
        historial.push({ r: 'u', t: t }, { r: 'b', t: r.respuesta });
      } else burbuja((r && r.error) || 'No pude responder ahora. Intenta de nuevo.', 'b');
    }).catch(function () {
      espera.remove(); burbuja('No hay conexión con el servidor. Intenta de nuevo en un momento.', 'b');
    }).then(function () { ocupado = false; enviar.disabled = false; campo.focus(); });
  }

  function abrir(v) {
    caja.classList.toggle('abierto', v);
    btn.setAttribute('aria-expanded', v ? 'true' : 'false');
    btn.style.display = v && window.innerWidth < 480 ? 'none' : '';
    if (v && !msgs.childNodes.length) {
      burbuja('¡Hola! Soy el asistente de Bonta 🍝 Puedo ayudarte con productos, envíos, pagos y entregas.', 'b');
      [['¿Qué me recomiendan?', 'Qué me recomiendan para 2 personas'], ['Costo de envío', 'Cuánto cuesta el envío'], ['Formas de pago', 'Cómo puedo pagar'], ['Dejar una sugerencia', null]].forEach(function (c) {
        var b = el('button', { type: 'button' }, c[0]);
        b.addEventListener('click', function () { c[1] ? preguntar(c[1]) : abrirSug(true); });
        chips.appendChild(b);
      });
    }
    if (v) campo.focus();
  }

  function abrirSug(v) {
    sug.classList.toggle('abierto', v);
    form.style.display = v ? 'none' : '';
    if (v) texto.focus(); else campo.focus();
  }

  mandar.addEventListener('click', function () {
    var m = texto.value.trim();
    if (m.length < 3) { texto.focus(); return; }
    mandar.disabled = true;
    llamar({ action: 'sugerencia', sugerencia: { tipo: tipo.value, mensaje: m, contacto: contacto.value, sesion: sesion } }).then(function (r) {
      burbuja((r && (r.respuesta || r.error)) || 'No se pudo enviar. Intenta de nuevo.', 'b');
      if (r && r.ok) { texto.value = ''; abrirSug(false); }
    }).catch(function () { burbuja('No hay conexión con el servidor. Intenta de nuevo.', 'b'); })
      .then(function () { mandar.disabled = false; });
  });
  cancelar.addEventListener('click', function () { abrirSug(false); });
  form.addEventListener('submit', function (e) { e.preventDefault(); var t = campo.value; campo.value = ''; preguntar(t); });
  btn.addEventListener('click', function () { abrir(!caja.classList.contains('abierto')); });
  cerrar.addEventListener('click', function () { abrir(false); btn.style.display = ''; btn.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && caja.classList.contains('abierto')) { abrir(false); btn.style.display = ''; btn.focus(); } });
})();
