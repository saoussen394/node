const TaskModel = require("../models/archive.model");

// get all task list
exports.getTaskList = (req, res) => {
    console.log('here all tasks list');
   TaskModel.getAllTasks((err, tasks) => {
        console.log("We are here");
        if (err) res.send(err);
        console.log("Tasks", tasks);
        res.status(200).json(tasks);
    });
};


// delete task
exports.deleteTask = (req, res) => {
    TaskModel.deleteTask(req.params.id, (err, task) => {
        if (err) res.send(err);
        res.json({ success: true, message: "Task deleted successully!" });
    });};

