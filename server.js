const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/courseplatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// MongoDB Course Schema
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  youtubeLink: String
});

const Course = mongoose.model('Course', courseSchema);

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

// Add course API
app.post("/api/courses", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.json({ success: true, course: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all courses API
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get course by ID API
app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Start Server
app.listen(5000, () => console.log("Server running on port 5000"));