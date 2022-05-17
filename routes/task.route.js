const express = require("express");
const router = express.Router();
/////////////////////task////////////////////////////////////
const taskController = require("../controller/task.controller");

// get all tasks
router.get("/", taskController.getTaskList);

// get task by ID
router.get("/:id", taskController.getTaskByID);

// get ID for Update
router.get("/searchRecord/:title", taskController.getTaskByName);

// create new task
router.post("/", taskController.createNewTask);

// update task
router.put("/:id", taskController.updateTask);


//delete employee
router.put("/archiveRecord/:id", taskController.ArchiveTask);




module.exports = router;
