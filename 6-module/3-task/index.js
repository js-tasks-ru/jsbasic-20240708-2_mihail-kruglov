import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.renderCarousel();
    this.count = 0;
    this.sumWidthSlide = 0; 
    this.carouselSlides = this.elem.querySelectorAll('.carousel__slide');
    this.btnRight = this.elem.querySelector('.carousel__arrow_right');
    this.btnLeft = this.elem.querySelector('.carousel__arrow_left');
    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.changeSlide();
    this.productAdd();
    this.showButton();
  }

  renderCarousel() {
    this.elem = createElement(`
      <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
      </div>
    `);

    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel__inner';

    this.slides.forEach(slide => {
      const carouselSlide = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      carouselInner.append(carouselSlide);
    });

    this.elem.append(carouselInner);
  }

  showButton() {
    if (this.count === this.carouselSlides.length - 1) {
      this.btnRight.style.display = 'none';
      this.btnLeft.style.display = '';
    }

    if (this.count < this.carouselSlides.length - 1) {
      this.btnRight.style.display = '';
      this.btnLeft.style.display = '';
    }

    if (this.count === 0) {
      this.btnRight.style.display = '';
      this.btnLeft.style.display = 'none';
    }
  }

  slideRight(slidesWidth) {
    if (this.count < this.carouselSlides.length - 1) {
      this.sumWidthSlide -= slidesWidth;
      this.carouselInner.style.transform = `translateX(${this.sumWidthSlide}px)`;
      this.count++;
    }

    this.showButton();
  }

  slideLeft(slidesWidth) {
    if (this.count > 0) {
      this.sumWidthSlide += slidesWidth;
      this.carouselInner.style.transform = `translateX(${this.sumWidthSlide}px)`;
      this.count--;
    }

    this.showButton();
  }

  changeSlide() {
    this.showButton();
    this.btnRight.addEventListener('click', () => {
      const slidesWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
      this.slideRight(slidesWidth);
    });
    this.btnLeft.addEventListener('click', () => {
      const slidesWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
      this.slideLeft(slidesWidth);
    });
  }

  productAdd() {
    this.elem.addEventListener('click', (e) => {
      if (e.target.closest('.carousel__button')) {
        const addBtn = e.target.closest('.carousel__button');
        const idProduct = e.target.closest('.carousel__slide').dataset.id;
        const event = new CustomEvent('product-add', {
          detail: idProduct,
          bubbles: true
        });
        addBtn.dispatchEvent(event);
      }
    });
  }
}