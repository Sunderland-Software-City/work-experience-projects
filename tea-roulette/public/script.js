import { spinWheel } from "./components/spinWheel.js";
import { addPerson } from "./components/addPerson.js";
import { removeAllPeople } from "./components/removeAllPeople.js";
import { removePerson } from "./components/removePerson.js";
import { updateNameWheel } from "./components/updateNameWheel.js";
import { updatePreferencesList } from "./components/updatePreferencesList.js";
import { showError } from "./components/showError.js";

export const teaPreferences = []; // Array to store preferences
export let isSpinning = false;
export let currentRotation = 0;
async function loadPreferences() {
  try {
    const response = await fetch("/api/preferences");
    teaPreferences = await response.json();
    updateNameWheel(); // Updates the visual representation of the wheel
    updatePreferencesList(); // Updates the preferences list displayed
  } catch (error) {
    console.error("Error loading preferences:", error);
    showError("Error loading preferences");
  }
}
const modal = new bootstrap.Modal(document.getElementById("addPersonModal"));
const addPersonBtn = document.getElementById("addPersonBtn");
const removeAllBtn = document.getElementById("removeAllBtn");

addPersonBtn.onclick = () => modal.show();

document.getElementById("addPersonForm").onsubmit = async (e) => {
  e.preventDefault();
  await addPerson(e, teaPreferences, isSpinning, currentRotation);
};

removeAllBtn.onclick = () => removeAllPeople(teaPreferences);

document
  .getElementById("preferencesList")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-person-btn")) {
      const personId = event.target.dataset.id;
      removePerson(personId, teaPreferences);
    }
  });

document.getElementById("spinBtn").onclick = () => spinWheel(teaPreferences);

// Call loadPreferences when the page loads
loadPreferences();
