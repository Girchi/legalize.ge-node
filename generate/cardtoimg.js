// import nodeHtmlToImage from 'node-html-to-image'
import generateCardTemplateGe from "./cardtoimg-assets/generateFrontCardTemplate.js";
import generateCardTemplateEn from "./cardtoimg-assets/generateBackCardTemplate.js";
import nodeHtmlToImage from "node-html-to-image";

import fetch from "node-fetch";
import * as fs from "fs";
import convertLetters from "../users-assets/js/convertLetters.js";
import generateQR from "../users-assets/js/generateQR.js";
import statusChanger from "../users-assets/js/statusChanger.js";

const hostname = "http://127.0.0.1:3000";

const usersJsons = fs.readdirSync("users-assets/usersJsons");
const usersCounter = usersJsons.length;

(async () => {
  for (let i = 0; i < usersCounter; i++) {
    const currentJsonName = usersJsons[i];
    const userResponse = await fetch(`${hostname}/users-assets/usersJsons/${currentJsonName}`);
    const user = await userResponse.json();

    const currentCardNum = user.card_number;
    const currentUserID = user.user_id;

    const frontPath = `./generate/card-imgs/${currentCardNum}-front.jpg`;
    const backPath = `./generate/card-imgs/${currentCardNum}-back.jpg`;
    const QRValue = await generateQR(`legalize.ge/user/${currentUserID}`);
 
    // Creates img tags for current user's badges
    const fullBadgesClasses = [statusChanger(user.status, 'class'), ...user.other_statuses.map(word => statusChanger(word, 'class'))];
    let fullBadgesContainer = '';
    fullBadgesClasses.forEach(badgeClass => {
      fullBadgesContainer += `
        <img src="${hostname}/assets/img/card/${badgeClass}.png" /> 
      `
    })

    if (!fs.existsSync(frontPath)) {
      await nodeHtmlToImage({
        output: `./generate/card-imgs/${currentCardNum}-front.jpg`,
        html: generateCardTemplateGe(),
        content: {
          name: user.name,
          img: user.img,
          status: statusChanger(user.status, 'clean'),
          class: statusChanger(user.status, 'class'),
          fullBadgesContainer, 
        },
      }).then(() => console.log(`${currentCardNum} frontcard created successfully!'`));
    }
    if (!fs.existsSync(backPath)) {
      await nodeHtmlToImage({
        output: `./generate/card-imgs/${currentCardNum}-back.jpg`,
        html: generateCardTemplateEn(),
        content: {
          card_number: user.card_number,
          id_number: user.id_number,
          birth_date: user.birth_date,
          registration: user.registration,

          name: convertLetters(user.name),
          status: statusChanger(user.status, 'lang'),
          QRValue,
        },
      }).then(() => console.log(`${currentCardNum} backcard created successfully!'`));
    }
    console.log(`User Number ${currentCardNum} Done...`); 
  }
})();
