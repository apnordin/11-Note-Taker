// Dependencies
var express = require('express');
var path = require("path");

// Express App
var app = express();
var PORT = process.env.PORT || 8080;

//Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routing

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// API Routes

var notesdb = require("./db/db")

console.log(notesdb);

app.get("/api/notes", function (req, res) {
    res.json(notesdb);
});

app.post("/api/notes", function (req, res) {
    notesdb.push(req.body);
    res.json(true);
});




//Server Start
app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`)
})