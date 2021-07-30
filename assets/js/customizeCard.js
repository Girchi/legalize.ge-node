import convertLetters from "./convertLetters.js";

const cardForm = document.getElementById("card-form");
const cards = document.getElementById("cards");
const cardFullName = document.querySelectorAll("#cardFullName");
const cardIdNum = document.getElementById("cardIdNum");
const cardNum = document.getElementById("cardNum");

const cardDate = document.getElementById("cardDate");
const cardValid = document.getElementById("cardValid");
const cardStatus = document.querySelectorAll("#cardStatus");
const cardBadges = document.getElementById("bedges");
console.log(cardBadges)

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

async function changeSelectData() {
  const dateValue = document.getElementById("dateInput").value;
  const statusValue = document.getElementById("statusInput").value;
  const validValue = document.getElementById("validInput").value;

  const response = await fetch(`assets/js/statuses.json`);
  const statuses = await response.json();

  const statusClass = statuses[statusValue].replace(" ", "");
  const status = statusValue.replace("_", " ");
  const statusEN = statuses[statusValue];

  if (statusValue) {
    cards.classList.remove(cards.classList[1]);
    cards.classList.add(`card-${statusClass}`);

    cardStatus[0].textContent = status;
    cardStatus[1].textContent = statusEN;

    cardBadges.innerHTML = `
      <img src="/assets/img/card/${statusClass}.png">
    `;
    }

    if (dateValue) cardDate.textContent = dateValue;
    if (validValue) cardValid.textContent = validValue;
}

cardForm.addEventListener("keyup", changeInputData);
cardForm.addEventListener("change", changeSelectData);
cardForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

const imageInput = document.getElementById("imageInput");
const cardImage = document.querySelector("#cardImage");

imageInput.addEventListener("change", function () {
  cardImage.src = URL.createObjectURL(this.files[0]);
});
