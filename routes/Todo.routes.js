const express = require("express");
const router = express.Router();
/////////////////////dep-task////////////////////////////////////
const TodoController = require("../controller/Todo.controller");
// get all tasks


router.get('/',TodoController.gettodoTasks);
// get task by ID
router.get("/:id", TodoController.gettodoByID);

router.delete("/:id", TodoController.deleteTodoTask);


module.exports = router;
