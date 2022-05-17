const TaskModel = require("../models/task.model");

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

// get task by Name for each by Name
exports.getTaskByName = (req, res) => {
    TaskModel.getTaskByName(req.params.title, (err, task) => {
        if (err) res.send(err);
        console.log("single task data", task);
        res.send(task);
    });
};

// create new task
exports.createNewTask = (req, res) => {
    const taskReqData = new TaskModel(req.body);
    console.log("taskReqData", taskReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        taskidcode = taskReqData.type.charAt(0)+"-"+ taskReqData.title.charAt(0)+ taskReqData.title.charAt(1)+Math.floor(Math.random() * 10 + 1) ;        
let taskdata = {...taskReqData, taskid : taskidcode  }
        TaskModel.createTask(taskdata, (err, task) => {
            if (err) res.send(err);
            res.json({
                status: true,
                message: "Task Created Successfully",
                data: task.insertId,
            });
        });
    }
};

// get task by ID  for Update
exports.getTaskByID = (req, res) => {
    TaskModel.getTaskByID(req.params.id, (err, task) => {
        if (err) res.send(err);
        console.log("single task data", task);
        res.status(200).json({ status: 200, error: null, response: task });
    });
};

// update task
exports.updateTask = (req, res) => {
    const taskReqData = new TaskModel(req.body);
    console.log("taskReqData update", taskReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        TaskModel.updateTask(
            req.body.id,
            taskReqData,
            (err, task) => {
                if (err) res.send(err);
                else {res.json({
                    status: true,
                    message: "Task updated Successfully",
                });}
                
            }
        );
    }
};



//todo
exports.Todo = (req, res) => {
    const taskReqData = new TaskModel(req.body);
    console.log("taskReqData todo", taskReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        TaskModel.updateTask(
            req.body.id,
            taskReqData,
            (err, task) => {
                if (err) res.send(err);
                else {res.json({
                    status: true,
                    message: "Task updated Successfully",
                });}
                
            }
        );
    }
};

exports.ArchiveTask = (req, res) => {
    TaskModel.ArchiveTask(req.params.id, (err, task) => {
        if (err) res.send(err);
        res.json({ success: true, message: "Task archived successully!" });
    });
};