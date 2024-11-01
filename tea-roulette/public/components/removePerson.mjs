// removePerson.mjs
export async function removePerson(
  teaPreferences,
  id,
  isSpinning,
  updatePreferencesList,
  updateNameWheel,
  showError
) {
  //  Exit the function if the wheel is currently spinning
  if (isSpinning) return;

  try {
    // TODO: Send a DELETE request to the server to remove the person by their ID

    if (response.ok) {
      // TODO: Remove the person from the local teaPreferences array using splice,  Remove item at index 'id'

      //  Update the name wheel UI to reflect the current preferences
      updateNameWheel(teaPreferences);

      //  Refresh the displayed preferences list in the UI
      updatePreferencesList();

      // TODO: Check if there are no preferences left and update the display accordingly
      if (teaPreferences.length === 0) {
        // selectedPerson = "Nobody selected yet";
        //preferenceDisplay = "";
      }
    } else {
      // TODO: Log the error response and show an error message if the removal fails
    }
  } catch (error) {
    // TODO: Log the error and display an error message if the fetch request fails
  }
}
