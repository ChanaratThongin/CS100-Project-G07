const config = {
    backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;

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

async function submitForm(event) {
    event.preventDefault();
    // Validate form inputs before submission
    if (!validateName() || !validateStudentID() || !validateEmail() ||
        !validateworkTitle() || !validateactivityType() || !validateacademicYear() ||
        !validatesemester() || !validatestartDate() || !validateendDate() ||
        !validatelocation() || !validatedescription()
    ) {
        return;
    }
    const startDateInput = document.getElementById("startDate").value;
    const endDateInput = document.getElementById("endDate").value;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);

    if (endDate <= startDate) {
        alert("End datetime should be after the start datetime.");
        return;
    }

    const formData = new FormData(event.target);
    const data = {
        first_name: formData.get("fullname").split(" ")[0],
        last_name: formData.get("fullname").split(" ")[1],
        student_id: parseInt(formData.get("studentID")),
        email: formData.get("email"),
        title: formData.get("workTitle"),
        type_of_work_id: formData.get("activityType"),
        academic_year: parseInt(formData.get("academicYear")) - 543,
        semester: parseInt(formData.get("semester")),
        start_date: formData.get("startDate"),
        end_date: formData.get("endDate"),
        location: formData.get("location"),
        description: formData.get("description")
    };

    try {
        // Send data to the backend using POST request
        const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Form data submitted successfully!");
            document.getElementById("myForm").reset();

            try {
                const response = await fetch(`http://${window.location.hostname}:${port}/getPassports`);
                const passports = await response.json();

                const formattedPassports = passports.map(passport => {
                    const formattedPassport = {};
                    for (const [key, value] of Object.entries(passport)) {
                        formattedPassport[key] = value;
                    }
                    return formattedPassport;
                });

                // Show Data at Bottom Form
                const activityDOM = document.querySelector('.data-containers');
                activityDOM.classList.add('show');

                // Clear existing content in activityDOM
                activityDOM.innerHTML = '';

                formattedPassports.forEach((formattedPassport, i) => {
                    let divHtml = '<div class="data-container"><div class="top"><div class="left">';
                    divHtml += `<h3>${formattedPassport.title}</h3>
                                    <small>${formattedPassport.type_of_work_id}</small>
                                </div>
                                <div class="right">
                                    <small>Start: ${formattedPassport.start_date}</small>
                                    <small>End: ${formattedPassport.end_date}</small>
                                </div>
                            </div>
                            <p>${formattedPassport.description}</p>
                            <div class="bottom">
                                <div class="left">
                                    <h4>Name: ${formattedPassport.first_name} ${formattedPassport.last_name}</h4>
                                    <small>ID: ${formattedPassport.student_id}</small>  
                                </div>
                                <div class="right">
                                    <p>${formattedPassport.location}</p>
                                </div>
                            </div>
                        </div>`;

                    // Check if the data is not already in the DOM before appending
                    if (!isDataAlreadyInDOM(activityDOM, formattedPassport)) {
                        activityDOM.innerHTML += divHtml;
                    }
                });

                function isDataAlreadyInDOM(container, formattedPassport) {
                    // Check if the data with the same ID already exists in the DOM
                    const existingData = container.querySelectorAll('.data-container');
                    for (const dataContainer of existingData) {
                        const id = dataContainer.querySelector('small').textContent.split(': ')[1];
                        if (id === formattedPassport.student_id) {
                            return true;
                        }
                    }
                    return false;
                }

            } catch (error) {
                console.error("An error occurred while getting data:", error);
            }
        } else {
            console.error("Failed to submit form data.");

            // Display error message
            alert("Failed to submit form data. Please try again.");
        }
    } catch (error) {
        console.error("An error occurred while submitting form data:", error);
    }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

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