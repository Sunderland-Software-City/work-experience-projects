// import { teaPreferences } from "../script.js"; // Import the teaPreferences array
// import { updateNameWheel } from "./updateNameWheel.js";
// import { updatePreferencesList } from "./updatePreferencesList.js";
// import { showError } from "./showError.js";

// // Function to load preferences from the server
// export async function loadPreferences() {
//   try {
//     const response = await fetch("/api/preferences");
//     const preferences = await response.json(); // Fetch preferences from the server

//     // Clear the existing preferences and update with new data
//     teaPreferences.length = 0; // Clear the array without reassigning
//     teaPreferences.push(...preferences); // Add the new data to the array

//     updateNameWheel(); // Updates the visual representation of the wheel
//     updatePreferencesList(); // Updates the preferences list displayed
//   } catch (error) {
//     console.error("Error loading preferences:", error);
//     showError("Error loading preferences");
//   }
// }
