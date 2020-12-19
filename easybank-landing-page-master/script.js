function debounce(cb, time) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, time);
  }
}

const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
})

window.addEventListener('resize', debounce(() => {
  if (window.innerWidth > 768) {
    burgerMenu.classList.remove('active');
  }
}, 20));