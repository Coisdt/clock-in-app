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
const sections = document.querySelectorAll(".section");

tabLinks.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabLinks.forEach((otherTab) => {
      if (tab === otherTab) {
        tab.classList.add("active");
        // homeTab.classList.add("show-section");
        const getID = tab.getAttribute('id')
        console.log(getID);
      } else {
        otherTab.classList.remove("active");
      }
    });
  });
});

// ==============================================

// CLOCK IN - NUMBER PAD SETUP

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

// CLOCK IN - CLOCK TIMER SETUP

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

// CLOCK IN - DATE SETUP

// ==============================================

const newDate = new Date();

let day = newDate.getDate();
let month = newDate.getMonth();
let year = newDate.getFullYear();

const currentMonth = months[month];

const currentDate = document.querySelector(".date");

currentDate.textContent = `${day} ${currentMonth} ${year}`;

// ==============================================

// CLOCK IN - SUBMITION OF PERSAL NUMBER

// ==============================================

function checkForStaff() {
  let inputValue = inputElement.value;
  const timeStamp = document.querySelector(".notification-message-time");

  const matchedTeacher = teachers.find(
    (teacher) => teacher.persalNumber === inputValue
  );
  // match persal nr to teacher data
  if (matchedTeacher) {
    const { firstName, lastName } = matchedTeacher;
    console.log(firstName, lastName);
    notificationElement.innerHTML = `Welcome <strong class='highlight-name'>${firstName} ${lastName}</strong>, you've signed in`;

    // stamp time when login occured
    timeStamp.textContent = `at ${clockTime()}.`;

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
    console.log("enter works");
    checkForStaff();
  }
});
