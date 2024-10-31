import { teaPreferences } from "./shared.js";
import { updateNameWheel } from "./updateNameWheel.js";
import { updatePreferencesList } from "./updatePreferencesList.js";
import { showError } from "./showError.js";
// Function to remove a specific person based on id
export async function removePerson(id) {
  if (isSpinning) return; // Prevent removing if the wheel is currently spinning

  try {
    const response = await fetch(`/api/preferences/${id}`, {
      // Send a DELETE request to remove the preference
      method: "DELETE",
    });

    if (response.ok) {
      // Check if the response was successful
      teaPreferences = await response.json(); // Update teaPreferences with the response data
      updateNameWheel(); // Refresh the wheel display after deletion
      updatePreferencesList(); // Update the displayed list of preferences

      if (teaPreferences.length === 0) {
        // If no preferences are left
        document.getElementById("selectedPerson").textContent =
          "Nobody selected yet"; // Update the display
        document.getElementById("preferenceDisplay").textContent = ""; // Clear the preference display
      }
    } else {
      console.error("Error response:", response); // Log any error response
      showError("Error removing person"); // Show an error message to the user
    }
  } catch (error) {
    console.error("Error removing person:", error); // Log any errors that occur during deletion
    showError("Error removing person"); // Show an error message to the user
  }
}
