// --CREATE PDF FILES--
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

    let counterY = page.getHeight() - 178;

    for(let i = 1; i < 6; i++){

        const pngUrl = `http://127.0.0.1:3000/assets/cards/user-${i}/front.png`
        const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
        const pngImage = await pdfDoc.embedPng(pngImageBytes)
        const pngDims = pngImage.scale(0.38)
        page.drawImage(pngImage, {
            x: 30 ,
            y: counterY,
            width: pngDims.width + 10,
            height: pngDims.height - 3,
        })

        counterY -= 163;
    }

    counterY = page.getHeight() - 178;

    for(let i = 1; i < 6; i++){

        const pngUrl = `http://127.0.0.1:3000/assets/cards/user-${i}/back.png`
        const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
        const pngImage = await pdfDoc.embedPng(pngImageBytes)
        const pngDims = pngImage.scale(0.38)
        page.drawImage(pngImage, {
            x: 312,
            y: counterY,
            width: pngDims.width + 10,
            height: pngDims.height - 3,
        })
        counterY -= 163;
    }

    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, "newpdf", "application/pdf");
}

// Download into PDF
const userCardID=document.getElementById('cards');
const idBtn=document.querySelector('.idDownload')
idBtn.addEventListener('click',embedImages)