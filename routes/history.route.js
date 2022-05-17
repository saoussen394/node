
const express = require("express");
const router = express.Router();
const historyController = require("../controller/history.controller");


router.get("/", historyController.getHistoryList);

router.get("/searchRecord/:user", historyController.getHistoryByUser);


router.post("/", historyController.createNewHistory);



router.delete("/", historyController.deleteHistory);



module.exports = router; 
