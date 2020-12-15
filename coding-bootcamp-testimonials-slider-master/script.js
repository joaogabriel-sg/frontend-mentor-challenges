class Slide {
  constructor({ slides, buttons: { prev, next } }) {
    this.slidePosition = 0;
    this.slides = document.querySelectorAll(slides);
    this.buttons = {
      prev: document.querySelector(prev),
      next: document.querySelector(next),
    };
  }

  goToNext() {
    this.slidePosition -= 100;

    if (this.slidePosition < -((this.slides.length - 1) * 100)) {
      this.slidePosition = 0;
    }

    this.slides.forEach((slide) => {
      slide.style.transform = `translateX(${this.slidePosition}%)`;
    });
  }

  goToPrev() {
    this.slidePosition += 100;

    if (this.slidePosition >= 100) {
      this.slidePosition = -((this.slides.length - 1) * 100);
    }

    this.slides.forEach((slide) => {
      slide.style.transform = `translateX(${this.slidePosition}%)`;
    });
  }

  addEventsToButtons() {
    this.buttons.prev.addEventListener('click', this.goToPrev)
    this.buttons.next.addEventListener('click', this.goToNext)
  }

  defineBind() {
    this.goToPrev = this.goToPrev.bind(this);
    this.goToNext = this.goToNext.bind(this);
  }

  init() {
    if (this.buttons.prev && this.buttons.next) {
      this.defineBind();
      this.addEventsToButtons();
    }
    return this;
  }
}

const slide = new Slide({
  slides: '.slide',
  buttons: {
    prev: '.btn-prev',
    next: '.btn-next',
  }
});
slide.init();
