const noteData = require("..db/db.json");
const fs = require("fs");

module.exports = function(app) {
    app.get("/api/notes", (req, res) => res.json(noteData));
    
    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        const uniqueID = (notesData.length).toString();
        newNote.id = uniqueID;
        noteData.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
        return res.json(noteData);
    });
};

app.delete("/api/nots/:id", (req, res) => {
    const { id } = req.params;
    const noteIndex = noteData.findIndex((n) => n.id == id);
    noteData.splice(noteIndex, 1);
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData));
    return res.json(noteData);
});
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.