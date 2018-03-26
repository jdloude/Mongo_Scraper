const db = require("../models");

const note = {
    addNote: function(req, res) {
        let item = "";
        db.Note.create(req.body).then(common => {
            item = common;
            return db.Article.findByIdAndUpdate(req.params.id, { $push: { comments: common._id } }, { new: true });
        }).then(result => {
            res.json(item);
        }).catch(err => {
            console.log(err);
            res.send("not saved");
        });
    },

    deleteNote: function(req, res) {
        db.Note.findByIdAndRemove(req.params.id).then(data => {
            res.send("deleted");
        });
    }
};

module.exports = note;