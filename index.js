
const pre = document.getElementById('pre'), preN = document.getElementById('preN'), preF = document.getElementById('preF');
let c = 0; const ci = setInterval(() => { c += Math.floor(Math.random() * 3) + 1; if (c > 100) c = 100; preN.textContent = c; preF.style.width = c + '%'; if (c >= 100) { clearInterval(ci); setTimeout(() => { pre.classList.add('out'); setTimeout(() => { pre.style.display = 'none'; heroAnim() }, 900) }, 250) } }, 22);

function heroAnim() {
    const hNm = document.getElementById('hNm'), txt = hNm.textContent; hNm.innerHTML = ''; let i = 0;
    txt.split('').forEach(ch => { const s = document.createElement('span'); s.className = 'hc'; if (ch === ' ') { s.innerHTML = '&nbsp;'; s.style.width = '.3em' } else { s.textContent = ch } s.style.setProperty('--d', i * .042 + 's'); hNm.appendChild(s); i++ });
    setTimeout(() => document.getElementById('hLn').classList.add('vis'), 80);
    setTimeout(() => document.querySelectorAll('.hc').forEach(c => c.classList.add('go')), 250);
    setTimeout(() => document.getElementById('hSb').classList.add('vis'), 1100);
    setTimeout(() => document.getElementById('hSc').classList.add('vis'), 1700);
}

const thBtn = document.getElementById('thBtn'), ht = document.documentElement;
const sv = localStorage.getItem('theme'); if (sv) ht.setAttribute('data-theme', sv);
thBtn.addEventListener('click', () => { const cur = ht.getAttribute('data-theme'), nx = cur === 'dark' ? 'light' : 'dark'; ht.setAttribute('data-theme', nx); localStorage.setItem('theme', nx) });

const cD = document.getElementById('cD'), cR = document.getElementById('cR');
let mx = 0, my = 0, rx = 0, ry = 0;
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTouch) { document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cD.style.left = mx + 'px'; cD.style.top = my + 'px' }); (function lp() { rx += (mx - rx) * .12; ry += (my - ry) * .12; cR.style.left = rx + 'px'; cR.style.top = ry + 'px'; requestAnimationFrame(lp) })() } else { cD.style.display = 'none'; cR.style.display = 'none' }

function bindH() { document.querySelectorAll('.ht').forEach(el => { if (el.dataset.cb) return; el.dataset.cb = '1'; el.addEventListener('mouseenter', () => cR && cR.classList.add('hov')); el.addEventListener('mouseleave', () => cR && cR.classList.remove('hov')) }) } bindH(); new MutationObserver(bindH).observe(document.body, { childList: true, subtree: true });

const nav = document.getElementById('nav'); window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 70) });

const ham = document.getElementById('ham'), mobM = document.getElementById('mobM');
ham.addEventListener('click', () => { ham.classList.toggle('on'); mobM.classList.toggle('on'); document.body.style.overflow = mobM.classList.contains('on') ? 'hidden' : '' });
document.querySelectorAll('.mlk').forEach(a => { a.addEventListener('click', () => { ham.classList.remove('on'); mobM.classList.remove('on'); document.body.style.overflow = '' }) });

const rvO = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); rvO.unobserve(e.target) } }) }, { rootMargin: '0px 0px -50px 0px', threshold: .08 });
document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-s').forEach(el => rvO.observe(el));

const heroSec = document.getElementById('hero'), blobs = document.querySelectorAll('.h-blob'), hNmEl = document.getElementById('hNm');
window.addEventListener('scroll', () => { const sy = window.scrollY, hh = heroSec.offsetHeight; if (sy < hh) { const p = sy / hh; blobs.forEach((b, i) => { b.style.transform = 'translateY(' + sy * .12 * (i + 1) + 'px)' }); hNmEl.style.transform = 'translateY(' + sy * .18 + 'px)'; hNmEl.style.opacity = Math.max(0, 1 - p * 1.3) } });

document.querySelectorAll('a[href^="#"]').forEach(a => { a.addEventListener('click', function (e) { e.preventDefault(); const t = document.querySelector(this.getAttribute('href')); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }) }) });
