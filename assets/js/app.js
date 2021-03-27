/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let sections = document.querySelectorAll('section');
let menu = document.getElementById('navbar_list');
let active = sections[0];
//prActive keep the previous active section
// clicked keep the previous clicked section
let menuItem, prActive, prClicked, clicked;

// build the nav
// using for-in loop, i had an error in the console 'getAttribute is not a function'
// solution - https://stackoverflow.com/questions/40835675/why-does-chrome-throw-getattribute-is-not-a-function-error-inside-a-for-loop
for (let section = 0; section < sections.length; section++){
    let aElement = document.createElement('a');
    let liElement = document.createElement('li');

    // set href value
    aElement.href = '#'+ sections[section].id;

    // set class
    aElement.classList.add('menu_link');

    // set text value
    aElement.appendChild(document.createTextNode(sections[section].getAttribute('data-nav')));

    menu.appendChild(liElement).appendChild(aElement);


    // Scroll to anchor ID using scrollTO event
    aElement.addEventListener('click', function (e) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        e.preventDefault();

        menuItem = menu.querySelectorAll('a');

        // add active-class to section
        if(prClicked == null){
            prClicked = section;
        } else {
            prClicked = clicked;
        }

        prActive = active;

        removeActive(menuItem[prClicked], 'active');
        removeActive(prActive, 'active_class');

        clicked = section;
        active = sections[section];

        addActive(menuItem[clicked], 'active');
        addActive(active, 'active_class');

        // this refers to aElement
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });

}

/* When the user scrolls, hide the navbar */
let timeoutNavbar = null;
window.addEventListener('scroll', function() {
    if(window.scrollY == 0){
        displayBlock();
    } else {
        if(timeoutNavbar != null){
            displayBlock();
        }
        timeoutNavbar = setTimeout(displayNone, 5000);
    }

    let currentPos = window.scrollY;

}, false);


function addActive(element, classTxt){
    element.classList.add(String(classTxt));
}

function removeActive(element, classTxt){
    element.classList.remove(String(classTxt));
}

function displayNone() {
    menu.style.display = 'none';
}

function displayBlock() {
    clearTimeout(timeoutNavbar);
    menu.style.display = 'block';
}

// Add class 'active' to section when near top of viewport