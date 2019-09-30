$(document).ready(function() {

    $('#searchUnits').on('submit', searchDatabase);

    function searchDatabase() {
        // ajax get call for all units in database
        $.get("/api/unit", function(data) {

            // call function & pass data
            renderUnits(data);
        });
    }

    // function accepts an arguement & writes the results to search.html
    function renderUnits(data) {

        // For each book that our server sends us back
        for (var i = 0; i < data.length; i++) {
            // Create a parent div to hold book data
            var searchDiv = $("<div>");
            // Add a class to this div: 'results'
            searchDiv.addClass("results");
            // Add an id to the results to mark which results it is
            searchDiv.attr("id", "unitResults-" + i);
            // Append the results to the results section
            $("#searchResults").append();

            // Now  we add our book data to the results we just placed on the page
            $("#unitResults-" + i).append("<h2>" + (i + 1) + ". " + data[i].desc + "</h2>");
            $("#unitResults-" + i).append("<h3>Bedroom(s): " + data[i].bedrooms + "</h4>");
            $("#unitResults-" + i).append("<h3>Rent: " + data[i].rent + "</h4>");
            $("#unitResults-" + i).append("<h3>Avaiable: " + data[i].availablity + "</h4>");
        };
    }




});