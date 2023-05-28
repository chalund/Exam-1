const form = document.querySelector(".contact-form");
const fullName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError =document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#formMessage");
const messageError = document.querySelector("#messageError")
const errorMessage = document.querySelector("#errorMessage")


function validateForm (event) {
    event.preventDefault();

    let hasErrors = false;

    if(checkLength(fullName.value, 2) === true) {
        nameError.style.display = "none";
    } else {
        nameError.style.display = "block";
        hasErrors = true;
    }

    if(checkLength(subject.value, 4) === true) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
        hasErrors = true;
    }

    if(checkLength(message.value, 9) === true) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
        hasErrors = true;
    }

    if(validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
        hasErrors = true;
    }

    if (!hasErrors) {
        form.reset();
        alert("Your message is sent!");
        clearFields();
    } else {
        successMessage.style.display = "none";
    }
}

form.addEventListener("submit", validateForm)


function checkLength(value, length) {

    if(value.trim().length > length) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

function clearFields() {
    fullName.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
}