const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

let users = [];

app.get("/timestamp", (req, res) => {
    let timestamp = {
        Timestamp: new Date().toISOString(),
        IPAddress: req.ip,
        URL: req.url,
        Protocol: req.protocol,
        Method: req.method,
        HostName: req.hostname,
    }
    fs.appendFileSync("./requestLog.json", JSON.stringify(timestamp) + "\n");
    res.send({ message: "Timestamp", timestamp });
})

app.get("/users", (req, res) => {
    res.json({ message: "List of all users", users });
})

app.post("/users", (req, res) => {
    const user = req.body;
    users.push(user);
    res.json({ message: "User added successfully", user });
})

app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users[i] = user;
            return res.json({ message: "User updated successfully", user });
        }
    }
    res.json({ message: "User not found" });
})

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    users = users.filter(user => user.id != id);
    res.json({ message: "User not found" });
})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})