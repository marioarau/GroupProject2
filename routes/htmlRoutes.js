// Dependencies
// =============================================================
var path = require("path");

// HTML Routes
// =============================================================

module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads home.html
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/search.html"));
    });

    // about route loads about.html
    app.get("/about", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/about.html"))
    });

    // add route loads add.html
    app.get("/add", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/add.html"));
    });

    // rentals route loads search.html
    app.get("/rentals", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/rentals.html"));
    });

    // login route loads author-manager.html
    app.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

};


// code imported when Ashton created project
// var db = require("../models");
// module.exports = function(app) {
//   // Load index page
//   app.get("/search", function(req, res) {
//     db.Unit.findAll({}).then(function(dbExamples) {
//       res.render("search", {
//         msg: "Welcome!",
//         units: dbExamples
//       });
//     });
//   });

//   // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Unit.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.render("example", {
//         example: dbExample
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };