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
      right: -17%;
      top: -12%;
      width: 320px;
      height: 320px;
      opacity: 0.15;
      transform: rotate(210deg);
    }
    
    .card-bg-1 {
      position: absolute;
      right: 18.5%;
      top: 17.5%;
      width: 150px;
      height: 150px;
      opacity: 0.09;
    }
    
    .card-bg-2 {
      position: absolute;
      left: -49px;
      top: 76px;
      width: 87%;
      opacity: 0.09;
      transform: scaleX(-1);
      height: 90%;
      z-index: -1;
    }

    .card-header {
      background-color: transparent;
      border: 0;
      padding: 40px 40px 0 40px;
      margin-bottom: 5rem;
    }
    
    .card-header h3 {
      font-size: 25px;
      margin-bottom: 1rem;
    }
    
    .card-header span {
      font-size: 18px;
      color: #6EAC43;
    }
    
    .card-main {
      padding:0 40px;
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
      letter-spacing: -1px;
    }

    .qrcode-img {
      width: 115px;
      height: 115px;
      object-fit: cover;
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-60%);
    }
    
    .card-footer {
      height: 135px;
      background-color: #6EAC43;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .card-footer:last-child {
      border-radius: 0;
    }
    
    .card-footer h2{
      font-size: 24px;
      color: #000;
      margin-bottom: 1rem;
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

        <span>DATE OF REGISTRATION</span>
        <h4>{{registration}}</h4>

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
