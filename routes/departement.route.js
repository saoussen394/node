const express = require("express");
const router = express.Router();

const departementController = require("../controller/departement.controller");


router.get("/", departementController.getDepartementList);


router.get("/:id", departementController.getDepartementByID);


router.get("/searchRecord/:dep_name", departementController.getDepartementByName);


router.post("/", departementController.createNewDepartement);


router.put("/:id",departementController.updateDepartement);


module.exports = router;
