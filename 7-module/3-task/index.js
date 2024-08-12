<<<<<<< HEAD
import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${value}</span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps"></div>
      </div>
    `);
    this.sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++) {
      const span = document.createElement('span');
      if (i === 0) {
        span.className = 'slider__step-active';
      }
      span.dataset.stepValue = i;
      this.sliderSteps.append(span);
    }
    this.sliderProgress = this.elem.querySelector('.slider__progress');
    this.sliderProgress.style.width = '0%';
    this.changeValue(steps);
  }

  changeValue(steps) {
    this.elem.addEventListener('click', (e) => {
      const sliderValue = this.elem.querySelector('.slider__value');
      const sliderStepsSpans = this.sliderSteps.querySelectorAll('span');
      const thumb = this.elem.querySelector('.slider__thumb');
      const progress = this.elem.querySelector('.slider__progress');
      let rect = this.elem.getBoundingClientRect();
      const left = e.clientX - rect.left;
      const leftRelative = left / this.elem.offsetWidth;
      const segments = steps - 1;
      const stepValue = leftRelative * segments;
      const stepValueCeil = Math.round(stepValue);
      this.value = stepValueCeil;
      const valuePercents = stepValueCeil / segments * 100;

      sliderValue.textContent = stepValueCeil;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      sliderStepsSpans.forEach(span => {
        if (span.dataset.stepValue === sliderValue.textContent) {
          span.classList.add('slider__step-active');
        } else {
          span.classList.remove('slider__step-active');
        }
      });
      const event = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      });
      this.elem.dispatchEvent(event);
    });
  }
}
=======
export default class StepSlider {
  constructor({ steps, value = 0 }) {
  }
}
>>>>>>> ba651802ce9a79077281a00590e2393bf9b2edef
