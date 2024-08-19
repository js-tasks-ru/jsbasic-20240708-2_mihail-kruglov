import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    return new Promise(async(resolve) => {
      const carouselHolder = document.querySelector('[data-carousel-holder]');
      this.carousel = new Carousel(slides);
      carouselHolder.append(this.carousel.elem);

      this.ribbonMenu = new RibbonMenu(categories);
      const ribbonHolder = document.querySelector('[data-ribbon-holder]');
      ribbonHolder.append(this.ribbonMenu.elem);

      const sliderHolder = document.querySelector('[data-slider-holder]');
      this.stepSlider = new StepSlider({steps: 5, value: 3});
      sliderHolder.append(this.stepSlider.elem);

      const cartIconHolder = document.querySelector('[data-cart-icon-holder]');
      this.cartIcon = new CartIcon();
      cartIconHolder.append(this.cartIcon.elem);

      this.cart = new Cart(this.cartIcon);

      const response = await fetch('products.json');
      this.products = await response.json();
      
      this.productsGrid = new ProductsGrid(this.products);

      this.productsGridHolder = document.querySelector('[data-products-grid-holder]');
      this.productsGridHolder.innerHTML = '';
      this.productsGridHolder.append(this.productsGrid.elem);

      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value,
      });

      this.productsGridHolder.innerHTML = '';
      this.productsGridHolder.append(this.productsGrid.elem);

      this.addEvent();
      resolve('Completed');
    });
  }

  menuFiltred(elem, parentElement, filterParameters) {
    elem.updateFilter({
      ...filterParameters
    });

    parentElement.innerHTML = '';
    parentElement.append(this.productsGrid.elem);
  }

  addEvent() {
    const body = document.querySelector('body');

    body.addEventListener('product-add', (e) => {
      const product = this.products.find(item => item.id === e.detail);
      this.cart.addProduct(product);
    });


    body.addEventListener('slider-change', (e) => {
      this.productsGrid.updateFilter({
        maxSpiciness: e.detail,
      });

      this.productsGridHolder.innerHTML = '';
      this.productsGridHolder.append(this.productsGrid.elem);
    });

    body.addEventListener('ribbon-select', (e) => {
      this.productsGrid.updateFilter({
        category: e.detail,
      });

      this.productsGridHolder.innerHTML = '';
      this.productsGridHolder.append(this.productsGrid.elem);
    });

    const checkboxNoNuts = document.getElementById('nuts-checkbox');
    checkboxNoNuts.addEventListener('change', (e) => {
      this.productsGrid.updateFilter({
        noNuts: e.target.checked,
      });

      this.productsGridHolder.innerHTML = '';
      this.productsGridHolder.append(this.productsGrid.elem);
    });

    const checkboxVegeterianOnly = document.getElementById('vegeterian-checkbox');

    checkboxVegeterianOnly.addEventListener('change', (e) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: e.target.checked,
      });

      this.productsGridHolder.innerHTML = '';
      this.productsGridHolder.append(this.productsGrid.elem);
    });
  }
}