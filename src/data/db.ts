import Database from "better-sqlite3";

export const db = new Database("tasks.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

export const seedTasks = [
  { title: "Buy milk", done: 0 },
  { title: "Walk the dog", done: 0 },
  { title: "Finish assignment", done: 1 },
];

const { count } = db.prepare("SELECT COUNT(*) AS count FROM tasks").get() as { count: number };

if (count === 0) {
  const insertTask = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");
  const seed = db.transaction(() => {
    for (const task of seedTasks) {
      insertTask.run(task.title, task.done);
    }
  });
  seed();
}