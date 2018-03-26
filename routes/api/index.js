//setting up express routes
const express = require("express");
const router = express.Router();
const headline = require("../../controllers/headline.js");
const note = require("../../controllers/note.js");

router.get("/scrape", (req, res) => {
    headline.getAllArtices(req, res);
});

router.post("/submit/:id", (req, res) => {
    note.addNote(req, res);
});

router.delete("/noteDel/:id", (req, res) => {
    note.deleteNote(req, res);
});

router.get("/getCom/:id", (req, res) => {
    headline.getComments(req, res);
});

module.exports = router;