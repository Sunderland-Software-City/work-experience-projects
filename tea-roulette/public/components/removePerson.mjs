// removePerson.mjs
export async function removePerson(
  teaPreferences,
  id,
  isSpinning,
  updatePreferencesList,
  updateNameWheel,
  showError
) {
  if (isSpinning) return;

  try {
    const response = await fetch(`/api/preferences/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remove the person from the teaPreferences array directly
      teaPreferences.splice(id, 1); // Remove item at index 'id'

      updateNameWheel(teaPreferences); // Pass teaPreferences here
      updatePreferencesList(); // Refresh the preferences list

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
