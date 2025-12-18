const express = require("express");
const app = express();

// Middleware to read JSON body
app.use(express.json());

// In-memory todos array
let todos = [];
let id = 1;

// ======================
// GET all todos
// ======================
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

// ======================
// GET single todo by id
// ======================
app.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});

// ======================
// POST create new todo
// Validation: task required
// ======================
app.post("/todos", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task field is required" });
  }

  const newTodo = {
    id: id++,
    task,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// ======================
// PUT update todo
// ======================
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.task = req.body.task ?? todo.task;
  todo.completed = req.body.completed ?? todo.completed;

  res.json(todo);
});

// ======================
// DELETE todo
// ======================
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos.splice(index, 1);
  res.json({ message: "Todo deleted successfully" });
});

// ======================
// BONUS: GET active todos
// ======================
app.get("/todos/active", (req, res) => {
  const activeTodos = todos.filter(t => !t.completed);
  res.json(activeTodos);
});

// ======================
// Start server
// ======================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

