import express from "express";
import { tasksRouter } from "./routes/tasks.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

export const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (request, response) => {
  response.json({ status: "ok" });
});

app.use("/tasks", tasksRouter);

app.use(errorHandler);