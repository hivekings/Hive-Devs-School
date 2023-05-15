const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.createUser = [
  body("username", "Username required").trim().isLength({ min: 1 }).escape(),
  body("experienceInHive", "Experience in Hive required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("reasonsForDeveloping", "Reasons for developing required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("languageUsed", "Language used required")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res, next) => {
    console.log("Hola")
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      experienceInHive: req.body.experienceInHive,
      reasonsForDeveloping: req.body.reasonsForDeveloping,
      languageUsed: req.body.languageUsed,
    });

    if (!errors.isEmpty()) {
      res.json({ title: "Create User", user: user, errors: errors.array() });
      console.log("fefe")
      return;
    }

    try {
      const newUser = await user.save();
      console.log("pepe")
      res.json(newUser);
    } catch (err) {
      console.log(err)
      res.json({ title: "Create User", user: user, errors: errors.array() });
    }
  },
];

exports.getUserByName = async (req, res, next) => {
  try {
    const user = await User.findOne({name: req.params.name});
    res.json(user);
  } catch(err) {
    res.json({ message: err.message });
  }
};

exports.user_lessonCompleted = [
  body("username", "Username required").trim().isLength({ min: 1 }).escape(),


  async (req, res, next) => {
    try {
      console.log(req.params.id)
      const user = await User.findOne({name:req.body.username});
      user.lessonsCompleted.push(req.params.id);
      await user.save();
      res.json(user);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
];

exports.user_removeLesson = [
  body("username", "Username required").trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    try {
  
      const user = await User.findOne({name:req.body.username});
      user.lessonsCompleted.pull(req.params.id);
      await user.save();
      res.json(user);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
];

exports.user_trackCompleted = async (req, res, next) => {
  try {
    const user = await User.findOne({name:req.body.username})
    user.trackCompleted.push(req.params.id);
    await user.save();
    res.json(user);
  }
   catch (err) {
       res.json({ message: err.message });
   }
}

exports.user_removeTrack = async (req, res, next) => {
  try {
    const user = await User
    .findOne
    ({name
    :req.body.username})
    user.trackCompleted.pull(req.params.id);
    await user.save();
    res.json(user);
  }
    catch (err) {
      res.json({ message: err.message });
    }
}
