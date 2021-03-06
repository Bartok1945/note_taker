const noteData = require("../db/db.json");
const fs = require("fs");

module.exports = function(app) {

    
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

    app.get("/api/notes", (req, res) => res.json(noteData));
   

    // * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    
    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        const noteId = (noteData.length).toString();
        newNote.id = noteId;
        noteData.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
        return res.json(noteData);
    });


// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    const noteIndex = noteData.findIndex((n) => n.id == id);
    noteData.splice(noteIndex, 1);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
    return res.json(noteData);
});
};

