// loads js when html page is done loading
$(document).ready(function() {

    // use jQuery references to capture values from form on add.html
    var landlordLoginForm = $("#landlordLoginForm");
                                
    var email = $("#email")
    var password = $('#password');

    // add unit form eventListener with 2 arguements. HandleAddUnitForm is a function reference 
    $(landlordLoginForm).on("submit", handleLandlordLoginForm);

    // **********FUNCTION DEFINITIONS********

    function handleLandlordLoginForm() {

        // stops html from doing its default actions
        event.preventDefault();

        // form validation conditional. if these fields are empty then don 't submit form
        if (!email.val().trim() || !password.val().trim()) {
            return;
        }

        // Constructing a newUnit object to pass to database
        var newLogin = {
            email: email.val().trim(),
            password: password.val().trim()
        };

        console.log(newLogin);

        // If we're updating a Unit run updateUnit to update a Unit
        // Otherwise run submitUnit to create a whole new Unit
        submitLandlordLogin(newLogin);
    }

    // Submits a new Unit and brings user to # page or show modal upon completion
    function submitLandlordLogin(login) {

        console.log('posting landlord login ...'+JSON.stringify(login));

        // ajax post method call with 3 arguements
        // route to server, obj with new unit values & function declaration

        $.post('/api/landlord/login/', login, function (res) {

            console.log('after posting landlord login ...');
            if (res) {
                console.log("post err", res)
            }
            // need to replace these 2 lines with a success modal when new unit succesfully added
            console.log("login info: "+JSON.stringify(login));
            console.log("login.email: "+JSON.stringify(login.email));
            console.log("res: ", res);
            sessionStorage.setItem('loggedIn', login.email);
            sessionStorage.setItem('landlordId', res.id);
            console.log('Logged in successfully');
            window.location.href = "/add.html";
        });
    }
});