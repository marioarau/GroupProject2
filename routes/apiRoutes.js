// import entire models folder
var db = require("../models");

// Necessary for rent min & max
const Op = db.Sequelize.Op;

// export this function that's passing an express server instance as an arguement
module.exports = function (app) {

    // Get all routes for returning all units in database
    app.get('/api/units', function (req, res) {
        // findAll returns all entries from a table when used without options
        db.Unit.findAll({})

            // the callback function returns & gives us access to the entire table 
            .then(function (results) {

                // returns data as json 
                return res.json(results);
            })
            .catch(function (err) {
                res.status(500);
            });
    });

    // get route to find one unit by its id
    app.get('/api/units/:id', function (req, res) {

        // console.log('=================')
        // console.log(req.params.id)

        // reference models unit.js & find 1 unit by id passed in url
        db.Unit.findOne({
            where: {
                id: req.params.id
            }
            // return data as json
        }).then(function (result) {
            return res.json(result);
        })
            .catch(function (err) {
                res.status(500);
            });
    });

    // get route that returns all posts by zip code
    app.get('/api/units/zip/:zip', function (req, res) {

        console.log(req);

        db.Unit.findAll({
            where: {
                zip: req.params.zip
            }
        })
            .then(function (results) {
                res.json(results);
            })
            .catch(function (err) {
                res.status(500);
            });
    });

    // get route that returns all posts by city
    app.get('/api/units/city/:city', function (req, res) {
        console.log('apiRoute city data:')
        console.log(req.params)
        console.log(req.params.city)

        db.Unit.findAll({
            where: {
                city: req.params.city
            }
        })
            .then(function (results) {
                console.log(results)
                res.json(results);
            })
            .catch(function (err) {
                res.status(500);
            });
    });

    // get route for bedrooms, rent (min & max) & city
    // POSTMAN localhost:3000/api/fs/bedrooms/1/city/Los Angeles/rentlow/900/renthigh/1200
    app.get('/api/fs/bedrooms/:bedrooms/city/:city/rentlow/:rent1/renthigh/:rent2', function (req, res) {

        console.log(req.params);
        console.log("bedrooms: ", req.params.bedrooms);
        console.log("city: ", req.params.city);
        console.log("rentlow: ", req.params.rent1);
        console.log("renthigh: ", req.params.rent2);
        db.Unit.findAll({
            where: {
                bedrooms: req.params.bedrooms,
                city: req.params.city,
                rent: {
                    [Op.between]: [req.params.rent1, req.params.rent2]
                }
            }
        })
            .then(function (results) {
                res.json(results);
            })
            .catch(function (err) {
                res.status(500);
            });
    });

    // post route for saving a new unit to database
    app.post("/api/units", function (req, res) {

        console.log('Add Unit Data:', req.body);

        // create() requires an object describing the new data we're adding to table
        db.Unit.create({

            // landLordId: req.body.id,
            title: req.body.title,
            rent: req.body.rent,
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

        }).then(function (results) {
            res.json(results);

        }).catch(function (err) {
            //replace with better err handler
            console.log(err)
        });
    });

    // route to delete an unit by id
    app.delete("/api/units/:id", function (req, res) {
        console.log('req.params.id');
        console.log(req.params.id);

        db.Unit.destroy({
            where: { id: req.params.id }
        })
            .then(function (results) {
                res.json(results);
            });
    });

    // route to update a unit in table
    app.put("/api/units", function (req, res) {

        console.log('Units Data');
        console.log(req.body);

        // connect to unit model & update it with these obj properties
        db.Units.update(
            req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    app.post('/api/login', function (req, res) {

        console.log('entering login...');
        console.log("req.body: " + JSON.stringify(req.body));

        db.Tenant.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (user) {
            console.log("user: " + JSON.stringify(user));
            if (!user) {
                res.render('login.jade', { error: 'Invalid email or password.' });
            }
            else {
                console.log("req.body.password: " + req.body.password);
                console.log("user.password: " + user.password);

                if (req.body.password === user.password) {
                    // sets a cookie with the user's info
                    //res.redirect('/dashboard');
                    res.redirect('/');
                }
                else {
                    // error page
                    res.render('login.jade', { error: 'Invalid email or password.' });
                }
            }
            return res.json(result);
        }).catch(function (err) {
            res.status(500);
        });
    });

    app.post('/api/landlord/login', function (req, res) {

        console.log('entering login...');
        console.log("req.body: " + JSON.stringify(req.body));

        db.Landlord.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (user) {
            console.log("user: " + JSON.stringify(user));
            if (!user) {
                res.render('login.jade', { error: 'Invalid email or password.' });
            }
            else {
                console.log("req.body.password: " + req.body.password);
                console.log("user.password: " + user.password);

                if (req.body.password === user.password) {
                    // sets a cookie with the user's info
                    return res.json(user);
                }
                else {
                    // error page
                    res.render('login.jade', { error: 'Invalid email or password.' });
                }
            }
            return res.json(result);
        }).catch(function (err) {
            res.status(500);
        });
    });

}
