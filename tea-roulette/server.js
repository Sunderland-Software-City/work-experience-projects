// Importing necessary modules
const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const port = 3000;

// Middleware to serve static files and parse JSON request bodies
app.use(express.static("public"));
app.use(express.json());

// Path to the data file
const dataPath = path.join(__dirname, "public", "data.json");

// Function to ensure data file exists and resets it to an empty array on each server start
async function ensureDataFile() {
  try {
    // Overwrite data.json with an empty array each time server starts
    await fs.writeFile(dataPath, "[]");
  } catch (error) {
    console.error("Error ensuring data file:", error);
  }
}

// Call the ensureDataFile function once to reset data on server start
ensureDataFile();

// GET route to retrieve all preferences
app.get("/api/preferences", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Error reading preferences" });
  }
});

// POST route to add a new tea preference
app.post("/api/preferences", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    const preferences = JSON.parse(data);

    const { name, sugar, milk } = req.body;

    // Validate input
    if (!name || typeof sugar !== "number" || typeof milk !== "boolean") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Add the new preference
    preferences.push({ id: Date.now().toString(), name, sugar, milk });
    await fs.writeFile(dataPath, JSON.stringify(preferences, null, 2));
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: "Error adding preference" });
  }
});

// DELETE route to remove all preferences
app.delete("/api/preferences/all", async (req, res) => {
  try {
    await fs.writeFile(dataPath, "[]"); // Reset the file to an empty array
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: "Error deleting all preferences" });
  }
});

// DELETE route to remove a specific preference by its index
app.delete("/api/preferences/:index", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    const preferences = JSON.parse(data);
    const index = parseInt(req.params.index);

    // Validate the index
    if (isNaN(index) || index < 0 || index >= preferences.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    // Remove the preference at the specified index
    preferences.splice(index, 1);
    await fs.writeFile(dataPath, JSON.stringify(preferences, null, 2));
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: "Error removing person" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
