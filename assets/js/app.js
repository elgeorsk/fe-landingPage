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

let sections = document.querySelectorAll('section');
let menu = document.getElementById('navbar_list');
let active = sections[0];
let sectionsPos;
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

        // add active class to section
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


let timeoutNavbar = null;
window.addEventListener('scroll', function() {
    // When the user scrolls, hide the navbar
    if(window.scrollY == 0){
        displayBlock();
    } else {
        if(timeoutNavbar != null){
            displayBlock();
        }

        timeoutNavbar = setTimeout(displayNone, 8000);
    }

    // Add class 'active' to section when near top of viewport
    sectionsPos = [];
    sections.forEach(getSectionPosition);
    menuItem = menu.querySelectorAll('a');
    let prPos = 0;

    for(pos in sectionsPos){
        // check if window.scrollY (scrollbar) is in-between the active section
        if (sectionsPos[pos].bottomSec > window.scrollY  && window.scrollY > sectionsPos[pos].topSec){
            addActive(menuItem[pos], 'active');
            addActive(sections[pos], 'active_class');
        // check if navbar is near to next/previous section
        } else if (sectionsPos[pos].bottomSec < window.scrollY || sectionsPos[pos].topSec > window.scrollY){
            prPos = pos;
            removeActive(menuItem[prPos], 'active');
            removeActive(sections[prPos], 'active_class');
        }
    }

}, false);

// add scroll to the top
let topBtn = document.getElementById('topBtn');
topBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
});


//get section position in the page
function getSectionPosition(section, index){
    sectionsPos.push({topSec: Math.floor(sections[index].getBoundingClientRect().top + window.scrollY - 100),
                      bottomSec: Math.floor(sections[index].getBoundingClientRect().bottom + window.scrollY - 100)});
}

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