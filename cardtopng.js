// import nodeHtmlToImage from 'node-html-to-image'
import generateCardTemplateGe from './assets/js/generateFrontCardTemplate.js'
import generateCardTemplateEn from './assets/js/generateBackCardTemplate.js'         
import nodeHtmlToImage from 'node-html-to-image'

import fetch from 'node-fetch';

import font2base64 from 'node-font2base64'
const _data = font2base64.encodeToDataUrlSync('./assets/fonts/bpg-nino-mtavruli-bold-webfont.woff2')
const _data2 = font2base64.encodeToDataUrlSync('./assets/fonts/bpg-web-002-caps-webfont.woff2')

async function fetchUsers() {
    const response = await fetch('http://127.0.0.1:3000/assets/js/users.json');
    const users = await response.json()
    return users.data
}

let a = 0
let num = 0

async function card2png(){

  let namesurname;
  let number;
  let img;
  let id;
  let status;
  let bday;
  let validate;
  let surname;
  let qr;
  let idnum;
  let statusen;
  let name;

  let badge;
  let users = await fetchUsers()

  console.log("works...")
 
  for (let i = 0; i < users.length; i++){

    let namee = users[num].ge.name + " " + users[num].ge.surname //ignore this
    let nameen = users[num].en.name + " " + users[num].en.surname //ignore this

    const front = () => {
      
      nodeHtmlToImage({
        output: `./assets/cards/${num}-front.jpg`,
        html: generateCardTemplateGe(badge,namesurname, id, number, img, status, qr, bday, validate),
        content: {badge: `http://127.0.0.1:3000/assets/img/card/${users[num].en.status_en}.png` ,statusen:users[num].en.status_en, namesurname: namee,idnum:users[num].ge.idnum, id: users[num].ge.id, number: users[num].ge.number, img: users[num].ge.img, status:users[num].ge.status_ge, bday:users[num].ge.b_date, validate:users[num].ge.validation,  surname:users[num].ge.surname}
        })
        .then(() => console.log(`${i} frontcard created successfully!'`))
    }
    front()
  
    const back = () => {
        
      nodeHtmlToImage({
        output: `./assets/cards/${num}-back.jpg`,
        html: generateCardTemplateEn(namesurname, id, number, img, status, qr, bday, validate),
        content: {badge: `http://127.0.0.1:3000/assets/img/card/${users[num].en.status_en}.png` , namesurname: nameen, idnum:users[num].ge.idnum, id: users[num].en.id, number: users[num].en.number, img: users[num].en.img, status:users[num].en.status_en, bday:users[num].en.b_date, validate:users[num].en.validation,  surname:users[num].en.surname}
        })
        .then(() => console.log(`${i} backcard created successfully!'`))
    }
    
    back()
    num++;
    
  }

}

card2png()
