const EMPModel = require("../models/archiveEMP.model");

// get all EMP list
exports.getEMPList = (req, res) => {
    console.log('here all EMP list');
   EMPModel.getAllEMP((err, EMP) => {
        console.log("We are here");
        if (err) res.send(err);
        console.log("EMP", EMP);
        res.status(200).json(EMP);
    });
};


// delete EMP
exports.deleteEMP = (req, res) => {
    EMPModel.deleteEMP(req.params.id, (err, EMP) => {
        if (err) res.send(err);
        res.json({ success: true, message: "EMP deleted successully!" });
    });};

