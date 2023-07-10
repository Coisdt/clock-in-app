import { teachers } from "./data.js";
let inputElement = document.querySelector(".input-bar");
const submitBtn = document.querySelector(".submit-btn");
const notificationElement = document.querySelector(".notification-message");

// ============================================== 

// CLOCK IN - NUMBER PAD SETUP

// ==============================================

const numbers = document.querySelectorAll(".number");
const persalNumber = [];

// add number
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    persalNumber.push(number.textContent);
    let stringedPersalNumber = persalNumber.join("");
    inputElement.value = stringedPersalNumber;
  });
});

// remove numbers
// submitBtn.addEventListener("click", () => {
//   persalNumber.length = 0;
//   inputElement.value = "";
// });

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

// CLOCK IN - SUBMITION OF PERSAL NUMBER

// ==============================================

function checkForStaff() {
  let inputValue = inputElement.value;

  const matchedTeacher = teachers.find(
    (teacher) => teacher.persalNumber === inputValue
  );
  // match persal nr to teacher data
  if (matchedTeacher) {
    const { firstName, lastName } = matchedTeacher;
    console.log(firstName, lastName);
    notificationElement.innerHTML = `Welcome <strong class='highlight-name'>${firstName} ${lastName}</strong>, you've signed in`;

    // stamp time when login occured
    const timeStamp = document.querySelector(".notification-message-time");
    timeStamp.textContent = `at ${clockTime()}.`;
    inputElement.value = "";
  } else if (inputElement.value === "") {
    notificationElement.textContent = "Please enter a valid persal number";
    inputElement.value = "";
    console.log("empty input");
  } else {
    notificationElement.innerHTML =
      "Staff member not found. Please register <a href='#' alt='register-page'>here</a>.";
    inputElement.value = "";
    console.log("wrong persal");
  }
}

submitBtn.addEventListener("click", checkForStaff);
