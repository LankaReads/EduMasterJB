require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
const courseRoutes = require("./routes/courseRoutes"); // Import course routes
const blogRoutes = require("./routes/blogRoutes");
const postRoutes = require("./routes/postRoutes");
const contactRoute = require("./routes/contactRoutes");
const researchRouter = require("./routes/researchRouter");
const projectRouter = require("./routes/projectRouter");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173"]; // Default fallback

// Enable CORS with dynamic origin configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // If no origin is sent (like on same-origin requests), allow
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed list
      if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Routes configuration
app.use("/api/blogs", blogRoutes);
app.use("/api/posts", postRoutes); // Updated route path to '/api/posts'

// Use the contact route
app.use("/api/contact", contactRoute);

// Authentication routes
app.use("/auth", authRoutes);
app.use("/api/courses", courseRoutes); // Correctly set up course routes
app.use("/api/research", researchRouter);
app.use("/api/projects", projectRouter);

// Establish database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(bodyParser.json());

// Generic error handler for server-side errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again.",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
