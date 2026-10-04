/* =================================
   ELEMENT SELECTION
================================= */

const message = document.getElementById("message");
const messageBtn = document.getElementById("messageBtn");

const countDisplay = document.getElementById("count");
const countBtn = document.getElementById("countBtn");
const resetBtn = document.getElementById("resetBtn");

const nameInput = document.getElementById("nameInput");
const greetBtn = document.getElementById("greetBtn");
const greeting = document.getElementById("greeting");

const themeBtn = document.getElementById("themeBtn");
const themeStatus = document.getElementById("themeStatus");
const previewDot = document.querySelector(".preview-dot");

const statusText = document.getElementById("statusText");

const cards = document.querySelectorAll(".tilt-card");


/* =================================
   VARIABLES
================================= */

let count = 0;

let messageIndex = 0;


/* =================================
   DYNAMIC MESSAGES
================================= */

const messages = [
    "JavaScript makes webpages interactive!",
    "You just changed the content using the DOM.",
    "Great! Keep experimenting with frontend development.",
    "Every click can create a new user experience."
];


/* =================================
   UPDATE STATUS
================================= */

function updateStatus(text) {

    statusText.textContent = text;

}


/* =================================
   CHANGE MESSAGE
================================= */

messageBtn.addEventListener("click", function () {

    message.classList.remove("message-change");

    // Force animation restart
    void message.offsetWidth;

    message.textContent = messages[messageIndex];

    message.classList.add("message-change");

    messageIndex++;

    if (messageIndex >= messages.length) {
        messageIndex = 0;
    }

    updateStatus("Dynamic message updated successfully.");

});


/* =================================
   COUNTER
================================= */

countBtn.addEventListener("click", function () {

    count++;

    countDisplay.textContent = count;

    countDisplay.classList.remove("pop");

    void countDisplay.offsetWidth;

    countDisplay.classList.add("pop");

    updateStatus(`Counter increased to ${count}.`);

});


/* =================================
   RESET COUNTER
================================= */

resetBtn.addEventListener("click", function () {

    count = 0;

    countDisplay.textContent = count;

    updateStatus("Counter has been reset.");

});


/* =================================
   GREETING
================================= */

function greetUser() {

    const name = nameInput.value.trim();

    if (name === "") {

        greeting.textContent =
            "Please enter your name first.";

        updateStatus("Waiting for a name...");

        nameInput.focus();

        return;
    }


    greeting.textContent =
        `Hello, ${name}! 👋 Welcome to the interactive webpage.`;

    updateStatus(
        `Personalized greeting created for ${name}.`
    );

}


greetBtn.addEventListener("click", greetUser);


/* =================================
   ENTER KEY FOR GREETING
================================= */

nameInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        greetUser();

    }

});


/* =================================
   DARK / LIGHT MODE
================================= */

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");


    const lightMode =
        document.body.classList.contains("light-mode");


    if (lightMode) {

        themeBtn.textContent =
            "Enable Dark Mode";

        themeStatus.textContent =
            "Light Mode";

        previewDot.style.background =
            "#ffd76a";

        previewDot.style.boxShadow =
            "0 0 12px #ffd76a";

        updateStatus(
            "Light mode has been enabled."
        );

    } else {

        themeBtn.textContent =
            "Enable Light Mode";

        themeStatus.textContent =
            "Dark Mode";

        previewDot.style.background =
            "#8294ff";

        previewDot.style.boxShadow =
            "0 0 12px #8294ff";

        updateStatus(
            "Dark mode has been enabled."
        );

    }

});


/* =================================
   3D CARD TILT EFFECT
================================= */

cards.forEach(function (card) {

    card.addEventListener("mousemove", function (event) {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;


        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", function () {

        card.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

});