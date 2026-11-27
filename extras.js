/*
******************************************************************************
 ARCHIVO: extras.js  (FRONTEND · rediseño inspirado en la página del socio)
 DÓNDE VA: GitHub, repositorio bontamx/bonta.mx
 ARCHIVOS A SUBIR (todos a la misma carpeta que index.html): extras.js, manifest.webmanifest,
   favicon-32.png, icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png
 TIPO: ACTUALIZACIÓN. Reemplaza el extras.js que ya subiste. index.html NO se toca otra vez
       (si ya le pusiste la línea <script src="extras.js"></script>, no hagas nada más).
 PASOS:
  1. GitHub > Add file > Upload files > sube extras.js > Commit changes.
  2. GitHub > index.html > lápiz. Baja hasta las últimas líneas, donde dice
        <script src="chat.js"></script>
     Pon el cursor al final de esa línea, da Enter y pega esta línea:
        <script src="extras.js"></script>
     Commit changes. (Es lo ÚNICO que cambia en index.html.)
  3. Espera 1-2 min y recarga con Ctrl+F5.
 PARA DESHACER: borra esa línea de index.html. Todo queda como estaba.
 QUÉ AGREGA: gancho en el hero, "Así de fácil", botón "¿Con qué lo combino?"
   en cada pasta, promociones (Dúo y combos desde tu hoja), cómo cocinarla,
   historia (de tu hoja Nosotros), entregas, menú del chat, y datos para Google.
   Quita el botón "Dudas, comentarios, aplausos".
 COLORES: usa la paleta de tu logo (bloque :root dentro de este archivo).
 FOTOS: las de producto salen de tu hoja Productos (como siempre) y la de Fede
   de tu hoja Nosotros. Solo la foto del inicio se pega abajo en HERO_FOTO.
 OPCIONAL SEO (recomendado): WhatsApp e Instagram no ejecutan scripts. En
   index.html cambia la línea <title>…</title> por:
   <title>BONTA · Pasta rellena artesanal congelada a domicilio en CDMX</title>
   <meta name="description" content="Pasta rellena artesanal hecha en Coyoacán, lista en 5 minutos o menos. Entrega a domicilio en CDMX.">
   <meta property="og:title" content="BONTA · Pasta rellena artesanal lista en 5 minutos">
   <meta property="og:description" content="Del congelador a tu mesa. Entrega a domicilio en CDMX.">
   <meta property="og:type" content="website"><meta property="og:locale" content="es_MX">
 ÍCONO (opcional, más seguro): en el <head> de index.html pega estas líneas:
   <link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
   <link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
   <link rel="apple-touch-icon" href="apple-touch-icon.png">
   <link rel="manifest" href="manifest.webmanifest">
 ESTADO: escrito con tu index.html a la vista, pero NO probado en navegador.
   El botón que abre el chat busca tu botón por nombre; si no lo encuentra,
   abre WhatsApp. Con tu chat.js lo conecto exacto.
******************************************************************************
*/
(function () {
  var HERO_FOTO = '';   // pega aquí la liga de la foto del inicio (Drive o ruta), o déjalo vacío
  var gnorm = function (s) { return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); };
  var go = function (id) { var e = document.getElementById(id); if (e) e.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  /* ---------- Estilos (usan los colores que ya tienes en :root) ---------- */
  var css = document.createElement('style');
  css.textContent = [
    /* Paleta del logo: #FFF1C0 #EFC86D #D4A43C #7F5C0E #2A1E16 #5A4A3C (edítala aquí) */
    ':root{--cream:color-mix(in srgb,#FFF1C0 40%,#fff);--paper:#fffdf6;--kraft:#EFC86D;--kraft-soft:#FFF1C0;--olive:#7F5C0E;--olive-dark:#2A1E16;--olive-soft:#FFF1C0;--gold:#D4A43C;--gold-text:#7F5C0E;--ink:#2A1E16;--muted:#5A4A3C;--line:#EBD9A6}',
    '.badge,.tag{color:#2A1E16}',
    '.top{gap:8px;padding:8px 12px}',
    '.x-izq{display:flex;align-items:center;gap:4px;min-width:0;flex:1 1 auto}',
    '.x-burger{flex:0 0 auto;width:44px;height:44px;border:0;border-radius:12px;background:transparent;display:grid;place-content:center;gap:5px;cursor:pointer}',
    '.x-burger i{display:block;width:24px;height:2.5px;border-radius:2px;background:var(--olive-dark);transition:transform .25s,opacity .2s}',
    '.x-burger[aria-expanded="true"] i:nth-child(1){transform:translateY(7.5px) rotate(45deg)}.x-burger[aria-expanded="true"] i:nth-child(2){opacity:0}.x-burger[aria-expanded="true"] i:nth-child(3){transform:translateY(-7.5px) rotate(-45deg)}',
    '.brand{font-family:"Cinzel",Georgia,serif;text-transform:uppercase;font-size:clamp(1.2rem,6vw,1.7rem);font-weight:600;letter-spacing:.14em;color:var(--gold-text);line-height:1;min-width:0}',
    '.brand small{font-family:"Cinzel",Georgia,serif;font-size:clamp(.48rem,2.3vw,.62rem);font-weight:500;letter-spacing:.2em;margin-top:5px;color:var(--gold-text);display:flex;align-items:center;gap:6px;white-space:nowrap}',
    '.brand small::before,.brand small::after{content:"";height:1px;width:clamp(6px,3vw,18px);background:var(--gold-text)}',
    '.x-drop{position:absolute;left:8px;top:calc(100% + 6px);width:min(300px,calc(100vw - 16px));max-height:calc(100dvh - 84px);overflow:auto;background:var(--paper);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow-up);padding:8px;display:none;z-index:45}',
    '.x-drop.on{display:grid;gap:2px;animation:xdrop .2s ease-out}',
    '@keyframes xdrop{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}',
    '.x-drop button{display:block;width:100%;text-align:left;min-height:46px;padding:12px 14px;border:0;border-radius:10px;background:none;color:var(--ink);font:700 1rem var(--sans)}',
    '.x-drop button:hover,.x-drop button:focus-visible{background:var(--olive-soft)}',
    '@media(max-width:480px){.cart-btn>span:not(.badge){display:none}.cart-btn{padding:9px 12px}}',
    '.x-sec,#menu{scroll-margin-top:72px}',
    '.x-historia blockquote{font:italic 500 1.15rem var(--serif);color:var(--olive);margin:14px 0 0}',
    '.x-sec{max-width:1100px;margin:0 auto;padding:36px 20px}',
    '.x-sec h2{font-size:clamp(1.5rem,4.6vw,2.1rem);text-align:center}',
    '.x-sub{text-align:center;color:var(--muted);max-width:56ch;margin:8px auto 22px}',
    '.x-pasos{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}',
    '.x-box{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);padding:18px;box-shadow:var(--shadow)}',
    '.x-box h3{font-size:1.1rem;margin-bottom:6px}.x-box p{margin:0;color:var(--muted);font-size:.95rem}',
    '.x-num{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--olive);color:var(--cream);font-weight:700;margin-bottom:8px}',
    '.x-alt{background:color-mix(in srgb,var(--kraft-soft) 55%,transparent)}',
    '.x-promos{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}',
    '.x-promo{background:var(--olive);color:var(--cream);border-radius:var(--radius);padding:22px;display:flex;flex-direction:column;gap:8px}',
    '.x-promo h3{color:var(--cream)}.x-promo p{margin:0;opacity:.92}.x-promo .p{font:700 1.4rem var(--serif)}',
    '.x-promo button{margin-top:auto;align-self:flex-start;padding:10px 20px;border-radius:999px;border:0;background:var(--gold);color:#2A1E16;font-weight:700}',
    '.x-cocinar{max-width:720px;margin:0 auto;padding:0;list-style:none;counter-reset:c}',
    '.x-cocinar li{counter-increment:c;margin:0 0 14px;padding-left:44px;position:relative}',
    '.x-cocinar li::before{content:counter(c);position:absolute;left:0;top:0;width:30px;height:30px;border-radius:50%;background:var(--olive);color:var(--cream);display:grid;place-items:center;font-weight:700}',
    '.x-cocinar b{display:block;color:var(--olive-dark)}.x-cocinar span{color:var(--muted);font-size:.95rem}',
    '.x-historia{display:grid;gap:24px;align-items:center;max-width:900px;margin:0 auto}',
    '@media(min-width:760px){.x-historia.con-foto{grid-template-columns:.8fr 1.2fr}}',
    '.x-historia img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius)}',
    '.x-historia p{margin:0 0 12px}',
    '.x-chat{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}',
    '.x-chat .btn{flex:0 1 auto;padding:11px 18px;font-size:.92rem}',
    '.x-heroimg{max-width:520px;margin:22px auto 0}.x-heroimg img{width:100%;border-radius:var(--radius);aspect-ratio:4/3;object-fit:cover}',
    '.mar-btn{margin:0 64px 14px 16px;padding:7px 14px;border-radius:999px;border:1.5px solid var(--kraft);background:var(--paper);color:var(--olive-dark);font-size:.85rem;font-weight:700}',
    '.mar-btn:hover{border-color:var(--olive)}',
    '.mar-panel{display:none;margin:0 16px 10px;padding:12px;border-radius:12px;background:var(--olive-soft);font-size:.9rem;color:var(--ink)}',
    '.mar-panel.on{display:block}.mar-panel ul{margin:6px 0 0;padding:0;list-style:none}',
    '.mar-panel li{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:4px 0}',
    '.mar-panel li button{border:0;border-radius:999px;background:var(--olive);color:var(--cream);padding:4px 12px;font-weight:700;font-size:.8rem}'
  ].join('');
  document.head.appendChild(css);

  /* ---------- Ícono, instalación y tipografía del logo ---------- */
  document.querySelectorAll('link[rel~="icon"],link[rel="apple-touch-icon"],link[rel="manifest"]').forEach(function (e) { e.remove(); });
  [['icon', { type: 'image/png', sizes: '32x32', href: 'favicon-32.png' }], ['icon', { type: 'image/png', sizes: '192x192', href: 'icon-192.png' }],
   ['apple-touch-icon', { sizes: '180x180', href: 'apple-touch-icon.png' }], ['manifest', { href: 'manifest.webmanifest' }],
   ['stylesheet', { href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&display=swap' }]].forEach(function (x) {
    var l = document.createElement('link'); l.rel = x[0]; for (var k in x[1]) l.setAttribute(k, x[1][k]); document.head.appendChild(l);
  });
  [['theme-color', '#7F5C0E'], ['apple-mobile-web-app-title', 'Bonta']].forEach(function (m) { var e = document.createElement('meta'); e.name = m[0]; e.content = m[1]; document.head.appendChild(e); });

  /* ---------- Hero ---------- */
  var h1 = document.querySelector('.hero h1');
  if (h1) h1.textContent = 'Pasta rellena artesanal, del congelador a tu mesa en 5 minutos';
  var eb = document.querySelector('.hero .eyebrow');
  if (eb) eb.textContent = 'Hecho a mano. Hecho con amor.';
  var inf = document.querySelector('.hero .info');
  if (inf) inf.style.display = 'none';
  if (HERO_FOTO && typeof imgUrl === 'function') {
    var cta = document.querySelector('.hero .cta');
    if (cta) cta.insertAdjacentHTML('afterend', '<div class="x-heroimg"><img src="' + esc(imgUrl(HERO_FOTO)) + '" alt="Pasta rellena artesanal Bonta" loading="eager"></div>');
  }

  /* ---------- Secciones nuevas ---------- */
  var hero = document.querySelector('.hero');
  if (hero) hero.insertAdjacentHTML('afterend',
    '<section class="x-sec" id="como-funciona"><h2>Así de fácil</h2><p class="x-sub">Tres pasos y la comida queda resuelta.</p><div class="x-pasos">' +
    '<div class="x-box"><span class="x-num">1</span><h3>Elige tu pasta y tu salsa</h3><p>Rellenos de restaurante, con una forma pensada para cada uno.</p></div>' +
    '<div class="x-box"><span class="x-num">2</span><h3>Te la llevamos congelada</h3><p>Llega directo a tu congelador, lista para cuando se te antoje.</p></div>' +
    '<div class="x-box"><span class="x-num">3</span><h3>Hierve y sirve</h3><p>Sin descongelar, sin drama. Tú te llevas los aplausos.</p></div></div></section>');

  var menu = document.getElementById('menu');
  if (menu) menu.insertAdjacentHTML('afterend',
    '<section class="x-sec" id="promos"><h2>Promociones</h2><p class="x-sub">Para pedir más y pagar menos.</p><div class="x-promos" id="xPromos"></div></section>' +
    '<section class="x-sec x-alt" id="como-pedir"><h2>Cómo pedir y pagar</h2><p class="x-sub">Todo desde esta página, en cinco pasos.</p><div class="x-pasos">' +
    '<div class="x-box"><span class="x-num">1</span><h3>Arma tu pedido</h3><p>Toca + en las pastas y salsas que quieras. Los combos y el envío gratis se calculan solos.</p></div>' +
    '<div class="x-box"><span class="x-num">2</span><h3>Abre tu carrito</h3><p>Escribe tu nombre y tu código postal: al instante te decimos si llegamos y cuánto cuesta el envío.</p></div>' +
    '<div class="x-box"><span class="x-num">3</span><h3>Datos de entrega</h3><p>Teléfono, quién recibe, dirección y horario: lo antes posible o programado, de lunes a sábado.</p></div>' +
    '<div class="x-box"><span class="x-num">4</span><h3>Paga</h3><p>Con tarjeta, de forma segura con Clip, o por transferencia. Tu pedido tiene un tiempo límite para pagarse; si no, se libera.</p></div>' +
    '<div class="x-box"><span class="x-num">5</span><h3>Confirma por WhatsApp</h3><p>Al terminar, un toque nos manda tu resumen y tus datos de entrega. Si pagas por transferencia, ahí adjuntas tu comprobante.</p></div></div>' +
    '<p class="x-sub" style="margin-top:16px">Si tu código postal está fuera de nuestra zona, el pedido mínimo es de 2 pastas y el envío tiene un costo adicional: lo mandamos a WhatsApp para cotizarlo.</p></section>' +
    '<section class="x-sec" id="cocinar"><h2>Cómo cocinarla</h2><p class="x-sub">Siete cuidados para que quede perfecta.</p><ol class="x-cocinar">' +
    '<li><b>Agua abundante y con suficiente sal</b><span>Usa 2 litros de agua por paquete de 450 g. La pasta solo se sazona en el agua; si le falta sal, queda desabrida.</span></li>' +
    '<li><b>No la descongeles</b><span>Va directo del congelador a la olla. Descongelada se pega y se rompe.</span></li>' +
    '<li><b>Sin aceite en el agua</b><span>El aceite flota y envuelve la pasta; después la salsa resbala en lugar de adherirse.</span></li>' +
    '<li><b>Agrégala poco a poco y revuelve suave 30 segundos</b><span>Así se atempera y las piezas no se pegan entre sí.</span></li>' +
    '<li><b>Fuego medio: agua temblando, no a borbotones</b><span>El hervor fuerte golpea las piezas y las abre.</span></li>' +
    '<li><b>No la sobrecuezas</b><span>Son 5 minutos (gnocchi, de 3 a 4). Pasarte ablanda la masa y suelta el relleno. Revisa la etiqueta de tu paquete.</span></li>' +
    '<li><b>Escurre sin sacudir</b><span>Hazlo con cuidado y sirve enseguida con tu salsa.</span></li></ol></section>' +
    '<section class="x-sec x-alt" id="historia"><h2 id="xHTitulo">Quiénes somos</h2><div class="x-historia" id="xHist"></div></section>' +
    '<section class="x-sec" id="entregas"><h2>Entregas</h2><p class="x-sub">Todo a domicilio, bien congelado.</p><div class="x-pasos">' +
    '<div class="x-box"><h3>Horario</h3><p>Servicio de lunes a sábado, de 10:00 a 22:00 h. Puedes programar tu entrega al pagar.</p></div>' +
    '<div class="x-box"><h3>Cobertura</h3><p>Escribe tu código postal en el carrito y te decimos al instante si llegamos y cuánto cuesta el envío. Fuera de la zona: pedido mínimo de 2 pastas y envío con costo adicional, cotizado por WhatsApp.</p></div>' +
    '<div class="x-box"><h3>Envío gratis</h3><p>Al llevar 2 pastas, dentro de tu zona de entrega.</p></div></div></section>');

  /* ---------- Chat (si no encuentra tu botón, abre WhatsApp) ---------- */
  function wa(t) { var n = (state.data && state.data.ajustes && state.data.ajustes.whatsapp) || '525532664433'; return 'https://wa.me/' + n + '?text=' + encodeURIComponent(t || 'Hola, quiero hacer un pedido en BONTA'); }
  function abrirChat() {
    var c = window.BontaChat || window.bontaChat;
    if (c && typeof c.open === 'function') { c.open(); return; }
    var l = [].slice.call(document.querySelectorAll('button,[role=button],a')).filter(function (e) { return /chat/i.test((e.id || '') + ' ' + e.className + ' ' + (e.getAttribute('aria-label') || '')) && !e.closest('.x-nav'); });
    var f = l.filter(function (e) { var q = e.parentElement; return getComputedStyle(e).position === 'fixed' || (q && getComputedStyle(q).position === 'fixed'); })[0] || l[0];
    if (f) { f.click(); return; }
    window.open(wa(), '_blank', 'noopener');
  }

  /* ---------- Menú en el encabezado ---------- */
  var acciones = [
    ['Ver el menú', function () { go('menu'); }],
    ['Armar mi pedido', function () { if (Object.keys(state.cart).length) document.getElementById('cartBtn').click(); else { go('menu'); toast('Toca + en las pastas que quieras'); } }],
    ['Estado de mi pedido', function () { window.open(wa('Hola Bonta, quiero saber el estado de mi pedido. Mi folio es: '), '_blank', 'noopener'); }],
    ['Zonas y horarios', function () { go('entregas'); }],
    ['Preguntas frecuentes', abrirChat],
    ['Quiénes somos', function () { abrirNosotros(); }],
    ['Avisos legales', function () { abrirLegales(); }],
    ['Hablar por WhatsApp', function () { window.open(wa(), '_blank', 'noopener'); }]
  ];
  var top = document.querySelector('header.top'), cb = document.getElementById('cartBtn'), br = top && top.querySelector('.brand');
  if (top && cb && br) {
    var izq = document.createElement('div'); izq.className = 'x-izq';
    var bt = document.createElement('button'); bt.type = 'button'; bt.className = 'x-burger';
    bt.setAttribute('aria-label', 'Abrir menú'); bt.setAttribute('aria-expanded', 'false'); bt.setAttribute('aria-controls', 'xDrop'); bt.innerHTML = '<i></i><i></i><i></i>';
    var dd = document.createElement('nav'); dd.className = 'x-drop'; dd.id = 'xDrop'; dd.setAttribute('aria-label', 'Menú principal');
    var cerrar = function (foco) { dd.classList.remove('on'); bt.setAttribute('aria-expanded', 'false'); bt.setAttribute('aria-label', 'Abrir menú'); if (foco) bt.focus(); };
    acciones.forEach(function (a) { var b = document.createElement('button'); b.type = 'button'; b.textContent = a[0]; b.onclick = function () { cerrar(); a[1](); }; dd.appendChild(b); });
    top.insertBefore(izq, br); izq.appendChild(bt); izq.appendChild(br); top.appendChild(dd);
    bt.onclick = function () { if (dd.classList.contains('on')) cerrar(); else { dd.classList.add('on'); bt.setAttribute('aria-expanded', 'true'); bt.setAttribute('aria-label', 'Cerrar menú'); } };
    document.addEventListener('click', function (e) { if (dd.classList.contains('on') && !dd.contains(e.target) && !bt.contains(e.target)) cerrar(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dd.classList.contains('on')) cerrar(true); });
    cb.addEventListener('click', function () { cerrar(); });
  }

  /* ---------- Datos que dependen de tu hoja ---------- */
  var FEDE_FOTO = '';   // opcional: liga de la foto de Fede si tu hoja Nosotros no tiene FOTO_1
  var FEDE_TXT = ['Fede creció en un barrio donde casi el 70% de los vecinos eran italianos. A los 9 o 10 años empezó a cocinar pasta en casa, y a los 11 le regalaron un recetario de pastas y pizzas caseras: la cocina se volvió su lugar feliz.', 'Treinta años después sigue perfeccionando su técnica, pieza por pieza. La pasta de BONTA es italiana de corazón, con un toque mexicano propio.'];
  function pintar() {
    var d = state.data; if (!d) return;
    var p = document.getElementById('xPromos');
    if (p) {
      var h = '<div class="x-promo"><h3>Dúo Bonta</h3><p>Elige dos pastas y el envío va por nuestra cuenta, dentro de tu zona de entrega.</p><button type="button" data-x="menu">Elegir mis pastas</button></div>';
      (d.combos || []).forEach(function (c) {
        h += '<div class="x-promo"><h3>' + esc(c.nombre) + '</h3><p class="p">' + money(c.precio) + '</p><p>El descuento se aplica solo en tu carrito al juntar los productos del combo.</p><button type="button" data-x="menu">Armar combo</button></div>';
      });
      d.productos.filter(function (x) { return x.enPromo && !x.agotado; }).forEach(function (x) {
        h += '<div class="x-promo"><h3>' + esc(x.nombre) + '</h3><p class="p">' + money(x.precio) + ' <s style="font-size:.9rem;opacity:.8">' + money(x.precioRegular) + '</s></p><p>Precio de promoción.</p><button type="button" data-add="' + esc(x.id) + '">Agregar</button></div>';
      });
      p.innerHTML = h;
      p.onclick = function (e) { if (e.target.dataset && e.target.dataset.x) go(e.target.dataset.x); };
    }
    var n = d.nosotros || {}, txt = String(n.historia || '').split(/\n{2,}/).map(function (s) { return s.trim(); }).filter(Boolean);
    var propia = txt.length && !/^escribe aqu/i.test(txt[0]);
    if (!propia) txt = FEDE_TXT;
    var hh = document.getElementById('xHist');
    if (hh) {
      var f = (n.fotos || []).map(imgUrl).filter(Boolean)[0] || (FEDE_FOTO ? imgUrl(FEDE_FOTO) : '');
      document.getElementById('xHTitulo').textContent = propia ? (n.titulo || 'Quiénes somos') : 'Fede, el chef detrás de cada receta';
      hh.className = 'x-historia' + (f ? ' con-foto' : '');
      hh.innerHTML = (f ? '<img src="' + esc(f) + '" alt="" loading="lazy" referrerpolicy="no-referrer">' : '') +
        '<div>' + txt.slice(0, 2).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
        (propia ? '' : '<blockquote>«La cocina es mi medio de expresión artística.»</blockquote>') +
        (propia && txt.length > 2 ? '<button class="btn ghost" type="button" id="xMas">Leer más</button>' : '') + '</div>';
      var m = document.getElementById('xMas'); if (m) m.onclick = abrirNosotros;
    }
    // Datos para Google
    document.title = 'BONTA · Pasta rellena artesanal congelada a domicilio en CDMX';
    var old = document.getElementById('xLd'); if (old) old.remove();
    var s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'xLd';
    s.textContent = JSON.stringify([{ '@context': 'https://schema.org', '@type': 'FoodEstablishment', name: 'BONTA', description: 'Pasta rellena artesanal congelada a domicilio en CDMX', url: 'https://bontamx.github.io/bonta.mx/', telephone: '+52 55 3266 4433', servesCuisine: 'Italiana', areaServed: 'Ciudad de México', sameAs: ['https://instagram.com/bonta.mx'] },
      { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Menú Bonta', itemListElement: d.productos.map(function (x, i) { return { '@type': 'ListItem', position: i + 1, item: { '@type': 'Product', name: x.nombre, description: x.descripcion, brand: 'BONTA', offers: { '@type': 'Offer', priceCurrency: 'MXN', price: x.precio, availability: x.agotado ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock' } } }; }) }]);
    document.head.appendChild(s);
  }

  /* ---------- "¿Con qué lo combino?" en cada tarjeta ---------- */
  var PARES = [['ricota', ['noci', 'pesto']], ['pansotti', ['boscaiola', 'fumo']], ['fagottini', ['noci', 'boscaiola']], ['cappelet', ['boscaiola', 'polpettine']], ['cappellet', ['boscaiola', 'polpettine']], ['mascabado', ['fumo', 'boscaiola']], ['tortellini', ['polpettine', 'quattro']], ['gnocchi', ['quattro', 'polpettine']], ['zucca', ['noci', 'quattro']]];
  function marid() {
    if (!state.data) return;
    var salsas = state.data.productos.filter(function (p) { return gnorm(p.categoria).indexOf('salsa') === 0 && !p.agotado; });
    document.querySelectorAll('#grid .card').forEach(function (card) {
      var o = card.querySelector('[data-open]'); if (!o || card.querySelector('.mar-btn')) return;
      var p = state.byId[o.dataset.open]; if (!p || gnorm(p.categoria).indexOf('salsa') === 0) return;
      var nom = gnorm(p.nombre), claves = [];
      PARES.forEach(function (x) { if (nom.indexOf(x[0]) > -1) claves = x[1]; });
      var sug = []; claves.forEach(function (k) { salsas.forEach(function (s) { if (gnorm(s.nombre).indexOf(k) > -1 && sug.indexOf(s) < 0) sug.push(s); }); });
      var pn = document.createElement('div'); pn.className = 'mar-panel';
      pn.innerHTML = '<b>Maridaje</b> es elegir la salsa que complementa o contrasta con el relleno.' +
        (sug.length ? ' Con esta pasta te sugerimos:<ul>' + sug.map(function (s) { return '<li><span>' + esc(s.nombre) + ' · ' + money(s.precio) + '</span><button type="button" data-add="' + esc(s.id) + '">Agregar</button></li>'; }).join('') + '</ul>' : ' Pregúntale al chat cuál le va mejor.');
      var b = document.createElement('button'); b.type = 'button'; b.className = 'mar-btn'; b.textContent = '¿Con qué lo combino?'; b.setAttribute('aria-expanded', 'false');
      b.onclick = function () { var on = pn.classList.toggle('on'); b.setAttribute('aria-expanded', on); };
      if (window.matchMedia && matchMedia('(hover:hover)').matches) b.addEventListener('mouseenter', function () { pn.classList.add('on'); });
      o.insertAdjacentElement('afterend', pn); pn.insertAdjacentElement('afterend', b);
    });
  }

  /* ---------- Engancharse a tu página sin cambiar su código ---------- */
  function seguro(fn) { try { fn(); } catch (e) { if (window.console) console.error('extras.js', e); } }
  if (typeof aplicarDatos === 'function') { var _ap = aplicarDatos; aplicarDatos = function (d) { _ap(d); seguro(pintar); seguro(marid); }; }
  if (typeof renderGrid === 'function') { var _rg = renderGrid; renderGrid = function () { _rg(); seguro(marid); }; }
  /* ---------- Código postal fuera de la zona: mínimo 2 pastas y cotización por WhatsApp ---------- */
  var MSG_FUERA = 'Tu código postal está fuera de nuestra zona de entrega. Para tu zona el pedido mínimo es de 2 pastas y el envío tiene un costo adicional. Finaliza tu pedido y lo mandamos por WhatsApp para cotizarlo.';
  function zonaFuera() {
    var sh = document.getElementById('ship');
    if (!sh || !sh.classList.contains('special')) return;
    var ok = totales().pastas >= 2;
    var msg = ok ? MSG_FUERA : MSG_FUERA + ' Agrega al menos 2 pastas para continuar.';
    if (sh.textContent !== msg) sh.textContent = msg;
    if (!ok) { document.getElementById('finish').disabled = true; var ft = document.getElementById('finishT'); if (ft) ft.disabled = true; }
  }
  var shp = document.getElementById('ship');
  if (shp && window.MutationObserver) new MutationObserver(function () { seguro(zonaFuera); }).observe(shp, { childList: true, characterData: true, subtree: true, attributes: true });
  var gr = document.getElementById('grid');
  if (gr && window.MutationObserver) new MutationObserver(function () { seguro(marid); }).observe(gr, { childList: true });
  var vez = 0;   // red de seguridad: revisa 30 s por si el enganche no alcanzó a correr
  (function revisar() {
    if (state && state.data) { var pr = document.getElementById('xPromos'); if (pr && !pr.children.length) seguro(pintar); seguro(marid); }
    if (++vez < 40) setTimeout(revisar, 750);
  })();
})();
