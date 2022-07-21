const signupForm = async (event) => {

    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
        if(password.length < 8){
            alert("Password must be 8 characters or more")
        };
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      }
    }
  };

document
.querySelector('.signup-form')
.addEventListener('submit', signupForm);