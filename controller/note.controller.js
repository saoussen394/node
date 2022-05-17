const NoteModel = require("../models/note.model");

// get all note list
exports.getNoteList = (req, res) => {
    console.log('here all notes list');
    NoteModel.getAllNotes((err, notes) => {
        console.log("We are here");
        if (err) res.send(err);
        console.log("Notes", notes);
        res.status(200).json(notes);
    });
};


// create new note
exports.createNewNote = (req, res) => {
    const noteReqData = new NoteModel(req.body);
    console.log("noteReqData", noteReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        NoteModel.createNote(noteReqData, (err, note) => {
            if (err) res.send(err);
            res.json({
                status: true,
                message: "Note Created Successfully",
                data: note.insertId,
            });
        });
    }
};

exports.getNoteByID = (req, res) => {
    NoteModel.getNoteByID(req.params.id, (err, note) => {
        if (err) res.send(err);
        console.log("single note data", note);
        res.status(200).json({ status: 200, error: null, response: note });
    });
};

// update note
exports.updateNote = (req, res) => {
    const noteReqData = new NoteModel(req.body);
    console.log("noteReqData update", noteReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        NoteModel.updateNote(
            req.params.id,
            noteReqData,
            (err, note) => {
                if (err) res.send(err);
                res.json({
                    status: true,
                    message: "Note updated Successfully",
                });
            }
        );
    }
};

// delete note
exports.deleteNote = (req, res) => {
    NoteModel.deleteNote(req.params.id, (err, note) => {
        if (err) res.send(err);
        res.json({ success: true, message: "Note deleted successully!" });
    });
};
