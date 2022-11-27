"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
// Get all todos
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
// Add todos
router.post("/post", (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added Todo", todo: newTodo, todos: todos });
});
// Replace todos
router.put("/todo/:todoId", (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((t) => t.id === tid);
    if (!(todoIndex >= 0))
        return res.status(400).json({ message: "Could not find todo for this id" });
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    return res.status(200).json({ message: "Updated todo", todo: todos });
});
// Deleting todos
router.delete("/todo/:todoId", (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((t) => t.id === tid);
    if (!(todoIndex >= 0))
        return res.status(400).json({ message: "Could not find todo for this id" });
    todos.splice(todoIndex, 1);
    return res.status(200).json({ message: "Todo was deleted!", todos: todos });
});
exports.default = router;
