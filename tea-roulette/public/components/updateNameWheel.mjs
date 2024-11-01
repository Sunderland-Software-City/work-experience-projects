// updateNameWheel.mjs
export function updateNameWheel(teaPreferences) {
  // TODO: Get the wheel element from the DOM where the names will be displayed "nameWheel"

  // TODO: Clear the current contents of the wheel to prepare for updates

  // TODO: Calculate the angle for each slice of the wheel based on the number of preferences

  // TODO: Iterate over each person in the teaPreferences array to create name slices
  teaPreferences.forEach((person, id) => {
    // TODO: Create a new div element for each slice representing a name

    //Assign a class to the slice for styling purposes
    slice.className = "name-slice";

    // Set the rotation angle for this slice using a CSS custom property
    slice.style.setProperty("--slice-id", id * sliceAngle);
    // TODO: Set the text content of the slice to the person's name

    // TODO: Append the slice to the wheel element to display it
  });
}
