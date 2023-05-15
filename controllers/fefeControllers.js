const Course = require('../models/course');

const { body, validationResult } = require('express-validator');

exports.getCourses = (req, res) => {
    Course.find({}, (err, courses) => {
        if (err) {
            res.json({ title: 'Get Courses', errors: errors.array() });
        } else {
            res.json(courses);
        }
    });
};

exports.createCourse = [
    body('title', 'Title required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description required').trim().isLength({ min: 1 }).escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        const course = new Course({
            title: req.body.title,
            description: req.body.description,
        });

        if (!errors.isEmpty()) {
            res.json({ title: 'Create Course', course: course, errors: errors.array() });
            return;
        }

        try {
            const newCourse = await course.save();
            res.json(newCourse);
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




