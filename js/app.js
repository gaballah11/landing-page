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
let buttonsList = document.querySelector("#navbar__list");
let sections = document.querySelectorAll("section");
let topNav = buttonsList.children;

/**
 * End Global Variables
 * 
 * 
*/



/**
 * 
 * Begin Main Functions
 * 
*/

// build the nav
for(let i = 1; i <=sections.length; ++i){
  let node = document.createElement("A");
  buttonsList.appendChild(node);
  node.outerHTML = `<a class="menu__link" data-link= "section${i}">Section ${i}</a>`
  
}


// Add class 'active' to section when near top of viewport
const addActiveClass = (observerEntries) => {
  observerEntries.forEach((observerEntry) => {
    const navListItem = document.querySelector(
      `a[data-link='${observerEntry.target.id}']`
    );
    const section = document.getElementById(observerEntry.target.id);
    const sectionClassList = section.classList;
    const navItemClassList = navListItem.classList;

    if (observerEntry?.isIntersecting) {
      navItemClassList.add("active");
      sectionClassList.add("your-active-class");
    } else {
      if (navListItem.classList.contains("active"))
        navItemClassList.remove("active");
      if (section.classList.contains("your-active-class"))
        sectionClassList.remove("your-active-class");
    }
  });
};

// Scroll to anchor ID using scrollTO event
const ScrollTo = () => {
  const navLinks = document.querySelectorAll(".menu__link");
  navLinks.forEach(
    (link) => {
      link.addEventListener( "click",
      (a) =>{
        a.preventDefault();
        const targ = a.target;
        document.getElementById(targ.dataset.link)
          .scrollIntoView({block: "start", behavior: "smooth"});
      }
      )
    }
  )
}

/**
 * End Main Functions
 * Begin Events
 * 
*/


// Scroll to section on link click
ScrollTo();

// Set sections as active
window.addEventListener('DOMContentLoaded', () => {

  const setObserverForSections = (sections) => {
  
    const observer = new IntersectionObserver(addActiveClass, {
      threshold: 0.6, 
    });
  
  
    sections.forEach((section) => {
      observer.observe(document.getElementById(section.id));
    });
    return observer;
  };
  
  
  
  setObserverForSections(sections);

});
