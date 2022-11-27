import { Todo } from "../models/todo";

const todos: Todo[] = [];

type RequestBody = { text: string };
type RequestParams = { todoId: string };

// Get todos =======================================================================

export const getTodos = (req: any, res: any, next: any) => {
  res.status(200).json({ todos: todos });
};

// Add Todo ========================================================================

// Adding todo
export const addTodo = (req: any, res: any, next: any) => {
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
};

// Update Todo =====================================================================

export const updatedTodo = (req: any, res: any, next: any) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;

  const body = req.body as RequestBody;

  const todoIndex = todos.findIndex((t) => t.id === tid);

  if (!(todoIndex >= 0))
    return res.status(400).json({ message: "Could not find todo for this id" });

  todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };

  return res.status(200).json({ message: "Updated todo", todo: todos });
};

// Delete Todo ======================================================================

export const deleteTodo = (req: any, res: any, next: any) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;

  const todoIndex = todos.findIndex((t) => t.id === tid);

  if (!(todoIndex >= 0))
    return res.status(400).json({ message: "Could not find todo for this id" });

  todos.splice(todoIndex, 1);

  return res.status(200).json({ message: "Todo was deleted!", todos: todos });
};
