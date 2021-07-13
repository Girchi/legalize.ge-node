const nodeHtmlToImage = require('node-html-to-image')
import generateCardTemplate from './generateCardTemplate'

const fetch = require("node-fetch");


async function fetchUsers() {
    const response = await fetch('http://127.0.0.1:3000/assets/js/users.json');
    const users = await response.json()
    return users.data
}


let a = 0
let num = 0

async function card2png(){
  let users = await fetchUsers()



  for (let i = 0; i < 5; i++){

    console.log(i)

    let namee = users[num].name + " " + users[num].surname //ignore this

    const front = () => {
      nodeHtmlToImage({
        output: `./assets/cards/frontcard-${num}.jpg`,
        html: generateCardTemplate(),
        content: {id_number: users[num].id_number, name: namee, surname:users[num].surname, img: users[num].img, status:users[num].status}
        })
        .then(() => console.log('The image was created successfully!'))
    }
    front()
  
    const back = () => {
      nodeHtmlToImage({
        output: `./assets/cards/backcard-${num}.jpg`,
        html: `<html><style>
      
          @import url("//cdn.web-fonts.ge/fonts/bpg-web-002/css/bpg-web-002.min.css");
      
          @import url("//cdn.web-fonts.ge/fonts/bpg-nino-mtavruli-bold/css/bpg-nino-mtavruli-bold.min.css");
          @import url("//cdn.web-fonts.ge/fonts/bpg-arial/css/bpg-arial.min.css");
      
          //BPG WEB 002
      
          @font-face {
            font-family: 'BPG Nino Mtavruli Bold';  
            src: url(${_data}) format('woff2'); // don't forget the format!
          }
      
          @font-face {
            font-family: 'BPG WEB 002';  
            src: url(${_data2}) format('woff2'); // don't forget the format!
          }
      
          body {
            width: 650px;
            height: 430px;
            }
            
          .cards {
              
              display: flex;
              gap: 16px;
              margin-bottom: 1rem;
      
          }
      
      
          .card-side {
              font-family: "BPG WEB 002", sans-serif;
              font-weight: 400; 
              width: 182mm;
              height: 114.6mm;
              border: 0;
              border-radius: 10px;
              letter-spacing: 0;
              position: relative;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
          }
      
          .card-side::before {
              content: '';
              width: 420px;
              height: 420px;
              background: url('http://127.0.0.1:3000/assets/img/kanafi.png') no-repeat center/contain;
              position: absolute;
              left: 90px;
              top: 20px;
              opacity: 0.15;
              transform: rotate(341.13deg) ;
          }
      
          .card-header {
              background-color: transparent;
              padding: 30px 30px 0 30px;
              border: 0;
              font-size: 26px;
              color: #6EAC43;
              margin-bottom: 24px;
          }
      
          .card-main {
              display: flex;
              justify-content: space-between;
              padding: 0 30px;
              flex: 1;
          }
      
          .card-info {
              margin-top: 20px;
          }
      
          .card-info span {
              font-family: "BPG WEB 002", sans-serif;
              display: block;
              font-size: 12px;
              color: #6A6A6A;
          }
      
          .card-info h4 {
              font-family: inherit;
              font-size: 22px;
              color: #040505;
              margin-bottom: 12px;
          }
      
          .card-img {
              width: 130px;
              height: 160px;
              /* background-color: #000; */
          }
      
          .card-img .img-fluid {
              width: 100%;
              height: 100%;
              object-fit: cover;
          }
      
          .card-footer {
              background-color: transparent;
              padding: 24px 32px 0;
              border: 0;
              font-size: 18px;
              color: #040505;
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: relative;
              z-index: 10;
          }
      
          .bedge {
              display: flex;
              align-items: center;
          }
          img
          }
      
          /* Golden Card Start */
          .card-golden .card-side {
            background: #FFF4CD;
          }
      
          .card-golden .card-footer {
            height: 80px;
            background: url('http://127.0.0.1:3000/assets/img/card/1.svg') no-repeat left top/cover;
          } 
      
          .card-golden .bedge-icon {
            background: url('http://127.0.0.1:3000/assets/img/card/goldeninvestor.png') no-repeat center/cover;
          }
          /* Golden Card End */
      
          /* CBD Card Start */s
          .card-cbd .card-side {
            background: #FFCDCD;
          }
      
          .card-cbd .card-footer {
            background: url('http://127.0.0.1:3000/assets/img/card/2.svg') no-repeat left top/cover;
          }
      
          .card-cbd .bedge-icon {
            background: url('http://127.0.0.1:3000/assets/img/card/CBD.png') no-repeat center/cover;
          }
          /* CBD Card End */
      
          /* Grower Card Start */
          .card-grower .card-side {
              background: #EBFFCD;
          }
      
          .card-grower .card-footer {
            background: url('http://127.0.0.1:5500/assets/img/card/3.svg') no-repeat left top/cover;
          }
      
          .card-grower .bedge-icon {
              background: url('http://127.0.0.1:3000/assets/img/card/გროუერი.png') no-repeat center/cover;
          }
          /* Grower Card End */
      
          /* Founder Card Start */
          .card-founder .card-side {
              background: #E5F9B7;
          }
      
          .card-founder .card-footer {
            background: url('http://127.0.0.1:3000/assets/img/card/4.svg') no-repeat left top/cover;
          }
      
          .card-founder .bedge-icon {
              background: url('http://127.0.0.1:3000/assets/img/card/დამფუძნებელი.png') no-repeat center/cover;
          }
          /* Founder Card End */
      
          /* Smoker Card Start */
          .card-smoker .card-side {
              background: #F9DCB7;
          }
      
          .card-smoker .card-footer {
            background: url('http://127.0.0.1:3000/assets/img/card/5.svg') no-repeat left top/cover;
          }
      
          .card-smoker .bedge-icon {
              background: url('http://127.0.0.1:3000/assets/img/card/მწეველი.png') no-repeat center/cover;
          }
          /* Smoker Card End */
      
          /* Supporter Card Start */
          .card-supporter .card-side {
              background: #D8EEFF;
          }
      
          .card-supporter .card-footer {
            background: url('http://127.0.0.1:3000/assets/img/card/6.svg') no-repeat left top/cover;
          }
      
          .card-supporter .bedge-icon {
              background: url('http://127.0.0.1:3000/assets/img/card/ქომაგი.png') no-repeat center/cover;
          }
          /* Supporter Card End */
      
          /* Investor Card Start */
          .card-investor .card-side {
              background: #F3FFD8;
          }
      
          .card-investor .card-footer {
            background: url('http://127.0.0.1:3000/assets/img/card/7.svg') no-repeat left top/cover;
          }
      
          .card-investor .bedge-icon {
              background: url('http://127.0.0.1:3000/assets/img/card/ინვესტორი.png') no-repeat center/cover;
          }
          /* Investor Card End */
      
          /* Owner Card Start */
          .card-owner .card-side {
              background: #EED8FF;
          }
      
          .card-owner .card-footer {
            background: url('http://127.0.0.1:3000/assets/img/card/8.svg') no-repeat left top/cover;
          }
      
          #card-back{
            margin-left: 15px;
          }s
      
          .card-owner .bedge-icon {
              background: url('http://127.0.0.1:3000/assets/img/card/მეწარმე.png') no-repeat center/cover;
          }</style><body><div id="cards" class="cards card-golden">
            </div>
            <div id="card-back" class="card-side">
              <header class="card-header">CANNABIS LOVERS SOCIETY</header>
              <main class="card-main">
                <div class="card-info">
                  <span>name surname</span>
                  <h4>Name Surname</h4>
                  <span>date of birth</span>
                  <h4>36.12.2000</h4>
                </div>
                <div class="card-info">
                  <span>personal number</span>
                  <h4>01021234567</h4>
                  <span>number</span>
                  <h4>123456789</h4>
                </div>
                <div id="card-img" class="card-img">
                  <div class="card-qrcode"></div>
                </div>
              </main>
              <footer class="card-footer">
                  <div class="bedge">
                    <div class="bedge-icon"></div>
                    GOLDEN INVESTOR
                  </div>
                  <div>
                    VALID: <span>25.12.2025</span>
                  </div>
              </footer>
            </div>
        </div></body></html>`,
        content: {name: "name"}
        })
        .then(() => console.log('The image was created successfully!'))
    }
    
    back()
    num++;
    
  }

}


card2png()

  





