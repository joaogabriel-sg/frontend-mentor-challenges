const subsGroup = document.querySelector('.subscribe-group');
const field = document.querySelector('input#email');
const subsBtn = document.querySelector('.subscribe-btn');

subsBtn.addEventListener('click', (e) => {
  const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (regexp.test(field.value)) subsGroup.classList.remove('invalid');
  else subsGroup.classList.add('invalid');
});
