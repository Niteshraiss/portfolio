
/* PRELOADER */
var pre = document.getElementById('pre'), preN = document.getElementById('preN'), preF = document.getElementById('preF');
var cnt = 0; var ci = setInterval(function () { cnt += Math.floor(Math.random() * 3) + 1; if (cnt > 100) cnt = 100; preN.textContent = cnt; preF.style.width = cnt + '%'; if (cnt >= 100) { clearInterval(ci); setTimeout(function () { pre.classList.add('out'); setTimeout(function () { pre.style.display = 'none'; heroAnim(); initFloat() }, 900) }, 250) } }, 22);

/* HERO TEXT */
function heroAnim() {
    var hNm = document.getElementById('hNm'), txt = hNm.textContent; hNm.innerHTML = ''; var i = 0;
    txt.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'hc'; if (ch === ' ') { s.innerHTML = '&nbsp;'; s.style.width = '.3em' } else { s.textContent = ch } s.style.setProperty('--d', i * .042 + 's'); hNm.appendChild(s); i++ });
    setTimeout(function () { document.getElementById('hLn').classList.add('vis') }, 80);
    setTimeout(function () { document.querySelectorAll('.hc').forEach(function (c) { c.classList.add('go') }) }, 250);
    setTimeout(function () { document.getElementById('hSb').classList.add('vis') }, 1100);
    setTimeout(function () { document.getElementById('hSc').classList.add('vis') }, 1700);
}

/* FLOATING PARTICLES — ANTIGRAVITY EFFECT */
function initFloat() {
    var canvas = document.getElementById('heroCanvas');
    var ctx = canvas.getContext('2d');
    var hero = document.getElementById('hero');
    var W, H, dpr;
    var mob = window.innerWidth < 768;
    var COUNT = mob ? 20 : 35;
    var REPEL_R = mob ? 90 : 150;
    var REPEL_STR = mob ? 5 : 9;
    var SHAPES = ['sphere', 'ring', 'square', 'triangle', 'hex', 'text'];
    var TEXTS = ['PHP', 'JS', '{}', '</>', 'SQL', 'API', 'MVC', '.env', 'git', 'DB', '<?', '=>'];
    var COLS = [[212, 168, 67], [240, 237, 232], [176, 174, 168], [184, 137, 42]];
    function rn(a, b) { return Math.random() * (b - a) + a }
    function pk(a) { return a[Math.floor(Math.random() * a.length)] }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = hero.offsetWidth; H = hero.offsetHeight;
        canvas.width = W * dpr; canvas.height = H * dpr;
        canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', function () { mob = window.innerWidth < 768; resize() });

    var pts = [];
    for (var i = 0; i < COUNT; i++) {
        var sh = pk(SHAPES);
        var sz = sh === 'text' ? rn(11, 20) : sh === 'sphere' ? rn(6, 40) : rn(8, 28);
        pts.push({ x: rn(0, W), y: rn(0, H), vx: rn(-.35, .35), vy: rn(-.35, .35), size: sz, shape: sh, rot: rn(0, 6.28), rs: rn(-.012, .012), op: rn(.06, .25), col: pk(COLS), txt: sh === 'text' ? pk(TEXTS) : '', depth: rn(.4, 1), glow: 0 });
    }

    var mx = -9999, my = -9999;
    function onPointer(px, py) { var r = hero.getBoundingClientRect(); mx = px - r.left; my = py - r.top }
    function offPointer() { mx = -9999; my = -9999 }
    hero.addEventListener('mousemove', function (e) { onPointer(e.clientX, e.clientY) });
    hero.addEventListener('mouseleave', offPointer);
    hero.addEventListener('touchmove', function (e) { onPointer(e.touches[0].clientX, e.touches[0].clientY) }, { passive: true });
    hero.addEventListener('touchstart', function (e) { onPointer(e.touches[0].clientX, e.touches[0].clientY) }, { passive: true });
    hero.addEventListener('touchend', offPointer);

    function drawSphere(p) {
        var r = Math.max(1, p.size);
        var g = ctx.createRadialGradient(p.x - r * .3, p.y - r * .3, r * .1, p.x, p.y, r);
        g.addColorStop(0, 'rgba(' + p.col[0] + ',' + p.col[1] + ',' + p.col[2] + ',' + (p.op + p.glow * .4) + ')');
        g.addColorStop(.7, 'rgba(' + p.col[0] + ',' + p.col[1] + ',' + p.col[2] + ',' + (p.op * .4 + p.glow * .2) + ')');
        g.addColorStop(1, 'rgba(' + p.col[0] + ',' + p.col[1] + ',' + p.col[2] + ',0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.2832); ctx.fillStyle = g; ctx.fill();
    }
    function drawRing(p) {
        var r = Math.max(1, p.size);
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.2832);
        ctx.strokeStyle = 'rgba(' + p.col[0] + ',' + p.col[1] + ',' + p.col[2] + ',' + (p.op + p.glow * .5) + ')';
        ctx.lineWidth = Math.max(1, p.size * .08); ctx.stroke();
    }
    function drawSquare(p) {
        var s = p.size; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.strokeStyle = 'rgba(' + p.col[0] + ',' + p.col[1] + ',' + p.col[2] + ',' + (p.op + p.glow * .5) + ')';
        ctx.lineWidth = Math.max(1, s * .06); ctx.strokeRect(-s / 2, -s / 2, s, s); ctx.restore();
    }
    function drawTriangle(p) {
        var s = p.size; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.beginPath(); ctx.moveTo(0, -s * .6); ctx.lineTo(s * .5, s * .4); ctx.lineTo(-s * .5, s * .4); ctx.closePath();
        ctx.strokeStyle = 'rgba(' + p.col[0] + ',' + p.col[1] + ',' + p.col[2] + ',' + (p.op + p.glow * .5) + ')';
        ctx.lineWidth = Math.max(1, s * .06); ctx.stroke(); ctx.restore();
    }
    function drawHex(p) {
        var r = p.size; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath();
        for (var i = 0; i < 6; i++) { var a = i * 1.0472 - 0.5236; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r) }
        ctx.closePath(); ctx.strokeStyle = 'rgba(' + p.col[0] + ',' + p.col[1] + ',' + p.col[2] + ',' + (p.op + p.glow * .5) + ')';
        ctx.lineWidth = Math.max(1, r * .06); ctx.stroke(); ctx.restore();
    }
    function drawText(p) {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * .3);
        ctx.font = '600 ' + Math.round(p.size) + 'px "DM Sans",sans-serif';
        ctx.fillStyle = 'rgba(' + p.col[0] + ',' + p.col[1] + ',' + p.col[2] + ',' + (p.op + p.glow * .6) + ')';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.txt, 0, 0); ctx.restore();
    }

    function drawConnections() {
        for (var i = 0; i < pts.length; i++) {
            for (var j = i + 1; j < pts.length; j++) {
                var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    var a = (.06) * (1 - dist / 120) * (pts[i].glow + pts[j].glow + 1) * .5;
                    ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = 'rgba(' + pts[i].col[0] + ',' + pts[i].col[1] + ',' + pts[i].col[2] + ',' + a + ')';
                    ctx.lineWidth = .5; ctx.stroke();
                }
            }
        }
    }

    var raf; var heroVisible = true;
    function loop() {
        if (!heroVisible) { raf = requestAnimationFrame(loop); return }
        ctx.clearRect(0, 0, W, H);

        /* smooth mouse */
        var smx = mx, smy = my;

        for (var i = 0; i < pts.length; i++) {
            var p = pts[i];
            /* mouse repel */
            var dx = p.x - smx, dy = p.y - smy;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < REPEL_R && dist > 0) {
                var force = (1 - dist / REPEL_R) * REPEL_STR;
                p.vx += (dx / dist) * force * .08;
                p.vy += (dy / dist) * force * .08;
                p.glow = Math.min(1, p.glow + .06);
            } else {
                p.glow *= .96;
            }
            /* friction */
            p.vx *= .985; p.vy *= .985;
            /* move */
            p.x += p.vx; p.y += p.vy;
            p.rot += p.rs;
            /* wrap */
            var m = p.size + 20;
            if (p.x < -m) p.x = W + m; if (p.x > W + m) p.x = -m;
            if (p.y < -m) p.y = H + m; if (p.y > H + m) p.y = -m;

            /* draw based on shape */
            if (p.shape === 'sphere') drawSphere(p);
            else if (p.shape === 'ring') drawRing(p);
            else if (p.shape === 'square') drawSquare(p);
            else if (p.shape === 'triangle') drawTriangle(p);
            else if (p.shape === 'hex') drawHex(p);
            else if (p.shape === 'text') drawText(p);
        }
        drawConnections();
        raf = requestAnimationFrame(loop);
    }
    loop();

    /* pause when hero not visible */
    var hObs = new IntersectionObserver(function (es) {
        es.forEach(function (e) { heroVisible = e.isIntersecting });
    }, { threshold: 0 });
    hObs.observe(hero);
}

/* THEME */
var thBtn = document.getElementById('thBtn'), ht = document.documentElement;
var sv = localStorage.getItem('theme'); if (sv) ht.setAttribute('data-theme', sv);
thBtn.addEventListener('click', function () { var c = ht.getAttribute('data-theme'), n = c === 'dark' ? 'light' : 'dark'; ht.setAttribute('data-theme', n); localStorage.setItem('theme', n) });

/* CURSOR */
var cD = document.getElementById('cD'), cR = document.getElementById('cR');
var mx = 0, my = 0, rx = 0, ry = 0;
var isTch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTch) { document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; cD.style.left = mx + 'px'; cD.style.top = my + 'px' }); (function lp() { rx += (mx - rx) * .12; ry += (my - ry) * .12; cR.style.left = rx + 'px'; cR.style.top = ry + 'px'; requestAnimationFrame(lp) })() } else { cD.style.display = 'none'; cR.style.display = 'none' }
function bindH() { document.querySelectorAll('.ht').forEach(function (el) { if (el.dataset.cb) return; el.dataset.cb = '1'; el.addEventListener('mouseenter', function () { cR && cR.classList.add('hov') }); el.addEventListener('mouseleave', function () { cR && cR.classList.remove('hov') }) }) } bindH(); new MutationObserver(bindH).observe(document.body, { childList: true, subtree: true });

/* NAV SCROLL */
var nav = document.getElementById('nav'); window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 70) });

/* MOBILE MENU */
var ham = document.getElementById('ham'), mobM = document.getElementById('mobM'), mobCl = document.getElementById('mobClose');
function openM() { ham.classList.add('on'); mobM.classList.add('on'); document.body.style.overflow = 'hidden' }
function closeM() { ham.classList.remove('on'); mobM.classList.remove('on'); document.body.style.overflow = '' }
ham.addEventListener('click', function () { mobM.classList.contains('on') ? closeM() : openM() });
mobCl.addEventListener('click', closeM);
document.querySelectorAll('.mlk').forEach(function (a) { a.addEventListener('click', closeM) });

/* SCROLL REVEAL */
var rvO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); rvO.unobserve(e.target) } }) }, { rootMargin: '0px 0px -50px 0px', threshold: .08 });
document.querySelectorAll('.rv,.rv-s').forEach(function (el) { rvO.observe(el) });

/* HERO PARALLAX */
var heroSec = document.getElementById('hero'), blobs = document.querySelectorAll('.h-blob'), hNmEl = document.getElementById('hNm');
window.addEventListener('scroll', function () { var sy = window.scrollY, hh = heroSec.offsetHeight; if (sy < hh) { var p = sy / hh; blobs.forEach(function (b, i) { b.style.transform = 'translateY(' + sy * .12 * (i + 1) + 'px)' }); hNmEl.style.transform = 'translateY(' + sy * .18 + 'px)'; hNmEl.style.opacity = Math.max(0, 1 - p * 1.3) } });

/* SMOOTH ANCHOR */
document.querySelectorAll('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); var t = document.querySelector(this.getAttribute('href')); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }) }) });
