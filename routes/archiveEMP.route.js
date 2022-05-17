const express = require("express");
const router = express.Router();
/////////////////////EMP////////////////////////////////////
const archiveEMPController = require("../controller/archiveEMP.controller");

// get all archive
router.get("/", archiveEMPController.getEMPList);

//delete archive
router.delete("/", archiveEMPController.deleteEMP);




module.exports = router;
