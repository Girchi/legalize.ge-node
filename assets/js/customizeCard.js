import convertLetters from "/assets/js/convertLetters.js";
import statusChanger from "/assets/js/statusChanger.js";

// Input assets for other statuses
$(document).ready(function(){
  let multipleCancelButton = new Choices('#multipleStatusInput', {
  removeItemButton: true,
  maxItemCount:7,
  searchResultLimit:8,
  renderChoiceLimit:8
  });
});


const cardForm = document.getElementById("card-form");
const cards = document.getElementById("cards");
const cardFullName = document.querySelectorAll("#cardFullName");
const cardIdNum = document.getElementById("cardIdNum");

const cardDate = document.getElementById("cardDate");
const cardStatus = document.querySelectorAll("#cardStatus");
const cardBadges = document.getElementById("bedges");

// Changes data on input with keyboard
function changeInputData() {
  let nameValue = document.getElementById("nameInput").value;
  const idNumValue = document.getElementById("idNumInput").value;

  if (nameValue) {
    cardFullName[0].textContent = convertLetters(nameValue, 'geo');
    cardFullName[1].textContent = convertLetters(nameValue);
  }
  if (idNumValue) cardIdNum.textContent = idNumValue;
}

// Changes data on select item
function changeSelectData() {
  const dateValue = document.getElementById("dateInput").value;

  const statusValue = document.getElementById("statusInput").value;
  const multipleStatuses = document.querySelectorAll('#multipleStatusInput option:checked');
  const statusClass = statusChanger(statusValue, 'class');
  const status = statusChanger(statusValue, 'clean');;
  const statusEN = statusChanger(statusValue, 'lang');

  cardBadges.innerHTML = `
    <img src="/assets/img/card/${statusClass}.png">
  `;
  
  multipleStatuses.forEach(status => {
    const statusClass = statusChanger(status.value, 'class');
    cardBadges.innerHTML += `
      <img src="/assets/img/card/${statusClass}.png">
    `
  })

  if (statusValue) {
    cards.classList.remove(cards.classList[1]);
    cards.classList.add(`card-${statusClass}`);

    cardStatus[0].textContent = status;
    cardStatus[1].textContent = statusEN;

    if (dateValue) cardDate.textContent = dateValue;
  }
}

cardForm.addEventListener("keyup", changeInputData);
cardForm.addEventListener("change", changeSelectData);

// Import image on browser
const imageInput = document.getElementById("imageInput");
const cardImage = document.querySelector("#cardImage");

imageInput.addEventListener("change", function () {
  cardImage.src = URL.createObjectURL(this.files[0]);
})