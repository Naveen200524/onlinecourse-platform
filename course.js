document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('courseId');

  if (courseId) {
    fetch(`http://localhost:5000/api/courses/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const course = data.course;
          document.getElementById('courseTitle').textContent = course.title;
          document.getElementById('courseDescription').textContent = course.description;
          document.getElementById('courseInstructor').textContent = course.instructor;
          document.getElementById('courseVideo').src = course.youtubeLink;
        } else {
          alert('Failed to load course details.');
        }
      })
      .catch((error) => {
        console.error('Error fetching course details:', error);
        alert('An error occurred while fetching course details.');
      });
  } else {
    alert('No course selected.');
  }
});