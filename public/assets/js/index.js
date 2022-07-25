const getCourts = async (event) => {

  event.preventDefault();
  const location = document.querySelector('#location').value.trim();
  document.location.replace(`/search/${location}`);
}

document
  .querySelector('.search-courts')
  .addEventListener('click', getCourts);