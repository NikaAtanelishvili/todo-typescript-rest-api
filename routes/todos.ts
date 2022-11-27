import { Router } from "express";
const router = Router();

import { Todo } from "../models/todo";

const todos: Todo[] = [];

type RequestBody = { text: string };
type RequestParams = { todoId: string };

// Get all todos
router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

// Add todos
router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;

  const newTodo: Todo = {
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
});

// Replace todos
router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;

  const body = req.body as RequestBody;

  const todoIndex = todos.findIndex((t) => t.id === tid);

  if (!(todoIndex >= 0))
    return res.status(400).json({ message: "Could not find todo for this id" });

  todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };

  return res.status(200).json({ message: "Updated todo", todo: todos });
});

// Deleting todos
router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;

  const todoIndex = todos.findIndex((t) => t.id === tid);

  if (!(todoIndex >= 0))
    return res.status(400).json({ message: "Could not find todo for this id" });

  todos.splice(todoIndex, 1);

  return res.status(200).json({ message: "Todo was deleted!", todos: todos });
});

export default router;
