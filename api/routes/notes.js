const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Note = require("../models/note");

//for posting new notes to the database
router.post("/", (req, res, next) => {
  // parse the Note found in the body of the request
  const note = new Note({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    prompt: req.body.prompt,
    password: req.body.password,
  });
  // save the note to the database, and log the note to stdout
  note
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Saved prompt-password-title-content to database!",
      });
    })
    // log any write errors to stdout
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: error,
      });
    });
});

//for updating a single note's content with a new reply of type String
router.post("/update", (req, res, next) => {
  const id = req.body.id;
  const reply = req.body.reply;
  const query = { _id: id };
  Note.findOneAndUpdate(
    query,
    { $push: { content: reply } },
    { new: true },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result.content);
      }
    }
  );
});

//for getting all noteId's and titles from the database
router.get("/", (req, res, next) => {
  Note.find()
    .select("title _id prompt")
    .exec()
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => console.log(err));
});

// for getting the prompt associated with a given note from the database
router.get("/:noteId", (req, res, next) => {
  const id = req.params.noteId;
  Note.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json({
        prompt: doc.prompt,
      });
    })
    .catch((error) =>
      res.status(500).json({
        status: error,
      })
    );
});

module.exports = router;
