import { teaPreferences } from "./shared.js";

// Function to update the wheel display with names and slices
export function updateNameWheel() {
  const wheel = document.getElementById("nameWheel"); // Get the wheel element
  wheel.innerHTML = ""; // Clear the current contents of the wheel

  const sliceAngle = 360 / teaPreferences.length; // Calculate the angle for each slice based on the number of preferences

  teaPreferences.forEach((person, id) => {
    // Iterate over each tea preference
    const slice = document.createElement("div"); // Create a new div for the name slice

    slice.className = "name-slice"; // Set class name for styling
    slice.style.setProperty("--slice-id", id * sliceAngle); // Set the rotation angle for the slice
    slice.textContent = person.name; // Set the text content of the slice to the person's name
    wheel.appendChild(slice); // Add the slice to the wheel
  });
}
