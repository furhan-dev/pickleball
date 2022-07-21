const getCourts = async (event) => {

  event.preventDefault();

  const location = document.querySelector('#location').value.trim();

  console.log("IN HANDLER" + location);
  const response = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify({ place: location }),
    headers: { 'Content-Type': 'application/json' },
  });

  console.log("RESPONSE: " + JSON.stringify(response));

  // if (response.ok) {
  //   document.location.replace('/dashboard');
  // }
}

document
  .querySelector('.search-courts')
  .addEventListener('click', getCourts);