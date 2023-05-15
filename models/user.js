//create a model for user in mongoose

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type:String, required: true},
    experienceInHive: {type:String, required: true},
    reasonsForDeveloping: {type:String, required: true},
    languageUsed: {type:String, required: true},
    joined: {type: Date, default: Date.now},
    lessonsCompleted: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    trackCompleted: [{ type: Schema.Types.ObjectId, ref: "Track" }],
});

var User = mongoose.model('User', userSchema);

module.exports = User;

