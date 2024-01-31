/* eslint-disable no-undef */
class Carousel extends HTMLElement {
    constructor() {
      super();
      this.delay = 250, // delay between calls
      this.throttled = false, // are we currently throttled?
      this.calls = 0;
      this.mobileOnly = this.dataset.mobileOnly;
      this.initialized = this.classList.contains('swiper-initialized') ? true:false;
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
          this.init(this.mobileOnly, this.initalized);
        });
      }
      window.addEventListener('resize', function() {
        resize();
      });
      const resize = () => {
        if (!this.throttled) {
          // actual callback action
          this.init(this.mobileOnly);
          // we're throttled!
          this.throttled = true;
          // set a timeout to un-throttle
          setTimeout(function() {
            this.throttled = false;
          }, this.delay);
        }  
      }
    }

    init(mobileOnly, initialized) {
      var init = initialized;
    
      if (window.innerWidth <= mobileOnly) {
        console.log('Slider init...');
        console.log(mobileOnly);
        this.slider = new Swiper(this, {
          autoHeight: true,
          autoplay: this.dataset.autoplay || true,
          pagination: this.showPagination,
          speed: this.dataset.speed || 1000,
          spaceBetween: Number(this.dataset.spaceBetween) || 2,
          loop: false,
          effect: this.dataset.effect || 'fade',
          crossFade: true,
          slidesPerView: Number(this.dataset.slidesPerView) || 1,
          slidesPerGroup: Number(this.dataset.slidesPerScroll) || 1,
          initialSlide: Number(this.dataset.initialSlide) || 0,
          centeredSlides: !!this.dataset.centered,
          centeredSlidesBounds: !!this.dataset.centeredBounds,
          navigation: this.dataset.navEnabled,
        });
      }
    else if (init) {
      //swiper.destroy();
      init = false;
    }
      this.classList.remove('opacity-0');
    }
    
  }
  customElements.define('swiper-carousel', Carousel);
