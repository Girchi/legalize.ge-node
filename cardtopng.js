// import nodeHtmlToImage from 'node-html-to-image'
import generateCardTemplateGe from './assets/js/generateFrontCardTemplate.js'
import generateCardTemplateEn from './assets/js/generateBackCardTemplate.js'         
import nodeHtmlToImage from 'node-html-to-image'

import fetch from 'node-fetch';
import * as fss from 'fs';

async function fetchUsers() {
    const response = await fetch('http://127.0.0.1:3000/assets/js/users.json');
    const users = await response.json()
    return users.data
}

async function card2png(){

  let namesurname;
  let number;
  let img;
  let id;
  let status;
  let bday;
  let validate;
  let qr;

  let badge;
  let users = await fetchUsers()

  console.log("works...")

  let imgCounter=fss.readdirSync('generate/card-imgs').length - 1
  
  for (let i = parseInt(imgCounter / 2); i < users.length; i++){

    let namee = users[i].ge.name + " " + users[i].ge.surname //ignore this
    let nameen = users[i].en.name + " " + users[i].en.surname //ignore this

    const front = () => {

      nodeHtmlToImage({
        output: `./generate/card-imgs/${i}-front.jpg`,
        html: generateCardTemplateGe(badge,namesurname, id, number, img, status, qr, bday, validate),
        content: {badge: `http://127.0.0.1:3000/assets/img/card/${users[i].en.status}.png` ,statusen:users[i].en.status, namesurname: namee,idnum:users[i].ge.idnum, id: users[i].ge.id, number: users[i].ge.number, img: users[i].ge.img, status:users[i].ge.status, bday:users[i].ge.b_date, validate:users[i].ge.validation,  surname:users[i].ge.surname}
        })
        .then(() => console.log(`${i} frontcard created successfully!'`))
    }
    
    front()
  
    const back = () => {
        
      nodeHtmlToImage({
        output: `./generate/card-imgs/${i}-back.jpg`,
        html: generateCardTemplateEn(namesurname, id, number, img, status, qr, bday, validate),
        content: {badge: `http://127.0.0.1:3000/assets/img/card/${users[i].en.status}.png` , namesurname: nameen, idnum:users[i].ge.idnum, id: users[i].en.id, number: users[i].en.number, img: users[i].en.img, status:users[i].en.status, bday:users[i].en.b_date, validate:users[i].en.validation,  surname:users[i].en.surname}
        })
        .then(() => console.log(`${i} backcard created successfully!'`))
    }
    
    back()
    
  }

}

card2png()
