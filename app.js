import express, { response } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fetch from "node-fetch";
import * as fs from "fs";
import bodyParser from "body-parser";
import multer from "multer";

import convertLetters from "./users-assets/js/convertLetters.js";
import statusChanger from "./users-assets/js/statusChanger.js";

import { userInfo } from "os";

const app = express();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./users-assets/usersImages");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: fileStorageEngine });
const port = 3000;
const hostname = "http://127.0.0.1:3000";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "pug");

app.use("/users-assets", express.static("users-assets"));
app.use("/assets", express.static("assets"));
app.use("/generate", express.static("generate"));

app.listen(port, "127.0.0.1", () =>
  console.log(`Server running at ${hostname}`)
);

// Home Page Route
app.get("/", (req, res) => {
  (async () => {
    let allUser = []
    const usersJSONList = fs.readdirSync("./users-assets/usersJsons")

    for(const userJSON of usersJSONList){
      const dataResponse = await fetch(`${hostname}/users-assets/usersJsons/${userJSON}`);
      const data = await dataResponse.json();
      data.status = statusChanger(data.status, 'clean')
      allUser.push(data)
    }

    allUser.sort((a, b) => b.card_number - a.card_number)

    res.render(__dirname + "/snippet/index", {
      allUser
    });
  })();
});

// Users Page Route
app.get("/users", (req, res) => {
  (async () => {
    let allUser = []
    const usersJSONList = fs.readdirSync("./users-assets/usersJsons")

    for(const userJSON of usersJSONList){
        const dataResponse = await fetch(`${hostname}/users-assets/usersJsons/${userJSON}`);
        const data = await dataResponse.json();
        allUser.push(data)
    }

    allUser.sort((a, b) => b.card_number - a.card_number)

    res.render(__dirname + "/snippet/users", {
      allUser
    });
  })();
});

// Countitution Page Route
app.get("/constitution", (req, res) => {
  res.render(__dirname + "/snippet/constitution");
});

// Download PDFs Page Route
app.get("/cards-download", (req, res) => {
  let PDFDirectory = fs.readdirSync("generate/pdf");
  res.render(__dirname + "/snippet/card-download", { PDFDirectory });
});

// User Cards Page Route
app.get("/user/:id", (req, res) => {
  (async () => {
    const dataResponse = await fetch(`${hostname}/users-assets/usersJsons/${req.params.id}.json`);
    const data = await dataResponse.json();

    data.cleanStatus = statusChanger(data.status, 'clean');
    data.cleanOtherStatuses = data.other_statuses.map(status => statusChanger(status, 'clean'));

    const engData = {
      name: convertLetters(data.name),
      status: statusChanger(data.status, 'lang'),
      fullStatusClasses: [statusChanger(data.status, 'class'), ...data.other_statuses.map(word => statusChanger(word, 'class'))]
    };

    res.render(__dirname + "/snippet/profile", {
      data,
      engData,
    });
  })();
});

// Customize Cards Page Routes
app.get("/custom-card", (req, res) => {
  (async () => {
    let allUser = []
    const usersJSONList = fs.readdirSync("./users-assets/usersJsons")

    for(const userJSON of usersJSONList){
        const dataResponse = await fetch(`${hostname}/users-assets/usersJsons/${userJSON}`);
        const data = await dataResponse.json();
        allUser.push(data)
    }

    allUser.sort((a, b) => b.card_number - a.card_number)
    const newCardNum = allUser[0].card_number + 1;

    res.render(__dirname + "/snippet/custom-card", {
      newCardNum
    });
  })();
});

app.post(
  "/custom-card",
  [urlencodedParser, upload.single("image")],
  (req, res) => {
    (async () => {

      const userInformation = req.body;
      const userID = userInformation.user_id;
      const userExists = fs.existsSync(`./users-assets/usersJsons/${userID}.json`)

      if(userInformation.other_statuses == null){
        userInformation.other_statuses = []
      }else if(typeof userInformation.other_statuses !== "object"){
        userInformation.other_statuses = [userInformation.other_statuses]
      }

      let allUser = []
      const usersJSONList = fs.readdirSync("./users-assets/usersJsons")

      for(const userJSON of usersJSONList){
          const dataResponse = await fetch(`${hostname}/users-assets/usersJsons/${userJSON}`);
          const data = await dataResponse.json();
          allUser.push(data)
      }

      allUser.sort((a, b) => b.card_number - a.card_number)
      const newCardNum = allUser[0].card_number + 1;

      userInformation.img = '/' + req.file.path;
      userInformation.card_number = newCardNum;
      userInformation.registration = '2021-07-13'
      const stringedData = JSON.stringify(userInformation)

      if(!userExists && userID !== ''){
        fs.writeFile(`./users-assets/usersJsons/${userID}.json`, stringedData, err => { if(err) console.log(err) })
        res.redirect(`/user/${userID}`);
      } else if(userExists && userID !== ''){
        res.redirect(`/user/${userID}`);
        console.log('User already exists on server')
      } else {
        res.redirect(`/`);
        console.log('You are not logged in')
      }

    })();
  }
);
