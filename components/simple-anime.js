/**
 * simple-anime.js
 * Animações de entrada ao scrollar (SimpleAnime)
 *
 * USO:
 *   <h1 data-anime="0" class="fadeInUp">Título</h1>
 *   <script src="components/simple-anime.js"></script>
 *   <script>new SimpleAnime();</script>
 *
 * - O valor de data-anime é o delay em ms antes de animar
 * - A animação dispara quando o elemento entra na viewport
 * - Após animar, os atributos/classes são removidos para não interferir
 *   nas transições próprias do elemento (ex.: botões)
 */

class SimpleAnime {
  // Classes de direção suportadas (removidas ao final da animação)
  static DIRECTIONS = [
    'fadeInUp', 'fadeInDown', 'fadeInLeft',
    'fadeInRight', 'fadeInScale', 'fadeInSlightUp'
  ];

  /**
   * Cria a instância e inicia a observação dos elementos
   * @param {Object} options - threshold e rootMargin do IntersectionObserver
   */
  constructor(options = {}) {
    this.items = document.querySelectorAll('[data-anime]');
    this.options = {
      threshold: options.threshold ?? 0.15,
      rootMargin: options.rootMargin ?? '0px 0px -8% 0px'
    };
    this.init();
  }

  /**
   * Remove o estado de animação do elemento depois que ela termina
   * @param {HTMLElement} item - elemento animado
   */
  cleanup = (item) => {
    item.removeAttribute('data-anime');
    item.classList.remove('anime', ...SimpleAnime.DIRECTIONS);
  };

  /**
   * Dispara a animação de um elemento respeitando o delay informado
   * @param {HTMLElement} item - elemento a animar
   */
  animate = (item) => {
    const delay = Number(item.getAttribute('data-anime')) || 0;

    setTimeout(() => {
      item.classList.add('anime');

      // Limpa ao fim da transição de opacidade (com fallback por tempo)
      const done = (event) => {
        if (event && event.target !== item) return;
        item.removeEventListener('transitionend', done);
        this.cleanup(item);
      };
      item.addEventListener('transitionend', done);
      setTimeout(done, 1200);
    }, delay);
  };

  /**
   * Configura o IntersectionObserver ou anima tudo direto se não houver suporte
   */
  init() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sem suporte ou com movimento reduzido: mostra tudo imediatamente
    if (reduceMotion || !('IntersectionObserver' in window)) {
      this.items.forEach(this.cleanup);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        this.animate(entry.target);
      });
    }, this.options);

    this.items.forEach((item) => observer.observe(item));
  }
}

window.SimpleAnime = SimpleAnime;
