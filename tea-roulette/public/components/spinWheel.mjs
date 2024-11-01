// spinWheel.mjs
export function spinWheel(teaPreferences, wheel, setSelectedPerson) {
  const sliceAngle = 360 / teaPreferences.length;
  const randomId = Math.floor(Math.random() * teaPreferences.length);

  // Reset the wheel's position first
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";

  // Force a reflow
  void wheel.offsetHeight;

  // Calculate spin parameters
  const spinRotations = 6;
  const baseRotation = spinRotations * 360;
  const targetSlicePosition = -1 * (randomId * sliceAngle) + 90;
  const finalRotation = baseRotation + targetSlicePosition;

  // Start the spin with the CSS transition
  requestAnimationFrame(() => {
    wheel.style.transition = ""; // Restore the CSS transition
    wheel.style.transform = `rotate(${finalRotation}deg)`;
  });

  setTimeout(() => {
    const winner = teaPreferences[randomId];
    setSelectedPerson(winner);
  }, 3000);
}
