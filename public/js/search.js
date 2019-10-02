$(document).ready(function() {

    var searchFormDiv = $('#searchForm');
    var resultsDiv = $('#searchResults');
    var cityInput = $('#city');
    var searchCity = "";

    // eventListener for search form
    searchFormDiv.on('submit', handleSearchForm);

    function handleSearchForm() {

        // stops html from doing its default actions
        event.preventDefault();

        searchCity = cityInput.val().trim();
        console.log(searchCity);

        // var searchObj = {
        //     rent: $('#rent').val().trim(),
        //     bedrooms: $('#bedrooms').val().trim(),
        //     city: searchCity
        // };
        // all(searchObj);

        getUnits(searchCity);
    }

    function all(obj) {
        $.get("/api/units/" + obj, function(data) {
            console.log(data);
        });
    }

    function getUnits(searchObj) {


        console.log(searchObj);
        // console.log(searchObj.city);

        // ajax get call for a city or all units in database
        // $.get("/api/unit/", searchObj, function(err, data) {
        $.get("/api/units/city/" + searchObj, function(data) {

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