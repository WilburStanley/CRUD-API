import { app } from "./app.js";

const port = 6767;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});