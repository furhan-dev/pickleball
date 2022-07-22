const loginForm = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      const errorEl = document.querySelector('.login-error');
      errorEl.textContent = 'Incorrect Username or Password';
    }
  }
};



document
  .querySelector('.login-form')
  .addEventListener('submit', loginForm);