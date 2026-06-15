/* ============================================================
   shawheen.ai — interactions
   ============================================================ */
(function () {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- nav active state + bg ---------- */
  const nav = $('.nav');
  const navLinks = $$('.nav-links a').filter(a => (a.getAttribute('href') || '').startsWith('#'));
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const onScroll = () => {
    nav.style.borderColor = window.scrollY > 20 ? 'rgba(39,224,163,0.18)' : '';
    let cur = sections[0];
    const y = window.scrollY + 120;
    sections.forEach(s => { if (s && s.offsetTop <= y) cur = s; });
    navLinks.forEach(a => a.classList.toggle('active', cur && a.getAttribute('href') === '#' + cur.id));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- role typer ---------- */
  const roles = ['Senior Security Engineer', 'Multi-Cloud Architect', 'Detection Engineer', 'AI Security Engineer', 'Incident Commander'];
  const typedEl = $('#typed');
  if (typedEl && !reduce) {
    let ri = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = roles[ri];
      typedEl.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) { ci++; setTimeout(tick, 55 + Math.random() * 40); }
      else if (!deleting && ci === word.length) { deleting = true; setTimeout(tick, 1500); }
      else if (deleting && ci > 0) { ci--; setTimeout(tick, 28); }
      else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 320); }
    };
    tick();
  } else if (typedEl) { typedEl.textContent = roles[0]; }

  /* ---------- counters ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.indexOf('.') > -1) ? 1 : 0;
    const dur = 1400; const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = (dec ? target.toFixed(dec) : target).toLocaleString();
    };
    requestAnimationFrame(step);
  };
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => reduce ? (el.textContent = (+el.dataset.count).toLocaleString()) : cio.observe(el));

  /* ---------- interactive terminal ---------- */
  const body = $('#term-body');
  const input = $('#term-input');
  if (!body || !input) return;

  const FILES = ['about.md', 'experience.json', 'skills.txt', 'certifications/', 'resume.pdf', 'blog.url', 'contact.sh'];
  const appendRow = (parts, cls) => {
    const d = document.createElement('div');
    d.className = 't-row' + (cls ? ' ' + cls : '');
    parts.forEach(part => {
      if (typeof part === 'string') {
        d.append(document.createTextNode(part));
        return;
      }
      const span = document.createElement('span');
      span.className = part.cls;
      span.textContent = part.text;
      d.append(span);
    });
    body.insertBefore(d, body.querySelector('.t-live'));
    body.scrollTop = body.scrollHeight;
  };
  const part = (cls, text) => ({ cls, text });
  const promptParts = (cmd) => [
    part('t-prompt', 'shawheen@ai'),
    part('t-out', ':'),
    part('t-path', '~'),
    part('t-out', '$'),
    ' ',
    part('t-cmd', cmd),
  ];
  const echo = (cmd) => appendRow(promptParts(cmd));

  const scrollTo = (id) => { const el = $(id); if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };

  const COMMANDS = Object.freeze({
    help: () => appendRow([
      part('t-out', 'available commands:'),
      '\n  ', part('t-key', 'about'), '       whoami / background',
      '\n  ', part('t-key', 'experience'), '  professional record',
      '\n  ', part('t-key', 'skills'), '      technical stack',
      '\n  ', part('t-key', 'certs'), '       certifications',
      '\n  ', part('t-key', 'resume'), '      download CV (pdf)',
      '\n  ', part('t-key', 'blog'), '        open the newsletter',
      '\n  ', part('t-key', 'contact'), '     get in touch',
      '\n  ', part('t-key', 'clear'), '       reset terminal',
    ]),
    ls: () => appendRow(FILES.flatMap((f, i) => [
      ...(i ? ['   '] : []),
      part(f.endsWith('/') ? 't-path' : 't-out', f),
    ])),
    whoami: () => { appendRow([part('t-key', 'Shawheen Azimi'), ' ', part('t-out', '— Senior Security Architect, Engineer & Analyst')]); scrollTo('#about'); },
    about: () => { appendRow([part('t-out', 'opening'), ' ', part('t-path', 'about.md'), ' ', part('t-out', '…')]); scrollTo('#about'); },
    experience: () => { appendRow([part('t-out', 'querying'), ' ', part('t-path', 'experience.json'), ' ', part('t-out', '…')]); scrollTo('#experience'); },
    exp: () => COMMANDS.experience(),
    skills: () => { appendRow([part('t-out', 'loading'), ' ', part('t-path', 'skills.txt'), ' ', part('t-out', '…')]); scrollTo('#skills'); },
    certs: () => { appendRow([part('t-out', 'enumerating'), ' ', part('t-path', 'certifications/'), ' ', part('t-out', '…')]); scrollTo('#certs'); },
    certifications: () => COMMANDS.certs(),
    contact: () => { appendRow([part('t-out', 'init'), ' ', part('t-path', 'contact.sh'), ' ', part('t-out', '…')]); scrollTo('#contact'); },
    resume: () => { appendRow([part('t-key', '↓'), ' ', part('t-out', 'downloading'), ' Shawheen_Azimi_Resume.pdf']); const a = document.createElement('a'); a.href = 'Shawheen Azimi - Resume.pdf'; a.download = 'Shawheen Azimi - Resume.pdf'; a.click(); },
    blog: () => { appendRow([part('t-out', 'opening'), ' ', part('t-path', 'shavvheens-newsletter.beehiiv.com'), ' ', part('t-out', '…')]); window.open('https://shavvheens-newsletter.beehiiv.com/', '_blank', 'noopener'); },
    clearance: () => appendRow([part('t-out', 'Department of War cleared.')]),
    sudo: () => appendRow([part('t-warn', 'shawheen is not in the sudoers file. This incident will be reported.')]),
    hire: () => { appendRow([part('t-key', 'smart move.'), ' ', part('t-out', 'routing to contact …')]); scrollTo('#contact'); },
    clear: () => { $$('.t-row:not(.boot)', body).forEach(n => { if (!n.classList.contains('t-live')) n.remove(); }); },
  });

  const run = (raw) => {
    const clean = raw.trim().slice(0, 160);
    const cmd = clean.toLowerCase();
    if (!cmd) return;
    echo(clean);
    const fn = Object.hasOwn(COMMANDS, cmd) ? COMMANDS[cmd] : null;
    if (typeof fn === 'function') fn();
    else appendRow([part('t-out', 'command not found:'), ' ', part('t-warn', clean), ' ', part('t-out', '— try'), ' ', part('t-key', 'help')]);
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { run(input.value); input.value = ''; }
  });
  // focus input when clicking the terminal body
  body.addEventListener('click', () => input.focus());

  /* ---------- boot sequence ---------- */
  const boot = [
    { parts: [part('t-out', '// initializing secure session …')], d: 200 },
    { parts: promptParts('whoami'), d: 500 },
    { parts: [part('t-key', 'Shawheen Azimi')], d: 300 },
    { parts: [part('t-out', 'Senior Security Architect · Engineer · Analyst')], d: 250 },
    { parts: [part('t-out', 'type'), ' ', part('t-key', 'help'), ' ', part('t-out', 'to explore ↓')], d: 200 },
  ];
  let bi = 0;
  const runBoot = () => {
    if (bi >= boot.length) return;
    const line = boot[bi++];
    appendRow(line.parts, 'boot');
    setTimeout(runBoot, reduce ? 0 : line.d);
  };
  runBoot();
})();
