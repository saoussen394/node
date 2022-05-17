var dbConn = require("../config/db.config");

var Departement = function (departement) {
    this.dep_name = departement.dep_name;
    
};


Departement.getAllDepartements = (result) => {
    dbConn.query("SELECT * FROM departement", (err, res) => {
        if (err) {
            console.log("Error while fetching departements", err);
            result(null, err);
        } else {
            console.log("departement fetched successfully");
            result(null, res);
        }
    });
};


Departement.getDepartementByName = (dep_name, result) => {
    dbConn.query(
        "SELECT * FROM task WHERE dep_name=?",
        dep_name,
        (err, res) => {
            if (err) {
                console.log("Error while fetching departement by id", err);
                result(null, err);
            } else {
                result(null, res);
            }
        }
    );
};


Departement.createDepartement = (departementReqData, result) => {
    dbConn.query("INSERT INTO departement SET ?", departementReqData, (err, res) => {
        if (err) {
            console.log("Error while inserting data");
            result(null, err);
        } else {
            console.log("departement created successfully");
            result(null, res);
        }
    });
};


Departement.getDepartementByID = (id, result) => {
    dbConn.query(" SELECT * FROM departement WHERE id=?", id, (err, res) => {
        if (err) {
            console.log("Error while fetching departement by id", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Departement.updateDepartement = (id, departementReqData, result) => {
    dbConn.query(
        "UPDATE departement SET dep_name=? WHERE id = ?",
        [
            departementReqData.dep_name,
            
            id,
        ],
        (err, res) => {
            if (err) {
                console.log("Error while updating the departement" + err);
                result(null, err);
            } else {
                console.log("departement updated successfully");
                result(null, res);
            }
        }
    );
};


module.exports = Departement;
