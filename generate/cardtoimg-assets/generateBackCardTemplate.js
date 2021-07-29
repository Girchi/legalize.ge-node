const hostname = "http://127.0.0.1:3000";

const generateCardTemplateEn = function () {
  return `
  <html>
  <style>
    @import url("http://cdn.web-fonts.ge/fonts/bpg-nino-mtavruli-bold/css/bpg-nino-mtavruli-bold.min.css");
    @import url("http://cdn.web-fonts.ge/fonts/bpg-square-banner-2013/css/bpg-square-banner-2013.min.css");
    @import url("http://cdn.web-fonts.ge/fonts/bpg-square-banner-caps-2013/css/bpg-square-banner-caps-2013.min.css");
    

    body{
      width: 500.775px;
      height: 802.5px;
    }
    
    /* Card Styles */
    .card-side {
      font-family: "BPG Square Banner Caps 2013", sans-serif;
      width: 500.775px;
      height: 802.5px;
      border: 2px solid #ddd;
      color: #161616;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
    }

    .card-side * {
      font-family: inherit;
      font-weight: 400;
      margin: 0;
      padding: 0;
      line-height: 1;
    }
    
    .card-bg-0 {
      position: absolute;
      right: -20%;
      top: -14%;
      width: 320px;
      height: 320px;
      opacity: 0.15;
      transform: rotate(210deg);
    }
    
    .card-bg-1 {
      position: absolute;
      left: 7.5%;
      top: 9.5%;
      width: 200px;
      height: 200px;
      opacity: 0.26;
    }
    
    .card-bg-2 {
      position: absolute;
      left: 16%;
      top: 4%;
      width: 100%;
      height: 100%;
      opacity: 0.26;
      z-index: -1;
    }
    
    .card-side:last-child .card-bg-1{
      left: auto;
      right: 17.5%;
      top: 15%;
      width: 150px;
      height: 150px;
      opacity: 0.09;
    }
    
    .card-side:last-child .card-bg-2{
      left: -40px;
      top: 60px;
      width: 86%;
      opacity: 0.09;
      transform: scaleX(-1);
      height: 90%;
    }
    
    .card-header {
      background-color: transparent;
      border: 0;
      padding: 27.5px 25px 0 25px;
      margin-bottom: 5rem;
    }
    
    .card-header h3 {
      font-size: 25px;
      margin-bottom: 1rem;
    }
    
    .card-header span {
      font-size: 15px;
      color: #6EAC43;
    }
    
    .card-main {
      padding:0 25px;
      flex: 1;
    }
    
    .card-main span {
      font-family: "BPG Square Banner 2013", sans-serif;
      font-size: 12.5px;
      opacity: 0.5;
    }
    
    .card-main h4 {
      font-size: 27.5px;
      margin: 14px 0 60px;
    }
    
    .bedges {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 25px;
      bottom: 112.5px;
    }
    
    .bedges img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .profile-img {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      object-fit: cover;
      position: absolute;
      right: 60px;
      top: 435px;
    }
    
    .qrcode-img {
      width: 105px;
      height: 105px;
      object-fit: cover;
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-60%);
    }
    
    .card-footer {
      height: 60.5px;
      background-color: #6EAC43;
      display: flex;
      align-items: center;
      padding: 25px;
    }
    
    .card-footer:last-child {
      border-radius: 0;
    }
    
    .card-footer h2{
      font-size: 20px;
      color: #FFFFFF;
    }
    
  </style>

  <body>
  <div class="card-side">
    <img class="card-bg-0" src="${hostname}/assets/img/kanafi.png" alt="cannabis">
    <img class="card-bg-1" src="${hostname}/assets/img/card/newbg1.png" alt="cannabis">
    <img class="card-bg-2" src="${hostname}/assets/img/card/newbg2.png" alt="cannabis statue">
    <header class="card-header">
        <h3>{{nameEN}} {{surnameEN}}</h3>
        <span>{{statusEN}}</span>
    </header>
    <main class="card-main">
        <span>DATE OF BIRTH</span>
        <h4>{{birth_date}}</h4>

        <span>PERSONAL NUMBER</span>
        <h4>{{id_number}}</h4>

        <span>span CARD NUMBER</span>
        <h4>{{card_number}}</h4>

        <span>VALID</span>
        <h4>{{validation}}</h4>

        <img class="qrcode-img" src="{{QRValue}}">
    </main>
    <footer class="card-footer">
        <h2>CANNABIS LOVERS SOCIETY</h2>
    </footer>
  </div>
  </body>
</html>`;
};
export default generateCardTemplateEn;
