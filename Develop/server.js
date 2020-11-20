// Dependencies
var express = require('express');
var path = require("path");
var fs = require("fs");

// Express App
var app = express();
var PORT = process.env.PORT || 8080;


// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// CSS & Javascript
app.use(express.static("public"));


// HTML Routes

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
    return res.json(notesdb);
});

app.post("/api/notes", function (req, res) {
    var newNotes = req.body;

    console.log(newNotes);

    notesdb.push(newNotes);

    res.json(newNotes);

    console.log(notesdb);



});


//Server Start
app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`)
})