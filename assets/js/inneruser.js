// Generate User Information
const userInfoContainer = document.getElementById('userinfo-container');

userInfoContainer.innerHTML = `
    <div class="user-info">
        <img class="user-info--pic" src="../assets/img/users/გიგაგოგაშვილი.jpg" alt="">
        <div class="user-info--text">
            <h4>გიგა გიგაგოგაშვილი</h4>
            <span>მწეველი</span>
        </div>

        <div id="qrcode"></div> 
    </div>

    <p id="quote" class="quote">საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია. იგი სტანდარტად 1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა ამწყობ დაზგაზე.</p>

    <div id="cards" class="cards card-golden">
    <div id="card-front" class="card-side">
    <header class="card-header">კანაფის მოყვარულთა საზოგადოება</header>
    <main class="card-main">
        <div class="card-info">
        <span>სახელი გვარი</span>
        <h4>სახელი გვარი</h4>
        <span>დაბადების თარიღი</span>
        <h4>36.12.2000</h4>
        </div>
        <div class="card-info">
        <span>პირადი ნომერი</span>
        <h4>01021234567</h4>
        <span>ნომერი</span>
        <h4>123456789</h4>
        </div>
        <div id="card-img" class="card-img">
            <img class="img-fluid" src="/assets/img/users/გიგაგოგაშვილი.jpg" alt="user">
        </div>
    </main>
    <footer class="card-footer">
        <div class="bedge">
            <div class="bedge-icon">
                <img class="img-fluid" src="/assets/img/card/${'cbd'}.png" alt="bedge">
            </div>
            ოქროს ინვესტორი
        </div>
        <div>
            ძალაშია: <span>25.12.2025</span>
        </div>
    </footer>
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
        <div class="bedge-icon">
            <img class="img-fluid" src="/assets/img/card/${'cbd'}.png" alt="bedge">
        </div>
        GOLDEN INVESTOR
    </div>
    <div>
        VALID: <span>25.12.2025</span>
    </div>
    </footer>
    </div>
    </div>
    `


/* ========== Qr Code ========== */

const qrdata = document.getElementById("qr-data")
const take = document.getElementById("take")
const cardQrCodes = document.getElementsByClassName('card-qrcode')

for(let i = 0; i < cardQrCodes.length; i++){
    let cardqrcode = new QRCode(cardQrCodes[i], {
        text: "https://legalize.ge/", //this generates code
        width: 130,
        height: 130,
        colorDark : "#000",
        colorLight : "transparent",
        correctLevel : QRCode.CorrectLevel.H
    });
}

let qrcode = new QRCode(document.getElementById("qrcode"), {
text: "https://legalize.ge/", //this generates code
width: 130,
height: 130,
colorDark : "#0e6a38",
colorLight : "transparent",
correctLevel : QRCode.CorrectLevel.H
});

const generateQR = () => {
    let data = qrdata.value
    qrcode.makeCode(data)
}
