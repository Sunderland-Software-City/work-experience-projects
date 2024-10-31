// Function to show error messages as Bootstrap toasts
export function showError(message) {
  const toastContainer = document.createElement("div"); // Create a new div for the toast container
  toastContainer.className =
    "toast-container position-fixed bottom-0 end-0 p-3"; // Set class names for positioning and styling
  toastContainer.innerHTML = `
          <div class="toast align-items-center text-white bg-danger border-0" role="alert"> <!-- Toast element -->
              <div class="d-flex"> <!-- Flex container for alignment -->
                  <div class="toast-body"> <!-- Toast body -->
                      ${message} <!-- Display the error message -->
                  </div>
                  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button> <!-- Button to close the toast -->
              </div>
          </div>
      `;
  document.body.appendChild(toastContainer); // Add the toast container to the body

  const toast = new bootstrap.Toast(toastContainer.querySelector(".toast")); // Initialize Bootstrap toast
  toast.show(); // Show the toast

  toastContainer.addEventListener("hidden.bs.toast", () => {
    // Add an event listener to remove the toast after hiding
    toastContainer.remove(); // Remove the toast container from the DOM
  });
}
