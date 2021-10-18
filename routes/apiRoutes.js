// Dependencies
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

router.get("/notes", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"));
  res.json(data);
});

router.post("/notes", (req, res) => {
  const newNote = {
    title: req.body.title, 
    text: req.body.text,
    id: uuidv4()
  };

  // Read the current contents of the db.json file and then add the new note
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"));
  data.push(newNote);

  // Write the new contents to the db.json file
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(data));
  res.json(data);
});

router.delete("/notes/:id", (req, res) => {
  // Read the contents of the db.json file and then remove the corresponding note using its ID
  let data = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"));
  data = data.filter(note => note.id !== req.params.id);

  // Write the new contents to the db.json file
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(data));
  res.json(data);
});

module.exports = router;
