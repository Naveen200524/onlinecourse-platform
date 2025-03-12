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
          
          // Set up YouTube iframe
          const videoId = getYouTubeVideoId(course.youtubeLink);
          if (videoId) {
            document.getElementById('courseVideo').src = `https://www.youtube.com/embed/${videoId}`;
          } else {
            document.getElementById('videoContainer').innerHTML = '<p>Invalid YouTube video link</p>';
          }
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
  
  // Function to extract YouTube video ID from different URL formats
  function getYouTubeVideoId(url) {
    if (!url) return null;
    
    // Regular expression to match YouTube video ID from various URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  }
});