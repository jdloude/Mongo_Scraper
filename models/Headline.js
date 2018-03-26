const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleScema = new Schema({
    title: {
        type: String,
        unique: true,
        trim: true
    },
    link: {
        type: String,
        trim: true
    },
    summary: {
        type: String,
        trim: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Note" }]
});

const Article = mongoose.model("Article", articleScema);
module.exports = Article;