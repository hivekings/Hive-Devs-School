const Lesson = require("../models/lesson");
const Track = require("../models/track");
const Course = require("../models/course");
const User = require("../models/user");
const Resource = require('../models/resource'); // Replace with the correct path to your Resource model

// Retrieve resources for a specific lesson by lessonId


const { body, validationResult } = require("express-validator");

exports.getLessonByName = async (req, res, next) => {
    console.log("fede")
    console.log(req.params.name)
    try {
        const lesson = await Lesson.findOne({ title: req.params.name });
        const resources = await Resource.find({ lessonId: lesson._id });
        console.log(lesson)
        res.json({"lesson":lesson, "resources":resources});
    } catch {
        res.json({ message: "Lesson not found" });
    }
};

exports.createLesson = [
    body("title", "Title required").trim().isLength({ min: 1 }).escape(),
    body("explanation", "Explanation required").trim().isLength({ min: 1 }).escape(),
    body("duration", "Duration required").trim().isLength({ min: 1 }).escape(),
    body("trackId", "Track required").trim().isLength({ min: 1 }).escape(),
    

    async (req, res, next) => {
        const errors = validationResult(req);
        console.log("hola")
        const lesson = new Lesson({
            title: req.body.title,
            content: req.body.content,
            explanation: req.body.explanation,
            duration: req.body.duration,
            trackId:req.body.trackId,
            resources: req.body.resources
        });

        if (!errors.isEmpty()) {
            res.json({ title: "Create Lesson", lesson: lesson, errors: errors.array() });
            return;
        }

        try {
            console.log("fefe")
            const newLesson = await lesson.save();
            //add this lesson id to the track lessons array
            const track = await Track.findByIdAndUpdate(req.body.trackId, { $push: { lessons: newLesson._id } }, { new: true });
            res.json(newLesson);
        } catch {
            console.log("error")
            res.json({ title: "Create Lesson", lesson: lesson, errors: errors.array() });
        }
    }
];

exports.updateLesson = [
    body("title", "Title required").trim().isLength({ min: 1 }).escape(),
    body("content", "Content required").trim().isLength({ min: 1 }).escape(),
    body("explanation", "Explanation required").trim().isLength({ min: 1 }).escape(),
    body("duration", "Duration required").trim().isLength({ min: 1 }).escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        const lesson = new Lesson({
            title: req.body.title,
            content: req.body.content,
            explanation: req.body.explanation,
            duration: req.body.duration,
            trackId:req.body.trackId,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            res.json({ title: "Update Lesson", lesson: lesson, errors: errors.array() });
            return;
        }

        try {
            const newLesson = await Lesson.findByIdAndUpdate(req.params.id, lesson, {});
            res.json(newLesson);
        } catch {
            res.json({ title: "Update Lesson", lesson: lesson, errors: errors.array() });
        }
    }
];

exports.deleteLesson = async (req, res, next) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        const track = await
        Track.findById(lesson.trackId);
        const course = await
        Course.findById(track.courseId);
        const user = await
        User.findById(course.userId);
        if (user._id.toString() === req.user._id.toString()) {
            await Lesson.findByIdAndDelete(req.params.id);
            res.json({ message: "Lesson deleted" });
        }
    } catch {
        res.json({ message: "Lesson not deleted" });
    }
};


// Path: server\controllers\trackControllers.js




