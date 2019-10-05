// loads js when html page is done loading
$(document).ready(function() {
    console.log("loggedIn: " + sessionStorage.getItem("loggedIn"));
    // Returns null if it cannot find the item in sessionStorage. /
    if (!sessionStorage.getItem("loggedIn")) {
        window.location.href = "/login.html";
    }
    // use jQuery references to capture values from form on add.html
    var addUnitForm = $("#unitForm");
    var titleInput = $("#title")
    var rentInput = $('#rent');
    var bedroomsInput = $("#bedrooms");
    var bathsInput = $("#baths");
    var avgSqFtInput = $("#avgSqFt");
    var availabilityInput = $("#availability");
    var addressInput = $("#address");
    var cityInput = $("#city");
    var stateInput = $("#state");
    var zipInput = $("#zip");
    var phoneInput = $("#phone");
    var descInput = $("#desc");
    var typeSelect = $("#type");
    // add unit form eventListener with 2 arguements. HandleAddUnitForm is a function reference
    $(addUnitForm).on("submit", handleAddUnitForm);
    // optional feature to capture query string from url (i.e. ?unit_id=23)
    var url = window.location.search;
    var unitId;
    var updating = false;
    // use when wanting to edit a post
    // If we have this section in our url, we pull out the unit id from the url
    // In localhost:3000/api/units/?unitId=1, postId is 1
    // if (url.indexOf("?unitId=") !== -1) {
    //     unitId = url.split("=")[1];
    //     getUnitData(unitId, "unit");
    // }
    // **********FUNCTION DEFINITIONS********
    function handleAddUnitForm() {
        // stops html from doing its default actions
        event.preventDefault();
        // form validation conditional. if these fields are empty then don 't submit form
        if (!titleInput.val().trim() || !rentInput.val().trim() || !bedroomsInput.val().trim() || !bathsInput.val().trim() ||
            !availabilityInput.val().trim() || !cityInput.val().trim() ||
            !stateInput.val().trim() || !zipInput.val().trim()) {
            return;
        }
        // Constructing a newUnit object to pass to database
        var newUnit = {
            title: titleInput.val().trim(),
            rent: rentInput.val().trim(),
            bedrooms: bedroomsInput.val(),
            baths: bathsInput.val().trim(),
            avgSqFt: avgSqFtInput.val().trim(),
            availability: availabilityInput.val().trim(),
            address: addressInput.val().trim(),
            city: cityInput.val().trim(),
            state: stateInput.val().trim(),
            zip: zipInput.val().trim(),
            phone: phoneInput.val().trim(),
            desc: descInput.val().trim(),
            type: typeSelect.val()
        };
        console.log(newUnit);
        // If we're updating a Unit run updateUnit to update a Unit
        // Otherwise run submitUnit to create a whole new Unit
        if (updating) {
            newUnit.id = unitId;
            updateUnit(newUnit);
        } else {
            submitUnit(newUnit);
        }
    }
    // Submits a new Unit and brings user to # page or show modal upon completion
    function submitUnit(Unit) {
        console.log('posting new unit...');
        // ajax post method call with 3 arguements
        // route to server, obj with new unit values & function declaration
        $.post("/api/units/", Unit, function(err) {
            if (err) {
                console.log("post err", err)
            }
            // Show the modal
            console.log('New Unit Added!')
            $('#results-modal').modal("show");
            $('#unitForm')[0].reset();
        });
    }
 });