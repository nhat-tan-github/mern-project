import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  upadateNote
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", upadateNote);
router.delete("/:id", deleteNote);

export default router;
