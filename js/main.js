import Home from "./home.js";
import Details from "./detailsPage.js";
import Validation from "./validation.js";
const details = new Details;
const home = new Home;
const validation = new Validation
home.displayHomePage();


/* -------------------------- */
/* Elements */

/* The div containing the closing and opening icons for the div */
const navOpenButton = $('.nav-toggle');
/* The navBar itself */
const navBar = $('nav');
/* Navbar items */
const navItems = $('ul li');
/* The Search section */
const search = $('#search');

/* Search inputs */
const nameSearch = $('#nameSearch');
const letterSearch = $('#letterSearch');

/* Contact section */
const contact = $('#contact');


/* Inputs of contact form  */
const userName = $('#userName');
const userEmail = $('#userEmail');
const userPhone = $('#userPhone');
const userAge = $('#userAge');
const userPassword = $('#userPassword');
const userRePassword = $('#userRePassword');
const submitBtn = $('#submitBtn')





/* ----------------------------------------------------------------------- */
/* Events */

/* This event for opening and closing the navBar and animate the li inside */
navOpenButton.click(function (event) {

    $('.fa-bars').toggleClass('d-none');
    $('.fa-xmark').toggleClass('d-none');
    navBar.toggleClass('start-0');
    for (let i = 0; i < 5; i++) {
        let x = $("ul  li").eq(i);
        if (x.css('top') == '400px') {
            x.animate({ top: '0px' }, (i + 5) * 100)
        } else { x.animate({ top: '400px' }, (5 - i) * 100) }
    }
})
/* Close Navbar when clicking outside it */


/* Activating the categories item in  navBar */
navItems.eq(1).click(function () {
    home.displayCategories()
})
/* Activating the Area item in NavBar */
navItems.eq(2).click(function () {
    home.displayArea();
})
/* Activating the ingredients item in NavBar */
navItems.eq(3).click(function () {
    home.displayIngredients();
})
/* Activating the search item in NavBar */
navItems.eq(0).click(function () {
    home.hideOthers('#search');;
})

/* Searching by name*/
nameSearch.keyup(function () {
    home.displayHomePage('search', 's', nameSearch.val());
})
/* Searching by First letter */
letterSearch.keyup(function () {
    if (letterSearch.val()) {
        home.displayHomePage('search', 'f', letterSearch.val());
    } else {
        home.displayHomePage('search', 's', nameSearch.val());
    }
})


/* Activating the contact item */
navItems.eq(4).click(function () {
    home.hideOthers('#contact')
    contact.removeClass('d-none');
})




/* Navigate between meals */
$('div[id=food-cards]').click(function (event) {
    let mealId = $(event.target).closest('[data-id]').attr('data-id');
    let catName = $(event.target).closest('[data-cat-name]').attr('data-cat-name');
    let areaName = $(event.target).closest('[data-area-name]').attr('data-area-name');
    let ingredName = $(event.target).closest('[data-ing-name]').attr('data-ing-name');
    if (mealId) {
        details.displayDetails(mealId)
    } else if (areaName) {
        home.displayHomePage('filter', 'a', areaName);
    } else if (catName) {
        home.displayHomePage('filter', 'c', catName);
    } else if (ingredName) {
        home.displayHomePage('filter', 'i', ingredName);
    }
})





/* Validate contact form */
userName.on('input', function () {
    validation.validateName();
})
userEmail.on('input', function () {
    validation.validateEmail();
})
userPhone.on('input', function () {
    validation.validatePhone();
})
userAge.on('input', function () {
    validation.validateAge();
})
userPassword.on('input', function () {
    validation.validatePassword();
})
userRePassword.on('input', function () {
    validation.validateRePassword();
})
/* Enable the Submit button */
let contactForm = $('#contact input');
contactForm.on('input', function () {
    if (validation.validateName() && validation.validateEmail() && validation.validatePhone() && validation.validateAge() && validation.validatePassword() && validation.validateRePassword()) {
        submitBtn.removeClass('disabled')
    } else { submitBtn.addClass('disabled') }
})
