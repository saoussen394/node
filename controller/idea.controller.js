const IdeaModel = require("../models/idea.model");

// get all idea list
exports.getIdeaList = (req, res) => {
    console.log('here all ideas list');
    IdeaModel.getAllIdeas((err, ideas) => {
        console.log("We are here");
        if (err) res.send(err);
        console.log("Ideas", ideas);
        res.status(200).json(ideas);
    });
};

// create new Idea
exports.createNewIdea = (req, res) => {
    const ideaReqData = new IdeaModel(req.body);
    console.log("ideaReqData", ideaReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            success: false,
            message: "Please fill all fields",
        });
    } else {
        IdeaModel.createIdea(ideaReqData, (err, idea) => {
            if (err) res.send(err);
            res.json({
                status: true,
                message: "Idea Created Successfully",
                data: idea.insertId,
            });
        });
    }
};

