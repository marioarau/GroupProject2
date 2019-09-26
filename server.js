// dependencies
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

// import all files in models folder
var db = require("./models");

// set up express server
var app = express();

// set PORT for express
// Heroku needs process.env.PORT
var PORT = process.env.PORT || 3000;

// Middleware so express can handle data parsing from browser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static directory accessible by anyone via web browser
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// force: false won't create database if exists
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

// export express server instance
module.exports = app;