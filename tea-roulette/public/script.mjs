import { loadPreferences } from "./components/loadPreferences.mjs";
import { updateNameWheel } from "./components/updateNameWheel.mjs";
import { spinWheel } from "./components/spinWheel.mjs";
import { removePerson } from "./components/removePerson.mjs";
import { removeAllPeople } from "./components/removeAllPeople.mjs";
import { addPerson } from "./components/addPerson.mjs";
import { showError } from "./components/showError.mjs";

let teaPreferences = []; // Array to store the tea preferences
let isSpinning = false; // Boolean to check if the wheel is spinning
let currentRotation = 0; // Current rotation angle for the wheel

//  Load initial preferences when the page loads
loadPreferences(teaPreferences, showError, updatePreferencesList);

// TODO: Complete the function to update the list of preferences displayed in the DOM
function updatePreferencesList() {
  const list = document.getElementById("preferencesList");
  list.innerHTML = ""; // Clear the current list

  // TODO: Loop through teaPreferences array and create list items for each preference
  teaPreferences.forEach((pref, id) => {
    const item = document.createElement("div");
    item.className =
      "list-group-item list-group-item-action preference-item d-flex justify-content-between align-items-center";

    // TODO: Create a delete button for each preference item
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.innerHTML = '<i class="bi bi-x-lg"></i>';

    // TODO: Add event listener to the delete button for removing a person
    deleteButton.addEventListener("click", () => {
      removePerson(
        teaPreferences,
        id,
        isSpinning, // Pass the isSpinning state
        updatePreferencesList,
        updateNameWheel,
        showError
      );
    });

    // TODO: Create a span to display the tea preference details
    const infoSpan = document.createElement("span");
    infoSpan.textContent = `${pref.name}: ${pref.sugar} sugar, ${
      pref.milk ? "with" : "without"
    } milk`;

    // TODO: Append the delete button and info span to the list item, and the item to the list
    item.appendChild(infoSpan);
    item.appendChild(deleteButton);
    list.appendChild(item);
  });
}

// TODO: Initialize Bootstrap modal for adding new person
const modal = new bootstrap.Modal(document.getElementById("addPersonModal"));
const addPersonBtn = document.getElementById("addPersonBtn");
const removeAllBtn = document.getElementById("removeAllBtn");

// TODO: Show the modal when add button is clicked
addPersonBtn.onclick = () => modal.show();

// TODO: Add event listener to the remove all button to delete all preferences
removeAllBtn.onclick = () =>
  removeAllPeople(
    teaPreferences,
    isSpinning, // Pass the isSpinning state
    updatePreferencesList,
    updateNameWheel,
    showError
  );

// TODO: Define a function to handle adding a new person from the form
document.getElementById("addPersonForm").onsubmit = async (e) => {
  e.preventDefault(); // Prevent form submission

  // TODO: Create a new person object with data from the form inputs
  const newPerson = {
    id: Date.now().toString(),
    name: document.getElementById("nameInput").value,
    sugar: parseInt(document.getElementById("sugarInput").value),
    milk: document.getElementById("milkInput").checked,
  };

  // TODO: Add the new person to teaPreferences and update the display and wheel
  addPerson(
    teaPreferences,
    newPerson,
    modal,
    updatePreferencesList,
    updateNameWheel,
    showError
  );
};

// TODO: Define a function to handle spinning the wheel and selecting a person
document.getElementById("spinBtn").onclick = () => {
  // TODO: Check if the wheel is already spinning or if there are no preferences to spin
  if (isSpinning || teaPreferences.length === 0) return;

  isSpinning = true; // Set the spinning state to true
  const wheel = document.getElementById("nameWheel");

  // TODO: Spin the wheel and display the selected person's preferences
  spinWheel(teaPreferences, wheel, (winner) => {
    isSpinning = false; // Reset the spinning state
    document.getElementById("selectedPerson").textContent = winner.name;
    document.getElementById("preferenceDisplay").textContent = `Preferences: ${
      winner.sugar
    } sugar${winner.sugar !== 1 ? "s" : ""}, ${
      winner.milk ? "with" : "without"
    } milk`;
  });
};
