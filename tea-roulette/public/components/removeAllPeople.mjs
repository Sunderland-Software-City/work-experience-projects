// removeAllPeople.mjs

export async function removeAllPeople(
  teaPreferences,
  isSpinning,
  updatePreferencesList,
  updateNameWheel,
  showError
) {
  if (isSpinning) return;

  if (!confirm("Are you sure you want to remove all people?")) return;

  try {
    const response = await fetch("/api/preferences/all", {
      method: "DELETE",
    });

    if (response.ok) {
      teaPreferences.length = 0; // Clear the teaPreferences array
      updateNameWheel(teaPreferences); // Pass teaPreferences here
      updatePreferencesList(); // Update preferences list
      document.getElementById("selectedPerson").textContent =
        "Nobody selected yet";
      document.getElementById("preferenceDisplay").textContent = "";
    } else {
      console.error("Error response:", response);
      showError("Error removing all people");
    }
  } catch (error) {
    console.error("Error removing all people:", error);
    showError("Error removing all people");
  }
}
