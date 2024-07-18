const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Serve static files
app.use(express.static("views"));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/url", require("./routes/url"));

// Serve login and register pages
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/views/register.html");
});

// Protect the home route
app.get("/home", auth, (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

// Handle short URL redirection
app.get("/:shortUrl", require("./controllers/urlController").redirectUrl);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
