import { teaPreferences } from "./shared.js";
import { updateNameWheel } from "./updateNameWheel.js";
import { updatePreferencesList } from "./updatePreferencesList.js";
import { showError } from "./showError.js";

// Function to handle adding a new person through the form
export async function addPerson(e) {
  e.preventDefault(); // Prevent default form submission behavior

  const newPerson = {
    id: Date.now().toString(), // Use current timestamp as a unique ID
    name: document.getElementById("nameInput").value, // Get the name from input field
    sugar: parseInt(document.getElementById("sugarInput").value), // Get the sugar amount and convert it to an integer
    milk: document.getElementById("milkInput").checked, // Get the milk preference (true or false)
  };

  try {
    const response = await fetch("/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(newPerson), // Convert the new person object to JSON and send it
    });

    if (response.ok) {
      teaPreferences = await response.json(); // Update teaPreferences with the response data
      updateNameWheel(); // Update the wheel display with the new preference
      updatePreferencesList(); // Update the displayed list of preferences
      modal.hide(); // Hide the modal after adding the person
      document.getElementById("addPersonForm").reset(); // Reset the form fields
    } else {
      console.error("Error response:", response); // Log any error response
      showError("Error adding person"); // Show an error message to the user
    }
  } catch (error) {
    console.error("Error adding person:", error); // Log any errors that occur during addition
    showError("Error adding person"); // Show an error message to the user
  }
}
