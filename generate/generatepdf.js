import { PDFDocument, degrees } from "pdf-lib";
import fetch from "node-fetch";
import * as fs from "fs";

const hostname = "http://127.0.0.1:3000";

// --Generate PDFs--
(async () => {
  const usersJSONList = fs.readdirSync("./users-assets/usersJsons")
  let cardNumbers = []

  for (const userJSON of usersJSONList) {
    const dataResponse = await fetch(`${hostname}/users-assets/usersJsons/${userJSON}`);
    const data = await dataResponse.json();
    cardNumbers.push(data.card_number);
  }
  cardNumbers.sort((a,b) => a - b)
  const PDFShouldBe = parseInt(cardNumbers.length / 5)

  for(let i = 0; i < PDFShouldBe; i++){
    const PDFDirectory = fs.readdirSync("./generate/pdf")
    const alreadyInPDF = PDFDirectory.map(pdf => pdf.replace('.pdf', '').split('-'))
    let alreadyInPDFSep = []
    alreadyInPDF.forEach(pdf => pdf.forEach(inpdf => alreadyInPDFSep.push(inpdf)))
  
    let freeCards = []
  
    for(let i = 0; i < cardNumbers.length; i++){
      const findItem = alreadyInPDFSep.find(value => value == cardNumbers[i])
      if(!findItem){
        freeCards.push(cardNumbers[i])
      }
    }

    console.log(freeCards)
    if(freeCards.length >= 5){
      let jpgUrl, jpgImageBytes, jpgImage, jpgDims;
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      // Add background
      jpgUrl = `${hostname}/generate/bg.jpg`;
      jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());
      jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
      jpgDims = jpgImage.scale(0.24);
      page.drawImage(jpgImage, {
        x: 0,
        y: page.getHeight() - jpgDims.height,
        width: jpgDims.width,
        height: jpgDims.height,
      });

      // Fill with user card images
      let positionY = page.getHeight() - 177.5;

      let pdfName = ''

      for (let i = 0; i < 5; i++) {

        // Card front side
        jpgUrl = `${hostname}/generate/card-imgs/${freeCards[i]}-front.jpg`;
        jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());
        jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
        jpgDims = jpgImage.scale(0.321);
        page.drawImage(jpgImage, {
          x: 286.5,
          y: positionY,
          width: jpgDims.width + 1.5,
          height: jpgDims.height + 0.5,
          rotate: degrees(90),
        });

        // Card back side
        jpgUrl = `${hostname}/generate/card-imgs/${freeCards[i]}-back.jpg`;
        jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());
        jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
        jpgDims = jpgImage.scale(0.321);
        page.drawImage(jpgImage, {
          x: 567,
          y: positionY,
          width: jpgDims.width + 1.5,
          height: jpgDims.height,
          rotate: degrees(90),
        });

        // Y position changes when one image set
        positionY -= 162.5;

        pdfName = pdfName + '-' +  freeCards[i];
      }

      pdfName = pdfName.replace('-','')

      const pdfBytes = await pdfDoc.save();

      // Saves into local folder
      fs.writeFileSync(`./generate/pdf/${pdfName}.pdf`, pdfBytes, (err) => { 
        if (err) throw err 
        console.log(`PDF ${pdfName} Created`)
      })
    } else {
      console.log("All pdf created based on provided images");
      console.log("There must be 5 unused clean set of images to fill pdf");
    }
  }
})();
