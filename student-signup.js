document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send signup request to the server
    fetch('http://localhost:5000/api/student-signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message); // "You are added to our database"
          window.location.href = 'student-login.html'; // Redirect to login page
        } else {
          alert('Signup failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during signup.');
      });
  });
});