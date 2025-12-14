const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.send("My Week 2 API is running!");
});

// POST /user
app.post("/user", (req, res) => {
  res.json({
    name: "ABRAHAM OLUWATOBILOBA PETER",
    email: "abrahamoluwatobilobapeter57@gmail.com"
  });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "ABRAHAM OLUWATOBILOBA PETER",
    email: "abrahamoluwatobilobapeter57@gmail.com"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
