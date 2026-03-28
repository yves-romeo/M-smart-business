export default function handler(req, res) {

    if (!global.data) {
        global.data = {
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
    }

    const data = global.data;

    const { url, method } = req;

    // LOGIN
    if (url.endsWith("/login") && method === "POST") {
        const { username, password } = req.body;
        const user = data.users.find(u => u.username === username && u.password === password);

        if (user) return res.json({ success: true, role: user.role });
        return res.json({ success: false });
    }

    // ITEMS
    if (url.endsWith("/items") && method === "GET") {
        return res.json(data.items);
    }

    if (url.endsWith("/add-item") && method === "POST") {
        data.items.push(req.body);
        return res.json({ success: true });
    }

    if (url.endsWith("/delete-item") && method === "POST") {
        data.items = data.items.filter(item => item.name !== req.body.name);
        return res.json({ success: true });
    }

    // CASHFLOW
    if (url.endsWith("/cashflow") && method === "GET") {
        return res.json(data.cashflow);
    }

    if (url.endsWith("/add-income") && method === "POST") {
        data.cashflow.income += req.body.amount;
        return res.json({ success: true });
    }

    if (url.endsWith("/add-expense") && method === "POST") {
        data.cashflow.expenses += req.body.amount;
        return res.json({ success: true });
    }

    res.status(404).send("Not found");
}