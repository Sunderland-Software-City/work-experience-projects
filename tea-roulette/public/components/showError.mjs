// showError.mjs
export function showError(message) {
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
