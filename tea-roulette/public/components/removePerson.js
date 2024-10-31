import { updateNameWheel } from "./updateNameWheel.js";
import { updatePreferencesList } from "./updatePreferencesList.js";
import { showError } from "./showError.js";

export async function removePerson(id, teaPreferences) {
  if (isSpinning) return;

  try {
    const response = await fetch(`/api/preferences/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedPreferences = await response.json();
      teaPreferences.length = 0;
      teaPreferences.push(...updatedPreferences);
      updateNameWheel();
      updatePreferencesList();

      if (teaPreferences.length === 0) {
        document.getElementById("selectedPerson").textContent =
          "Nobody selected yet";
        document.getElementById("preferenceDisplay").textContent = "";
      }
    } else {
      console.error("Error response:", response);
      showError("Error removing person");
    }
  } catch (error) {
    console.error("Error removing person:", error);
    showError("Error removing person");
  }
}
