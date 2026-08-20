import type { Request, Response } from "express";
import { db, seedTasks } from "../data/db.js";
import { AppError } from "../middleware/error-handler.js";
import type { CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema.js";

interface TaskRow {
  id: number;
  title: string;
  done: number;
}

const toTask = (row: TaskRow) => ({
  id: row.id,
  title: row.title,
  done: Boolean(row.done),
});

const requireTaskById = (id: number) => {
  const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as TaskRow | undefined;

  if (!row) {
    throw new AppError(404, `Task ${id} not found`);
  }

  return row;
};

export const getAllTasks = (request: Request, response: Response) => {
  const rows = db.prepare("SELECT * FROM tasks").all() as TaskRow[];
  response.json(rows.map(toTask));
};

export const getTaskById = (request: Request, response: Response) => {
  const row = requireTaskById(Number(request.params.id));
  response.json(toTask(row));
};

export const createTask = (request: Request, response: Response) => {
  const { title } = request.body as CreateTaskInput;

  const result = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)").run(title, 0);
  const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(result.lastInsertRowid) as TaskRow;

  response.status(201).json(toTask(row));
};

export const updateTask = (request: Request, response: Response) => {
  const id = Number(request.params.id);
  const existing = requireTaskById(id);

  const { title, done } = request.body as UpdateTaskInput;

  const nextTitle = title !== undefined ? title : existing.title;
  const nextDone = done !== undefined ? Number(done) : existing.done;

  db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?").run(nextTitle, nextDone, id);
  const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as TaskRow;

  response.json(toTask(row));
};

export const deleteTask = (request: Request, response: Response) => {
  const id = Number(request.params.id);
  requireTaskById(id);

  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  response.status(204).send();
};

export const resetTasks = (request: Request, response: Response) => {
  db.prepare("DELETE FROM tasks").run();

  const insertTask = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");
  const reseed = db.transaction((tasks: { title: string; done: number }[]) => {
    for (const task of tasks) {
      insertTask.run(task.title, task.done);
    }
  });
  reseed(seedTasks);

  const rows = db.prepare("SELECT * FROM tasks").all() as TaskRow[];
  response.json(rows.map(toTask));
};