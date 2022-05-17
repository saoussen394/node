const EmployeeModel = require("../models/employee.model");
const bcrypt = require('bcryptjs')

// get all employee list
exports.getEmployeeList = (req, res) => {
    console.log('here all employees list');
    EmployeeModel.getAllEmployees((err, employees) => {
        console.log("We are here");
        if (err) res.send(err);
        // console.log("Employees", employees);
        res.status(200).json(employees.reverse());
    });
}; 

// get employee by Name for each by Name
exports.getEmployeeByName = (req, res) => {
    //console.log('get emp by id');
    EmployeeModel.getEmployeeByName(req.params.first_name, (err, employee) => {
        if (err) res.send(err);
        // console.log("single employee data", employee);
        res.send(employee);
    });
};

// create new employee
exports.createNewEmployee = (req, res) => {
    
    const employeeReqData = new EmployeeModel(req.body);
    // console.log("employeeReqData", employeeReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        bcrypt.genSalt(10, function(err, salt) { 
    bcrypt.hash(employeeReqData.password, salt, function(err, hash ,initialidstr ) {
       console.log(hash) 
               initialidstr = employeeReqData.first_name.charAt(0)+ employeeReqData.last_name.charAt(0)+"-"+Math.floor(Math.random() * 10 + 1) ;
               usernamestr = employeeReqData.first_name + " " + employeeReqData.last_name;
       let newEmployeedata = {...employeeReqData,password : hash , initialid : initialidstr , user_name : usernamestr }
        EmployeeModel.createEmployee(newEmployeedata, (err, employee) => {
            if (err) res.send(err);
            res.json({
                status: true,
                message: "Employee Created Successfully",
                data: employee.insertId,
            });
        });
    });
});
       
    }
};

// get employee by ID  for Update
exports.getEmployeeByID = (req, res) => {

    EmployeeModel.getEmployeeByID(req.params.id, (err, employee) => {
        if (err) res.send(err);
        console.log("single employee data", employee);
       
        res.status(200).json({ status: 200, error: null, response: employee });
    });
};

// update employee
exports.updateEmployee = (req, res) => {
    const employeeReqData = new EmployeeModel(req.body);
    console.log("employeeReqData update", employeeReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        EmployeeModel.updateEmployee(
            req.params.id,
            employeeReqData,
            (err, employee) => {
                if (err) res.send(err);
                res.json({
                    status: true,
                    message: "Employee updated Successfully",
                });
            }
        );
    }
}; 


exports.ArchiveEmployee = (req, res) => {
    EmployeeModel.ArchiveEmployee(req.params.id, (err, employee) => {
        if (err) res.send(err);
        res.json({ success: true, message: "Employee archived successully!" });
    });
};