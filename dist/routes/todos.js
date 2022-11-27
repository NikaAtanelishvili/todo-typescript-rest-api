"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todo_1 = require("../controllers/todo");
// Get all todos
router.get("/", todo_1.getTodos);
// Add todos
router.post("/todo", todo_1.addTodo);
// Replace todos
router.put("/todo/:todoId", todo_1.updatedTodo);
// Deleting todos
router.delete("/todo/:todoId", todo_1.deleteTodo);
exports.default = router;
