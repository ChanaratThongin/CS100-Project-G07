const fullnameInput = document.getElementById("fullname");
const studentIDInput = document.getElementById("studentID");
const emailInput = document.getElementById("email");
const workTitleInput = document.getElementById("workTitle");
const activityTypeInput = document.getElementById("activityType");
const academicYearInput = document.getElementById("academicYear");
const semesterInput = document.getElementById("semester");
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");

// Function to validate Firstname and Lastname
function validateName() {
    const names = fullnameInput.value.trim().split(" ");
    const errorElement = document.getElementById("fullnameError");
    if (names.length !== 2) {
        errorElement.textContent = "Please enter both your Firstname and Lastname.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}

// Function to validate Student ID
function validateStudentID() {
    const studentIDPattern = /^\d{10}$/;
    const errorElement = document.getElementById("studentIDError");
    if (!studentIDPattern.test(studentIDInput.value)) {
        errorElement.textContent = "Please enter a 10-digit Student ID.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}

// Function to validate University Email
function validateEmail() {
    const emailPattern = /^.+@dome\.tu\.ac\.th$/;
    const errorElement = document.getElementById("emailError");
    if (!emailPattern.test(emailInput.value)) {
        errorElement.textContent =
            "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}

function validateworkTitle() {
    const errorElement = document.getElementById("workTitleError");
    if (workTitleInput.value.length < 1) {
        errorElement.textContent = "Please enter your work/activity title.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}

function validateactivityType() {
    const errorElement = document.getElementById("activityTypeError");
    if (activityTypeInput.value == 0) {
        errorElement.textContent = "Please enter your work/activity type.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}

function validateacademicYear() {
    const errorElement = document.getElementById("academicYearError");
    if (academicYearInput.value == 0) {
        errorElement.textContent = "Please enter your academic year.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}

function validatesemester() {
    const errorElement = document.getElementById("semesterError");
    if (semesterInput.value == 0) {
        errorElement.textContent = "Please enter your semester.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}

function validatestartDate() {
    const errorElement = document.getElementById("startDateError");
    if (startDateInput.value == "") {
        errorElement.textContent = 'Please enter a date/time.';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validatestartDate() {
    const errorElement = document.getElementById("startDateError");
    if (startDateInput.value == "") {
        errorElement.textContent = 'Please enter your start date/time.';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validateendDate() {
    const errorElement = document.getElementById("endDateError");
    if (endDateInput.value == "") {
        errorElement.textContent = 'Please enter your end date/time.';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}


function validatelocation() {
    const errorElement = document.getElementById("locationError");
    if (locationInput.value.length < 1) {
        errorElement.textContent = "Please enter your work/activity location.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}

function validatedescription() {
    const errorElement = document.getElementById("descriptionError");
    if (descriptionInput.value.length < 1) {
        errorElement.textContent = "Please enter your work/activity description.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}



// Event listeners for input validation on user input

fullnameInput.addEventListener("input", validateName);
studentIDInput.addEventListener("input", validateStudentID);
emailInput.addEventListener("input", validateEmail);
workTitleInput.addEventListener("input", validateworkTitle);
activityTypeInput.addEventListener("change", validateactivityType);
academicYearInput.addEventListener("change", validateacademicYear);
semesterInput.addEventListener("change", validatesemester);
startDateInput.addEventListener("change", validatestartDate);
endDateInput.addEventListener("change", validateendDate);
locationInput.addEventListener("input", validatelocation);
descriptionInput.addEventListener("input", validatedescription);