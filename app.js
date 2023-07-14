import { teachers } from "./data.js";
import { months } from "./data.js";
let inputElement = document.querySelector(".input-bar");
const submitBtn = document.querySelector(".submit-btn");
const notificationElement = document.querySelector(".notification-message");

// ==============================================

// TAB SWITCH

// ==============================================
// const homeTab = document.getElementById("tab-1");
// const clockInTab = document.getElementById("tab-2");
// const homeSection = document.querySelector(".section-1");
// const clockInSection = document.querySelector(".section-2");
const tabLinks = document.querySelectorAll(".nav-link");
const tabContainer = document.querySelector(".tab-container");
const allSections = document.querySelector(".all-sections");
const sections = allSections.querySelectorAll(".section");

// == show/ hide css
tabLinks.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabLinks.forEach((otherTab) => {
      if (tab === otherTab) {
        tab.classList.add("active");
      } else {
        otherTab.classList.remove("active");
      }
    });
  });
});

// === show/hide content
tabContainer.addEventListener("click", (e) => {
  const clickedTab = e.target.closest("a");
  if (!clickedTab) return;
  e.preventDefault();

  const activeTab = clickedTab.getAttribute("href").slice(1);
  const activeSection = document.getElementById(activeTab);

  sections.forEach((section) => {
    section.setAttribute("hidden", true);
  });
  activeSection.removeAttribute("hidden", false);
});

// ==============================================

// CLOCK IN SECTION - NUMBER PAD SETUP

// ==============================================

const numbers = document.querySelectorAll(".number");
let persalNumber = [];

// add number
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    persalNumber.push(number.textContent);
    let stringedPersalNumber = persalNumber.join("");
    inputElement.value = stringedPersalNumber;
  });
});
// backspace number
const backspaceBtn = document.getElementById("backspace-btn");
backspaceBtn.addEventListener("click", () => {
  if (persalNumber.length > 0) {
    persalNumber.pop();
  }
  let stringedPersalNumber = persalNumber.join("");
  inputElement.value = stringedPersalNumber;
});

// clear number
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", () => {
  inputElement.value = "";
  persalNumber.length = 0;
});

// ==============================================

// CLOCK IN SECTION - CLOCK TIMER SETUP

// ==============================================

const clockTimeElement = document.querySelector(".time");

// add time
function clockTime() {
  const date = new Date();
  const day = date.getDate().toString();
  const month = date.getMonth().toString();
  let seconds = date.getSeconds().toString();
  let minutes = date.getMinutes().toString();
  let hours = date.getHours().toString();
  // add 0 before time when only 1 placevalue
  if (hours.length === 1) {
    hours = 0 + hours;
  }
  if (minutes.length === 1) {
    minutes = 0 + minutes;
  }
  if (seconds.length === 1) {
    seconds = 0 + seconds;
  }
  if (seconds === "0") {
    seconds = 0 + seconds;
  }
  let currentTime = `${hours}:${minutes}:${seconds}`;
  clockTimeElement.textContent = currentTime;

  return currentTime;
}

// update
setInterval(() => {
  clockTime();
}, 1000);

// ==============================================

// CLOCK IN SECTION - DATE SETUP

// ==============================================

const newDate = new Date();

let day = newDate.getDate();
let month = newDate.getMonth();
let year = newDate.getFullYear();

const currentMonth = months[month];

const currentDate = document.querySelector(".date");

currentDate.textContent = `${day} ${currentMonth} ${year}`;

// ==============================================

// CLOCK IN SECTION - SUBMITION OF PERSAL NUMBER

// ==============================================
// const staffListCenter = document.querySelector(".staff-list-center");
const staffCardList = document.querySelector(".staff-member-card-list");
let loggedInStaff = [];

function checkForStaff() {
  let inputValue = inputElement.value;
  const timeStamp = document.querySelector(".notification-message-time");

  const matchedTeacher = teachers.find(
    (teacher) => teacher.persalNumber === inputValue
  );
  // match persal nr to teacher data
  if (matchedTeacher) {
    const { firstName, lastName, registerClassNumber } = matchedTeacher;
    notificationElement.innerHTML = `Welcome <strong class='highlight-name'>${firstName} ${lastName}</strong>, you've signed in at ${clockTime()}.`;

    // only allow login once
    console.log(loggedInStaff);
    if(loggedInStaff.includes(matchedTeacher) === true){
      console.log('staff member already logged in');
      loggedInStaff.push(matchedTeacher);
    }

    // // add to clock out section to logout
    const staffCard = document.createElement("article");
    staffCard.setAttribute("class", "staff-member-card");
    staffCard.innerHTML = `
    <div class="staff-member-status"></div>
    <div class="staff-member-name">${firstName} ${lastName}</div>
    <div class="staff-member-class">${registerClassNumber}</div>
    <div class="time-stamp-clock-in">${clockTime()}</div>`;
    staffCardList.appendChild(staffCard);

    // remove numbers after clock in
    inputElement.value = "";
    persalNumber.length = 0;
  } else if (inputElement.value === "") {
    notificationElement.textContent = "Please enter a valid persal number";

    // remove numbers after clock in
    timeStamp.textContent = "";
    inputElement.value = "";
    persalNumber.length = 0;
    console.log("empty input");
  } else {
    notificationElement.innerHTML =
      "Staff member not found. Please register <a href='#' alt='register-page'>here</a>.";

    // remove numbers after clock in
    timeStamp.textContent = "";
    inputElement.value = "";
    persalNumber.length = 0;

    console.log("wrong persal");
  }
}

submitBtn.addEventListener("click", checkForStaff);

// enter submits persal
window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "Enter") {
    // console.log("enter works");
    checkForStaff();
  }
});

// ==============================================

// STAFF LIST SECTION

// ==============================================

//  ===== display staff list
// function displayTeachers() {
// teachers.forEach((teacher) => {
//   const { firstName, lastName, email, registerClassNumber, dateOfBirth } =
//     teacher;
//   const staffCard = document.createElement("article");
//   staffCard.setAttribute("class", "staff-member-card");
//   staffCard.innerHTML = `<div class="staff-member-class">${registerClassNumber}</div>
//   <div class="staff-member-name">${teacher.firstName} ${lastName}</div>
//   <div class="staff-member-birth">${dateOfBirth}</div>
//   <div class="staff-member-email">${email}</div>`;
//   staffListCenter.appendChild(staffCard);
// });
// }

// displayTeachers(teachers);
