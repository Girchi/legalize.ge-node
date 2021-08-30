// import nodeHtmlToImage from 'node-html-to-image'
import generateCardTemplateGe from "./cardtoimg-assets/generateFrontCardTemplate.js";
import generateCardTemplateEn from "./cardtoimg-assets/generateBackCardTemplate.js";
import nodeHtmlToImage from "node-html-to-image";
import * as fs from "fs";

import convertLetters from "../assets/js/convertLetters.js";
import generateQR from "../assets/js/generateQR.js";
import statusChanger from "../assets/js/statusChanger.js";

async function cardtoimg (body){

  const cardNum = body.card_number;
  const QRValue = await generateQR(`https://legalize.ge/user/${cardNum}`);

  const profileImg = convertImage(body.img)
  const assetImg1 = convertImage('/assets/img/kanafi.png')
  const assetImg2 = convertImage('/assets/img/card/newbg1.png')
  const assetImg3 = convertImage('/assets/img/card/newbg2.png')


  const badgeIcon = convertImage(`/assets/img/card/${statusChanger(body.status, 'class')}.png`)

  // Creates img tags for current user's badges
  const fullBadgesClasses = [statusChanger(body.status, 'class'), ...body.other_statuses.map(status => statusChanger(status, 'class'))];
  let fullBadgesContainer = '';
  fullBadgesClasses.forEach(badgeClass => {
    const convertedBadge = convertImage(`/assets/img/card/${badgeClass}.png`);
    fullBadgesContainer += `
      <img src="${convertedBadge}" /> 
    `
  })

  await nodeHtmlToImage({
    output: `./generate/card-imgs/${cardNum}-front.jpg`,
    html: generateCardTemplateGe(),
    content: {
      name: body.name,
      status: statusChanger(body.status, 'clean'),
      fullBadgesContainer, 

      profileImg,
      assetImg1,
      assetImg2,
      assetImg3,
    },
  }).then(() => console.log(`${cardNum} frontcard created successfully!'`));

  await nodeHtmlToImage({
    output: `./generate/card-imgs/${cardNum}-back.jpg`,
    html: generateCardTemplateEn(),
    content: {
      card_number: body.card_number,
      id_number: body.id_number,
      birth_date: body.birth_date,
      registration: body.registration,

      name: convertLetters(body.name),
      status: statusChanger(body.status, 'lang'),
      QRValue,
      assetImg1,
      assetImg2,
      assetImg3
    },
  }).then(() => console.log(`${cardNum} backcard created successfully!'`));

  console.log(`User Number ${cardNum} Done...`); 
  
}

function convertImage(img) {
  const cleanUrl = img.replace('/', './')
  const image = fs.readFileSync(cleanUrl);
  const base64Image = new Buffer.from(image).toString('base64');
  const dataURI = 'data:image/jpeg;base64,' + base64Image
  return dataURI
}

export default cardtoimg;