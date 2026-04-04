document.addEventListener("DOMContentLoaded", function () {

  // LOGIN SYSTEM
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const role = document.getElementById("role").value;

      // Simple demo accounts
      if (role === "admin" && username === "admin" && password === "1234") {
        localStorage.setItem("role", "admin");
        window.location.href = "/dashboard.html";
      } 
      else if (role === "employee" && username === "user" && password === "1234") {
        localStorage.setItem("role", "employee");
        window.location.href = "/dashboard.html";
      } 
      else {
        alert("Invalid credentials");
      }
    });
  }

});

// DASHBOARD SYSTEM

let items = [];
let totalIncome = 0;

function addItem() {
  const name = document.getElementById("itemName").value;
  const price = Number(document.getElementById("itemPrice").value);

  if (!name || !price) {
    alert("Enter valid data");
    return;
  }

  items.push({ name, price });
  totalIncome += price;

  displayItems();
}

function displayItems() {
  const list = document.getElementById("itemList");
  list.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ${item.price} 
      <button onclick="removeItem(${index})">Remove</button>`;
    list.appendChild(li);
  });

  document.getElementById("income").innerText = totalIncome;
}

function removeItem(index) {
  totalIncome -= items[index].price;
  items.splice(index, 1);
  displayItems();
}

function logout() {
  localStorage.clear();
  window.location.href = "/login.html";
}