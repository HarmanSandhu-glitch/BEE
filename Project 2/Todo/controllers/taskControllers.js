import todoModel from "../models/todoModel.js";

async function getAllTodos(req, res) {
    try {
        const todos = await todoModel.find();
        // console.log("Fetching todos");
        // console.log(todos);
        res.render("tasks", { todos });
    } catch {
        res.status(404).send("Error fetching todos");
    }
}

async function getTodoById(req, res) {
    try {
        const todo = await todoModel.findById(req.params.id);
        res.render("task", { todo });
    } catch {
        res.status(404).send("Error fetching todo");
    }
}

async function createTodo(req, res) {
    try {
        console.log(req.body);
        console.log("Creating todo");
        const todo = await todoModel.create(req.body);
        res.status(201).send({ todo, message: "Todo created successfully" });
    } catch (err) {
        res.status(400).send({ message: "Error creating todo", error: err.message });
    }
}

export { getAllTodos, getTodoById, createTodo };