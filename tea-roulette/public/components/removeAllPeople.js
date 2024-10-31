import { updateNameWheel } from "./updateNameWheel.js";
import { updatePreferencesList } from "./updatePreferencesList.js";
import { showError } from "./showError.js";

// Function to remove all people from the preferences list

export async function removeAllPeople() {
  if (isSpinning) return; // Prevent removing if the wheel is currently spinning

  if (!confirm("Are you sure you want to remove all people?")) return; // Confirm with the user before removal

  try {
    const response = await fetch("/api/preferences/all", {
      // Send a DELETE request to remove all preferences
      method: "DELETE",
    });

    if (response.ok) {
      // Check if the response was successful
      teaPreferences = []; // Clear the teaPreferences array
      updateNameWheel(); // Clears the wheel display
      updatePreferencesList(); // Update the displayed list to reflect the cleared preferences
      document.getElementById("selectedPerson").textContent =
        "Nobody selected yet"; // Update the display
      document.getElementById("preferenceDisplay").textContent = ""; // Clear the preference display
    } else {
      console.error("Error response:", response); // Log any error response
      showError("Error removing all people"); // Show an error message to the user
    }
  } catch (error) {
    console.error("Error removing all people:", error); // Log any errors that occur during deletion
    showError("Error removing all people"); // Show an error message to the user
  }
}
