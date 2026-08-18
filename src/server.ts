import express from 'express';

const app = express();
const port = 6767;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});