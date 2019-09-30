$(document).ready(function() {

    var resultsDiv = $('#searchResults');
    var city = $('#city');

    $('#searchUnits').on('click', getUnits);

    function getUnits(city) {
        console.log(city);
        var cityInput = city || "";
        if (cityInput) {
            cityInput = '/?' + cityInput;
        }
        // ajax get call for a city or all units in database
        $.get("/api/unit/" + city, function(data) {
            console.log('units', data);
            units = data;
            if (!units || !units.length) {
                displayEmpty();
            } else {
                // call function & pass data
                renderUnits();
            }
        });
    }

    // function accepts an arguement & writes the results to search.html
    function renderUnits() {
        console.log('render data', data);
        // For each book that our server sends us back
        for (var i = 0; i < data.length; i++) {
            // Create a parent div to hold book data
            var newDiv = $("<div>");
            // Add a class to this div: 'results'
            newDiv.addClass("results");
            // Add an id to the results to mark which results it is
            newDiv.attr("id", "unitResults-" + i);
            // Append the results to the results section
            resultsDiv.append();

            // Now  we add our unit data to the results we just placed on the page
            $("#unitResults-" + i).append("<h2>" + (i + 1) + ". " + data[i].desc + "</h2>");
            $("#unitResults-" + i).append("<h3>Bedroom(s): " + data[i].bedrooms + "</h4>");
            $("#unitResults-" + i).append("<h3>Rent: " + data[i].rent + "</h4>");
            $("#unitResults-" + i).append("<h3>Avaiable: " + data[i].availablity + "</h4>");
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