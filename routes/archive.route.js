const express = require("express");
const router = express.Router();
/////////////////////task////////////////////////////////////
const archiveController = require("../controller/archive.controller");

// get all archive
router.get("/", archiveController.getTaskList);

//delete archive
router.delete("/", archiveController.deleteTask);




module.exports = router;
