// routes/preferencesRoutes.mjs
import express from "express";
import fs from "fs";
import path from "path";

const preferencesRoutes = express.Router();
const dataFilePath = path.join(process.cwd(), "public", "data.json");

// Helper functions
function readPreferences() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data file:", err);
    return [];
  }
}

function writePreferences(preferences) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(preferences, null, 2));
  } catch (err) {
    console.error("Error writing data file:", err);
  }
}

// GET route to retrieve all preferences
preferencesRoutes.get("/", (req, res) => {
  // TODO: Call the helper function to read preferences from JSON file
});

// POST route to add a new tea preference
preferencesRoutes.post("/", (req, res) => {
  // TODO: Extract the name, sugar, and milk properties from the request body
  // TODO: Validate input to ensure correct data types and presence of required fields. Send an error response if validation fails
  // TODO: Create a new preference object with a unique ID and add it to the preferences array
});

// DELETE route to remove a preference by index
preferencesRoutes.delete("/:index", (req, res) => {
  // TODO: Remove the preference at the specified index
  // TODO: Write the updated preferences array back to the JSON file
});

export default preferencesRoutes;
