// script.js

document.getElementById("loginBtn").addEventListener("click", function() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (username === "" || password === "") {
    alert("Please fill in all fields");
    return;
  }

  // Simple example check
  if (username === "admin" && password === "1234") {
    alert("Login successful!");
    window.location.href = "dashboard.html"; // redirect to another page
  } else {
    alert("Invalid credentials");
  }
});