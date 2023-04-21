const Track = require("../models/track");
const Course = require("../models/course");
const Lesson = require("../models/lesson");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");

exports.createTrack = [
    body("title", "Title required").trim().isLength({ min: 1 }).escape(),
    body("description", "Description required").trim().isLength({ min: 1 }).escape(),
    body("courseId", "Course required").trim().isLength({ min: 1 }).escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        const track = new Track({
            title: req.body.title,
            description: req.body.description,
            courseId: req.body.courseId,
        });

        if (!errors.isEmpty()) {
            res.json({ title: "Create Track", track: track, errors: errors.array() });
            return;
        }

        try {
            const newTrack = await track.save();
            const course = await Course.findByIdAndUpdate(req.body.courseId, { $push: { tracks: newTrack._id } });  
            course.save()
            res.json(newTrack);

        } catch {
            res.json({ title: "Create Track", track: track, errors: errors.array() });
        }
    }
];



exports.getTrack = async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.id);
        res.json(track);
    } catch {
        res.json({ message: err.message });
    }
}

exports.trackUpdate = async (req, res, next) => {
    let track = await Track.findById(req.params.id);
    track.title = req.body.title;
    track.description = req.body.description;

    try {
        track = await track.save();
        res.json(track);
    } catch (err) {
        res.json({ message: err.message });
    }
}

exports.trackDelete = async (req, res, next) => {
    try {
        await Track.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted Track" });
    } catch (err) {
        res.json({ message: err.message });
    }
}



// Path: server\models\track.js