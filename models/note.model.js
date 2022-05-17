var dbConn = require("../config/db.config");

var Note = function (note) {
    this.title = note.title;
    this.details = note.details;
};

// get all notes
Note.getAllNotes = (result) => {
    dbConn.query("SELECT * FROM note ", (err, res) => {
        if (err) {
            console.log("Error while fetching notes", err);
            result(null, err);
        } else {
            console.log("Notes fetched successfully");
            result(null, res);
        }
    });
};


// create new note
Note.createNote = (noteReqData, result) => {
    dbConn.query("INSERT INTO note SET ?", noteReqData, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log("Note created successfully");
            result(null, res);
        }
    });
};

// get note by ID for update
Note.getNoteByID = (id, result) => {
    dbConn.query(" * FROM note WHERE id=?", id, (err, res) => {
        if (err) {
            console.log("Error while fetching note by id", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// update note
Note.updateNote = (id, noteReqData, result) => {
    dbConn.query(
        "UPDATE note SET title=?,details=? WHERE id = ?",
        [
            noteReqData.title,
            noteReqData.details,
            id,
        ],
        (err, res) => {
            if (err) {
                console.log("Error while updating the note");
                result(null, err);
            } else {
                console.log("Note updated successfully");
                result(null, res);
            }
        }
    );
};

// delete note
Note.deleteNote = (id, result) => {
    dbConn.query("DELETE FROM note WHERE id=?", [id], (err, res) => {
        if (err) {
            console.log("Error while deleting the note");
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Note;
//WHERE created_at BETWEEN DATE_FORMAT(CURDATE()- INTERVAL 1 DAY,'%Y-%m-%d') AND CURDATE()