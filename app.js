import { teachers } from "./data.js";
import { months } from "./data.js";
let inputElement = document.querySelector(".input-bar");
const submitBtn = document.querySelector(".submit-btn");
const notificationElement = document.querySelector(".notification-message");

// ==============================================

// TAB SWITCH

// ==============================================
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
let clockedInStaff = [];

function clockIn() {
  let inputValue = inputElement.value;
  const timeStamp = document.querySelector(".notification-message-time");

  const matchedTeacher = teachers.find(
    (teacher) => teacher.persalNumber === inputValue
  );
  // match persal nr to teacher data
  if (matchedTeacher) {
    const { firstName, lastName, registerClassNumber } = matchedTeacher;
    notificationElement.innerHTML = `Welcome <strong class='highlight-name'>${firstName} ${lastName}</strong>, you've signed in at ${clockTime()}.`;

    // add to clock out list
    addToClockOut(matchedTeacher);
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

submitBtn.addEventListener("click", clockIn);

// ==============================================

// PRESS ENTER KEY

// ==============================================

window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "Enter") {
    // console.log("enter works");
    clockIn();
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

// ======================================================================
//
// CLOCK OUT SECTION - ADD TO CLOCK OUT SECTION
//
// ======================================================================
const staffCardList = document.querySelector(".staff-member-card-list");

function addToClockOut(matchedTeacher) {
  const { firstName, lastName, registerClassNumber, persalNumber } =
    matchedTeacher;

  if (!clockedInStaff.includes(matchedTeacher)) {
    // add to array of staff that's logged in
    clockedInStaff.push(matchedTeacher);
    inputElement.value = "";

    // Display staff cards
    displayStaffCards(matchedTeacher);
  } else if (clockedInStaff.includes(matchedTeacher)) {
    clockedInStaff = clockedInStaff.filter(
      (teacher) => teacher.persalNumber !== matchedTeacher.persalNumber
    );
    notificationElement.innerHTML = `${matchedTeacher.firstName} ${matchedTeacher.lastName} has already clocked in.`;
    inputElement.value = "";
  }
}

function displayStaffCards(matchedTeacher) {
  // Clear existing staff cards
  staffCardList.innerHTML = "";

  // Create staff cards for each logged-in teacher
  clockedInStaff.forEach((matchedTeacher) => {
    const { persalNumber, firstName, lastName, registerClassNumber } =
      matchedTeacher;
    const staffCard = document.createElement("article");
    staffCard.setAttribute("class", "staff-member-card");
    staffCard.setAttribute("id", persalNumber);
    staffCard.innerHTML = `
      <div class="staff-member-status">Clocked in</div>
      <div class="staff-member-name">${firstName} ${lastName}</div>
      <div class="staff-member-class">${registerClassNumber}</div>
      <div class="time-stamp-clock-in">${clockTime()}</div>
      <div class="time-stamp-clock-out"><button class="log-out-time">Clock out</button></div>`;
    staffCardList.appendChild(staffCard);
    // console.log(staffCard);
    clockOut(staffCard);
  });
}

function clockOut() {
  // adds to clocked out staff list
  const loggedOutStaffList = document.querySelector(
    ".logged-out-staff-member-card-list"
  );

  // Remove the staff card from the DOM
  // const clockOutButton = document.querySelector(".log-out-time");
  staffCardList.addEventListener("click", (event) => {
    const clockoutButton = event.target;
    if (event.target.classList.contains("log-out-time")) {
      const staffCard = clockoutButton.closest(".staff-member-card");
      staffCard.remove();

      // Remove the teacher from the clockedInStaff array
      const persalNumber = staffCard.getAttribute("id");
      clockedInStaff = clockedInStaff.filter(
        (teacher) => teacher.persalNumber !== persalNumber
      );

      loggedOutStaffList.appendChild(staffCard);
      
      // time
      const clockedOutTimeElement = staffCard.querySelector(
        ".time-stamp-clock-out"
      );
      clockedOutTimeElement.innerHTML = clockTime();
      // status
      const staffStatus = document.querySelector(".staff-member-status");
      staffStatus.textContent = "clocked out";
    }
  });
}
