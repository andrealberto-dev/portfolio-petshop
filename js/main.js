/**
 * main.js
 * Interações da página: cabeçalho ao scrollar, menu mobile,
 * accordion de serviços, contador dos números e ano do rodapé.
 * Nenhum dado de usuário é inserido no DOM (sem innerHTML).
 */

/* ── Cabeçalho: muda de estilo após scrollar ── */

/**
 * Adiciona/remove a classe .is-scrolled conforme a posição da página
 */
const initHeaderScroll = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
};

/* ── Menu mobile ── */

/**
 * Abre/fecha o menu em tela cheia, fecha ao clicar num link ou apertar Esc
 */
const initMobileNav = () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  // Define o estado do menu e sincroniza atributos de acessibilidade
  const setOpen = (isOpen) => {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Ao voltar para desktop, garante o menu "fechado" (estado limpo)
  window.matchMedia('(min-width: 900px)').addEventListener('change', () => setOpen(false));
};

/* ── Accordion de serviços ── */

/**
 * Controla o accordion: um item aberto por vez, com aria-expanded sincronizado
 */
const initAccordion = () => {
  const accordion = document.querySelector('[data-accordion]');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.acc-item');

  // Abre ou fecha um item específico
  const setItem = (item, isOpen) => {
    const trigger = item.querySelector('.acc-trigger');
    item.classList.toggle('is-open', isOpen);
    trigger.setAttribute('aria-expanded', String(isOpen));
  };

  items.forEach((item) => {
    const trigger = item.querySelector('.acc-trigger');

    trigger.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      // Fecha os outros antes de abrir o clicado
      items.forEach((other) => setItem(other, false));
      setItem(item, willOpen);
    });
  });
};

/* ── Contador animado dos números ── */

/**
 * Anima um número de 0 até o valor de data-count, formatado em pt-BR
 * @param {HTMLElement} el - elemento com data-count
 */
const countUp = (el) => {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;

  const duration = 1600;
  const start = performance.now();
  const formatter = new Intl.NumberFormat('pt-BR');

  // Easing de saída para desacelerar perto do fim
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = formatter.format(Math.round(target * easeOut(progress)));
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

/**
 * Dispara o contador quando os números entram na tela
 */
const initCounters = () => {
  const counters = document.querySelectorAll('[data-count]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!counters.length || reduceMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      countUp(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => observer.observe(counter));
};

/* ── Ano atual no rodapé ── */

/**
 * Atualiza o ano do copyright com o ano corrente
 */
const initYear = () => {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
};

/* ── Inicialização ── */
initHeaderScroll();
initMobileNav();
initAccordion();
initCounters();
initYear();
