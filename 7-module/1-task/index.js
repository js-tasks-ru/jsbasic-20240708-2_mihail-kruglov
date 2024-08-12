import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
<<<<<<< HEAD
    this.elem = createElement(
      `<div class="ribbon">
        <div class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="https://course-jsbasic.javascript.ru/assets/icons/angle-icon.svg" alt="icon">
        </div>
        <nav class="ribbon__inner"></nav>
        <div class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="https://course-jsbasic.javascript.ru/assets/icons/angle-icon.svg" alt="icon">
        </div>
      </div>`
    );
    this.ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.render();
    this.initRibbon();
    this.onClick();
  }
  render() {
    this.ribbonInner.insertAdjacentHTML(
      "afterbegin",
      this.categories
        .map(
          (item) =>
            `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`
        )
        .join("")
    );
  }

  initRibbon() {
    let ribbonArrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    let ribbonArrowRight = this.elem.querySelector(".ribbon__arrow_right");
    let links = this.elem.querySelectorAll("a");
    let inner = this.ribbonInner;
    links[0].classList.add("ribbon__item_active");
    let selectedLink = links[0];

    ribbonArrowLeft.classList.toggle("ribbon__arrow_visible");

    const scroll = (x, y = 0) => this.ribbonInner.scrollBy(x, y);

    this.elem.onclick = ({ target }) => {
      
      if (target.closest(".ribbon__arrow_left")) {
        scroll(-350);
      }

      if (target.closest(".ribbon__arrow_right")) {
        scroll(350);
      }

      if (target.tagName == "A") {
        if (selectedLink) {
          selectedLink.classList.remove("ribbon__item_active");
        }
        selectedLink = target;
        selectedLink.classList.add("ribbon__item_active");
      }
    };

    inner.onscroll = () => {
      inner.scrollLeft
        ? ribbonArrowLeft.classList.add("ribbon__arrow_visible")
        : ribbonArrowLeft.classList.remove("ribbon__arrow_visible");

      inner.scrollWidth - inner.scrollLeft - inner.clientWidth
        ? ribbonArrowRight.classList.add("ribbon__arrow_visible")
        : ribbonArrowRight.classList.remove("ribbon__arrow_visible");
    };
  }

  onClick() {
    this.elem.addEventListener("ribbon-select", (e) => {
      console.log(
        "три мышки слепых бегут за фермершей следом, которая хвосты отрубила им ножом кривым",
        e.detail
      );
    });

    this.elem.addEventListener("click", ({ target }) => {
      let link = target.closest("a");
      if (link) {
        this.elem.dispatchEvent(
          new CustomEvent("ribbon-select", {
            detail: link.dataset.id,
            bubbles: true
          })
        );
      }
    });
  }
}
=======
  }
}
>>>>>>> ba651802ce9a79077281a00590e2393bf9b2edef
