// addPerson.mjs
export async function addPerson(
  teaPreferences,
  newPerson,
  modal,
  updatePreferencesList,
  updateNameWheel,
  showError
) {
  try {
    const response = await fetch("/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });

    if (response.ok) {
      // Add new person to the local array
      teaPreferences.push(newPerson);
      updateNameWheel(teaPreferences);
      updatePreferencesList(teaPreferences); // Pass the teaPreferences to update the UI
      modal.hide();
      document.getElementById("addPersonForm").reset();
    } else {
      console.error("Error response:", response);
      showError("Error adding person");
    }
  } catch (error) {
    console.error("Error adding person:", error);
    showError("Error adding person");
  }
}
