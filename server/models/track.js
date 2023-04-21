const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    courseId: { type: Schema.Types.ObjectId, ref: "Course" , required:true},
    
});

TrackSchema.virtual("url").get(function () {
    return `/track/${this._id}`;
});


module.exports = mongoose.model("Track", TrackSchema);
