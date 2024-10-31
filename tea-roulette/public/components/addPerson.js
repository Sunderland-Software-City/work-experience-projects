import { updateNameWheel } from "./updateNameWheel.js";
import { updatePreferencesList } from "./updatePreferencesList.js";
import { showError } from "./showError.js";

export async function addPerson(e, teaPreferences) {
  const newPerson = {
    id: Date.now().toString(),
    name: document.getElementById("nameInput").value,
    sugar: parseInt(document.getElementById("sugarInput").value),
    milk: document.getElementById("milkInput").checked,
  };

  try {
    const response = await fetch("/api/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPerson),
    });

    if (response.ok) {
      const updatedPreferences = await response.json();
      teaPreferences.length = 0;
      teaPreferences.push(...updatedPreferences);
      updateNameWheel();
      updatePreferencesList();
      document.getElementById("addPersonForm").reset();
    } else {
      showError("Error adding person");
    }
  } catch (error) {
    showError("Error adding person");
    console.error(error);
  }
}
