// import nodeHtmlToImage from 'node-html-to-image'
import generateCardTemplateGe from "./cardtoimg-assets/generateFrontCardTemplate.js";
import generateCardTemplateEn from "./cardtoimg-assets/generateBackCardTemplate.js";
import nodeHtmlToImage from "node-html-to-image";

import fetch from "node-fetch";
import * as fs from "fs";
import convertLetters from "../assets/js/convertLetters.js";
import generateQR from "../assets/js/generateQR.js";

const hostname = "http://127.0.0.1:3000";
function statusToClass(word, statuses) {
  return statuses[word.replace(" ", "_")].replace(" ", "")
}
function statusToEngStatus(word, statuses) {
  return statuses[word.replace(" ", "_")]
}

(async () => {
  const response = await fetch(`${hostname}/assets/js/users.json`);
  const usersJSON = await response.json();
  const users = usersJSON.data;

  const statusResponse = await fetch(`${hostname}/assets/js/statuses.json`);
  const statuses = await statusResponse.json();

  for (let i = 0; i < users.length; i++) {
    const frontPath = `./generate/card-imgs/${users[i].card_number}-front.jpg`;
    const backPath = `./generate/card-imgs/${users[i].card_number}-back.jpg`;
    const QRValue = await generateQR(`legalize.ge/user/${users[i].card_number}`);

    // Creates img tags for current user's badges
    const fullBedgesClasses = [statusToClass(users[i].status, statuses), ...users[i].other_statuses.map(word => statusToClass(word, statuses))];
    let fullBedgesContainer = '';
    fullBedgesClasses.forEach(bedgeClass => {
      fullBedgesContainer += `
        <img src="${hostname}/assets/img/card/${bedgeClass}.png" /> 
      `
    })

    if (!fs.existsSync(frontPath)) {
      await nodeHtmlToImage({
        output: `./generate/card-imgs/${users[i].card_number}-front.jpg`,
        html: generateCardTemplateGe(),
        content: {
          name: users[i].name,
          surname: users[i].surname,
          img: users[i].img,
          status: users[i].status,
          class: statusToClass(users[i].status, statuses),
          fullBedgesContainer: fullBedgesContainer, 
        },
      }).then(() => console.log(`${users[i].card_number} frontcard created successfully!'`));
    }
    if (!fs.existsSync(backPath)) {
      await nodeHtmlToImage({
        output: `./generate/card-imgs/${users[i].card_number}-back.jpg`,
        html: generateCardTemplateEn(),
        content: {
          card_number: users[i].card_number,
          id_number: users[i].id_number,
          birth_date: users[i].birth_date,
          validation: users[i].validation,

          nameEN: convertLetters(users[i].name),
          surnameEN: convertLetters(users[i].surname),
          statusEN: statusToEngStatus(users[i].status, statuses),
          QRValue: QRValue,
        },
      }).then(() => console.log(`${users[i].card_number} backcard created successfully!'`));
    }
  }
  console.log("Works...");
})();
