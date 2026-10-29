/* ==========================================
   My Portfolio - main.js
   Full Stack Development Assignment-1

   What this file does:
   1. Theme switch button (light / dark)
   2. Show the skills using an array and a loop
   3. Show the projects and filter them
   4. Check the contact form before submitting
   ========================================== */


/* ==========================================
   1. MY DATA (arrays of objects)
   ========================================== */

const skills = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "Java", "C", "SQL", "R"]
  },
  {
    title: "Frameworks",
    items: ["React", "Flask", "Angular", "Express.js"]
  },
  {
    title: "Libraries",
    items: ["Pandas", "NumPy", "Matplotlib", "TensorFlow"]
  },
  {
    title: "Developer Tools",
    items: ["Git", "Visual Studio Code", "PyCharm"]
  }
];

const projects = [
  {
    name: "My Portfolio Website",
    type: "web",
    typeName: "Web",
    about: "This website. I made it using HTML5, CSS3, Bootstrap and JavaScript for my Full Stack Development assignment.",
    tech: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    link: "#"
  },
  {
    name: "IMDB Movie Reviews Sentiment Analysis",
    type: "python",
    typeName: "Python",
    about: "Built a Python sentiment classifier for 50,000+ IMDB reviews, achieving 88% accuracy. Used NLTK preprocessing (tokenization, lemmatization) and TF-IDF vectorization, with Logistic Regression fine-tuned via GridSearchCV.",
    tech: ["Python", "NLTK", "Scikit-learn", "TF-IDF"],
    link: "#"
  },
  {
    name: "College Community Website",
    type: "web",
    typeName: "Web",
    about: "Developed real-time listings for campus events, workshops, and career opportunities, with live messaging to drive engagement and collaboration across cohorts. Designed and deployed responsive UI pages.",
    tech: ["HTML", "CSS", "JavaScript", "React"],
    link: "#"
  }
];


/* ==========================================
   2. THEME SWITCH BUTTON
   (Interactive feature 1)
   ========================================== */

const themeBtn = document.getElementById("themeBtn");

// This function changes the page between light and dark
function changeTheme() {

  // Find out which theme is on right now
  let currentTheme = document.documentElement.getAttribute("data-bs-theme");

  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    themeBtn.textContent = "Light Mode";
    themeBtn.setAttribute("aria-pressed", "true");
    localStorage.setItem("myTheme", "dark");     // remember the choice
  } else {
    document.documentElement.setAttribute("data-bs-theme", "light");
    themeBtn.textContent = "Dark Mode";
    themeBtn.setAttribute("aria-pressed", "false");
    localStorage.setItem("myTheme", "light");
  }
}

// Run changeTheme() when the button is clicked
themeBtn.addEventListener("click", changeTheme);

// When the page opens, check if a theme was saved before
const savedTheme = localStorage.getItem("myTheme");
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-bs-theme", "dark");
  themeBtn.textContent = "Light Mode";
  themeBtn.setAttribute("aria-pressed", "true");
}


/* ==========================================
   3. SHOW THE SKILLS
   ========================================== */

const skillsRow = document.getElementById("skillsRow");

function showSkills() {

  let html = "";

  // for loop to go through the skills array
  for (let i = 0; i < skills.length; i++) {

    let skill = skills[i];
    let tags = "";

    // inner loop for the list of skill names
    for (let j = 0; j < skill.items.length; j++) {
      tags = tags + "<li>" + skill.items[j] + "</li>";
    }

    html = html +
      '<div class="col-sm-6 col-lg-3 mb-3">' +
        '<div class="card skill-card">' +
          '<div class="card-body">' +
            '<h3 class="h6 card-title">' + skill.title + '</h3>' +
            '<ul class="skill-list">' + tags + '</ul>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  skillsRow.innerHTML = html;    // DOM manipulation
}

showSkills();


/* ==========================================
   4. SHOW AND FILTER THE PROJECTS
   (Interactive feature 2)
   ========================================== */

const projectsRow = document.getElementById("projectsRow");
const noProjects = document.getElementById("noProjects");
const filterButtons = document.querySelectorAll("#filterButtons button");

// This function shows the projects.
// If we pass "all" it shows everything.
// If we pass "web" it only shows the web projects.
function showProjects(filter) {

  // filter() is an array method.
  // I used an arrow function here instead of a normal function.
  let list = projects.filter((p) => {
    if (filter === "all") {
      return true;
    } else {
      return p.type === filter;
    }
  });

  // if no project matches, show the alert message
  if (list.length === 0) {
    projectsRow.innerHTML = "";
    noProjects.classList.remove("d-none");
    return;
  }

  noProjects.classList.add("d-none");

  let html = "";

  // forEach loop to build a card for each project
  list.forEach(function (p) {

    let techList = "";
    for (let i = 0; i < p.tech.length; i++) {
      techList = techList + "<li>" + p.tech[i] + "</li>";
    }

    html = html +
      '<div class="col-md-6 mb-4">' +
        '<div class="card project-card">' +
          '<div class="card-body">' +
            '<p class="project-type">' + p.typeName + '</p>' +
            '<h3 class="h5 card-title">' + p.name + '</h3>' +
            '<p class="card-text">' + p.about + '</p>' +
            '<ul class="tech-grid">' + techList + '</ul>' +
            '<a href="' + p.link + '" class="btn btn-plain btn-sm">View Project</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  });

  projectsRow.innerHTML = html;
}

// Show all the projects when the page loads
showProjects("all");

// Add a click event to every filter button
filterButtons.forEach(function (btn) {

  btn.addEventListener("click", function () {

    // Make all buttons look normal again
    filterButtons.forEach(function (b) {
      b.classList.remove("btn-fill");
      b.classList.add("btn-plain");
    });

    // Make the clicked button look active
    btn.classList.remove("btn-plain");
    btn.classList.add("btn-fill");

    // Show the projects for this filter
    showProjects(btn.getAttribute("data-filter"));
  });

});


/* ==========================================
   5. CONTACT FORM VALIDATION
   ========================================== */

const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

// A small helper function so I don't repeat the same lines.
// It writes the error message and puts a red border on the input.
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorBox = document.getElementById(inputId + "Error");

  errorBox.textContent = message;
  input.classList.add("wrong-input");
  input.classList.remove("right-input");
  input.setAttribute("aria-invalid", "true");
}

// This one clears the error and puts a green border
function showOk(inputId) {
  const input = document.getElementById(inputId);
  const errorBox = document.getElementById(inputId + "Error");

  errorBox.textContent = "";
  input.classList.remove("wrong-input");
  input.classList.add("right-input");
  input.removeAttribute("aria-invalid");
}


// ----- Check each field -----

function checkName() {
  const value = document.getElementById("name").value.trim();

  if (value === "") {
    showError("name", "Please enter your name.");
    return false;
  }
  if (value.length < 3) {
    showError("name", "Name must have at least 3 letters.");
    return false;
  }

  showOk("name");
  return true;
}

function checkEmail() {
  const value = document.getElementById("email").value.trim();

  // A simple pattern to check the email looks correct
  const pattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  if (value === "") {
    showError("email", "Please enter your email.");
    return false;
  }
  if (pattern.test(value) === false) {
    showError("email", "Please enter a valid email like name@example.com");
    return false;
  }

  showOk("email");
  return true;
}

function checkPhone() {
  const value = document.getElementById("phone").value.trim();

  if (value === "") {
    showError("phone", "Please enter your phone number.");
    return false;
  }
  // Check that it is exactly 10 digits
  if (/^[0-9]{10}$/.test(value) === false) {
    showError("phone", "Phone number must be 10 digits.");
    return false;
  }

  showOk("phone");
  return true;
}

function checkSubject() {
  const value = document.getElementById("subject").value;

  if (value === "") {
    showError("subject", "Please choose a subject.");
    return false;
  }

  showOk("subject");
  return true;
}

function checkMessage() {
  const value = document.getElementById("message").value.trim();

  if (value === "") {
    showError("message", "Please write a message.");
    return false;
  }
  if (value.length < 10) {
    showError("message", "Message must have at least 10 characters.");
    return false;
  }

  showOk("message");
  return true;
}


// ----- Check a field again when the user leaves it -----

document.getElementById("name").addEventListener("blur", checkName);
document.getElementById("email").addEventListener("blur", checkEmail);
document.getElementById("phone").addEventListener("blur", checkPhone);
document.getElementById("subject").addEventListener("change", checkSubject);
document.getElementById("message").addEventListener("blur", checkMessage);


// ----- What happens when the form is submitted -----

contactForm.addEventListener("submit", function (event) {

  event.preventDefault();      // stop the page from reloading

  // Check every field. I call all of them first so that
  // all the error messages appear together.
  const nameOk = checkName();
  const emailOk = checkEmail();
  const phoneOk = checkPhone();
  const subjectOk = checkSubject();
  const messageOk = checkMessage();

  if (nameOk && emailOk && phoneOk && subjectOk && messageOk) {

    // Everything is correct, so show the success message
    successMsg.classList.remove("d-none");

    // This is only a front end project so the message is not
    // really sent anywhere. I just print it in the console.
    console.log("Form details:", {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
    });

    clearForm();

  } else {
    // Something is wrong, so hide the success message
    successMsg.classList.add("d-none");
  }

});


// ----- Reset button -----

function clearForm() {
  contactForm.reset();

  // Remove all the red and green borders (arrow function)
  const inputs = document.querySelectorAll("#contactForm .form-control, #contactForm .form-select");
  inputs.forEach((input) => {
    input.classList.remove("wrong-input", "right-input");
    input.removeAttribute("aria-invalid");
  });

  // Clear all the error messages (arrow function)
  const errors = document.querySelectorAll(".error-text");
  errors.forEach((e) => {
    e.textContent = "";
  });
}

document.getElementById("resetBtn").addEventListener("click", function () {
  clearForm();
  successMsg.classList.add("d-none");
});


/* ==========================================
   6. FOOTER YEAR
   ========================================== */

document.getElementById("year").textContent = new Date().getFullYear();
