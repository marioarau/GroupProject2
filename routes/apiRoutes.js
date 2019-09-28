// import entire models folder
var db = require("../models");

// export this function that's passing an express server instance as an arguement
module.exports = function(app) {

    // Get all routes for returning all units in database
    app.get("/api/units", function(req, res) {
        // findAll returns all entries from a table when used without options
        db.Unit.findAll({})

        // the callback function returns & gives us access to the entire table 
        .then(function(results) {

                // returns data as json 
                return res.json(results);
            })
            .catch(function(err) {
                res.status(500);
            });
    });

    // get route to find one unit by its id
    app.get("/api/units/:id", function(req, res) {

        // console.log('=================')
        // console.log(req.params.id)

        // reference models unit.js & find 1 unit by id passed in url
        db.Unit.findOne({
                where: {
                    id: req.params.id
                }
                // return data as json
            }).then(function(result) {
                return res.json(result);
            })
            .catch(function(err) {
                res.status(500);
            });
    });

    // get route that returns all posts by zip code
    app.get("/api/units/zip/:zip", function(req, res) {
        db.Unit.findAll({
                where: {
                    zip: req.params.zip
                }
            })
            .then(function(results) {
                res.json(results);
            })
            .catch(function(err) {
                res.status(500);
            });
    });

    // post route for saving a new unit to database
    app.post("/api/units", function(req, res) {

        console.log('Add Unit Data:');
        console.log(req.body);

        // create() requires an object describing the new data we're adding to table
        db.Unit.create({

            unitId: req.body.id,
            bedrooms: req.body.bedrooms,
            baths: req.body.baths,
            avgSqFt: req.body.avgSqFt,
            availability: req.body.availability,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone,
            desc: req.body.desc,
            type: req.body.type

        }).then(function(results) {
            res.json(results);

        }).catch(function(err) {
            //replace with better err handler
            console.log(err)
        });
    });

    // Route to delete an unit by id
    app.delete("/api/units/:id", function(req, res) {
        console.log('req.params.id');
        console.log(req.params.id);

        db.Unit.destroy({ where: { id: req.params.id } }).then(function(results) {
            res.json(results);
        });
    });

    // route to update a unit in table
    app.put("/api/units", function(req, res) {

        console.log('Units Data');
        console.log(req.body);

        // connect to unit model & update it with these obj properties
        db.Units.update({

            //insert properties&values from req.body

        }, {
            where: {
                id: req.body.id
            }

            // callback function passes an arguement back equal to the results from database
        }).then(function(results) {

            // formats database data as json
            res.json(results);
        });
    });

};