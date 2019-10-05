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
    searchForm.on('submit', clearSearchInputs);

    function handleSearchForm() {

        // stops html from doing its default actions
        event.preventDefault();

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

        var queryStr = obj.bedrooms + '/city/' + obj.city + '/rentlow/' + obj.rent1 + '/renthigh/' + obj.rent2;
        console.log(queryStr);

        // /api/fs/bedrooms/:bedrooms/city/:city/rentlow/:rent1/renthigh/:rent2
        $.get('/api/fs/bedrooms/' + queryStr, function(data) {

            // if (err) {
            //     console.log(err);
            // };

            console.log(data);

            if (!data || !data.length) {
                displayEmpty();
            } else {
                // call function & pass data
                renderRow(data);
            };
        });
    }

    // 
    function renderRow(data) {

        // console.log('hit renderRow')
        resultsDiv.empty();

        // For each unit that our server sends back
        for (var i = 0; i < data.length; i++) {
            // Create a parent div to hold book data
            var newDiv = $("<div>");
            // Add a class to this div: 'results'
            newDiv.addClass("card results");
            // Add an id to the results to mark which results it is
            newDiv.attr("id", "unitResults-" + i);
            newDiv.attr("style", "width: 18rem;");

            var newDiv2 = $("<div>").addClass("card-body");
            var img = $('<img>').attr("class", "card-img-top");
            var h5 = $('<h5>').addClass("card-title").attr("id", "title" + i);
            var p = $("<p>").addClass("card-text").attr("id", "text" + i);
            var p2 = $("<p>").addClass("card-text2").attr("id", "text" + i);
            var button = $('<button>');
            button.addClass("btn btn-primary btn-rental");

            newDiv2.append(h5);
            newDiv2.append(p);
            newDiv2.append(p2);
            newDiv2.append(button);

            // Append the results to the searchResults div
            newDiv.append(img);
            newDiv.append(newDiv2);
            resultsDiv.append(newDiv);

            img.attr("src", "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80");
            $("#title" + i).text(data[i].title);
            $(".card-text").text("Bedroom(s): " + data[i].bedrooms);
            $(".card-text2").text("Rent: " + data[i].rent);
            $(".btn-rental").text(data[i].availability);

            clearSearchInputs();
        };
    }

    function clearSearchInputs() {
        $('#searchForm')[0].reset();
    }

    // function to findAll by city
    function getCity(searchObj) {

        console.log(searchObj);

        // ajax get call for a city or all units in database
        $.get('/api/units/city/' + searchObj, function(data) {

            // if (err) {
            //     console.log(err);
            //     res.status(500);
            // }

            console.log(data);

            if (!data || !data.length) {
                displayEmpty();
            } else {
                // call function & pass data
                render(data);
            };
        });
    }

    // This function displays a message when there are no posts
    function displayEmpty() {

        resultsDiv.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No Matches Found");
        resultsDiv.append(messageH2);
        clearSearchInputs();
    }

});