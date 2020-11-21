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

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});



// API Routes

var notesdb = require("./db/db")

app.get("/api/notes", function (req, res) {
    return res.json(notesdb);
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    console.log('number of notes prior to saving:', notesdb.length);
    console.log('old notes: ', notesdb);

    newNote.id = notesdb.length + 1;

    notesdb.push(newNote);
    console.log('number of notes after saving:', newNote.id);
    console.log('new notes: ', notesdb);

    fs.writeFile("./db/db.json", JSON.stringify(notesdb), function (err) {
        if (err) {
            throw err;
        }
    });

    res.send(notesdb);
});

app.delete("/api/notes/:id", function (req, res) {
    var deleteNoteId = req.params.id;
    console.log("ID of note to delete::", deleteNoteId);

    var deleteNote = notesdb.map(function (item) {
        return item.id;
    }).indexOf(deleteNoteId);

    notesdb.splice(deleteNote);

    console.log('NotesDB: ', notesdb);

});


//Server Start
app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`)
})