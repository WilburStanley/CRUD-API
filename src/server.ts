import express from 'express';

const app = express();
const PORT = 6767;

app.use(express.json());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({
    name: 'CRUD TASK API',
    version: '1.0',
    endpoints: ['/tasks'],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: 'ok ' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});