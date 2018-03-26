//required packages 
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

//set up express app
const app = express();
const port = process.env.port || 3000;

// Static directory
app.use(express.static(path.join(__dirname + '/public')));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Handlebars as the default templating engine.
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises & Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//set up routes
const routes = require("./routes");
app.use(routes);


// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
    console.log("App listening on port " + port);
});