// // Importing necessary modules
// const express = require("express"); // Express framework for handling server and routes
// const session = require("express-session"); // Session middleware for handling user sessions
// const FileStore = require("session-file-store")(session); // FileStore for storing session data in files

// // Initialize Express application
// const app = express();
// const port = process.env.PORT || 3000; // Set port number for the server, default to 3000 if not specified

// // Configure session middleware
// app.use(
//   session({
//     secret: "your-secret-key", // Key for signing the session ID
//     resave: false, // Only save sessions if they’ve changed
//     saveUninitialized: false, // Only create sessions if data is added
//     store: new FileStore(), // Store session data in files
//   })
// );

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Serve static files from the 'public' directory
// app.use(express.static("public"));

// // GET route to retrieve preferences for the current user session
// app.get("/api/preferences", (req, res) => {
//   //TODO: Initialize preferences as an empty array for a new session
//   //
//   //TODO: Send the empty preferences array as JSON response
//   //
// });

// // POST route to add a new tea preference for the current user session
// app.post("/api/preferences", (req, res) => {
//   const { name, sugar, milk } = req.body; // Extract name, sugar, and milk from request body

//   // TODO: Validate input to ensure correct data types and presence of required fields
//   // TODO: Return an error if validation fails

//   // TODO: Retrieve current preferences or initialize as an empty array

//   // TODO: Add new tea preference with unique ID, name, sugar, and milk properties example: { id: "1234", name: "Mike", sugar: 2, milk: false }

//   // TODO: Update session with new preferences array
//   // TODO:  Send updated preferences array as JSON response
// });

// // DELETE route to remove all preferences
// app.delete("/api/preferences/all", (req, res) => {
//   //TODO: Reset preferences to an empty array
//   //TODO: Respond with empty array
// });

// // DELETE route to remove a specific preference by its index for the current user session
// app.delete("/api/preferences/:index", (req, res) => {
//   // TODO: Parse index from route parameters and then Get current preferences or default to empty array
//   // TODO: Remove the preference at the specified index
//   // TODO: Update session with modified preferences array and then Send updated preferences array as JSON response
// });

// // Start the server on the specified port
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`); // Log the server URL
// });
// Importing necessary modules
const express = require("express"); // Express framework for handling server and routes
const session = require("express-session"); // Session middleware for handling user sessions
const FileStore = require("session-file-store")(session); // FileStore for storing session data in files

// Initialize Express application
const app = express();
const port = 3000; // Set port number for the server

// Configure session middleware
app.use(
  session({
    secret: "your-secret-key", // Key for signing the session ID
    resave: false, // Only save sessions if they’ve changed
    saveUninitialized: false, // Only create sessions if data is added
    store: new FileStore(), // Store session data in files
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// GET route to retrieve preferences for the current user session
app.get("/api/preferences", (req, res) => {
  // Initialize preferences as an empty array for a new session
  req.session.teaPreferences = [];

  // Send the empty preferences array as JSON response
  res.json(req.session.teaPreferences);
});

// POST route to add a new tea preference for the current user session
app.post("/api/preferences", (req, res) => {
  const { name, sugar, milk } = req.body; // Extract name, sugar, and milk from request body

  // Validate input to ensure correct data types and presence of required fields
  if (!name || typeof sugar !== "number" || typeof milk !== "boolean") {
    return res.status(400).json({ error: "Invalid input data" }); // Send error if validation fails
  }

  // Retrieve current preferences or initialize as an empty array
  let teaPreferences = req.session.teaPreferences || [];
  // Add new tea preference with unique ID, name, sugar, and milk properties
  teaPreferences.push({ id: Date.now().toString(), name, sugar, milk });
  req.session.teaPreferences = teaPreferences; // Update session with new preferences array
  res.json(teaPreferences); // Send updated preferences array as JSON response
});

// DELETE route to remove all preferences
app.delete("/api/preferences/all", (req, res) => {
  req.session.teaPreferences = []; // Reset preferences to an empty array
  res.json([]); // Respond with empty array
});

// DELETE route to remove a specific preference by its index for the current user session
app.delete("/api/preferences/:index", (req, res) => {
  const index = parseInt(req.params.index); // Parse index from route parameters
  let teaPreferences = req.session.teaPreferences || []; // Get current preferences or default to empty array

  // Validate the index to ensure it's a valid number and within bounds
  if (isNaN(index) || index < 0 || index >= teaPreferences.length) {
    return res.status(400).json({ error: "Invalid index" }); // Send error if index is invalid
  }
  // Remove the preference at the specified index
  teaPreferences.splice(index, 1);
  req.session.teaPreferences = teaPreferences; // Update session with modified preferences array
  res.json(teaPreferences); // Send updated preferences array as JSON response
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Log the server URL
});
