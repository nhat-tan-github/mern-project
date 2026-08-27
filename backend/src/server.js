import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins
  })
);
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server startd on PORT: ${PORT}`);
    console.log(`Open your browser at: http://localhost:${PORT}`);
  });
});
