const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    userName: { type: String, required: true },
    linkToDemo: { type: String, required: true },
    linkToCode: { type: String, required: true },
});

ProjectSchema.virtual("url").get(function () {
    return `/project/${this._id}`;
}
);

module.exports = mongoose.model("Project", ProjectSchema);