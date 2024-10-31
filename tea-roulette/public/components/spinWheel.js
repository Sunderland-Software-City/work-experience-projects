import { showError } from "./showError.js"; // Import error handling (if needed)

// Variable to track if the wheel is currently spinning
let isSpinning = false;

export function spinWheel() {
  if (isSpinning || teaPreferences.length === 0) return; // Prevent spinning if already spinning or no preferences

  isSpinning = true; // Set spinning state to true
  const wheel = document.getElementById("nameWheel"); // Get the wheel element
  const sliceAngle = 360 / teaPreferences.length; // Calculate angle for each slice

  // Get random winner
  const randomId = Math.floor(Math.random() * teaPreferences.length); // Generate random index for a winner

  // Reset the wheel's position
  wheel.style.transition = "none"; // Disable transition
  wheel.style.transform = "rotate(0deg)"; // Reset rotation

  // Force a reflow
  void wheel.offsetHeight; // Trigger a reflow to apply the reset

  // Calculate spin parameters
  const spinRotations = 6; // Number of full rotations
  const baseRotation = spinRotations * 360; // Total degrees for full rotations
  const targetSlicePosition = -1 * (randomId * sliceAngle) + 90; // Target position for winner
  const finalRotation = baseRotation + targetSlicePosition; // Final rotation angle

  // Start the spin with the CSS transition
  requestAnimationFrame(() => {
    wheel.style.transition = ""; // Restore CSS transition
    wheel.style.transform = `rotate(${finalRotation}deg)`; // Set final rotation
  });

  setTimeout(() => {
    isSpinning = false; // Reset spinning state
    const winner = teaPreferences[randomId]; // Get the winner
    displayWinner(winner); // Function to display the winner
  }, 3000); // Wait 3 seconds before showing winner
}

// Function to display the winner's name and preferences
function displayWinner(winner) {
  document.getElementById("selectedPerson").textContent = winner.name; // Display the winner's name
  document.getElementById("preferenceDisplay").textContent = `Preferences: ${
    winner.sugar
  } sugar${winner.sugar !== 1 ? "s" : ""}, ${
    winner.milk ? "with" : "without"
  } milk`; // Display preferences
}
