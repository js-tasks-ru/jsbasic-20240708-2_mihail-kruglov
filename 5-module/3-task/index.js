function initCarousel() {
  const carousel = document.querySelector(".container"),
    carouselRight = carousel.querySelector(
      ".carousel__arrow_right"),
   carouselLeft = carousel.querySelector(".carousel__arrow_left"),
    carouselInner = carousel.querySelector(".carousel__inner");
  let index = 0;
  const transform = (y) =>
    (carouselInner.style.transform = `translateX(-${
      carouselInner.querySelector(".carousel__slide").offsetWidth * y}px`);
 carouselLeft.style.display = "none";
  carousel.onclick = (x) => {
    if (x.target.closest(".carousel__arrow_right")) {
      transform(++index);}
    if (x.target.closest(".carousel__arrow_left")) {
      transform(--index);}
    carouselRight.style.display =
      index < carouselInner.children.length - 1 ? "" : "none";
   carouselLeft.style.display = index > 0 ? "" : "none";
  };
}
