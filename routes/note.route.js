const express = require("express");
const router = express.Router();
/////////////////////note////////////////////////////////////
const noteController = require("../controller/note.controller");

// get all notes
router.get("/", noteController.getNoteList);

// create new note
router.post("/", noteController.createNewNote);

// update note
router.put("/:id", noteController.updateNote);

// delete note
router.delete("/:id", noteController.deleteNote);



module.exports = router; 
