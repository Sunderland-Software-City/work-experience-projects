import { teaPreferences } from "./shared.js";
import { updateNameWheel } from "./updateNameWheel.js";
import { updatePreferencesList } from "./updatePreferencesList.js";
import { showError } from "./showError.js";

// Function to load preferences from the server
export async function loadPreferences() {
  try {
    const response = await fetch("/api/preferences"); // Fetch tea preferences from the server
    teaPreferences = await response.json(); // Parse the JSON response and update the teaPreferences array
    updateNameWheel(); // Update the visual representation of the wheel with loaded preferences
    updatePreferencesList(); // Update the displayed list of preferences
  } catch (error) {
    console.error("Error loading preferences:", error); // Log any errors that occur during fetching
    showError("Error loading preferences"); // Show an error message to the user
  }
}
