// server.mjs

// Importing necessary modules using ESM syntax
import express from "express"; // Express framework for handling server and routes
import fs from "fs"; // File system module for reading/writing JSON file
import path from "path"; // Path module for handling file paths
import nunjucks from "nunjucks"; // Nunjucks templating engine

// Initialize Express application
const app = express();
const port = 3000; // Set port number for the server

// Configure Nunjucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Path to the JSON file
const dataFilePath = path.join(process.cwd(), "public", "data.json");

app.get("/", (req, res) => {
  res.render("index.njk"); // Nunjucks ile index.njk dosyasını render et
});
// Helper function to read the JSON file
function readPreferences() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data file:", err);
    return []; // Return an empty array if reading fails
  }
}

// Helper function to write to the JSON file
function writePreferences(preferences) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(preferences, null, 2));
  } catch (err) {
    console.error("Error writing data file:", err);
  }
}

// GET route to retrieve all preferences
app.get("/api/preferences", (req, res) => {
  // TODO: Call the helper function to read preferences from JSON file
  res.json(preferences); //Send the preferences array as a JSON response
});

// POST route to add a new tea preference
app.post("/api/preferences", (req, res) => {
  // TODO: Extract the name, sugar, and milk properties from the request body

  // TODO: Validate input to ensure correct data types and presence of required fields

  // TODO: Send an error response if validation fails

  // TODO: Retrieve the current preferences from the JSON file
  // TODO: Create a new preference object with a unique ID and add it to the preferences array
  // TODO: Add new preference to the array
  // TODO: Write the updated preferences array to the JSON file
  res.json(preferences); // Send updated preferences as JSON response
});

// DELETE route to remove all preferences
app.delete("/api/preferences/:index", (req, res) => {
  // TODO: Parse the index from the route parameters

  // TODO: Retrieve the current preferences from the JSON file

  // TODO: Validate the index to ensure it's a valid number and within array bounds

  // TODO: Send an error response if the index is invalid

  // TODO: Remove the preference at the specified index

  // TODO: Write the updated preferences array back to the JSON file

  res.json(preferences); // Send the updated preferences array as a JSON response
});

// GET route to render the index.njk template
app.get("/", (req, res) => {
  res.render("index.njk"); // Render index.njk file
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Log the server URL
});
