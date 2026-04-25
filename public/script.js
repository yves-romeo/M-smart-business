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
// Sales & Orders System
let totalOrders = 0;
let totalSales = 0;
let cashSales = 0;
let mobileSales = 0;

const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const product = document.getElementById("product").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const payment = document.getElementById("payment").value;

    const pricePerItem = 1000; // Example price (RWF)
    const orderTotal = quantity * pricePerItem;

    totalOrders++;
    totalSales += orderTotal;

    if (payment === "cash") {
      cashSales += orderTotal;
    } else {
      mobileSales += orderTotal;
    }

    // Update summary
    document.getElementById("totalOrders").textContent = totalOrders;
    document.getElementById("totalSales").textContent = totalSales;
    document.getElementById("cashSales").textContent = cashSales;
    document.getElementById("mobileSales").textContent = mobileSales;

    // Show receipt
    const receiptDetails = `Product: ${product}, Quantity: ${quantity}, Total: RWF ${orderTotal}, Payment: ${payment}`;
    document.getElementById("receiptDetails").textContent = receiptDetails;
    document.getElementById("receipt").style.display = "block";

    // Reset form
    orderForm.reset();
  });
}
// Inventory Management
let inventory = {};

const stockForm = document.getElementById("stockForm");
if (stockForm) {
  stockForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const item = document.getElementById("item").value;
    const qty = parseInt(document.getElementById("stockQty").value);

    if (!inventory[item]) {
      inventory[item] = 0;
    }
    inventory[item] += qty;

    updateInventoryList();
    stockForm.reset();
  });
}

function updateInventoryList() {
  const stockItems = document.getElementById("stockItems");
  stockItems.innerHTML = "";
  for (const [item, qty] of Object.entries(inventory)) {
    const li = document.createElement("li");
    li.textContent = `${item}: ${qty}`;
    if (qty <= 5) {
      li.style.color = "red"; // Low stock alert
    }
    stockItems.appendChild(li);
  }
}

// Connect Sales System with Inventory
const orderForm2 = document.getElementById("orderForm");
if (orderForm2) {
  orderForm2.addEventListener("submit", function(e) {
    const product = document.getElementById("product").value;
    const quantity = parseInt(document.getElementById("quantity").value);

    if (inventory[product]) {
      inventory[product] -= quantity;
      if (inventory[product] < 0) inventory[product] = 0;
      updateInventoryList();
    }
  });
}
// Customer Management
let customers = [];

const customerForm = document.getElementById("customerForm");
if (customerForm) {
  customerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("custName").value;
    const phone = document.getElementById("custPhone").value;

    // Check if customer already exists
    let existing = customers.find(c => c.phone === phone);
    if (existing) {
      existing.loyaltyPoints += 1; // Add loyalty point
    } else {
      customers.push({ name, phone, loyaltyPoints: 1 });
    }

    updateCustomerList();
    customerForm.reset();
  });
}

function updateCustomerList() {
  const list = document.getElementById("customers");
  list.innerHTML = "";
  customers.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.name} (${c.phone}) - Loyalty Points: ${c.loyaltyPoints}`;
    list.appendChild(li);
  });
}
// Tasks Management
let tasks = [];

const taskForm = document.getElementById("taskForm");
if (taskForm) {
  taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("taskName").value;
    const due = document.getElementById("taskDue").value;

    tasks.push({ name, due, completed: false });
    updateTaskList();
    taskForm.reset();
  });
}

function updateTaskList() {
  const list = document.getElementById("tasks");
  list.innerHTML = "";
  tasks.forEach((t, index) => {
    const li = document.createElement("li");
    li.className = t.completed ? "completed" : "";
    li.innerHTML = `${t.name} (Due: ${t.due}) 
      <button onclick="toggleTask(${index})">${t.completed ? "Undo" : "Complete"}</button>
      <button onclick="deleteTask(${index})">Delete</button>`;
    list.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
}
// Sidebar navigation
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
}
