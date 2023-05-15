const Course = require('../models/course');
const Track = require('../models/track');
const Lesson = require('../models/lesson');

const { body, validationResult } = require('express-validator');

exports.getCourses = (req, res, next) => {
    try{
        Course.find({ order: { $exists: true } }).sort({ order: 1 }).exec(function (err, list_courses) {
            if (err) { return next(err); }
            res.json(list_courses);
        });
    }
    catch(err){
        res.json({message: err});
    }
};

exports.getCategories = (req, res, next) => {
    try{
        Course.find("title")
        .exec(function (err, list_courses) {
            if (err) { return next(err); }
            res.json(list_courses);
        });
    }
    catch(err){
        res.json({message: err});
    }
};

exports.createCourse = [
    body('title', 'Title required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description required').trim().isLength({ min: 1 }).escape(),
    body('image', 'Image required').trim().isLength({ min: 1 }).escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        const course = new Course({
            title: req.body.title,
            description: req.body.description,
            image:req.body.image
        });

        if (!errors.isEmpty()) {
            res.json({ title: 'Create Course', course: course, errors: errors.array() });
            return;
        }

        try {
            const newCourse = await course.save();
            res.json(newCourse.url);
        } catch {
            res.json({ title: 'Create Course', course: course, errors: errors.array() });
        }
    }
];


exports.courseUpdate = [
    body('title', 'Title required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description required').trim().isLength({ min: 1 }).escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        const course = new Course({
            title: req.body.title,
            description: req.body.description,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            res.json({ title: 'Update Course', course: course, errors: errors.array() });
            return;
        }

        try {
            const newCourse = await Course.findByIdAndUpdate(req.params.id, course, {});
            res.json(newCourse);
        } catch {
            res.json({ title: 'Update Course', course: course, errors: errors.array() });
        }
    }
];


exports.courseDelete = async (req, res, next) => {
    try {
        const course = await Course.findByIdAndRemove(req.params.id);
        res.json(course);
    } catch {
        res.json({ title: 'Delete Course', errors: errors.array() });
    }
}

exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        const tracks = await Track.find({ courseId: req.params.id });
        res.json({course: course, tracks:tracks});

    } catch {
        console.log('error')
        // res.json({ title: 'Get Course', errors:'error' });
    }
}


exports.getCourseByName = async (req, res, next) => {

    try {
        const course = await Course.findOne({title:req.params.name});
        const tracks = await Track.find({ courseId: course._id }).populate('lessons');
        res.json({course: course, tracks:tracks});
    } catch {
        console.log('error')
        // res.json({ title: 'Get Course', errors:'error' });
    }
}

