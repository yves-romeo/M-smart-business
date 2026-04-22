const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;
    const errorMessage = document.getElementById("error-message");

    // Clear old message
    errorMessage.textContent = "";

    if (!username) {
      errorMessage.textContent = "Username is required.";
    } else if (!password) {
      errorMessage.textContent = "Password is required.";
    } else if (!role) {
      errorMessage.textContent = "Role must be selected.";
    } else if (role === "admin" && username === "admin" && password === "1234") {
      localStorage.setItem("role", "admin");
      window.location.href = "/dashboard.html";
    } else if (role === "employee" && username === "employee" && password === "1234") {
      localStorage.setItem("role", "employee");
      window.location.href = "/dashboard.html";
    } else {
      // Specific error checks
      if (role !== "admin" && role !== "employee") {
        errorMessage.textContent = "Invalid role selected.";
      } else if ((role === "admin" && username !== "admin") || (role === "employee" && username !== "employee")) {
        errorMessage.textContent = "Incorrect username for selected role.";
      } else {
        errorMessage.textContent = "Incorrect password.";
      }
    }
  });
}