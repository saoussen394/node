const express = require("express");
const router = express.Router();
/////////////////////announcement////////////////////////////////////
const announcementController = require("../controller/announcement.controller");

// get all announcements
router.get("/", announcementController.getAnnouncementList);
// create new employee
router.post("/", announcementController.createNewAnnouncement);

module.exports = router;
