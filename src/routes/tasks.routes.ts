import { Router } from "express";
import { getAllTasks, getTaskById } from "../controllers/tasks.controller.js";

export const tasksRouter = Router();

tasksRouter.get("/", getAllTasks);
tasksRouter.get("/:id", getTaskById);