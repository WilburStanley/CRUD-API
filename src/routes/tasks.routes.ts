import { Router } from "express";
import { getAllTasks, getTaskById, createTask } from "../controllers/tasks.controller.js";
import { validateBody } from "../middleware/validate.js";
import { createTaskSchema } from "../schemas/task.schema.js";

export const tasksRouter = Router();

tasksRouter.get("/", getAllTasks);
tasksRouter.get("/:id", getTaskById);
tasksRouter.post("/", validateBody(createTaskSchema), createTask);