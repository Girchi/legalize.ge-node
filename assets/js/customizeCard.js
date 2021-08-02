import convertLetters from "./convertLetters.js";

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
const cardNum = document.getElementById("cardNum");

const cardDate = document.getElementById("cardDate");
const cardValid = document.getElementById("cardValid");
const cardStatus = document.querySelectorAll("#cardStatus");
const cardBadges = document.getElementById("bedges");

// Changes data on input with keyboard
function changeInputData() {
  const nameValue = document.getElementById("nameInput").value;
  const idNumValue = document.getElementById("idNumInput").value;
  const cardNumValue = document.getElementById("cardNumInput").value;

  if (nameValue) {
    let convertedName = nameValue
      .split(" ")
      .map((word) => convertLetters(word))
      .join(" ");
    cardFullName[0].textContent = nameValue;
    cardFullName[1].textContent = convertedName;
  }
  if (idNumValue) cardIdNum.textContent = idNumValue;
  if (cardNumValue) cardNum.textContent = cardNumValue;
}

// Changes data on select item
async function changeSelectData() {
  const response = await fetch(`assets/js/statuses.json`);
  const statuses = await response.json();

  const dateValue = document.getElementById("dateInput").value;
  const validValue = document.getElementById("validInput").value;

  const statusValue = document.getElementById("statusInput").value;
  const multipleStatuses = document.querySelectorAll('#multipleStatusInput option:checked');
  
  const statusClass = statuses[statusValue].replace(" ", "");
  const status = statusValue.replace("_", " ");
  const statusEN = statuses[statusValue];

  cardBadges.innerHTML = `
    <img src="/assets/img/card/${statusClass}.png">
  `;
  
  multipleStatuses.forEach(stat => {
    const statusClass = statuses[stat.value].replace(" ", "");
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
    if (validValue) cardValid.textContent = validValue;
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