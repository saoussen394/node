var dbConn = require("../config/db.config");
var moment  = require('moment');

var Task = function (task) {
    this.code_task = task.code_task;
    this.dep = task.dep;
    this.title = task.title;
    this.instruction = task.instruction;
    this.duration=task.duration;
    this.type = task.type;
    this.status= task.status;
    this.date_frame= task.date_frame;

};

// get all task
Task.getAllTasks = (result) => {
    dbConn.query("SELECT * FROM task WHERE etat='active'", (err, res) => {
        if (err) {
            console.log("Error while fetching tasks", err);
            result(null, err);
        } else {
            console.log("task fetched successfully");
            result(null, res);
        }
    });
};

// get task by Name for Search Data by name
Task.getTaskByName = (title, result) => {
    dbConn.query(
        "SELECT * FROM task WHERE title=?",
        title,
        (err, res) => {
            if (err) {
                console.log("Error while fetching task by id", err);
                result(null, err);
            } else {
                result(null, res);
            }
        }
    );
};
/*
//setInterval(() => {
 dbConn.query("SELECT * FROM weekly_task",(err, res) => {
     if(res){
         for(var i =0;i<res.length;i++){
              //console.log(res[i]['date_frame'])
              //   if(new Date() > res[i]['date_frame']){
              //     dbConn.query('UPDATE weekly_task set date_frame = ? WHERE id = ?',[new Date(),res[i].id]);
              // };
         };
     };
 });*/
//}, 6000 * 60 * 24);
// create new task
let currentDate = moment();
let date=new Date();
let today=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
let weekStart = currentDate.clone().startOf('week').format('YYYY-MM-DD');
let weekEnd = currentDate.clone().endOf('week').format('YYYY-MM-DD');
let firstDay =  moment().startOf('month').format('YYYY-MM-DD');
let lastDay =  moment().endOf('month').format('YYYY-MM-DD');

Task.createTask = (taskReqData, result)=> {
    let taskidcode = taskReqData.type.charAt(0)+"-"+ taskReqData.title.charAt(0)+ taskReqData.title.charAt(1)+Math.floor(Math.random() * 100 + 1) ;        

//dbConn.query("INSERT INTO task SET ?", taskReqData, (err, res) => {
	if (taskReqData['type'] == 'Weekly') {
		dbConn.query("SELECT * from task WHERE type='Weekly' ORDER BY id DESC LIMIT 1", (err, result) => {
			if (result.length == 0) {
                        dbConn.query("INSERT INTO task (code_task,dep,title,instruction,duration,type,status,date_frame) VALUES (?,?,?,?,?,?,?,?)", 
                        [taskidcode,taskReqData['dep'],taskReqData['title'],taskReqData['instruction'],taskReqData['duration'],taskReqData['type'],
                        taskReqData['status'],weekStart]);
						    console.log("task created successfully");
            }else if(result.length > 0){
            for(var i=0; i<result.length;i++){
                
                if(moment(result[i]['date_frame']).format('YYYY-MM-DD') == weekStart ){
                       dbConn.query("INSERT INTO task (code_task,dep,title,instruction,duration,type,status,date_frame) VALUES (?,?,?,?,?,?,?,?)", 
                        [taskidcode,taskReqData['dep'],taskReqData['title'],taskReqData['instruction'],taskReqData['duration'],taskReqData['type'],
                        taskReqData['status'],moment(weekStart).add(1,'days').format('YYYY-MM-DD')]);
            }else if(moment(result[i]['date_frame']).format('YYYY-MM-DD') == weekEnd){
                        dbConn.query("INSERT INTO task (code_task,dep,title,instruction,duration,type,status,date_frame) VALUES (?,?,?,?,?,?,?,?)", 
                        [taskReqData['dep'],taskReqData['title'],taskReqData['instruction'],taskReqData['duration'],taskReqData['type']
                        ,taskReqData['status'],weekStart]);
            }else {
        dbConn.query("INSERT INTO task (code_task,dep,title,instruction,duration,type,status,date_frame) VALUES (?,?,?,?,?,?,?,?)", 
                        [taskidcode,taskReqData['dep'],taskReqData['title'],taskReqData['instruction'],taskReqData['duration'],taskReqData['type'],
                        taskReqData['status'],moment(result[i]['date_frame']).add(1,'days').format('YYYY-MM-DD')]);
            };
        };
			}
		});
	}	else if (taskReqData['type'] == 'Daily') {

                        dbConn.query("INSERT INTO task (code_task,dep,title,instruction,duration,type,status,date_frame) VALUES (?,?,?,?,?,?,?,?)", 
                        [taskidcode,taskReqData['dep'],taskReqData['title'],taskReqData['instruction'],taskReqData['duration'],taskReqData['type']
                        ,taskReqData['status'],today]);
						    console.log("task created successfully");

}
else if (taskReqData['type'] == 'Instant') {
    dbConn.query("INSERT INTO task (code_task,dep,title,instruction,duration,type,status,date_frame) VALUES (?,?,?,?,?,?,?,?)", 
    [taskidcode,taskReqData['dep'],taskReqData['title'],taskReqData['instruction'],taskReqData['duration'],taskReqData['type']
    ,taskReqData['status'],today]);
        console.log("task created successfully");

}
	if (taskReqData['type'] == 'Monthly') {
		dbConn.query("SELECT * from task WHERE type='monthly' ORDER BY id DESC LIMIT 1", (err, result) => {
			if (result.length == 0) {
                        dbConn.query("INSERT INTO task (code_task,dep,title,instruction,duration,type,status,date_frame) VALUES (?,?,?,?,?,?,?,?)", 
                        [taskidcode,taskReqData['dep'],taskReqData['title'],taskReqData['instruction'],taskReqData['duration'],taskReqData['type'],
                        taskReqData['status'],firstDay]);
						    console.log("task created successfully");
            }else if(result.length > 0){
            for(var i=0; i<result.length;i++){
                
                if(moment(result[i]['date_frame']).format('YYYY-MM-DD') == firstDay ){
                       dbConn.query("INSERT INTO task (code_task,dep,title,instruction,duration,type,status,date_frame) VALUES (?,?,?,?,?,?,?,?)", 
                        [taskidcode,taskReqData['dep'],taskReqData['title'],taskReqData['instruction'],taskReqData['duration'],taskReqData['type'],
                        taskReqData['status'],moment(firstDay).add(1,'days').format('YYYY-MM-DD')]);
            }else if(moment(result[i]['date_frame']).format('YYYY-MM-DD') == lastDay){
                        dbConn.query("INSERT INTO task (code_task,dep,title,instruction,duration,type,status,date_frame) VALUES (?,?,?,?,?,?,?,?)", 
                        [taskidcode,taskReqData['dep'],taskReqData['title'],taskReqData['instruction'],taskReqData['duration'],taskReqData['type'],
                        taskReqData['status'],firstDay]);
            }else {
        dbConn.query("INSERT INTO task (code_task,dep,title,instruction,duration,type,status,date_frame) VALUES (?,?,?,?,?,?,?,?)", 
                        [taskidcode,taskReqData['dep'],taskReqData['title'],taskReqData['instruction'],taskReqData['duration'],taskReqData['type'],
                        taskReqData['status'],moment(result[i]['date_frame']).add(1,'days').format('YYYY-MM-DD')]);
            };
        };
			}
		});
    };
//});
}


// get task by ID for update
Task.getTaskByID = (id, result) => {
    dbConn.query(" SELECT * FROM task WHERE id=?", id, (err, res) => {
        if (err) {
            console.log("Error while fetching task by id", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
// update task
Task.updateTask = (id, taskReqData, result) => {
    dbConn.query(
        "UPDATE task SET dep=?, title=?,instruction=?,duration=?,type=? ,status=? WHERE id = ?",
        [
            taskReqData.dep,
            taskReqData.title,
            taskReqData.instruction,
            taskReqData.duration,
            taskReqData.type,
            taskReqData.status,
            id,
        ],
        (err, res) => {
            if (err) {
                console.log("Error while updating the task" + err);
                result(null, err);
            } else {
                console.log("task updated successfully");
                result(null, res);
            }
        }
    );
};

Task.ArchiveTask = (id, result) => {
    dbConn.query("UPDATE task SET etat = 'inactive' WHERE id=?", [id], (err, res) => {
        if (err) {
            console.log("Error while archiving the employee");
            result(null, err);
        } else {
            result(null, res);
        }
        
    });
};


module.exports = Task;
