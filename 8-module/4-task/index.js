import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    const thisProduct = this.cartItems.find(item => item.product.id === product.id);

    if (!thisProduct) {
      this.cartItems.push(
        {
          product,
          count: 1
        }
      );
    } else {
      thisProduct.count++;
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    if (!this.cartItems.length) {
      return;
    }

    const product = this.cartItems.find(item => item.product.id === productId);
    if (product === undefined) {
      this.onProductUpdate(this.cartItems);
      return;
    }

    if (product.count > 0) {
      product.count += amount;
    }

    if (product.count === 0) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      if (this.modal && this.modal.modal.closest('.is-modal-open')) {
        const modalBody = this.modal.modal.querySelector('.modal__body');
        const deleteProduct = modalBody.querySelector(`[data-product-id="${productId}"]`);
        deleteProduct.remove();
      }
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, item) => acc += item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, item) => acc += item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    const products = this.cartItems.map(item => this.renderProduct(item.product, item.count));
    const form = this.renderOrderForm();
    const fragment = new DocumentFragment();
    fragment.append(...products, form);
    this.modal.setBody(fragment);

    this.modal.open();
    this.modal.modal.addEventListener('click', (e) => {
      const btnMinus = e.target.closest('.cart-counter__button_minus');
      const btnPlus = e.target.closest('.cart-counter__button_plus');
      const cartProduct = e.target.closest('.cart-product');

      if (btnMinus) {
        if (cartProduct) {
          this.updateProductCount(cartProduct.dataset.productId, -1);
        }
      }
      if (btnPlus) {
        this.updateProductCount(cartProduct.dataset.productId, 1);
      }
    });
    const cartForm = this.modal.modal.querySelector('.cart-form');
    cartForm.addEventListener('submit', async(e) => {
      e.preventDefault();
      await this.onSubmit(e);
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (this.isEmpty()) {
      this.modal.close();
      return;
    }

    if (this.modal && this.modal.modal.closest('.is-modal-open')) {
      const modalBody = this.modal.modal.querySelector('.modal__body');

      cartItem.forEach(item => {
        const productId = item.product.id;
        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

        productCount.innerHTML = item.count;
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        productPrice.innerHTML = `€${(item.product.price * item.count).toFixed(2)}`;
      });
      let infoPrice = modalBody.querySelector('.cart-buttons__info-price');

      infoPrice.innerHTML = `€${(this.getTotalPrice()).toFixed(2)}`;
    }
  }

  async onSubmit(event) {
    const cartBtn = this.modal.modal.querySelector('[type="submit"]');
    cartBtn.classList.add('is-loading');

    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(event.target)
    });

    if (response.ok) {
      this.cartItems.length = 0;

      this.cartIcon.update(this);
      const title = this.modal.modal.querySelector('.modal__title');
      const modalBody = this.modal.modal.querySelector('.modal__body');

      title.textContent = 'Success!';

      modalBody.innerHTML = `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We'll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `;
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}