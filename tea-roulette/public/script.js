let teaPreferences = []; // Array to store the tea preferences
let isSpinning = false; // Boolean to check if the wheel is spinning
let currentRotation = 0; // Current rotation angle for the wheel

// Function to load preferences from the server
async function loadPreferences() {
  try {
    const response = await fetch("/api/preferences");
    teaPreferences = await response.json();
    updateNameWheel(); // Updates the visual representation of the wheel
    updatePreferencesList(); // Updates the preferences list displayed
  } catch (error) {
    console.error("Error loading preferences:", error);
    showError("Error loading preferences");
  }
}

// Function to update the preferences list displayed in the DOM
function updatePreferencesList() {
  const list = document.getElementById("preferencesList");
  list.innerHTML = "";

  teaPreferences.forEach((pref, id) => {
    const item = document.createElement("div");
    item.className =
      "list-group-item list-group-item-action preference-item d-flex justify-content-between align-items-center";
    item.innerHTML = `
        <span>${pref.name}: ${pref.sugar} sugar, ${
      pref.milk ? "with" : "without"
    } milk</span>
        <button class="btn btn-danger btn-sm" onclick="removePerson(${id})">
          <i class="bi bi-x-lg"></i>
        </button>
      `;
    list.appendChild(item); // Adds item to the list in the DOM
  });
}

// Function to remove a specific person based on id
async function removePerson(id) {
  if (isSpinning) return;

  try {
    const response = await fetch(`/api/preferences/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      teaPreferences = await response.json();
      updateNameWheel(); // Refreshes the wheel display after deletion
      updatePreferencesList();

      if (teaPreferences.length === 0) {
        document.getElementById("selectedPerson").textContent =
          "Nobody selected yet";
        document.getElementById("preferenceDisplay").textContent = "";
      }
    } else {
      console.error("Error response:", response);
      showError("Error removing person");
    }
  } catch (error) {
    console.error("Error removing person:", error);
    showError("Error removing person");
  }
}

// Function to remove all people from the preferences list
async function removeAllPeople() {
  if (isSpinning) return;

  if (!confirm("Are you sure you want to remove all people?")) return;

  try {
    const response = await fetch("/api/preferences/all", {
      method: "DELETE",
    });

    if (response.ok) {
      teaPreferences = [];
      updateNameWheel(); // Clears the wheel display
      updatePreferencesList();
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

// Function to update the wheel display with names and slices
function updateNameWheel() {
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

// Initialize Bootstrap modal and button event listeners
const modal = new bootstrap.Modal(document.getElementById("addPersonModal"));
const addPersonBtn = document.getElementById("addPersonBtn");
const removeAllBtn = document.getElementById("removeAllBtn");

addPersonBtn.onclick = () => modal.show();
removeAllBtn.onclick = removeAllPeople;

// Function to handle adding a new person through the form
document.getElementById("addPersonForm").onsubmit = async (e) => {
  e.preventDefault();

  const newPerson = {
    id: Date.now().toString(),
    name: document.getElementById("nameInput").value,
    sugar: parseInt(document.getElementById("sugarInput").value),
    milk: document.getElementById("milkInput").checked,
  };

  try {
    const response = await fetch("/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });

    if (response.ok) {
      teaPreferences = await response.json();
      updateNameWheel();
      updatePreferencesList();
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
};

document.getElementById("spinBtn").onclick = () => {
  if (isSpinning || teaPreferences.length === 0) return;

  isSpinning = true;
  const wheel = document.getElementById("nameWheel");
  const sliceAngle = 360 / teaPreferences.length;

  // Get random winner
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
    isSpinning = false;
    const winner = teaPreferences[randomId];
    document.getElementById("selectedPerson").textContent = winner.name;
    document.getElementById("preferenceDisplay").textContent = `Preferences: ${
      winner.sugar
    } sugar${winner.sugar !== 1 ? "s" : ""}, ${
      winner.milk ? "with" : "without"
    } milk`;
  }, 3000);
};

// Function to show error messages as Bootstrap toasts
function showError(message) {
  const toastContainer = document.createElement("div");
  toastContainer.className =
    "toast-container position-fixed bottom-0 end-0 p-3";
  toastContainer.innerHTML = `
        <div class="toast align-items-center text-white bg-danger border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
  document.body.appendChild(toastContainer);

  const toast = new bootstrap.Toast(toastContainer.querySelector(".toast"));
  toast.show();

  toastContainer.addEventListener("hidden.bs.toast", () => {
    toastContainer.remove();
  });
}

// Initial load of preferences on page load
loadPreferences();
