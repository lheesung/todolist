const express = require("express");
const app = express();
const cors = require("cors");
const todoController = require("./controllers/todoController");

app.use(express.json());
app.listen(3030);
app.use(cors());

app.post("/api/todo", todoController.createTodo);
app.get("/api/todo", todoController.getTodos);
app.put("/api/todo", todoController.updateTodo);
app.delete("/api/todo", todoController.deleteTodo);
// app.patch("/api/todo", todoController.initId);
