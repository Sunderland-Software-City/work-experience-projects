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
    // Send a POST request to the server to add a new person with their preferences
    const response = await fetch("/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });

    // TODO: Check if the response is successful

    // TODO: If successful, add the new person to the teaPreferences array

    // TODO: Update the name wheel and the preferences list in the UI

    updatePreferencesList(teaPreferences); // Pass the updated preferences to refresh the UI

    // TODO: Hide the modal and reset the add person form

    document.getElementById("addPersonForm").reset();

    // TODO: If there is an error in the response, log it and show an error message
  } catch (error) {
    // TODO: Catch any errors during the fetch request and display an error message
  }
}
