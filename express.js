const express = require('express');
const app = express();
const port = process.env.port || 4444;

const things = "./routes/things.js";

app.use("/things", things);

app.get("/", (req, res) => {
    res.send("asd")
});

app.route("/index.html")
.get((req, res) => {})
.post((req, res) => {});

app.route("/user-profile.html")
.get((req, res) => {})
.post((req, res) => {});

app.listen(port, err => {
    if(err) {
        return console.log("ERROR", err);
    }
  console.log(`Example app listening at http://localhost:${port}`)
})