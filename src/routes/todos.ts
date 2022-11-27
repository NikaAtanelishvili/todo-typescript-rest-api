import { Router } from "express";
const router = Router();

import {
  getTodos,
  addTodo,
  updatedTodo,
  deleteTodo,
} from "../controllers/todo";

// Get all todos
router.get("/", getTodos);

// Add todos
router.post("/todo", addTodo);

// Replace todos
router.put("/todo/:todoId", updatedTodo);

// Deleting todos
router.delete("/todo/:todoId", deleteTodo);

export default router;
