let data = {
    items: [],
    users: [
        { username: "admin", password: "123", role: "admin" },
        { username: "employee", password: "123", role: "employee" }
    ],
    cashflow: {
        income: 0,
        expenses: 0
    }
};

export default function handler(req, res) {

    // LOGIN
    if (req.url === "/api/login" && req.method === "POST") {
        const { username, password } = req.body;
        const user = data.users.find(u => u.username === username && u.password === password);

        if (user) return res.json({ success: true, role: user.role });
        return res.json({ success: false });
    }

    // GET ITEMS
    if (req.url === "/api/items" && req.method === "GET") {
        return res.json(data.items);
    }

    // ADD ITEM
    if (req.url === "/api/add-item" && req.method === "POST") {
        data.items.push(req.body);
        return res.json({ success: true });
    }

    // DELETE ITEM
    if (req.url === "/api/delete-item" && req.method === "POST") {
        data.items = data.items.filter(item => item.name !== req.body.name);
        return res.json({ success: true });
    }

    // CASHFLOW
    if (req.url === "/api/cashflow" && req.method === "GET") {
        return res.json(data.cashflow);
    }

    if (req.url === "/api/add-income" && req.method === "POST") {
        data.cashflow.income += req.body.amount;
        return res.json({ success: true });
    }

    if (req.url === "/api/add-expense" && req.method === "POST") {
        data.cashflow.expenses += req.body.amount;
        return res.json({ success: true });
    }

    res.status(404).send("Not found");
}