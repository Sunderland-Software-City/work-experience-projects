// loadPreferences.mjs
export async function loadPreferences(
  teaPreferences,
  showError,
  updatePreferencesList
) {
  try {
    const response = await fetch("/api/preferences");
    if (!response.ok) {
      throw new Error("Failed to load preferences");
    }

    const data = await response.json();
    teaPreferences.splice(0, teaPreferences.length, ...data); // Clear existing array and add new data

    updatePreferencesList(teaPreferences); // Call to update preferences list
  } catch (error) {
    console.error("Error loading preferences:", error);
    showError("Error loading preferences");
  }
}
