/* =================================
   SELECT ELEMENTS
================================= */

const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput =
    document.getElementById("confirmPassword");

const termsInput = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError =
    document.getElementById("passwordError");
const confirmPasswordError =
    document.getElementById("confirmPasswordError");
const termsError = document.getElementById("termsError");

const successMessage =
    document.getElementById("successMessage");

const liveStatus =
    document.getElementById("liveStatus");

const togglePassword =
    document.getElementById("togglePassword");


/* =================================
   STATUS UPDATE
================================= */

function updateStatus(message) {

    liveStatus.textContent = message;
}


/* =================================
   SHOW ERROR
================================= */

function showError(input, errorElement, message) {

    errorElement.textContent = message;

    const wrapper =
        input.closest(".input-wrapper");

    if (wrapper) {

        wrapper.classList.remove("valid");

        wrapper.classList.add("invalid");
    }

    return false;
}


/* =================================
   SHOW SUCCESS
================================= */

function showValid(input, errorElement) {

    errorElement.textContent = "";

    const wrapper =
        input.closest(".input-wrapper");

    if (wrapper) {

        wrapper.classList.remove("invalid");

        wrapper.classList.add("valid");
    }

    return true;
}


/* =================================
   VALIDATE NAME
================================= */

function validateName() {

    const name = nameInput.value.trim();

    if (name === "") {

        return showError(
            nameInput,
            nameError,
            "Please enter your full name."
        );
    }


    if (name.length < 3) {

        return showError(
            nameInput,
            nameError,
            "Name must contain at least 3 characters."
        );
    }


    if (!/^[a-zA-Z ]+$/.test(name)) {

        return showError(
            nameInput,
            nameError,
            "Name can contain letters and spaces only."
        );
    }


    return showValid(
        nameInput,
        nameError
    );
}


/* =================================
   VALIDATE EMAIL
================================= */

function validateEmail() {

    const email = emailInput.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        return showError(
            emailInput,
            emailError,
            "Please enter your email address."
        );
    }


    if (!emailPattern.test(email)) {

        return showError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );
    }


    return showValid(
        emailInput,
        emailError
    );
}


/* =================================
   VALIDATE PHONE
================================= */

function validatePhone() {

    const phone = phoneInput.value.trim();

    const phonePattern =
        /^[0-9]{10}$/;


    if (phone === "") {

        return showError(
            phoneInput,
            phoneError,
            "Please enter your phone number."
        );
    }


    if (!phonePattern.test(phone)) {

        return showError(
            phoneInput,
            phoneError,
            "Phone number must contain 10 digits."
        );
    }


    return showValid(
        phoneInput,
        phoneError
    );
}


/* =================================
   VALIDATE PASSWORD
================================= */

function validatePassword() {

    const password =
        passwordInput.value;


    if (password === "") {

        return showError(
            passwordInput,
            passwordError,
            "Please create a password."
        );
    }


    if (password.length < 8) {

        return showError(
            passwordInput,
            passwordError,
            "Password must contain at least 8 characters."
        );
    }


    return showValid(
        passwordInput,
        passwordError
    );
}


/* =================================
   VALIDATE CONFIRM PASSWORD
================================= */

function validateConfirmPassword() {

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    if (confirmPassword === "") {

        return showError(
            confirmPasswordInput,
            confirmPasswordError,
            "Please confirm your password."
        );
    }


    if (confirmPassword !== password) {

        return showError(
            confirmPasswordInput,
            confirmPasswordError,
            "Passwords do not match."
        );
    }


    return showValid(
        confirmPasswordInput,
        confirmPasswordError
    );
}


/* =================================
   VALIDATE TERMS
================================= */

function validateTerms() {

    if (!termsInput.checked) {

        termsError.textContent =
            "Please accept the terms and conditions.";

        return false;
    }


    termsError.textContent = "";

    return true;
}


/* =================================
   REAL-TIME VALIDATION
================================= */

nameInput.addEventListener(
    "input",
    validateName
);


emailInput.addEventListener(
    "input",
    validateEmail
);


phoneInput.addEventListener(
    "input",
    validatePhone
);


passwordInput.addEventListener(
    "input",
    () => {

        validatePassword();

        if (confirmPasswordInput.value !== "") {

            validateConfirmPassword();
        }
    }
);


confirmPasswordInput.addEventListener(
    "input",
    validateConfirmPassword
);


termsInput.addEventListener(
    "change",
    validateTerms
);


/* =================================
   PASSWORD VISIBILITY
================================= */

togglePassword.addEventListener(
    "click",
    () => {

        const isPassword =
            passwordInput.type === "password";


        passwordInput.type =
            isPassword
                ? "text"
                : "password";


        togglePassword.textContent =
            isPassword
                ? "🙈"
                : "👁";
    }
);


/* =================================
   FORM SUBMISSION
================================= */

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        updateStatus(
            "Validating your information..."
        );


        const isNameValid =
            validateName();

        const isEmailValid =
            validateEmail();

        const isPhoneValid =
            validatePhone();

        const isPasswordValid =
            validatePassword();

        const isConfirmPasswordValid =
            validateConfirmPassword();

        const areTermsValid =
            validateTerms();


        const formIsValid =
            isNameValid &&
            isEmailValid &&
            isPhoneValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            areTermsValid;


        if (formIsValid) {

            successMessage.classList.add("show");

            updateStatus(
                "✓ All inputs validated successfully"
            );

            successMessage.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        } else {

            successMessage.classList.remove("show");

            updateStatus(
                "Please correct the highlighted fields"
            );

        }
    }
);