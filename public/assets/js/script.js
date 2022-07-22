const getCourts = async (event) => {

  event.preventDefault();

  const location = document.querySelector('#location').value.trim();

  document.location.replace(`/search/${location}`);
  // console.log("IN HANDLER" + location);
  // const response = await fetch(`/api/search/${location}`, {
  //   method: 'GET',
  //   // body: JSON.stringify({ place: location }),
  //   // headers: { 'Content-Type': 'application/json' },
  // });

  // console.log("RESPONSE: " + response);

  // if (response.ok) {
  //   console.log("response ok");
  //   document.location.replace('/search');
  // }
}
// document.location.replace(`/search?location=${location}`);

document
  .querySelector('.search-courts')
  .addEventListener('click', getCourts);