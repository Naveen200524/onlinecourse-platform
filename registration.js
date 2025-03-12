document.addEventListener('DOMContentLoaded', () => {
  const courseDetails = document.getElementById('courseDetails');
  const registrationForm = document.getElementById('registrationForm');

  // Get the course ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('courseId');

  // Fetch course details from the server
  if (courseId) {
    fetch(`http://localhost:5000/api/courses/${courseId}`)
      .then((response) => response.json())
      .then((course) => {
        courseDetails.innerHTML = `
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <p><strong>Instructor:</strong> ${course.instructor}</p>
        `;
      })
      .catch((error) => {
        console.error('Error fetching course details:', error);
        courseDetails.innerHTML = '<p>Failed to load course details. Please try again later.</p>';
      });
  } else {
    courseDetails.innerHTML = '<p>No course selected.</p>';
  }

  // Handle form submission
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Send registration request to the server
    fetch('http://localhost:5000/api/register-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId, name, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Registration successful!');
          window.location.href = 'student-dashboard.html'; // Redirect to the dashboard
        } else {
          alert('Registration failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        alert('An error occurred during registration.');
      });
  });
});