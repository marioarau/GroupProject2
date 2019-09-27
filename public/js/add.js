// loads js when html page is done loading
$(document).ready(function() {

    // use jQuery references to capture values from form on add.html
    var addUnitForm = $("#unit");
    var bedrooms = $("#bedroms");
    var baths = $("#baths");
    var avgSqFt = $("#avgSqFt");
    var availability = $("#availability");
    var address = $("#address");
    var city = $("#city");
    var state = $("#state");
    var zip = $("#zip");
    var phone = $("#phone");
    var desc = $("#desc");
    var type = $("#type");

    // optional feature to capture query string from url (i.e. ?unit_id=23)
    var url = window.location.search;
    var unitId;

    // set flag for if we're updating a unit or not
    var updating = false;

    // use when wanting to edit a post
    // If we have this section in our url, we pull out the unit id from the url
    // In localhost:3000/api/units/?unitId=1, postId is 1
    if (url.indexOf("?unitId=") !== -1) {
        unitId = url.split("=")[1];
        getUnitData(unitId);
    }

    $(addUnitForm).on('click', function handleAddUnitForm() {

        // stops html from doing its default actions
        event.preventDefault();

        // form validation conditional
        // if these fields are empty then don't submit form
        // if (!bedrooms.val().trim() || !baths.val().trim() ||
        //     !availability.val().trim() || !city.val().trim() ||
        //     !state.val().trim() || !zip.val().trim()) {
        //     return;
        // }

        // Constructing a newUnit object to pass to database
        var newUnit = {
            bedrooms: bedrooms.val().trim(),
            baths: baths.val().trim(),
            avgSqFt: avgSqFt.val().trim(),
            availability: availability.val().trim(),
            address: address.val().trim(),
            city: city.val().trim(),
            state: state.val().trim(),
            zip: zip.val().trim(),
            phone: phone.val().trim(),
            desc: desc.val().trim(),
            type: type.val()
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
    });

    // **********FUNCTION DEFINITIONS********

    // Submits a new Unit and brings user to # page or show modal upon completion
    function submitUnit(Unit) {

        // ajax post method call with 3 arguements
        // route to server, obj with new unit values & function declaration
        $.post("/api/units/", Unit, function() {

            // need to change where it loads or a success modal when new unit succesfully added
            // window.location.href = "/search";
            console.log('posting new unit...');
        });
    }

    // Gets post data for a post if we're editing
    function getUnitData(id) {
        $.get("/api/posts/" + id, function(data) {
            if (data) {
                // If this post exists, prefill our cms forms with its data
                // titleInput.val(data.title);
                // bodyInput.val(data.body);
                // postCategorySelect.val(data.category);
                // If we have a post with this id, set a flag for us to know to update the post
                // when we hit submit
                updating = true;
            }
        });
    }

    // Update a given unit, bring user to the # page when done
    function updateUnit(unit) {
        $.ajax({
                method: "PUT",
                url: "/api/units",
                data: unit
            })
            .then(function() {

                // need to change where it loads or a success modal when unit succesfully updated
                window.location.href = "/search";
            });
    }
});

// var newUnit = {
//     bedrooms: '1',
//     baths: '1',
//     avgSqFt: '490',
//     availability: '10/01/2019',
//     address: '24 street',
//     city: 'los angeles',
//     state: 'ca',
//     zip: '90024',
//     phone: '323-500-7777',
//     desc: 'cute 1 bedroom',
//     type: 'apartment'
// };