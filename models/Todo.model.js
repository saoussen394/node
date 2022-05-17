var dbConn = require("../config/db.config");
var Todo = function (task) {
    this.dep = task.dep;
    this.title = task.title;
    this.instruction = task.instruction;
    this.duration=task.duration;
    this.repeated = task.repeated;
    this.updated_at = task.updated_at;
    this.status= task.status;
};
// get all task
Todo.getRoleDateTasks = (data,result) => { // data = req.body

    console.log("data dans le model",data)
    dbConn.query("(SELECT * FROM daily_task where date_frame=? and dep=?) UNION (SELECT * FROM monthly_task where date_frame=? and dep=?) UNION (SELECT * FROM random_task where date_frame=? and dep=?) UNION (SELECT * FROM weekly_task where date_frame=? and dep=?)",[data.date,data.role],(err, res) => {
        if (err) {
            console.log("Error while fetching tasks", err);
            result(null, err);
        } else {
            console.log("task fetched successfully!");
            result(null, res);
        } 
    });
};



// get all task
Todo.getweeklyTasks = (data,result) => { // data = req.body

    console.log("data dans le model",data)
    dbConn.query("SELECT * FROM weekly_task where date_frame=? and dep=?", [data.date,data.role],(err, res) => {
        if (err) {
            console.log("Error while fetching tasks", err);
            result(null, err);
        } else {
            console.log("task fetched successfully");
            result(null, res);
        }
    });
};



// get all task
Todo.getmonthlyTasks = (data,result) => { // data = req.body

    console.log("data dans le model",data)
    dbConn.query("SELECT * FROM monthly_task where date_frame=? and dep=?", [data.date,data.role],(err, res) => {
        if (err) {
            console.log("Error while fetching tasks", err);
            result(null, err);
        } else {
            console.log("task fetched successfully");
            result(null, res);
        }
    });
};



// get all task
Todo.getrandomTasks = (data,result) => { // data = req.body

    console.log("data dans le model",data)
    dbConn.query("SELECT * FROM random_task where date_frame=? and dep=?", [data.date,data.role],(err, res) => {
        if (err) {
            console.log("Error while fetching tasks", err);
            result(null, err);
        } else {
            console.log("task fetched successfully");
            result(null, res);
        }
    });
};


// get all task
Todo.gettodoTasks = (data,result) => { // data = req.body

    console.log("data dans le model",data)
    dbConn.query("(SELECT * FROM task where date_frame=current_date() ) order by id " ,(err, res) => {
        if (err) {
            console.log("Error while fetching tasks", err);
            result(null, err);
        } else {
            console.log("task fetched successfully");
            result(null, res);
        }
    });
};

Todo.gettodoByID = (id, result) => {
    
    dbConn.query("SELECT * FROM task where id=?", id,(err, res) => {
        if(res.length > 0){
    dbConn.query("INSERT INTO todolist (SELECT * FROM task where id=? and id not in (select id from todolist)) ", id)
               console.log("this is the result",res)
        } /*else {
                dbConn.query("SELECT * FROM weekly_task where id=? ", id,(err, res1) => {
                if(res1.length > 0){
    dbConn.query("INSERT INTO todolist (SELECT * FROM weekly_task where id=? and id not in (select id from todolist))", id)
                    console.log(res1)
               }else{
                       dbConn.query("SELECT * FROM monthly_task where id=?", id,(err, res2) => {
                          if(res2.length > 0){
    dbConn.query("INSERT INTO todolist (SELECT * FROM monthly_task where id=? and id not in (select id from todolist))", id)
                       console.log("this is the result",res2)
               }
                           else{
                                  dbConn.query("SELECT * FROM random_task where id=?", id,(err, res3) => {
                                  if(res3.length > 0){
    dbConn.query("INSERT INTO todolist (SELECT * FROM random_task where id=? and id not in (select id from todolist))", id)
                                console.log("this is the result",res3)
                                  }*/else{
                                      console.log("not found !!")
                                  }
                                
               
                                       })}
                                     
                                   /* */
   

Todo.deleteTodoTask = (id, result) => {
    dbConn.query("DELETE FROM todolist WHERE id=?", [id], (err, res) => {
        if (err) {
            console.log("Error while deleting the task");
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


 module.exports = Todo;