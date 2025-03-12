const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory storage for users (for signup and login)
let users = [
  {
    fullName: "John Doe",
    email: "student1@example.com",
    password: "password123"
  }
];

// ✅ Student Sign-Up API
app.post("/api/student-signup", (req, res) => {
  const { fullName, email, password } = req.body;

  // Validate required fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Check if email is already registered
  if (users.find((user) => user.email === email)) {
    return res.status(409).json({ success: false, message: "Email already registered!" });
  }

  // Add new user to the array
  users.push({ fullName, email, password });
  console.log("New user registered:", { fullName, email }); // Log the new user
  res.status(201).json({ success: true, message: "You are added to our database." });
});

// ✅ Student Login API
app.post("/api/student-login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", { email, password }); // Log the login request

  // Check if the user exists in the `users` array
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    console.log("Login successful for user:", user); // Log successful login
    res.json({ success: true });
  } else {
    console.log("Login failed: Invalid email or password"); // Log failed login
    res.json({ success: false, message: "Invalid email or password." });
  }
});

// ✅ Start Server
app.listen(5000, () => console.log("Server running on port 5000"));