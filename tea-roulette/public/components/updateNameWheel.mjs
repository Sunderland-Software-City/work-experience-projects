// updateNameWheel.mjs
export function updateNameWheel(teaPreferences) {
  const wheel = document.getElementById("nameWheel");
  wheel.innerHTML = "";

  const sliceAngle = 360 / teaPreferences.length;

  teaPreferences.forEach((person, id) => {
    const slice = document.createElement("div");
    slice.className = "name-slice";

    slice.style.setProperty("--slice-id", id * sliceAngle);
    slice.textContent = person.name;
    wheel.appendChild(slice);
  });
}
