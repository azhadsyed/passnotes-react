const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Note = require('../models/note')

const compareLength = (a, b) => {
    return a.length === b.length
}

const compareNotes = (a, b) => {
    for (let i = 0; i < a.length; i++) {
        if (a[i][1] != b[i][1]) {
            return false
        }
        return true
    }
}

const compareRhythm = (a, b, threshold) => {
    for (let i = 0; i < a.length; i++) {
        if (Math.abs(a[i][0] - b[i][0]) > threshold) {
            return false
        }
        return true
    }
}

function authenticate(a, b) {
    // we are now coupling the threshold with the function definition to minimize exports
    const backBeatThreshold = 500;
    // first test: are the two arrays the same length:
    let sameLength = compareLength(a, b);
    if (sameLength === false) {
        return false
    }
    let sameNotes = compareNotes(a, b)
    if (sameNotes === false) {
        return false
    }
    let sameRhythm = compareRhythm(a, b)
    if (sameRhythm === false) {
        return false
    }
    return true
}

router.post('/', async (req, res, next) => {
    //step 1 - parse the request body
    var id = req.body.id
    var attempt = req.body.attempt

    //step 2 - find the matching password in the db
    const query = await Note.findById(id).select('password -_id').exec()
    const password = query.password
    if (authenticate(password, attempt)) {
        //step 3 - serve the content on a successful attempt
        const content = await Note.findById(id).select('content -_id').exec()
        res.status(200).json(content)
    } else {
        //step 4 - serve a bad response on a failed attempt
        res.status(401).json({
            message: "passwords do not match."
        })
    }
})

module.exports = router;