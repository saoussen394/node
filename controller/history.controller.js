const HistoryModel = require("../models/history.model");

exports.getHistoryList = (req, res) => {
    
    console.log('here all hitories list');
    HistoryModel.getAllHistorys((err, historys) => {
        console.log("We are here");
        if (err) res.send(err);
        console.log("Histories", historys);
        res.status(200).json(historys);
    });
};
 
exports.getHistoryByUser = (req, res) => {
    HistoryModel.getHistoryByUser(req.params.user, (err, user) => {
        if (err) res.send(err);
        console.log("single user data", user);
        res.send(user);
    });
};

exports.createNewHistory = (req, res) => {
 
    const historyReqData = new HistoryModel(req.body);
    console.log("historyReqData", historyReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        HistoryModel.createHistory(historyReqData, (err, history) => {
            if (err) res.send(err);
            res.json({
                status: true,
                message: " History Created Successfully",
                data: history.insertId,
            });
        });
    }
};

exports.getHistoryByID = (req, res) => {
    HistoryModel.getHistoryByID(req.params.initialid, (err, history) => {
        if (err) res.send(err);
        console.log("single history data", history);
        res.status(200).json({ status: 200, error: null, response: history });
    });
};

exports.deleteHistory = (res) => {
    HistoryModel.deleteHistory((err, history) => {
        if (err) res.send(err);
    });
};