export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

    if (product.count > 0) {
      product.count += amount;
    }

    if (product.count === 0) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    const countProducts = this.cartItems.reduce((acc, item) => acc += item.count, 0);
    return countProducts;
  }

  getTotalPrice() {
    const totalPrice = this.cartItems.reduce((acc, item) => acc += item.count * item.product.price, 0);
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}