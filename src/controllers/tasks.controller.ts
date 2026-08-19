import { response, type Request, type Response } from "express";
import { tasks } from "../data/tasks.store.js";
import { AppError } from "../middleware/error-handler.js";
import type { CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema.js";

export const getAllTasks = (request: Request, response: Response) => {
  response.json(tasks);
};

const requireTaskById = (request: Request) => {
  const id = Number(request.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    throw new AppError(404, `Task ${id} not found`);
  }

  return task;
};

export const getTaskById = (request: Request, response: Response) => {
  const task = requireTaskById(request);

  response.json(task);
};

export const createTask = (request: Request, response: Response) => {
  const { title } = request.body as CreateTaskInput;

  const nextId = tasks.length > 0 ? Math.max(...tasks.map((item) => item.id)) + 1 : 1;
  const newTask = { id: nextId, title, done: false };

  tasks.push(newTask);
  response.status(201).json(newTask);
};

export const updateTask = (request: Request, response: Response) => {
  const task = requireTaskById(request);

  const { title, done } = request.body as UpdateTaskInput;

  if (title !== undefined) {
    task.title = title;
  }

  if (done !== undefined) {
    task.done = done;
  }

  response.json(task);
};

export const deleteTask = (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new AppError(404, `Task ${id} not found`);
  }

  tasks.splice(index, 1);
  response.status(204).send();
};