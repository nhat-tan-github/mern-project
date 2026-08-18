import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
  console.log(`server startd on PORT: ${PORT}`);
  console.log(`Open your browser at: http://localhost:${PORT}`);
});
