const express = require("express");
const router = express.Router();
/////////////////////employee////////////////////////////////////
const employeeController = require("../controller/employee.controller");

// get all employees
router.get("/", employeeController.getEmployeeList);

// get employee by ID
router.get("/:id", employeeController.getEmployeeByID);

// get ID for Update
router.get("/searchRecord/:first_name", employeeController.getEmployeeByName);

// create new employee
router.post("/", employeeController.createNewEmployee);

// update employee
router.put("/:id", employeeController.updateEmployee);


//Archive
router.put("/archiveRecord/:id", employeeController.ArchiveEmployee);



module.exports = router;
