$(document).ready(function() {

    var searchForm = $('#searchForm');
    var resultsDiv = $('#searchResults');
    var cityInput = $('#city');
    var bedsInput = $('#bedrooms');
    var rentLow = $('#rent1');
    var rentMax = $('#rent2');
    var searchCity;

    // eventListener for search form
    searchForm.on('submit', handleSearchForm);

    function handleSearchForm() {

        // stops html from doing its default actions
        event.preventDefault();

        // search with 1 param - city
        // searchCity = cityInput.val().trim();
        // console.log(searchCity);
        // getCity(searchCity);

        var searchObj = {

            bedrooms: bedsInput.val(),
            rent1: rentLow.val(),
            rent2: rentMax.val(),
            city: cityInput.val().trim(),
        };

        console.log(searchObj);
        getAll(searchObj);

    }

    // function ajax get method for bedrooms, city & rent
    function getAll(obj) {

        console.log('getAll obj', obj);

        $.get('/api/fs/' + obj, function cb(err, data) {

            if (err) {
                console.log(err);
            };
            console.log(data);

            renderUnits(data);
        });
    }

    function getCity(searchObj) {

        console.log(searchObj);

        // ajax get call for a city or all units in database
        // $.get("/api/unit/", searchObj, function(err, data) {
        $.get('/api/units/city/' + searchObj, function(data) {

            // if (err) {
            //     console.log(err);
            //     res.status(500);
            // }
            // if (err) throw err;

            console.log(data);

            if (!data || !data.length) {
                displayEmpty();
            } else {
                // call function & pass data
                renderUnits(data);
            }
        });
    }

    // function accepts an arguement & writes the results to search.html
    function renderUnits(data) {
        console.log('renderUnits data:', data);

        resultsDiv.empty();

        // For each book that our server sends us back
        for (var i = 0; i < data.length; i++) {
            // Create a parent div to hold book data
            var newDiv = $("<div>");
            // Add a class to this div: 'results'
            newDiv.addClass("results");
            // Add an id to the results to mark which results it is
            newDiv.attr("id", "unitResults-" + i);
            // Append the results to the searchResults div
            resultsDiv.append(newDiv);

            // add our unit data to the results we just placed on the page
            $("#unitResults-" + i).append("<h2>" + (i + 1) + ". " + data[i].title + "</h2>");
            $("#unitResults-" + i).append("<h3>Bedroom(s): " + data[i].bedrooms + "</h4>");
            $("#unitResults-" + i).append("<h3>Rent: " + data[i].rent + "</h4>");
            $("#unitResults-" + i).append("<h3>Available: " + data[i].availability + "</h4>");
        };
    }
    // This function displays a message when there are no posts
    function displayEmpty() {

        resultsDiv.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No Matches Found");
        resultsDiv.append(messageH2);
    }



});