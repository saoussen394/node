var dbConn = require("../config/db.config");
const bcrypt = require('bcrypt');
const saltRounds = 10;



var Employee = function (employee) {
    this.cin = employee.cin;
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.phone = employee.phone;
    this.city = employee.city;
    this.zip = employee.zip;
    this.dep = employee.dep;
    this.password = employee.password;
};


// get all employees
Employee.getAllEmployees = (result) => {
    dbConn.query("SELECT * FROM employees where etat='active'", (err, res) => {
        if (err) {
            console.log("Error while fetching employes", err);
            result(null, err);
        } else {
            console.log("Employees fetched successfully");
            result(null, res);
        }
    });
};
//*FRom task WHERE date=? AND departm=?
// get employee by Name for Search Data by name
Employee.getEmployeeByName = (first_name, result) => {
    dbConn.query(
        " SELECT *  FROM employees WHERE first_name=?",
        first_name,
        (err, res) => {
            if (err) {
                console.log("Error while fetching employee by id", err);
                result(null, err);
            } else {
                result(null, res);
            }
        }
    );
}; 

// create new employee
Employee.createEmployee = (employeeReqData, result) => {
    
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(employeeReqData.password, salt, function(err, hash) {
       employeeReqData.password = hash
        initialidstr = employeeReqData.first_name.charAt(0)+ employeeReqData.last_name.charAt(0);
        usernamestr = employeeReqData.first_name + " " + employeeReqData.last_name;

    });
});


    dbConn.query("INSERT INTO employees SET ?", employeeReqData, (err, res) => {
        if (err) {
            console.log("Error while inserting data" ,err);
            result(null, err);
        } else {
            console.log("Employee created successfully");
            result(null, res);
        }
    });
};


// get employee by ID for update
Employee.getEmployeeByID = (id, result) => {
    dbConn.query(" SELECT* FROM employees WHERE id=?", id, (err, res) => {
        if (err) {
            console.log("Error while fetching employee by id", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// update employee
Employee.updateEmployee = (id, employeeReqData, result) => {
    dbConn.query(
        "UPDATE employees SET cin=?,first_name=?,last_name=?,email=?,phone=?,city=?,zip=?,dep=?,password=? WHERE id = ?",
        [
            employeeReqData.cin,
            employeeReqData.first_name,
            employeeReqData.last_name,
            employeeReqData.email,
            employeeReqData.phone,
            employeeReqData.city,
            employeeReqData.zip,
            employeeReqData.dep,
            employeeReqData.password,
            id,
        ],
        (err, res) => {
            if (err) {
                console.log("Error while updating the employee");
                result(null, err);
            } else {
                console.log("Employee updated successfully");
                result(null, res);
            }
        }
    );
};

// delete employee
Employee.ArchiveEmployee = (id, result) => {
    dbConn.query("UPDATE employees SET etat = 'inactive'WHERE id=?", [id], (err, res) => {
        if (err) {
            console.log("Error while deleting the employee");
            result(null, err);
        } else {
            result(null, res);
        }
        
    });
}





module.exports = Employee;

