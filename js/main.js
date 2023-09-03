import Home from "./home.js";
import Details from "./detailsPage.js";
import Validation from "./validation.js";
const details = new Details;
const home = new Home;
const validation = new Validation;
let navigateArray = [];
home.displayHomePage();
navigateArray.push({ fun: `home.displayHomePage`, arg: `` });

/* -------------------------- */
/* Elements */

/* The div containing the closing and opening icons for the div */
const navOpenButton = $('.nav-toggle');
/* The navBar itself */
const navBar = $('nav');
/* Navbar items */
const navItems = $('ul li');
/* Home Icon in navBar */
const homeIcon = $('.home-page');

/* Search inputs */
const nameSearch = $('#nameSearch');
const letterSearch = $('#letterSearch');

/* Contact section */
const contact = $('#contact');
/* navigation arrow */
const arrow = $('.go-back');
const arrowForward = $('.go-forward');

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
/* directing to home Page */
homeIcon.click(function () {
    home.displayHomePage();
    navigateArray.push({ fun: `home.displayHomePage`, arg: `` });

})


/* Activating the categories item in  navBar */
navItems.eq(1).click(function () {
    home.displayCategories();
    navigateArray.push({ fun: `home.displayCategories`, arg: `` });

})
/* Activating the Area item in NavBar */
navItems.eq(2).click(function () {
    home.displayArea();
    navigateArray.push({ fun: `home.displayArea`, arg: `` });


})
/* Activating the ingredients item in NavBar */
navItems.eq(3).click(function () {
    home.displayIngredients();
    navigateArray.push({ fun: `home.displayIngredients`, arg: `` });

})
/* Activating the search item in NavBar */
navItems.eq(0).click(function () {
    home.hideOthers('#search');
    navigateArray.push({ fun: `home.hideOthers`, arg: `"#search"` });

})
/* Activating the contact item */
navItems.eq(4).click(function () {
    home.hideOthers('#contact')
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







/* Navigate between meals */
$('div[id=food-cards]').click(function (event) {
    let mealId = $(event.target).closest('[data-id]').attr('data-id');
    let catName = $(event.target).closest('[data-cat-name]').attr('data-cat-name');
    let areaName = $(event.target).closest('[data-area-name]').attr('data-area-name');
    let ingredName = $(event.target).closest('[data-ing-name]').attr('data-ing-name');
    if (mealId) {
        details.displayDetails(mealId);
        navigateArray.push({ fun: `details.displayDetails`, arg: mealId });

    } else if (areaName) {
        home.displayHomePage('filter', 'a', areaName);
        navigateArray.push({ fun: `home.displayHomePage`, arg: `'filter','a',"${areaName}"` });


    } else if (catName) {
        home.displayHomePage('filter', 'c', catName);
        navigateArray.push({ fun: `home.displayHomePage`, arg: `'filter','c',"${catName}"` });


    } else if (ingredName) {
        home.displayHomePage('filter', 'i', ingredName);
        navigateArray.push({ fun: `home.displayHomePage`, arg: `'filter','i',"${ingredName}"` });

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


/* Navigating through arrows */
let prev = 0;
arrow.click(function () {
    console.log(navigateArray);
    let len = navigateArray.length;

    let index = len - 2 - prev;
    /* Checking if there're previous pages to navigate to */
    if (index >= 0) {
        eval(navigateArray[index].fun + `(${navigateArray[index].arg})`);
        prev++;
    } else {
        console.log('firstPage');
    }
    /* Checking if the back arrow should be disabled  */
    if (index <= 0) {
        arrow.children().addClass('disabled')
    } else { arrow.children().removeClass('disabled') }
    /* checking if the forward arrow should be enabled */
    if (prev > 0) {
        arrowForward.children().removeClass('disabled');
        console.log(arrowForward.children());
    } else {
        arrowForward.children().addClass('disabled');
    }
    console.log(len, index);
/*     (`${navgiateArray[0]}`)();
 */});
arrowForward.click(function () {
    console.log(navigateArray);
    let len = navigateArray.length;
    let index = len - prev;

    if (prev > 0) {
        eval(navigateArray[index].fun + `(${navigateArray[index].arg})`);
        prev--;

    } else { console.log('lastPage'); }
    if (!(prev > 0)) {
        arrowForward.children().addClass('disabled');
    }
    if (index > 0) {
        arrow.children().removeClass('disabled');
        console.log(index);
    }
})