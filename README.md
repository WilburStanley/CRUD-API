# Task API

A simple CRUD API for managing to-do tasks, built with TypeScript, Express, and Node.js. Data is stored in memory and resets on restart.

## Run it

```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`.

## Endpoints

| Method | Path         | Description               |
|--------|--------------|----------------------------|
| GET    | /            | API info                  |
| GET    | /health      | Health check               |
| GET    | /tasks       | List all tasks             |
| GET    | /tasks/:id   | Get a single task          |
| POST   | /tasks       | Create a task               |
| PUT    | /tasks/:id   | Update a task's title and/or done |
| DELETE | /tasks/:id   | Delete a task               |

## API docs

Interactive Swagger UI: `http://localhost:6767/docs`

## Example

```bash
curl -i -X POST http://localhost:6767/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
```