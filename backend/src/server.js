import express from "express";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = 5001;

app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
  console.log(`server startd on PORT: ${PORT}`);
  console.log(`Open your browser at: http://localhost:${PORT}`);
});
