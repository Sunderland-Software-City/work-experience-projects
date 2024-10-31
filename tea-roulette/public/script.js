import { spinWheel } from "./components/spinWheel.js"; // Import the spin function
import { addPerson } from "./components/addPerson.js"; // Import the addPerson function
import { loadPreferences } from "./components/loadPreferences.js"; // Import the loadPreferences function
import { removeAllPeople } from "./components/removeAllPeople.js"; // Import the removeAllPeople function
import { removePerson } from "./components/removePerson.js"; // Import the removePerson function

// Initialize Bootstrap modal for adding a person
const modal = new bootstrap.Modal(document.getElementById("addPersonModal"));
const addPersonBtn = document.getElementById("addPersonBtn"); // Get the button to open the modal
const removeAllBtn = document.getElementById("removeAllBtn"); // Get the button to remove all preferences

// Show the modal when the button is clicked
addPersonBtn.onclick = () => modal.show();

// Attach the addPerson function to form submission
document.getElementById("addPersonForm").onsubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  const newPerson = {
    id: Date.now().toString(), // Use current timestamp as a unique ID
    name: document.getElementById("nameInput").value, // Get the name from input field
    sugar: parseInt(document.getElementById("sugarInput").value), // Get the sugar amount and convert it to an integer
    milk: document.getElementById("milkInput").checked, // Get the milk preference (true or false)
  };
  await addPerson(newPerson); // Call the addPerson function to add the new person
};

// Set the click event for the remove all button
removeAllBtn.onclick = removeAllPeople;

// Initialize the spin button click event
document.getElementById("spinBtn").onclick = spinWheel;

// Initial load of preferences on page load
loadPreferences(); // Call the loadPreferences function to load preferences when the page is first opened
