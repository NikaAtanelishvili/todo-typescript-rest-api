"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updatedTodo = exports.addTodo = exports.getTodos = void 0;
const todos = [];
// Get todos =======================================================================
const getTodos = (req, res, next) => {
    res.status(200).json({ todos: todos });
};
exports.getTodos = getTodos;
// Add Todo ========================================================================
// Adding todo
const addTodo = (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({
        message: "Added Todo",
        text: body.text,
        todo: newTodo,
        todos: todos,
    });
};
exports.addTodo = addTodo;
// Update Todo =====================================================================
const updatedTodo = (req, res, next) => {
    const params = req.params;
    const tid = params.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex((t) => t.id === tid);
    if (!(todoIndex >= 0))
        return res.status(400).json({ message: "Could not find todo for this id" });
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: "Updated todo", todo: todos });
};
exports.updatedTodo = updatedTodo;
// Delete Todo ======================================================================
const deleteTodo = (req, res, next) => {
    const params = req.params;
    const tid = params.todoId;
    const todoIndex = todos.findIndex((t) => t.id === tid);
    if (!(todoIndex >= 0))
        return res.status(400).json({ message: "Could not find todo for this id" });
    todos.splice(todoIndex, 1);
    return res.status(200).json({ message: "Todo was deleted!", todos: todos });
};
exports.deleteTodo = deleteTodo;
