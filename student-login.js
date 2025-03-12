document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Login form submitted:", { email, password }); // Log the form submission

    // Send login request to the server
    fetch("http://localhost:5000/api/student-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login response:", data); // Log the response
        if (data.success) {
          alert("Login successful! Redirecting to dashboard...");
          window.location.href = "student-dashboard.html"; // Redirect to student dashboard
        } else {
          alert("Login failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error); // Log the error
        alert("An error occurred during login.");
      });
  });
});