// Importing necessary modules
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();
const port = 3000;

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
    store: new FileStore(), // or Redis/MongoDB for unique session management in production
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// GET route to retrieve preferences for the current user session
app.get("/api/preferences", (req, res) => {
  // Return an empty array for each session
  req.session.teaPreferences = [];

  res.json(req.session.teaPreferences);
});

// POST route to add a new tea preference for the current user session
app.post("/api/preferences", (req, res) => {
  const { name, sugar, milk } = req.body;

  // Validate input
  if (!name || typeof sugar !== "number" || typeof milk !== "boolean") {
    return res.status(400).json({ error: "Invalid input data" });
  }

  let teaPreferences = req.session.teaPreferences || [];
  teaPreferences.push({ id: Date.now().toString(), name, sugar, milk });
  req.session.teaPreferences = teaPreferences;
  res.json(teaPreferences);
});

// DELETE route to remove all preferences
app.delete("/api/preferences/all", (req, res) => {
  req.session.teaPreferences = [];
  res.json([]);
});

// DELETE route to remove a specific preference by its index for the current user session
app.delete("/api/preferences/:index", (req, res) => {
  const index = parseInt(req.params.index);
  let teaPreferences = req.session.teaPreferences || [];

  // Validate the index
  if (isNaN(index) || index < 0 || index >= teaPreferences.length) {
    return res.status(400).json({ error: "Invalid index" });
  }
  // Remove the preference at the specified index
  teaPreferences.splice(index, 1);
  req.session.teaPreferences = teaPreferences;
  res.json(teaPreferences);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
