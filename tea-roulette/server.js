// Importing the Express framework to set up the server
const express = require("express");
// Importing the file system promises module for asynchronous file handling
const fs = require("fs").promises;
// Importing the path module to work with file and directory paths
const path = require("path");

// Initializing the Express application
const app = express();
// Defining the server port
const port = 3000;

// Serving static files from the 'public' directory
app.use(express.static("public"));
// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Setting the path for the data file to store tea preferences in JSON format
const dataPath = path.join(__dirname, "public", "data.json");

async function ensureDataFile() {
  try {
    await fs.access(dataPath); // Check if file exists
  } catch (error) {
    await fs.writeFile(dataPath, "[]"); // Create it with an empty array if it doesn't
  }
}
// GET route to fetch all tea preferences from the data file
app.get("/api/preferences", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf8"); // Reads the file content as a string

    res.json(JSON.parse(data)); // Parses the JSON string and sends it as the response
  } catch (error) {
    res.status(500).json({ error: "Error reading preferences" }); // Sends an error response if reading fails
  }
});

// POST route to add a new tea preference to the data file
app.post("/api/preferences", async (req, res) => {
  try {
    await ensureDataFile();
    const data = await fs.readFile(dataPath, "utf8");
    const preferences = JSON.parse(data);

    const { name, sugar, milk } = req.body;

    // Validate input
    if (!name || typeof sugar !== "number" || typeof milk !== "boolean") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Create person object with a unique ID
    const person = {
      id: Date.now().toString(),
      name: name.trim(),
      sugar,
      milk,
    };

    // Add person to preferences and save
    preferences.push(person);
    await fs.writeFile(dataPath, JSON.stringify(preferences, null, 2));
    res.json(preferences);
  } catch (error) {
    console.log("Error in POST /api/preferences:", error);
    res.status(500).json({ error: "Error adding preference" });
  }
});

// DELETE route to remove all preferences from the data file
app.delete("/api/preferences/all", async (req, res) => {
  try {
    await fs.writeFile(dataPath, "[]"); // Overwrites the file with an empty array
    res.json([]); // Responds with an empty array to confirm deletion
  } catch (error) {
    res.status(500).json({ error: "Error deleting all preferences" }); // Sends an error response if deleting fails
  }
});

// DELETE route to remove a specific preference by its id in the array
app.delete("/api/preferences/:id", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf8"); // Reads existing preferences from the file
    const preferences = JSON.parse(data); // Parses the data into an array
    const id = parseInt(req.params.id); // Converts the id parameter from the URL to a number

    // Validates the id - it must be a number within the array's range
    if (isNaN(id) || id < 0 || id >= preferences.length) {
      return res.status(400).json({ error: "Invalid id" }); // Returns an error if the id is invalid
    }

    // Removes the item at the specified id
    preferences.splice(id, 1);
    // Writes the updated preferences back to the data file
    await fs.writeFile(dataPath, JSON.stringify(preferences, null, 2));
    res.json(preferences); // Responds with the updated list of preferences
  } catch (error) {
    res.status(500).json({ error: "Error removing person" }); // Sends an error response if removal fails
  }
});

// Starts the server on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// Helper function to check if the data file exists; if not, it creates an empty JSON array
// async function ensureDataFile() {
//   try {
//     await fs.access(dataPath); // Checks if the file is accessible
//   } catch {
//     await fs.writeFile(dataPath, "[]"); // Creates the file with an empty array if it doesn't exist
//   }
// }
