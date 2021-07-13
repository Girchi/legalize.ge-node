import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import fetch from 'node-fetch'

// --CREATE PDF FILES--

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

    let counterY = page.getHeight() - 176;

    for(let i = 1; i < 6; i++){

        const pngUrl = `http://127.0.0.1:3000/assets/cards/user-${i}/front.png`
        const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
        const pngImage = await pdfDoc.embedPng(pngImageBytes)
        const pngDims = pngImage.scale(0.38)
        page.drawImage(pngImage, {
            x: 29 ,
            y: counterY,
            width: pngDims.width + 13,
            height: pngDims.height - 4,
        })

        counterY -= 163;
    }

    counterY = page.getHeight() - 176;

    for(let i = 1; i < 6; i++){

        const pngUrl = `http://127.0.0.1:3000/assets/cards/user-${i}/back.png`
        const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
        const pngImage = await pdfDoc.embedPng(pngImageBytes)
        const pngDims = pngImage.scale(0.38)
        page.drawImage(pngImage, {
            x: 310,
            y: counterY,
            width: pngDims.width + 13,
            height: pngDims.height - 4,
        })
        counterY -= 163;
    }

    const pdfBytes = await pdfDoc.save()
    console.log("After Save")

   

    var callback = (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
      }

       // Buffer
    fs.writeFile('./assets/pdf/test-cards.pdf', pdfBytes, callback);
}

embedImages();
