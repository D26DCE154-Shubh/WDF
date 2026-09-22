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

    const savedTheme =
        localStorage.getItem("studenthub-theme");


    if (savedTheme === "dark") {

        root.setAttribute("data-theme", "dark");

    } else {

        root.setAttribute("data-theme", "light");

    }


    /* Update Theme Button */

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


    /* Theme Toggle Click */

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


                if (!faqItem) {
                    return;
                }


                const isCurrentlyOpen =
                    faqItem.classList.contains("open");


                /*
                   Close all FAQ items
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
                   Open clicked FAQ
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


    /* =========================================================
       PRACTICAL 5
       REGISTRATION FORM VALIDATION
       ========================================================= */


    const registrationForm =
        document.getElementById(
            "registration-form"
        );


    /*
       Run Practical 5 code only when
       registration form exists.
    */

    if (registrationForm) {


        /* ---------------------------------------------
           GET FORM ELEMENTS
           --------------------------------------------- */

        const fullName =
            document.getElementById("full-name");

        const email =
            document.getElementById("email");

        const mobile =
            document.getElementById("mobile");

        const role =
            document.getElementById("role");

        const department =
            document.getElementById("department");

        const course =
            document.getElementById("course");

        const year =
            document.getElementById("year");

        const password =
            document.getElementById("password");

        const confirmPassword =
            document.getElementById("confirm-password");

        const agree =
            document.getElementById("agree");

        const successMessage =
            document.getElementById("success-message");

        const strengthBar =
            document.getElementById("strength-bar");

        const passwordStrength =
            document.getElementById(
                "password-strength"
            );


        /* ---------------------------------------------
           REGULAR EXPRESSIONS
           --------------------------------------------- */

        /*
           Name:
           Letters and spaces only.
        */

        const nameRegex =
            /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;


        /*
           Email:
           example@gmail.com
        */

        const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        /*
           Indian mobile number:
           Starts with 6, 7, 8 or 9
           followed by 9 digits.
        */

        const mobileRegex =
            /^[6-9]\d{9}$/;


        /* ---------------------------------------------
           ERROR HANDLING FUNCTIONS
           --------------------------------------------- */

        function showError(input, message) {

            const errorElement =
                document.getElementById(
                    input.id + "-error"
                );


            input.classList.remove(
                "input-valid"
            );

            input.classList.add(
                "input-error"
            );


            input.setAttribute(
                "aria-invalid",
                "true"
            );


            if (errorElement) {

                errorElement.textContent =
                    message;

            }


            return false;
        }


        function showSuccess(input) {

            const errorElement =
                document.getElementById(
                    input.id + "-error"
                );


            input.classList.remove(
                "input-error"
            );

            input.classList.add(
                "input-valid"
            );


            input.setAttribute(
                "aria-invalid",
                "false"
            );


            if (errorElement) {

                errorElement.textContent = "";

            }


            return true;
        }


        function clearValidation(input) {

            input.classList.remove(
                "input-error",
                "input-valid"
            );


            input.setAttribute(
                "aria-invalid",
                "false"
            );


            const errorElement =
                document.getElementById(
                    input.id + "-error"
                );


            if (errorElement) {

                errorElement.textContent = "";

            }

        }


        /* ---------------------------------------------
           FULL NAME VALIDATION
           --------------------------------------------- */

        function validateName() {

            const value =
                fullName.value.trim();


            if (value === "") {

                return showError(
                    fullName,
                    "Full name is required."
                );

            }


            if (value.length < 3) {

                return showError(
                    fullName,
                    "Name must contain at least 3 characters."
                );

            }


            if (!nameRegex.test(value)) {

                return showError(
                    fullName,
                    "Name should contain only letters and spaces."
                );

            }


            return showSuccess(fullName);

        }


        /* ---------------------------------------------
           EMAIL VALIDATION
           --------------------------------------------- */

        function validateEmail() {

            const value =
                email.value.trim();


            if (value === "") {

                return showError(
                    email,
                    "Email address is required."
                );

            }


            if (!emailRegex.test(value)) {

                return showError(
                    email,
                    "Please enter a valid email address."
                );

            }


            return showSuccess(email);

        }


        /* ---------------------------------------------
           MOBILE VALIDATION
           --------------------------------------------- */

        function validateMobile() {

            const value =
                mobile.value.trim();


            if (value === "") {

                return showError(
                    mobile,
                    "Mobile number is required."
                );

            }


            if (!mobileRegex.test(value)) {

                return showError(
                    mobile,
                    "Enter a valid 10-digit Indian mobile number."
                );

            }


            return showSuccess(mobile);

        }


        /* ---------------------------------------------
           ROLE VALIDATION
           --------------------------------------------- */

        function validateRole() {

            if (role.value === "") {

                return showError(
                    role,
                    "Please select your role."
                );

            }


            return showSuccess(role);

        }


        /* ---------------------------------------------
           DEPARTMENT VALIDATION
           --------------------------------------------- */

        function validateDepartment() {

            const value =
                department.value.trim();


            if (value === "") {

                return showError(
                    department,
                    "Department is required."
                );

            }


            if (value.length < 2) {

                return showError(
                    department,
                    "Please enter a valid department."
                );

            }


            return showSuccess(department);

        }


        /* ---------------------------------------------
           COURSE VALIDATION
           --------------------------------------------- */

        function validateCourse() {

            if (course.value === "") {

                return showError(
                    course,
                    "Please select a course."
                );

            }


            return showSuccess(course);

        }


        /* ---------------------------------------------
           YEAR VALIDATION
           --------------------------------------------- */

        function validateYear() {

            if (year.value === "") {

                return showError(
                    year,
                    "Please select your year."
                );

            }


            return showSuccess(year);

        }


        /* ---------------------------------------------
           GENDER VALIDATION
           --------------------------------------------- */

        function validateGender() {

            const selectedGender =
                document.querySelector(
                    'input[name="gender"]:checked'
                );


            const errorElement =
                document.getElementById(
                    "gender-error"
                );


            if (!selectedGender) {

                if (errorElement) {

                    errorElement.textContent =
                        "Please select your gender.";

                }

                return false;

            }


            if (errorElement) {

                errorElement.textContent = "";

            }


            return true;

        }


        /* ---------------------------------------------
           PASSWORD STRENGTH
           --------------------------------------------- */

        function checkPasswordStrength() {

            const value =
                password.value;


            let score = 0;


            /*
               Check minimum length
            */

            if (value.length >= 8) {
                score++;
            }


            /*
               Check uppercase
            */

            if (/[A-Z]/.test(value)) {
                score++;
            }


            /*
               Check lowercase
            */

            if (/[a-z]/.test(value)) {
                score++;
            }


            /*
               Check number
            */

            if (/[0-9]/.test(value)) {
                score++;
            }


            /*
               Check special character
            */

            if (/[^A-Za-z0-9]/.test(value)) {
                score++;
            }


            /*
               No password entered
            */

            if (value === "") {

                strengthBar.style.width = "0%";

                passwordStrength.textContent =
                    "Password strength: Not entered";

                return;

            }


            /*
               Weak password
            */

            if (score <= 2) {

                strengthBar.style.width =
                    "30%";

                passwordStrength.textContent =
                    "Password strength: Weak";

            }


            /*
               Medium password
            */

            else if (score <= 4) {

                strengthBar.style.width =
                    "65%";

                passwordStrength.textContent =
                    "Password strength: Medium";

            }


            /*
               Strong password
            */

            else {

                strengthBar.style.width =
                    "100%";

                passwordStrength.textContent =
                    "Password strength: Strong";

            }

        }


        /* ---------------------------------------------
           PASSWORD VALIDATION
           --------------------------------------------- */

        function validatePassword() {

            const value =
                password.value;


            if (value === "") {

                checkPasswordStrength();

                return showError(
                    password,
                    "Password is required."
                );

            }


            if (value.length < 8) {

                checkPasswordStrength();

                return showError(
                    password,
                    "Password must contain at least 8 characters."
                );

            }


            if (!/[A-Z]/.test(value)) {

                checkPasswordStrength();

                return showError(
                    password,
                    "Password must contain an uppercase letter."
                );

            }


            if (!/[a-z]/.test(value)) {

                checkPasswordStrength();

                return showError(
                    password,
                    "Password must contain a lowercase letter."
                );

            }


            if (!/[0-9]/.test(value)) {

                checkPasswordStrength();

                return showError(
                    password,
                    "Password must contain a number."
                );

            }


            if (!/[^A-Za-z0-9]/.test(value)) {

                checkPasswordStrength();

                return showError(
                    password,
                    "Password must contain a special character."
                );

            }


            checkPasswordStrength();

            return showSuccess(password);

        }


        /* ---------------------------------------------
           CONFIRM PASSWORD
           --------------------------------------------- */

        function validateConfirmPassword() {

            const value =
                confirmPassword.value;


            if (value === "") {

                return showError(
                    confirmPassword,
                    "Please confirm your password."
                );

            }


            if (value !== password.value) {

                return showError(
                    confirmPassword,
                    "Passwords do not match."
                );

            }


            return showSuccess(confirmPassword);

        }


        /* ---------------------------------------------
           TERMS VALIDATION
           --------------------------------------------- */

        function validateTerms() {

            const errorElement =
                document.getElementById(
                    "agree-error"
                );


            if (!agree.checked) {

                if (errorElement) {

                    errorElement.textContent =
                        "You must accept the terms and conditions.";

                }

                return false;

            }


            if (errorElement) {

                errorElement.textContent = "";

            }


            return true;

        }


        /* ---------------------------------------------
           REAL-TIME VALIDATION
           --------------------------------------------- */


        fullName.addEventListener(
            "input",
            validateName
        );


        email.addEventListener(
            "input",
            validateEmail
        );


        mobile.addEventListener(
            "input",
            validateMobile
        );


        role.addEventListener(
            "change",
            validateRole
        );


        department.addEventListener(
            "input",
            validateDepartment
        );


        course.addEventListener(
            "change",
            validateCourse
        );


        year.addEventListener(
            "change",
            validateYear
        );


        password.addEventListener(
            "input",
            function () {

                validatePassword();


                if (confirmPassword.value !== "") {

                    validateConfirmPassword();

                }

            }
        );


        confirmPassword.addEventListener(
            "input",
            validateConfirmPassword
        );


        document
            .querySelectorAll(
                'input[name="gender"]'
            )
            .forEach(function (radio) {

                radio.addEventListener(
                    "change",
                    validateGender
                );

            });


        agree.addEventListener(
            "change",
            validateTerms
        );


        /* ---------------------------------------------
           FORM SUBMISSION
           --------------------------------------------- */

        registrationForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const validName =
                    validateName();

                const validEmail =
                    validateEmail();

                const validMobile =
                    validateMobile();

                const validRole =
                    validateRole();

                const validDepartment =
                    validateDepartment();

                const validCourse =
                    validateCourse();

                const validYear =
                    validateYear();

                const validPassword =
                    validatePassword();

                const validConfirmPassword =
                    validateConfirmPassword();

                const validGender =
                    validateGender();

                const validTerms =
                    validateTerms();


                const isFormValid =
                    validName &&
                    validEmail &&
                    validMobile &&
                    validRole &&
                    validDepartment &&
                    validCourse &&
                    validYear &&
                    validPassword &&
                    validConfirmPassword &&
                    validGender &&
                    validTerms;


                /* -----------------------------------------
                   VALID FORM
                   ----------------------------------------- */

                if (isFormValid) {

                    successMessage.textContent =
                        "Registration successful! Your StudentHub account has been created.";


                    successMessage.style.display =
                        "block";


                    /*
                       Move keyboard focus to
                       success message.
                    */

                    successMessage.setAttribute(
                        "tabindex",
                        "-1"
                    );


                    successMessage.focus();


                    /*
                       Demo form:
                       Clear form after successful
                       validation.
                    */

                    registrationForm.reset();


                    strengthBar.style.width =
                        "0%";


                    passwordStrength.textContent =
                        "Password strength: Not entered";


                    /*
                       Remove validation styles.
                    */

                    document
                        .querySelectorAll(
                            ".input-valid, .input-error"
                        )
                        .forEach(function (element) {

                            element.classList.remove(
                                "input-valid",
                                "input-error"
                            );


                            element.setAttribute(
                                "aria-invalid",
                                "false"
                            );

                        });

                }


                /* -----------------------------------------
                   INVALID FORM
                   ----------------------------------------- */

                else {

                    successMessage.style.display =
                        "none";


                    /*
                       Focus first invalid field.
                    */

                    const firstInvalid =
                        registrationForm.querySelector(
                            ".input-error"
                        );


                    if (firstInvalid) {

                        firstInvalid.focus();

                    }

                }


            }

        );

    }

    // =========================================================
    // LOGIN FORM VALIDATION
    // =========================================================

    const loginForm = document.getElementById("login-form");

    if (loginForm) {

        const username = document.getElementById("username");
        const loginPassword = document.getElementById("login-password");

        const usernameError = document.getElementById("username-error");
        const loginPasswordError =
            document.getElementById("login-password-error");

        const loginSuccess =
            document.getElementById("login-success");


        // Username / Email Validation
        function validateLoginUsername() {

            const value = username.value.trim();

            username.classList.remove("input-error", "input-valid");
            usernameError.textContent = "";

            if (value === "") {

                usernameError.textContent =
                    "Username or email is required.";

                username.classList.add("input-error");
                username.setAttribute("aria-invalid", "true");

                return false;
            }

            // If @ is entered, validate it as an email
            if (value.includes("@")) {

                if (!emailRegex.test(value)) {

                    usernameError.textContent =
                        "Please enter a valid email address.";

                    username.classList.add("input-error");
                    username.setAttribute("aria-invalid", "true");

                    return false;
                }
            }

            username.classList.add("input-valid");
            username.setAttribute("aria-invalid", "false");

            return true;
        }


        // Password Validation
        function validateLoginPassword() {

            const value = loginPassword.value;

            loginPassword.classList.remove(
                "input-error",
                "input-valid"
            );

            loginPasswordError.textContent = "";

            if (value === "") {

                loginPasswordError.textContent =
                    "Password is required.";

                loginPassword.classList.add("input-error");
                loginPassword.setAttribute("aria-invalid", "true");

                return false;
            }

            if (value.length < 6) {

                loginPasswordError.textContent =
                    "Password must contain at least 6 characters.";

                loginPassword.classList.add("input-error");
                loginPassword.setAttribute("aria-invalid", "true");

                return false;
            }

            loginPassword.classList.add("input-valid");
            loginPassword.setAttribute("aria-invalid", "false");

            return true;
        }


        // Real-time validation
        username.addEventListener(
            "input",
            validateLoginUsername
        );

        loginPassword.addEventListener(
            "input",
            validateLoginPassword
        );


        // Form Submit
        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                loginSuccess.textContent = "";
                loginSuccess.classList.remove("show-success");

                const validUsername =
                    validateLoginUsername();

                const validPassword =
                    validateLoginPassword();


                if (validUsername && validPassword) {

                    loginSuccess.textContent =
                        "Login details are valid. Login successful!";

                    loginSuccess.classList.add("show-success");

                } else {

                    if (!validUsername) {

                        username.focus();

                    } else if (!validPassword) {

                        loginPassword.focus();

                    }
                }

            }
        );

    }

});