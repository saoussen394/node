var dbConn = require("../config/db.config");

var EMPArchive = function (emparchive) {
    this.cin = emparchive.cin;
    this.first_name = emparchive.first_name;
    this.last_name = emparchive.last_name;
    this.email = emparchive.email;
    this.phone =emparchive.phone;
    this.city = emparchive.city;
    this.zip = emparchive.zip;
    this.dep = emparchive.dep;
    this.password = emparchive.password;
};

EMPArchive.getAllEMP = (result) => {
    dbConn.query("SELECT * FROM employees where etat='inactive'", (err, res) => {
        if (err) {
            console.log("Error while fetching EMP", err);
            result(null, err);
        } else {
            console.log("EMP fetched successfully");
            result(null, res);
        }
    });
};

EMPArchive.deleteEMP = (result) => {
    dbConn.query("DELETE from employees where etat='inactive' ", (err, res) => {
        if (err) {
            console.log("Error while deleting the EMP");
            result(null, err);
        } 
        else {
            console.log("Employee archive deleted successfully", res);
            
        }
    });
};


module.exports = EMPArchive;
