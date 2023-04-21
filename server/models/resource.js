const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  lessonId: [{ // Change to an array of ObjectId references
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  }],
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
});

ResourceSchema.index({ title: 'text' });

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;