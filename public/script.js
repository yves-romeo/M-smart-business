if (window.location.pathname.includes('dashboard.html')) {
    const role = localStorage.getItem('role');

    if (!role) {
        window.location.href = 'login.html';
    }
}
// CHECK ROLE WHEN PAGE LOADS
window.onload = () => {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
        document.getElementById('adminSection').style.display = 'block';
        document.getElementById('employeeSection').style.display = 'none';
        viewAllItems();
    } else {
        loadItems();
    }
    loadCashflow();
};


// LOGIN
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
        localStorage.setItem('role', data.role);
        window.location.href = 'dashboard.html';
    } else {
        alert("Login failed");
    }
}

// ADD ITEM (Employee only)
async function addItem() {
    const name = document.getElementById('itemName').value;
    const quantity = document.getElementById('itemQty').value;

    await fetch('/add-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quantity })
    });

    loadItems();
}

// LOAD ITEMS (Employee)
async function loadItems() {
    const res = await fetch('/items');
    const items = await res.json();

    const list = document.getElementById('itemsList');
    list.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - ${item.quantity}`;

        // ADD DELETE BUTTON (SELL ITEM)
        const btn = document.createElement('button');
        btn.innerText = "Sold";
        btn.onclick = () => deleteItem(item.name);

        li.appendChild(btn);
        list.appendChild(li);
    });
}

// DELETE ITEM (simulate selling)
async function deleteItem(name) {
    await fetch('/delete-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });

    loadItems();
}

// ADMIN VIEW
async function viewAllItems() {
    const res = await fetch('/items');
    const items = await res.json();

    const list = document.getElementById('adminItemsList');
    list.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - ${item.quantity}`;
        list.appendChild(li);
    });
}async function addIncome() {
    const amount = Number(document.getElementById('incomeAmount').value);

    await fetch('/add-income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    });

    loadCashflow();
}

async function addExpense() {
    const amount = Number(document.getElementById('expenseAmount').value);

    await fetch('/add-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    });

    loadCashflow();
}

async function loadCashflow() {
    const res = await fetch('/cashflow');
    const data = await res.json();

    const profit = data.income - data.expenses;

    document.getElementById('cashflowDisplay').innerText =
        `Income: ${data.income} | Expenses: ${data.expenses} | Profit: ${profit}`;
}