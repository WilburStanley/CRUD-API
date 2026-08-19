import type { Request, Response } from "express";
import { tasks } from "../data/tasks.store.js";
import { AppError } from "../middleware/error-handler.js";
import type { CreateTaskInput } from "../schemas/task.schema.js";

export const getAllTasks = (request: Request, response: Response) => {
  response.json(tasks);
};

export const getTaskById = (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    throw new AppError(404, `Task ${id} not found`);
  }

  response.json(task);
};

export const createTask = (request: Request, response: Response) => {
  const { title } = request.body as CreateTaskInput;

  const nextId = tasks.length > 0 ? Math.max(...tasks.map((item) => item.id)) + 1 : 1;
  const newTask = { id: nextId, title, done: false };

  tasks.push(newTask);
  response.status(201).json(newTask);
};