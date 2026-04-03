/* ========================================
   ÓPTICA VISION — script.js
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── LOADER ─────────────────────────────────────────────────────────────────
  function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader || loader.classList.contains('hidden')) return;
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 900);
    initReveal();
    revealHero();
  }

  // Some após a animação da barrinha (1.8s)
  setTimeout(hideLoader, 1900);
  // Segurança: some em 4s no máximo
  setTimeout(hideLoader, 4000);

  // ─── CURSOR PERSONALIZADO ───────────────────────────────────────────────────
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    (function animateFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      requestAnimationFrame(animateFollower);
    })();

    document.querySelectorAll('a, button, .card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursor.style.background = 'rgba(201,168,76,0.4)';
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        follower.style.borderColor = 'var(--gold)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--gold)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.borderColor = 'rgba(201,168,76,0.5)';
      });
    });
  }

  // ─── HEADER SCROLL ──────────────────────────────────────────────────────────
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 80);
    });
  }

  // ─── HAMBURGER ──────────────────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // ─── SCROLL REVEAL ──────────────────────────────────────────────────────────
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(
      '.reveal, .reveal-card, .section-header, .contato-inner, .statement-text'
    ).forEach(el => observer.observe(el));
  }

  // ─── HERO REVEAL ────────────────────────────────────────────────────────────
  function revealHero() {
    document.querySelectorAll('.hero-content .reveal').forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = '0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, i * 200);
    });
  }

  // ─── PARALLAX ───────────────────────────────────────────────────────────────
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
      heroContent.style.opacity = Math.max(0, 1 - scrolled / 600);
    }
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  }, { passive: true });

  // ─── SMOOTH SCROLL ──────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});