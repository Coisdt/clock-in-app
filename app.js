import { teachers } from "./data.js";

let inputElement = document.querySelector(".input-bar");
const submitBtn = document.querySelector(".submit-btn");
const notificationElement = document.querySelector(".notification-message");

function checkForStaff() {
  let inputValue = inputElement.value;

  const matchedTeacher = teachers.find(
    (teacher) => teacher.persalNumber === inputValue
  );

  if (matchedTeacher) {
    const { firstName, lastName } = matchedTeacher;
    console.log(firstName, lastName);
    notificationElement.innerHTML = `Welcome <strong class='highlight-name'>${firstName} ${lastName}</strong>, you're signed in!`;
    inputElement.value = "";
  } else if (inputElement.value === "") {
    notificationElement.textContent = "Please enter a valid persal number";
  } else {
    notificationElement.innerHTML =
      "Staff member not found. Please register <a href='#' alt='register-page'>here</a>.";
  }
}

submitBtn.addEventListener("click", checkForStaff);
