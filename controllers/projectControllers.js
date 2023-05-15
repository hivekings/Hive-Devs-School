const Project = require("../models/project");

// Display list of all Projects.
exports.project_list_by_lesson = async function (req, res) {
    try {
        const projects = await Project.find({ lessonId: req.params.id }).sort({ _id: -1 }).limit(10);
        res.json(projects);
    } catch (error) {
        console.log(error);
    }
}

exports.project_list_by_user = async function (req, res) {
    console.log(req.params.name);
    console.log("usuario")
    try {
        const projects = await Project.find({ userName: req.params.name });
        res.json(projects);
    }
    catch (error) {
        console.log(error);
    }
}

exports.create_project = async function (req, res) {
    try {
        
        const project = new Project ({
            lessonId: req.body.lessonId,
            userName: req.body.username,
            linkToDemo: req.body.linkToDemo,
            linkToCode: req.body.linkToCode
        })  
        await project.save();
        
        res.json(project);
    } catch (error) {
        console.log(error);
    }
}