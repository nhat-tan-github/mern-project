import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  upadateNote
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", upadateNote);
router.delete("/:id", deleteNote);

export default router;
