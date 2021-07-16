const hostname = "http://127.0.0.1:3000";

const generateCardTemplateEn = function (
  namesurname,
  id,
  number,
  img,
  status,
  qr,
  bday,
  validate
) {
  return `<html><style>
  @import url("//cdn.web-fonts.ge/fonts/bpg-web-002/css/bpg-web-002.min.css");

@import url("https://cdn.web-fonts.ge/fonts/bpg-nino-mtavruli-bold/css/bpg-nino-mtavruli-bold.min.css");
@import url("https://cdn.web-fonts.ge/fonts/bpg-arial/css/bpg-arial.min.css");

//BPG WEB 002

@font-face {
  font-family: 'BPG Nino Mtavruli Bold';  
  src: url('https://cdn.web-fonts.ge/fonts/bpg-nino-mtavruli-bold/css/bpg-nino-mtavruli-bold.min.css') format('woff2'); // don't forget the format!
}

@font-face {
  font-family: 'BPG WEB 002';  
  src: url('https://cdn.web-fonts.ge/fonts/bpg-nino-mtavruli-bold/css/bpg-nino-mtavruli-bold.min.css') format('woff2'); // don't forget the format!
}


  /* Card Styles */
body{
    width: 166.6mm;
    height: 105mm;
}
.cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 1rem;

}

.card-side {
    font-family: "BPG Nino Mtavruli Bold", sans-serif;
    font-weight: 400;
    width: 166.6mm;
    height: 105mm;
    border: 0;
    border-radius: 22px;
    letter-spacing: 0;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-side::before {
    content: '';
    width: 405px;
    height: 405px;
    background: url('${hostname}/assets/img/kanafi.png') no-repeat center/contain;
    position: absolute;
    left: 90px;
    top: 20px;
    opacity: 0.15;
    transform: rotate(341.13deg) ;
}

.card-header {
    background-color: transparent;
    padding: 40px 40px 0 40px;
    border: 0;
    font-size: 26px;
    color: #6EAC43;
    margin-bottom: 24px;
}

.card-main {
    display: flex;
    justify-content: space-between;
    padding: 0 50px 0 40px;
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
    margin: 0 0 4px 0;
    padding: 0;
}

.card-info h4 {
    font-family: inherit;
    font-size: 22px;
    color: #040505;
    margin: 0 0 18px 0;
    padding: 0;
}

.card-img {
    width: 130px;
    height: 160px;
}

.card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-qrcode img {
    width:130px;
    height: 130px;
    object-fit:auto;
}

.card-footer {
    background-color: transparent;
    padding: 24px 50px 18px 40px;
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
    text-transform: uppercase;
}

.bedge-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 12px;
    margin-bottom: 12px;
}

.bedge-icon .img-fluid {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Golden Card Start */
.card-goldeninvestor .card-side {
    background: #FFF4CD;
}

.card-goldeninvestor .card-footer {
   background: url('${hostname}/assets/img/card/1.svg') no-repeat left top/cover;
}
/* Golden Card End */

/* CBD Card Start */
.card-cbd .card-side {
    background: #FFCDCD;
}

.card-cbd .card-footer {
   background: url('${hostname}/assets/img/card/2.svg') no-repeat left top/cover;
}
/* CBD Card End */

/* Grower Card Start */
.card-grower .card-side {
    background: #EBFFCD;
}

.card-grower .card-footer {
   background: url('${hostname}/assets/img/card/3.svg') no-repeat left top/cover;
}
/* Grower Card End */

/* Founder Card Start */
.card-founder .card-side {
    background: #E5F9B7;
}

.card-founder .card-footer {
   background: url('${hostname}/assets/img/card/4.svg') no-repeat left top/cover;
}
/* Founder Card End */

/* Smoker Card Start */
.card-smoker .card-side {
    background: #F9DCB7;
}

.card-smoker .card-footer {
   background: url('${hostname}/assets/img/card/5.svg') no-repeat left top/cover;
}
/* Smoker Card End */

/* Supporter Card Start */
.card-supporter .card-side {
    background: #D8EEFF;
}

.card-supporter .card-footer {
   background: url('${hostname}/assets/img/card/6.svg') no-repeat left top/cover;
}
/* Supporter Card End */

/* Investor Card Start */
.card-investor .card-side {
    background: #F3FFD8;
}

.card-investor .card-footer {
   background: url('${hostname}/assets/img/card/7.svg') no-repeat left top/cover;
}
/* Investor Card End */

/* Owner Card Start */
.card-owner .card-side {
    background: #EED8FF;
}

.card-owner .card-footer {
   background: url('${hostname}/assets/img/card/8.svg') no-repeat left top/cover;
}
/* Owner Card End */



  </style>
  <body><div id="cards" class="cards card-{{status}}">
  <div id="card-back" class="card-side">
  <header class="card-header">CANNABIS LOVERS SOCIETY</header>
    <main class="card-main">
    <div class="card-info">
    <span>name surname</span>
    <h4>{{namesurname}}</h4>
    <span>date of birth</span>
    <h4>{{bday}}</h4>
    </div>
    <div class="card-info">
    <span>personal number</span>
    <h4>{{idnum}}</h4>
    <span>number</span>
    <h4>{{n}}</h4>
    </div>
    <div id="card-img" class="card-img">
    <div class="card-qrcode">
    <img src="{{qr}}">
    </div>
    </div>
    </main>
    <footer class="card-footer">
    <div class="bedge">
        <div class="bedge-icon">
            <img class="img-fluid" src="{{badge}}">
        </div>
        {{status}}
    </div>
    <div>
        VALID: <span>{{validate}}</span>
    </div>
    </footer>
</div></div></body></html>`;
};
export default generateCardTemplateEn;
