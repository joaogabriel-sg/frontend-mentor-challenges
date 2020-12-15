const faqTitles = document.querySelectorAll('.item h2');

faqTitles.forEach((faqTitle) => {
  faqTitle.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('active');
  });
});
