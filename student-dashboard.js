document.addEventListener('DOMContentLoaded', () => {
  const courseList = document.getElementById('courseList');

  // Fetch all available courses
  fetch('http://localhost:5000/api/courses')
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        courseList.innerHTML = data
          .map(
            (course) => `
              <div class="course-card">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <p><strong>Instructor:</strong> ${course.instructor}</p>
                <button class="register-btn" data-course-id="${course._id}">Register</button>
              </div>
            `
          )
          .join('');
      } else {
        courseList.innerHTML = '<p>No courses available.</p>';
      }
    })
    .catch((error) => {
      console.error('Error fetching courses:', error);
      courseList.innerHTML = '<p>Failed to load courses. Please try again later.</p>';
    });

  // Handle course registration button click
  courseList.addEventListener('click', (e) => {
    if (e.target.classList.contains('register-btn')) {
      const courseId = e.target.getAttribute('data-course-id');
      // Redirect to the course page with the course ID as a URL parameter
      window.location.href = `course.html?courseId=${courseId}`;
    }
  });
});