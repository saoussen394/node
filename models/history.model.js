var dbConn = require("../config/db.config");

var History = function (history) {
    this.operation = history.operation;
    this.user = history.user;
    this.time = history.time;
    
};

 
History.getAllHistorys = (result) => {
    dbConn.query("SELECT * FROM history", (err, res) => {
        if (err) {
            console.log("Error while fetching ", err);
            result(null, err);
        } else {
            console.log("Fetched successfully");
            result(null, res);
        }
    });
};

History.getHistoryByUser = (user, result) => {
    dbConn.query(
        "SELECT * FROM history WHERE user=?",
        user,
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

History.createHistory = (historyReqData, result) => {
    dbConn.query("INSERT INTO history SET ?", historyReqData, (err, res) => {
        if (err) {
            console.log("Error while inserting data");
            result(null, err);
        } else {
            console.log("Created successfully");
            result(null, res);
        }
    });
};




History.deleteHistory = (result) => {
    dbConn.query(" TRUNCATE  table history ", (err, res) => {
        if (err) {
            console.log("Error while deleting" , err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
   
};

module.exports = History;
