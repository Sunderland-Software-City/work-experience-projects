import { teaPreferences } from "../script.js";
import { removePerson } from "./removePerson.js";

// Function to update the preferences list displayed in the DOM
export function updatePreferencesList() {
  const list = document.getElementById("preferencesList"); // Get the preferences list element
  list.innerHTML = ""; // Clear the current contents of the list

  teaPreferences.forEach((pref, id) => {
    // Iterate over each tea preference
    const item = document.createElement("div"); // Create a new div element for the preference item
    item.className =
      "list-group-item list-group-item-action preference-item d-flex justify-content-between align-items-center"; // Set class names for styling
    item.innerHTML = `
          <span>${pref.name}: ${pref.sugar} sugar, ${
      pref.milk ? "with" : "without"
    } milk</span> <!-- Display preference details -->
          <button class="btn btn-danger btn-sm" onclick="removePerson(${id})"> <!-- Button to remove the preference -->
            <i class="bi bi-x-lg"></i>
          </button>
        `;
    list.appendChild(item); // Add the preference item to the list in the DOM
  });
}
