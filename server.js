const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let data = {
    cashflow: [
        {income: 0},
        {expenses: 0}
    ],
    items: [],
    users: [
        { username: "admin", password: "123", role: "admin" },
        { username: "employee", password: "123", role: "employee" }
    ]
};

// LOGIN
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = data.users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, role: user.role });
    } else {
        res.json({ success: false });
    }
});

// ADD ITEM
app.post('/add-item', (req, res) => {
    data.items.push(req.body);
    res.json({ success: true });
});

// GET ITEMS
app.get('/items', (req, res) => {
    res.json(data.items);
});

// DELETE ITEM
app.post('/delete-item', (req, res) => {
    data.items = data.items.filter(item => item.name !== req.body.name);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});// ADD INCOME
app.post('/add-income', (req, res) => {
    data.cashflow.income += req.body.amount;
    res.json({ success: true });
});

// ADD EXPENSE
app.post('/add-expense', (req, res) => {
    data.cashflow.expenses += req.body.amount;
    res.json({ success: true });
});

// GET CASHFLOW
app.get('/cashflow', (req, res) => {
    res.json(data.cashflow);
});