// Debounce Function
function debounce(cb, time) {
  let timer;
  return (...args) => {
    if (timer) clearInterval(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, time);
  }
}

// Add event to the hmaburger menu that opens the menu
const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
})

// Event that occurs when the window is resized
function onWindowResize() {
  // Hide mobile menu when inner width greather than 768px
  if (burgerMenu.classList.contains('active') && window.innerWidth > 768) {
    burgerMenu.classList.remove('active');
  }
}
window.addEventListener('resize', debounce(onWindowResize, 20));

// Variables to form short url
const btnShortUrl = document.querySelector('.btn-short-url');
const inputGroup = document.querySelector('.input-group');

// Regex for url validation
const regexForUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

// Event that occurs when I click in the button to submit the form
btnShortUrl.addEventListener('click', (e) => {
  e.preventDefault();
  const fieldUrl = document.querySelector('input#url');

  if (regexForUrl.test(fieldUrl.value)) {
    inputGroup.classList.remove('invalid');

    fetchToShortUrlApi(fieldUrl.value);
    
    fieldUrl.value = '';
  } else {
    inputGroup.classList.add('invalid');
  }
});

// Search for the corresponding API to shorten the url
async function fetchToShortUrlApi(url) {
  try {
    const { 
      ok, 
      result:{ full_short_link: newUrl, original_link: oldUrl },
    } = await (await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)).json();

    if (!ok) throw new Error('Impossible to generate a short url');
    
    addShortUrlToLocalStorage({ oldUrl, newUrl });
  } catch (error) {
    inputGroup.classList.add('invalid');
    console.error(error);
  }
}

// Add old and new url to local storage
function addShortUrlToLocalStorage(url) {
  const urlsLocalStorage = JSON.parse(localStorage.getItem('urls')) || [];
  urlsLocalStorage.push(url);
  localStorage.setItem('urls', JSON.stringify(urlsLocalStorage));
  
  showShortUrlOnTheScreen(url.oldUrl, url.newUrl);
}

// Show urls on the screen
function showShortUrlOnTheScreen(oldUrl, newUrl) {
  const html = `
    <div class="results-url-item">
      <div class="urls">
        <span class="old-url">${oldUrl.length <= 30 ? oldUrl : oldUrl.substring(0, 30) + '...'}</span>
        <span class="new-url">${newUrl}</span>
      </div>
      <button class="btn-copy-url" onclick="copyUrlToClipboard(this)" data-clipboard-text="${newUrl}">Copy</button>
    </div>
  `;

  const resultsUrls = document.querySelector('.results-urls');
  resultsUrls.innerHTML += html;
}

// Get all urls in the urls item in local storage
function getMyUrlsOnLocalStorage() {
  const urls = JSON.parse(localStorage.getItem('urls')) || [];

  urls.forEach(({ oldUrl, newUrl }) => {
    showShortUrlOnTheScreen(oldUrl, newUrl);
  })
}
getMyUrlsOnLocalStorage()

// This function is performed when I click the "Copy" button
// that activates the Clipboard.js library that records the corresponding url
function copyUrlToClipboard(btnCopied) {  
  new ClipboardJS('.btn-copy-url');

  const btnsCopy = document.querySelectorAll('.btn-copy-url');
  btnsCopy.forEach((btnCopy) => {
    btnCopy.classList.remove('copied')
    btnCopy.innerHTML = 'Copy';
  });

  btnCopied.classList.add('copied');
  btnCopied.innerHTML = 'Copied!';
}
