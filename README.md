# Hive Devs Learning Platform

This repository contains a full-stack web application for learning about developing in the Hive blockchain,  it contains both the front and backend of Hive Devs. The application is built with Express and React.

## Project Description

This web application is a learning platform for the Hive blockchain. It consists of a backend API built with Express that provides data to a frontend React application. The frontend application allows users to complete a course about Hive and make posts on the blockchain while keeping track of their progress.



## Getting Started
To get started with this application, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies for both the backend and frontend applications by running npm install in the server (backend) and client (frontend) directories.

3. Start the backend application by running npm start in the server directory.
4. Start the frontend application by running npm start in the frontend directory.
5. Open your browser and navigate to http://localhost:3000 to view the application.


## Usage
This application provides a user interface that allows users to complete lessons about a course 

## Backend API

Each skill is divided in tracks which are then subdivided in lessons

### Skills

- GET all courses:
  - Route: /
  - Controller: courseController.getCourses

- GET all categories:
  - Route: /categories
  - Controller: courseController.getCategories

- GET a course by ID:
  - Route: /coursew/:id
  - Controller: courseController.getCourse

- GET a course by name:
  - Route: /course/:name
  - Controller: courseController.getCourseByName

- POST create a new course:
  - Route: /course
  - Controller: courseController.createCourse

- PUT update an existing course:
  - Route: /course/:id
  - Controller: courseController.courseUpdate

- DELETE a course:
  - Route: /course/:id
  - Controller: courseController.courseDelete


### Tracks

- GET a track by ID:
  - Route: /track/:id
  - Controller: trackController.getTrack

- POST create a new track:
  - Route: /track
  - Controller: trackController.createTrack

- PUT update an existing track:
  - Route: /track/:id
  - Controller: trackController.trackUpdate

- DELETE a track:
  - Route: /track/:id
  - Controller: trackController.trackDelete

### Lessons 

- GET a lesson by name:
  - Route: /lesson/:name
  - Controller: lessonController.getLessonByName

- POST create a new lesson:
  - Route: /lesson
  - Controller: lessonController.createLesson

- PUT update an existing lesson:
  - Route: /lesson/:id
  - Controller: lessonController.updateLesson

- DELETE a lesson:
  - Route: /lesson/:id
  - Controller: lessonController.deleteLesson

### Users 

- GET a user by name:
  - Route: /user/:name
  - Controller: userController.getUserByName

- POST create a new user:
  - Route: /user
  - Controller: userController.createUser

- PATCH mark a lesson as completed for a user:
  - Route: /user/:id/lessonCompleted
  - Controller: userController.user_lessonCompleted

- PATCH remove a lesson from a user's completed list:
  - Route: /user/:id/removeLesson
  - Controller: userController.user_removeLesson

- PATCH mark a track as completed for a user:
  - Route: /user/:id/trackCompleted
  - Controller: userController.user_trackCompleted

- PATCH remove a track from a user's completed list:
  - Route: /user/:id/removeTrack
  - Controller: userController.user_removeTrack


### Resources 

- POST create a new resource:
  - Route: /resource
  - Controller: resourceController.createResource

- GET all resources:
  - Route: /resource
  - Controller: resourceController.getResources

- GET a resource by ID:
  - Route: /resource/:id
  - Controller: resourceController.getResource



## Frontend Application

The frontend application is built with React and provides a user interface for displaying the courses in the backend. It doesn't let you create or update the course or resources

