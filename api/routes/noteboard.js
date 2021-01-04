const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Note = require('../models/note')

router.post('/', (req, res, next) => {
    // parse the Note found in the body of the request
    const note = new Note({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        prompt: req.body.prompt,
        password: req.body.password
    })
    // save the note to the database, and log the note to stdout
    note.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Saved prompt-password-title-content to database!"
            })
        })
        // log any write errors to stdout
        .catch(error => {
            console.log(error)
            res.status(500).json({
                status: error
            })
        })
})

router.get('/', (req, res, next) => {
    //return all noteId's and titles found in the database
    Note.find()
        .select('title _id')
        .exec()
        .then(notes => {
            res.status(200).json(notes)
        }).catch(err => console.log(err))
})

router.get('/:noteId', (req, res, next) => {
    // lookup the note by noteId, and return the prompt for the front-end to playback
    const id = req.params.noteId
    Note.findById(id)
        .exec()
        .then(doc => {
            res.status(200).json({
                prompt: doc.prompt
            })
        })
        .catch(error =>
            res.status(500).json({
                status: error
            })
        )
})

module.exports = router;