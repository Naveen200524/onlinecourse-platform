document.addEventListener('DOMContentLoaded', () => {
  const addCourseForm = document.getElementById('addCourseForm');

  addCourseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const instructor = document.getElementById('instructor').value;
    const youtubeLink = document.getElementById('youtubeLink').value;

    // Validate YouTube link
    if (!isValidYouTubeUrl(youtubeLink)) {
      alert('Please enter a valid YouTube video URL');
      return;
    }

    // Send request to add new course
    fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        instructor,
        youtubeLink
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Course added successfully!');
          addCourseForm.reset(); // Clear the form
        } else {
          alert('Failed to add course: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error adding course:', error);
        alert('An error occurred while adding the course.');
      });
  });

  // Function to validate YouTube URL
  function isValidYouTubeUrl(url) {
    // Simple validation - check if it contains youtube.com or youtu.be
    return url.includes('youtube.com') || url.includes('youtu.be');
  }
});