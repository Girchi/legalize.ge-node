const express = require('express');

const app = express();

const port = 3000;
const hostname = '127.0.0.1';


app.set("view engine", "pug");

app.use("/static", express.static('assets'));

app.get("/", (req, res) => {
    res.render("index", {title: "hello", message: "Hello world"});
});



app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`)); 