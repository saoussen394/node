const AnnouncementModel = require("../models/announcement.model");

// get all Announcement list
exports.getAnnouncementList = (req, res) => {
    console.log('here all announcement list');
    AnnouncementModel.getAllAnnouncements((err, announcements) => {
        console.log("We are here");
        if (err) res.send(err);
        console.log("Announcements", announcements);
        res.status(200).json(announcements);
    });
};

// create new Announcement
exports.createNewAnnouncement = (req, res) => {
    const announcementReqData = new AnnouncementModel(req.body);
    console.log("announcementReqData", announcementReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        AnnouncementModel.createAnnouncement(announcementReqData, (err, announcement) => {
            if (err) res.send(err);
            res.json({
                status: true,
                message: "announcement Created Successfully",
                data: announcement.insertId,
            });
        });
    }
};
