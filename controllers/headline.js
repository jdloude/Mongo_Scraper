const db = require("../models");
const fetch = require("./fetch.js");

const article = {
    getAllArtices: function(req, res) {
        fetch.scrapeNews().then(news => {
            Promise.all(news.map((newsArt, i) => {
                return db.Article.findOne({ title: newsArt.title.trim() })
                    .then(data => data ? null :
                        db.Article.create({
                            title: newsArt.title,
                            link: newsArt.link,
                            summary: newsArt.shortSum
                        })
                    ).then(result => result ? "Item Added" : "There Already");
            })).then(values => {
                console.log(values);
                const total = values.filter(art => art === "Item Added").length
                res.send(`${total}`);
            });
        });
    },

    loadAllArticles: function(req, res) {
        db.Article.find({}).then(results => {
                res.render("home", { news: results });
            })
            .catch(err => {
                console.error(err);
                res.render("home");
            });
    },

    loadSavedArticles: function(req, res) {
        db.Article.find({ saved: true }).populate("comments").then(results => {
                res.render("saved", { news: results });
            })
            .catch(err => {
                console.error(err);
                res.render("saved");
            });
    },

    saveArtices: function(req, res) {
        db.Article.findByIdAndUpdate(req.params.id, { saved: true }, { new: true }).then(data => {
            res.send("done");
        });
    },

    removeSavedArtices: function(req, res) {
        db.Article.findByIdAndUpdate({ _id: req.params.id }, { saved: false }).then(data => {
            res.send("done");
        });
    },

    getComments: function(req, res) {
        db.Article.findById(req.params.id).populate("comments").then(data => {
            res.json(data.comments);
        });
    }
};

module.exports = article;