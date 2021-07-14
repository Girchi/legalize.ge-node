import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)


app.set("view engine", "pug");

app.use("/assets", express.static('assets'));

app.get("/", (req, res) => {
    res.render(__dirname + "/snippet/index", { message: "Hello world"});
});

app.get("/users", (req, res) => {
    res.render(__dirname + "/snippet/users", { message: "Hello world"});
});

app.get("/constitution", (req, res) => {
    res.render(__dirname + "/snippet/constitution");
});

// --------------------Card Sides----------------
 

app.get("/user/:id", (req, res) => {
    res.render(__dirname + "/snippet/profile", { id: req.params.id});
    console.log(req.params.id);
});


app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`)); 