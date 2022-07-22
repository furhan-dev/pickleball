const signupForm = async (event) => {

  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const firstName = document.querySelector('#first-name').value.trim();
  const lastName = document.querySelector('#last-name').value.trim();
  let rating = document.querySelector('#rating').value.trim();
  if (isNaN(rating)) {
    rating = null;
  } else {
    rating = parseFloat(rating);
  }

  if (email && password && firstName && lastName) {
    if (password.length < 8) {
      alert("Password must be 8 characters or more")
    };
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password, first_name: firstName, last_name: lastName, rating: rating }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupForm);