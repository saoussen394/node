const TodoModel = require("../models/Todo.model");



exports.getTaskList = (req, res) => {
    console.log('here all tasks list');
   TaskModel.getAllTasks((err, tasks) => {
        console.log("We are here");
        if (err) res.send(err);
        console.log("Tasks", tasks);
        res.status(200).json(tasks);
    });
};
exports.getRoleDateTasks= (req,res) => {
     console.log("get role date tasks data",req.body);
   TodoModel.getRoleDateTasks(req.body,(err, tasks) => {
      
        if (err) res.send(err);
        console.log("Tasks", tasks);
        res.status(200).json(tasks);
    });
}





exports.getweeklyTasks= (req,res) => {
     console.log("get role date tasks data",req.body);
   TodoModel.getweeklyTasks(req.body,(err, tasks) => {
      
        if (err) res.send(err);
        console.log("Tasks", tasks);
        res.status(200).json(tasks);
    });
}

exports.getmonthlyTasks= (req,res) => {
     console.log("get role date tasks data",req.body);
   TodoModel.getmonthlyTasks(req.body,(err, tasks) => {
      
        if (err) res.send(err);
        console.log("Tasks", tasks);
        res.status(200).json(tasks);
    });
}

exports.getrandomTasks= (req,res) => {
     console.log("get role date tasks data",req.body);
   TodoModel.getrandomTasks(req.body,(err, tasks) => {
      
        if (err) res.send(err);
        console.log("Tasks", tasks);
        res.status(200).json(tasks);
    });
}

exports.gettodoTasks= (req,res) => {
     console.log("get role date tasks data",req.body);
   TodoModel.gettodoTasks(req.body,(err, tasks) => {
      
        if (err) res.send(err);
        console.log("Tasks", tasks);
        res.status(200).json(tasks);
    });
}
// get task by ID  for Update
exports.gettodoByID = (req, res) => {

    TodoModel.gettodoByID(req.params.id, (err, todo) => {
        if (err) res.send(err);
        console.log("single task data", todo);
       
        res.status(200).json({ status: 200, error: null, response: todo });
    });
};

exports.deleteTodoTask = (req, res) => {
    TodoModel.deleteTodoTask(req.params.id, (err, task) => {
        if (err) res.send(err);
        res.json({ success: true, message: "Task deleted successully!" });
    });
};