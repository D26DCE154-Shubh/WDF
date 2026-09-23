console.log("StudentHub Javascript Loaded Successfully.");
console.log("Welcome To The StudentHub.");
console.log("Practical-4 Javascript");


function welcomepage(){
    console.log("Welcome To The StudentHub.")
}

welcomepage();

function student(name, mycourse){
    console.log("Hii, I Am " + name + " I Am In " + mycourse + " Departement.");
}


/* =========================================================
   STUDENTHUB JAVASCRIPT
   ========================================================= */

console.log("StudentHub Javascript Loaded Successfully.");
console.log("Welcome To The StudentHub.");
console.log("Practical-4 Javascript");


/* =========================================================
   BASIC JAVASCRIPT VARIABLES
   ========================================================= */

let studentname = "Fenil";
let course = "Information Technology";
let semester = "3";

console.log(studentname);
console.log(course);
console.log(semester);


let college = "CHARUSAT";
let year = "2026";
let isStudent = true;

console.log(college);
console.log(year);
console.log(isStudent);


/* =========================================================
   WELCOME FUNCTION
   ========================================================= */

function welcomepage() {

    console.log("Welcome To The StudentHub.");

}

welcomepage();


/* =========================================================
   STUDENT FUNCTION
   ========================================================= */

function student(name, mycourse) {

    console.log(
        "Hii, I Am " +
        name +
        " I Am In " +
        mycourse +
        " Department."
    );

}

student("Fenil Rathod", "IT");


/* =========================================================
   WAIT FOR HTML TO LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       DARK MODE
       ===================================================== */

    const themeToggle =
        document.getElementById("theme-toggle");


    const root =
        document.documentElement;


    /*
       Get previously saved theme.

       If no theme has been saved,
       use light mode.
    */

    const savedTheme =
        localStorage.getItem("studenthub-theme");


    if (savedTheme === "dark") {

        root.setAttribute("data-theme", "dark");

    } else {

        root.setAttribute("data-theme", "light");

    }


    /* Update button icon */

    function updateThemeButton() {

        if (!themeToggle) {
            return;
        }


        const isDark =
            root.getAttribute("data-theme") === "dark";


        if (isDark) {

            themeToggle.textContent = "☀️";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            themeToggle.textContent = "🌙";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );

        }

    }


    updateThemeButton();


    /* Theme toggle click */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const currentTheme =
                    root.getAttribute("data-theme");


                if (currentTheme === "dark") {

                    root.setAttribute(
                        "data-theme",
                        "light"
                    );

                    localStorage.setItem(
                        "studenthub-theme",
                        "light"
                    );

                } else {

                    root.setAttribute(
                        "data-theme",
                        "dark"
                    );

                    localStorage.setItem(
                        "studenthub-theme",
                        "dark"
                    );

                }


                updateThemeButton();

            }
        );

    }


    /* =====================================================
       HEADING CHANGE
       ===================================================== */

    const heading =
        document.getElementById("hero-heading");


    const headingChangeButton =
        document.getElementById(
            "heading-change-btn"
        );


    if (
        heading &&
        headingChangeButton
    ) {

        headingChangeButton.addEventListener(
            "click",
            function () {

                heading.innerHTML =
                    'Learn. <span>Connect. Grow.</span>';

            }
        );

    }


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    const faqQuestions =
        document.querySelectorAll(
            ".faq-question"
        );


    faqQuestions.forEach(function (question) {

        question.addEventListener(
            "click",
            function () {

                const faqItem =
                    question.closest(".faq-item");


                const isCurrentlyOpen =
                    faqItem.classList.contains("open");


                /*
                   Close all FAQ items.
                   This means only one answer
                   stays open at a time.
                */

                document
                    .querySelectorAll(".faq-item")
                    .forEach(function (item) {

                        item.classList.remove("open");

                        const itemButton =
                            item.querySelector(
                                ".faq-question"
                            );

                        const itemIcon =
                            item.querySelector(
                                ".faq-icon"
                            );


                        if (itemButton) {

                            itemButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }


                        if (itemIcon) {

                            itemIcon.textContent = "+";

                        }

                    });


                /*
                   If the clicked FAQ was closed,
                   open it.
                */

                if (!isCurrentlyOpen) {

                    faqItem.classList.add("open");

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );


                    const icon =
                        question.querySelector(
                            ".faq-icon"
                        );


                    if (icon) {

                        icon.textContent = "−";

                    }

                }

            }
        );

    });

});

/* =========================================================
   PRACTICAL 6
   FETCH API - JSON DATA, SEARCH, FILTER, SORT, PAGINATION
   ========================================================= */

const eventContainer = document.getElementById("eventContainer");

if (eventContainer) {

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortSelect = document.getElementById("sortSelect");
    const pagination = document.getElementById("pagination");

    let allEvents = [];
    let filteredEvents = [];
    let currentPage = 1;

    const eventsPerPage = 5;


    /* FETCH JSON DATA */
    eventContainer.innerHTML = "<p>Loading events...</p>";

    fetch("../data/events.json")

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load events.json");
            }

            return response.json();

        })

        .then(data => {

            allEvents = data;
            filteredEvents = [...allEvents];

            displayEvents();
            createPagination();

        })

        .catch(error => {

            eventContainer.innerHTML =
                `<p>Error loading events: ${error.message}</p>`;

            console.error(error);

        });


    /* DISPLAY EVENTS */

    function displayEvents() {

        eventContainer.innerHTML = "";

        const start =
            (currentPage - 1) * eventsPerPage;

        const end =
            start + eventsPerPage;

        const pageEvents =
            filteredEvents.slice(start, end);


        if (pageEvents.length === 0) {

            eventContainer.innerHTML =
                "<p>No events found.</p>";

            return;

        }


        pageEvents.forEach(event => {

            const card =
                document.createElement("article");

            card.className = "event-card";

            card.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Venue:</strong> ${event.venue}</p>
            `;

            eventContainer.appendChild(card);

        });

    }


    /* SEARCH + FILTER + SORT */

    function applyFilters() {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const selectedCategory =
            categoryFilter.value;


        filteredEvents =
            allEvents.filter(event => {

                const matchesSearch =
                    event.title
                        .toLowerCase()
                        .includes(searchText);

                const matchesCategory =
                    selectedCategory === "all" ||
                    event.category === selectedCategory;

                return matchesSearch && matchesCategory;

            });


        /* SORT */

        if (sortSelect.value === "dateAsc") {

            filteredEvents.sort(
                (a, b) =>
                    new Date(a.date) - new Date(b.date)
            );

        }

        else if (sortSelect.value === "dateDesc") {

            filteredEvents.sort(
                (a, b) =>
                    new Date(b.date) - new Date(a.date)
            );

        }


        currentPage = 1;

        displayEvents();
        createPagination();

    }


    /* PAGINATION */

    function createPagination() {

        pagination.innerHTML = "";

        const totalPages =
            Math.ceil(
                filteredEvents.length / eventsPerPage
            );


        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            const button =
                document.createElement("button");

            button.textContent = page;

            button.addEventListener(
                "click",
                function () {

                    currentPage = page;

                    displayEvents();
                    createPagination();

                }
            );

            pagination.appendChild(button);

        }

    }


    /* EVENT LISTENERS */

    searchInput.addEventListener(
        "input",
        applyFilters
    );

    categoryFilter.addEventListener(
        "change",
        applyFilters
    );

    sortSelect.addEventListener(
        "change",
        applyFilters
    );

}