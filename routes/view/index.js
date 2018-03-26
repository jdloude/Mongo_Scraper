//setting up express routes
const express = require("express");
const router = express.Router();
const headline = require("../../controllers/headline.js");

router.get("/", (req, res) => {
    res.redirect("/home");
});

router.get("/home", (req, res) => {
    headline.loadAllArticles(req, res);
});

router.get("/saved", (req, res) => {
    headline.loadSavedArticles(req, res);
});

router.put("/save/:id", (req, res) => {
    headline.saveArtices(req, res);
});

router.put("/remove/:id", (req, res) => {
    headline.removeSavedArtices(req, res)
})

module.exports = router