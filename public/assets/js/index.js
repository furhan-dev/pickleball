const getCourts = async (event) => {

  event.preventDefault();
  const location = document.querySelector('#location').value.trim();
  window.history.pushState(null, document.location.href);
  document.location.replace(`/search/${location}`);
}

document
  .querySelector('.search-courts')
  .addEventListener('click', getCourts);