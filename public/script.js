const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (role === "admin" && username === "admin" && password === "1234") {
      localStorage.setItem("role", "admin");
      window.location.href = "/dashboard.html";
    } else if (role === "employee" && username === "employee" && password === "1234") {
      localStorage.setItem("role", "employee");
      window.location.href = "/dashboard.html";
    } else {
      alert("Invalid credentials or role");
    }
  });
}