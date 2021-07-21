let statuses = {
  გროუერი: "grower",
  მწეველი: "smoker",
  მეწარმე: "owner",
  ქომაგი: "supporter",
  დამფუძნებელი: "founder",
  CBD: "cbd",
  ინვესტორი: "investor",
  ოქროს_ინვესტორი: "golden investor",
};

function convertLetters(str) {
  const objectOfLetters = {
    ქ: "q",
    წ: "ts",
    ე: "e",
    რ: "r",
    ტ: "t",
    ყ: "y",
    უ: "u",
    ი: "i",
    ო: "o",
    პ: "p",
    ა: "a",
    ს: "s",
    დ: "d",
    ფ: "f",
    გ: "g",
    ჰ: "h",
    ჯ: "j",
    კ: "k",
    ლ: "l",
    ზ: "z",
    ხ: "kh",
    ც: "c",
    ვ: "v",
    ბ: "b",
    ნ: "n",
    მ: "m",
    ღ: "gh",
    თ: "t",
    შ: "sh",
    ჟ: "j",
    ძ: "dz",
    ჩ: "ch",
  };
  const lettersArray = str.split("");

  const mappedArray = lettersArray.map((letter) => {
    return objectOfLetters[letter];
  });

  return mappedArray.join("");
}

const cardForm = document.getElementById("card-form");
const cards = document.getElementById("cards");

cardForm.addEventListener("keyup", () => {
  const nameValue = document.getElementById("nameInput").value;
  const surnameValue = document.getElementById("surnameInput").value;
  const idNumValue = document.getElementById("idNumInput").value;

  const cardFullName = document.querySelectorAll("#cardFullName");
  const cardIdNum = document.querySelectorAll("#cardIdNum");

  if (nameValue || surnameValue) {
    cardFullName[0].textContent = `${nameValue} ${surnameValue}`;
    cardFullName[1].textContent = `${convertLetters(
      nameValue
    )} ${convertLetters(surnameValue)}`;
  }

  for (let i = 0; i < 2; i++) {
    if (idNumValue) cardIdNum[i].textContent = idNumValue;
  }
});

cardForm.addEventListener("change", () => {
  const dateValue = document
    .getElementById("dateInput")
    .value.replace(/[-]/gi, "/");
  const statusValue = document.getElementById("statusInput").value;
  const validValue = document
    .getElementById("validInput")
    .value.replace(/[-]/gi, "/");

  const cardDate = document.querySelectorAll("#cardDate");
  const cardStatus = document.querySelectorAll("#cardStatus");
  const cardValid = document.querySelectorAll("#cardValid");
  const cardBadge = document.querySelectorAll("#cardBadge");

  const statusClass = statuses[statusValue].replace(" ", "");
  const status = statusValue.replace("_", " ");
  const statusEN = statuses[statusValue];

  if (statusValue) {
    cards.classList.remove(cards.classList[1]);
    cards.classList.add(`card-${statusClass}`);

    cardStatus[0].textContent = status;
    cardStatus[1].textContent = statusEN;
  }

  for (let i = 0; i < 2; i++) {
    if (dateValue) cardDate[i].textContent = dateValue;
    cardBadge[i].src = `/assets/img/card/${statusClass}.png`;
    if (validValue) cardValid[i].textContent = validValue;
  }
});

const imageInput = document.getElementById("imageInput");
const cardImage = document.querySelector("#cardImage");

imageInput.addEventListener("change", function () {
  cardImage.src = URL.createObjectURL(this.files[0]);
});
