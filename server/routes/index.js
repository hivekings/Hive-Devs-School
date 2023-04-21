var express = require('express');
var router = express.Router();

const courseController = require ("../controllers/courseControllers");

/* GET home page. */
router.get("/", courseController.getCourses)
router.get("/categories", courseController.getCategories)
router.get("/coursew/:id", courseController.getCourse);
router.get("/course/:name", courseController.getCourseByName);
router.post("/course", courseController.createCourse);
router.put("/course/:id", courseController.courseUpdate);
router.delete("/course/:id", courseController.courseDelete); // DELETE COURSES NO EXISTE LA RUTA

/*Tracks */
const trackController = require ("../controllers/trackControllers");

router.get("/track/:id", trackController.getTrack);
router.post("/track", trackController.createTrack);
router.put("/track/:id", trackController.trackUpdate);
router.delete("/track/:id", trackController.trackDelete); // DELETE TRACKS NO EXISTE LA RUTA

/*Lessons */
const lessonController = require ("../controllers/lessonControllers");

router.get("/lesson/:name", lessonController.getLessonByName);
router.post("/lesson", lessonController.createLesson);
router.put("/lesson/:id", lessonController.updateLesson);
router.delete("/lesson/:id", lessonController.deleteLesson); // DELETE LESSONS NO EXISTE LA RUTA

/*Users */
const userController = require ("../controllers/userControllers");
router.get("/user/:name", userController.getUserByName);
router.post("/user", userController.createUser);
router.patch("/user/:id/lessonCompleted", userController.user_lessonCompleted);
router.patch("/user/:id/removeLesson", userController.user_removeLesson);
router.patch("/user/:id/trackCompleted", userController.user_trackCompleted);
router.patch("/user/:id/removeTrack", userController.user_removeTrack);

/*Projects */
const projectController = require ("../controllers/projectControllers");
router.get("/user/:name/projects", projectController.project_list_by_user);
router.get("/lesson/:id/projects", projectController.project_list_by_lesson);
router.post("/project", projectController.create_project);

const resourceController = require ("../controllers/resourceControllers");
router.post("/resource", resourceController.createResource);
router.get("/resource", resourceController.getResources);
router.get("/resource/:id", resourceController.getResource);

module.exports = router;