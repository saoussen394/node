const express = require("express");
const router = express.Router();
/////////////////////idea////////////////////////////////////
const ideaController = require("../controller/idea.controller");

// get all idea
router.get("/", ideaController.getIdeaList);

// create new idea
router.post("/", ideaController.createNewIdea);


module.exports = router;
