// removeAllPeople.mjs

export async function removeAllPeople(
  teaPreferences,
  isSpinning,
  updatePreferencesList,
  updateNameWheel,
  showError
) {
  // Exit the function if the wheel is spinning
  if (isSpinning) return;

  // Confirm if the user really wants to remove all preferences
  if (!confirm("Are you sure you want to remove all people?")) return;

  try {
    // TODO: Send a DELETE request to remove all preferences on the server

    if (response.ok) {
      // TODO: Clear the local teaPreferences array
      // TODO: Update the name wheel UI to reflect empty preferences
      // TODO: Update the preferences list in the UI
      // TODO: Reset the display elements for the selected person and their preferences
    } else {
      // TODO: Log error and show error message if response is unsuccessful
    }
  } catch (error) {
    // TODO: Log error and display error message if the fetch request fails
  }
}
