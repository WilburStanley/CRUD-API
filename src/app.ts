import express from "express";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { tasksRouter } from "./routes/tasks.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const openApiSpec = JSON.parse(readFileSync(join(__dirname, "openapi.json"), "utf-8"));

export const app = express();

app.use(express.json());
app.disable("x-powered-by");

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

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use("/tasks", tasksRouter);

app.use(errorHandler);