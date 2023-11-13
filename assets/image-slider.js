/* eslint-disable no-undef */
class Carousel extends HTMLElement {
    constructor() {
      super();

      this.showPagination = this.dataset.pagination === 'true' ? {
        clickable: true,
        el: '[data-pagination]',
        type: 'bullets',
      } : false;
    }

    connectedCallback() {
      if (document.readyState === 'complete') {
        this.init();
      } else {
        window.addEventListener('load', () => {
          this.init();
        });
      }
    }

    init() {
      console.log('Slider init...')
      this.slider = new Swiper(this, {
        autoHeight: true,
        autoplay: this.dataset.autoplay || true,
        pagination: this.showPagination,
        spaceBetween: Number(this.dataset.spaceBetween) || 2,
        loop: false,
        effect: this.dataset.effect || 'fade',
        crossFade: true,
        slidesPerView: Number(this.dataset.slidesPerView) || 1,
        slidesPerGroup: Number(this.dataset.slidesPerScroll) || 1,
        initialSlide: Number(this.dataset.initialSlide) || 0,
        centeredSlides: !!this.dataset.centered,
        centeredSlidesBounds: !!this.dataset.centeredBounds,
        navigation: {
          enabled: this.dataset.navEnabled || true,
          nextEl: '[data-next]',
          prevEl: '[data-prev]',
        },
      });
      this.classList.remove('opacity-0');
    }
  }
  customElements.define('swiper-carousel', Carousel);
