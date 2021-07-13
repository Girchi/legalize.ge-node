const btnSwitch = document.getElementById('btn-switch')
let switched = false;
btnSwitch.onclick = () => {
    switched = !switched;
    if(switched){
        btnSwitch.innerHTML = '<i class="fas fa-toggle-on"></i>'
    }else{
        btnSwitch.innerHTML = '<i class="fas fa-toggle-off"></i>'
    }
}

// ------------------------------

const { PDFDocument } = PDFLib

async function embedImages() {
    const jpgUrl = 'http://127.0.0.1:3000/assets/cards/bg.jpg'
    const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.create()
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
    const jpgDims = jpgImage.scale(0.24)
    const page = pdfDoc.addPage()
    page.drawImage(jpgImage, {
    x: 0,
    y: page.getHeight() - jpgDims.height,
    width: jpgDims.width,
    height: jpgDims.height,
    })

    let counterY = page.getHeight() - 172;

    for(let i = 0; i < 5; i++){

        const pngUrl = 'http://127.0.0.1:3000/assets/cards/goldenfront.png'
        const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
        const pngImage = await pdfDoc.embedPng(pngImageBytes)
        const pngDims = pngImage.scale(0.37)
        page.drawImage(pngImage, {
            x: 36 ,
            y: counterY,
            width: pngDims.width + 4,
            height: pngDims.height - 10,
        })

        // counterX += 200;
        counterY -= 162;

    }

    counterY = page.getHeight() - 172;

    for(let i = 0; i < 5; i++){

        const pngUrl = 'http://127.0.0.1:3000/assets/cards/goldenback.png'
        const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
        const pngImage = await pdfDoc.embedPng(pngImageBytes)
        const pngDims = pngImage.scale(0.37)
        page.drawImage(pngImage, {
            x: 318,
            y: counterY,
            width: pngDims.width + 4,
            height: pngDims.height - 10,
        })
        counterY -= 162;

    }

    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, "newpdf", "application/pdf");
}

// Download into PDF
const userCardID=document.getElementById('cards');
const idBtn=document.querySelector('.idDownload')


idBtn.addEventListener('click',embedImages)


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
