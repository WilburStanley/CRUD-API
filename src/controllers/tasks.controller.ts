import type { Request, Response } from "express";
import { tasks } from "../data/tasks.store.js";

export const getAllTasks = (req: Request, res: Response) => {
  res.json(tasks);
}

export const getTaskById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({
      error: `Task ${id} not found`,
    });
  }

  res.json(task);
}