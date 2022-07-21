const signupForm = async (event) => {

    event.preventDefault();
  
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const name = document.querySelector('#name').value.trim();
  
    if (email && password && name) {
        if(password.length < 8){
            alert("Password must be 8 characters or more")
        };
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
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