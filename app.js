import express, { response } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fetch from "node-fetch";
import * as fs from "fs";
import QRCode from "qrcode";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/serverImages");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

let statuses = {
  გროუერი: "grower",
  მწეველი: "smoker",
  მეწარმე: "owner",
  ქომაგი: "supporter",
  დამფუძნებელი: "founder",
  CBD: "cbd",
  ინვესტორი: "investor",
  ოქროს_ინვესტორი: "golden investor",
};

function convertLetters(str) {
  const objectOfLetters = {
    ქ: "q",
    წ: "ts",
    ე: "e",
    რ: "r",
    ტ: "t",
    ყ: "y",
    უ: "u",
    ი: "i",
    ო: "o",
    პ: "p",
    ა: "a",
    ს: "s",
    დ: "d",
    ფ: "f",
    გ: "g",
    ჰ: "h",
    ჯ: "j",
    კ: "k",
    ლ: "l",
    ზ: "z",
    ხ: "kh",
    ც: "c",
    ვ: "v",
    ბ: "b",
    ნ: "n",
    მ: "m",
    ღ: "gh",
    თ: "t",
    შ: "sh",
    ჟ: "j",
    ძ: "dz",
    ჩ: "ch",
  };
  const lettersArray = str.split("");

  const mappedArray = lettersArray.map((letter) => {
    return objectOfLetters[letter];
  });

  return mappedArray.join("");
}

const upload = multer({ storage: fileStorageEngine });
const port = 3000;
const hostname = "127.0.0.1";
const hostname2 = "http://127.0.0.1:3000";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "pug");

app.use("/assets", express.static("assets"));
app.use("/generate", express.static("generate"));

app.get("/", (req, res) => {
  async function latestUsers() {
    const userArray = await fetch(`${hostname2}/assets/js/users.json`);
    const users = await userArray.json();
    res.render(__dirname + "/snippet/index", {
      arr: users.data,
    });
  }
  try {
    latestUsers();
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", (req, res) => {
  async function callTheAPI() {
    const response = await fetch(`${hostname2}/assets/js/users.json`);
    const users = await response.json();
    res.render(__dirname + "/snippet/users", {
      arr: users.data,
    });
  }
  try {
    callTheAPI();
  } catch (error) {
    console.log("Something went wrong..");
    throw new Error(error);
  }
});

app.get("/constitution", (req, res) => {
  res.render(__dirname + "/snippet/constitution");
});

app.get("/create-post", (req, res) => {
  res.render(__dirname + "/snippet/create-post");
});

app.post("/post", [urlencodedParser, upload.single("image")], (req, res) => {
  res.render(__dirname + "/snippet/post-success", {
    data: req.body,
    image: `./assets/serverImages/${req.file.originalname}`,
  });
});

// --------------------Card Sides----------------

const generateQR = (text) => {
  var opts = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 1,
    margin: 0,
    color: {
      dark: "#000",
      light: "#ffffff00",
    },
  };
  let generatedval = QRCode.toDataURL(text, opts);
  return generatedval;
};

app.get("/user/:id", (req, res) => {
  async function callTheAPI() {
    const response = await fetch(`${hostname2}/assets/js/users.json`);
    const users = await response.json();

    const QRValue = await generateQR(`${hostname2}/user/${req.params.id}`);
    const data = users.data[req.params.id];
    const otherData = {
      name: convertLetters(data.name),
      surname: convertLetters(data.surname),
      status: statuses[data.status.replace(" ", "_")],
      class: statuses[data.status.replace(" ", "_")].replace(" ", ""),
    };
    res.render(__dirname + "/snippet/profile", {
      data,
      otherData,
      QRValue,
    });
  }
  try {
    callTheAPI();
  } catch (error) {
    console.log("Something went wrong..");
    throw new Error(error);
  }
});

// Customize Cards Page
app.get("/custom-card", (req, res) => {
  (async () => {
    const response = await fetch(`${hostname2}/assets/js/users.json`);
    const users = await response.json();
    const usersLength = users.data.length;

    let data = {
      name: "სახელი",
      surname: "გვარი",
      id_number: "0100101010",
      birth_date: "08/04/2000",
      status: "გროუერი",
      validation: "01/09/2030",
    };
    const QRValue = await generateQR(`${hostname2}/user/${usersLength}`);
    const otherData = {
      name: "name",
      surname: "surname",
      status: "grower",
      class: "grower",
      card_number: usersLength,
    };

    res.render(__dirname + "/snippet/custom-card", {
      data,
      otherData,
      QRValue,
      image: `./assets/img/girchi.png`,
    });
  })();
});

// app.post(
//   "/custom-card",
//   [urlencodedParser, upload.single("image")],
//   (req, res) => {
//     (async () => {
//       const response = await fetch(`${hostname2}/assets/js/users.json`);
//       const users = await response.json();
//       const usersLength = users.data.length;

//       const QRValue = await generateQR(`${hostname2}/user/${usersLength}`);
//       const otherData = {
//         name: convertLetters(req.body.name),
//         surname: convertLetters(req.body.surname),
//         status: statuses[req.body.status],
//         class: statuses[req.body.status.replace(" ", "_")].replace(" ", ""),
//         card_number: usersLength,
//       };

//       res.render(__dirname + "/snippet/custom-card", {
//         data: req.body,
//         otherData,
//         QRValue,
//         image: `./assets/serverImages/${req.file.originalname}`,
//       });
//     })();
//   }
// );

app.get("/cards-download", (req, res) => {
  let PDFDirectory = fs.readdirSync("generate/pdf");
  res.render(__dirname + "/snippet/card-download", { PDFDirectory });
});

app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}/`)
);
