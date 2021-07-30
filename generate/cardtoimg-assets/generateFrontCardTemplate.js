const hostname = "http://127.0.0.1:3000";



const generateCardTemplateGe = function () {
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
    
    .card-side:first-child {
      font-family: "BPG Nino Mtavruli Bold", sans-serif;
    }
    
    .card-side:first-child .card-header h3 {
      font-size: 22.5px;
    }
    
    .card-side:first-child .card-header span {
      font-size: 17.5px;
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
      font-size: 15px;
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
    }
    
    .bedges {
      display: flex;
      flex-direction: column-reverse;
      position: absolute;
      left: 40px;
      bottom: 145.5px;
    }
    
    .bedges img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
      background: #fff;
      margin-top: -1.5rem;
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
      background-color: #6EAC43;
      display: flex;
      align-items: center;
      padding: 50px 0 65px 40px;
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
            <h3>{{name}} {{surname}}</h3>
            <span>{{status}}</span>
        </header>
        <main class="card-main">
            <div class="bedges">
              {{{fullBedgesContainer}}}
            </div>
            <img src="${hostname}{{img}}" class="profile-img"  alt="user">
        </main>
        <footer class="card-footer">
            <h2>კანაფის მოყვარულთა საზოგადოება</h2>
        </footer>
    </div>
  </body>
</html>`;
};

export default generateCardTemplateGe;
