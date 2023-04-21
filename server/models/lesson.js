const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String }, //video de 3speak Ej: <iframe width="560" height="315" src="https://3speak.tv/embed?v=itzchemaya/cmcawrsr" frameborder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  trackId: { type: Schema.Types.ObjectId, ref: "Track", required: true },
  explanation: { type: String, required: true }, //texto
  duration: { type: Number },
  resources:[{type: String}],
  hiveTag: { type: String, required: true },
});

LessonSchema.virtual("url").get(function () {
  // Esto era para tener la ID de cada curso en particular
  return `/lesson/${this._id}`;
});

// Export model
module.exports = mongoose.model("Lesson", LessonSchema);
