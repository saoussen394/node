const DepartementModel = require("../models/departement.model");


exports.getDepartementList = (req, res) => {
    console.log('here all departements list');
    DepartementModel.getAllDepartements((err, departements) => {
        console.log("We are here");
        if (err) res.send(err);
        console.log("Departements", departements);
        res.status(200).json(departements);
    });
};


exports.getDepartementByName = (req, res) => {

    DepartementModel.getDepartementByName(req.params.dep_name, (err, departement) => {
        if (err) res.send(err);
        console.log("single departement data", departement);
        res.send(departement);
    });
};

exports.createNewDepartement = (req, res) => {
    const departementReqData = new DepartementModel(req.body);
    console.log("departementReqData", departementReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        DepartementModel.createDepartement(departementReqData, (err, departement) => {
            if (err) res.send(err);
            res.json({
                status: true,
                message: "    Departement Created Successfully",
                data: departement.insertId,
            });
        });
    }
};


exports.getDepartementByID = (req, res) => {
    DepartementModel.getDepartementByID(req.params.id, (err, departement) => {
        if (err) res.send(err);
        console.log("single departement data", departement);
        res.status(200).json({ status: 200, error: null, response: departement });
    });
};


exports.updateDepartement = (req, res) => {
    const departementReqData = new DepartementModel(req.body);
    console.log("departementReqData update", departementReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        DepartementModel.updateDepartement(
            req.body.id,
            departementReqData,
            (err, departement) => {
                if (err) res.send(err);
                else {res.json({
                    status: true,
                    message: " Departement updated Successfully",
                });}
                
            }
        );
    }
};

