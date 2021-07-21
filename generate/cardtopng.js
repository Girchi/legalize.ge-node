// import nodeHtmlToImage from 'node-html-to-image'
import generateCardTemplateGe from "../assets/js/generateFrontCardTemplate.js";
import generateCardTemplateEn from "../assets/js/generateBackCardTemplate.js";
import nodeHtmlToImage from "node-html-to-image";

import fetch from "node-fetch";
import * as fss from "fs";
import QRCode from "qrcode";
import { asPDFName } from "pdf-lib";

const hostname = "http://127.0.0.1:3000";

const generateQR = (text) => {
  var opts = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 1,
    margin: 0,
    color: {
      dark: "#000",
      light: "#ffffff00",
    },
  };
  let generatedval = QRCode.toDataURL(text, opts);
  return generatedval;
};

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

const imgCounter = fss.readdirSync("generate/card-imgs").length;
const imgToContinue = parseInt(imgCounter / 2);

(async () => {
  const response = await fetch(`${hostname}/assets/js/users.json`);
  const usersJSON = await response.json();
  const users = usersJSON.data;

  for (let i = imgToContinue; i < users.length; i++) {
    const QRValue = await generateQR(`${hostname}/user/${i}`);

    nodeHtmlToImage({
      output: `./generate/card-imgs/${i}-front.jpg`,
      html: generateCardTemplateGe(),
      content: {
        name: users[i].name,
        surname: users[i].surname,
        card_number: users[i].card_number,
        id_number: users[i].id_number,
        birth_date: users[i].birth_date,
        img: users[i].img,
        validation: users[i].validation,
        status: users[i].status,
        class: statuses[users[i].status.replace(" ", "_")].replace(" ", ""),
      },
    }).then(() => console.log(`${i} frontcard created successfully!'`));

    nodeHtmlToImage({
      output: `./generate/card-imgs/${i}-back.jpg`,
      html: generateCardTemplateEn(),
      content: {
        card_number: users[i].card_number,
        id_number: users[i].id_number,
        birth_date: users[i].birth_date,
        validation: users[i].validation,
        class: statuses[users[i].status.replace(" ", "_")].replace(" ", ""),

        nameEN: convertLetters(users[i].name),
        surnameEN: convertLetters(users[i].surname),
        statusEN: statuses[users[i].status.replace(" ", "_")],
        QRValue: QRValue,
      },
    }).then(() => console.log(`${i} backcard created successfully!'`));
  }
  console.log("Works...");
})();
