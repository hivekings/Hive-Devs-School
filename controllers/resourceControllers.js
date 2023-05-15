const Resource = require("../models/resource"); // Replace with the correct path to your Resource model
const Course = require("../models/course");

exports.createResource = (req, res) => {
  const body = req.body;
  const newResource = new Resource({
    title: `What are Liquidity Pools?`,
    link: "https://hive.blog/hive-167922/@chel-koby/6bm3pb-hive-liquidity-pools-what-are-they-and-how-to-earn-from-it",
    lessonId: ["6419bdc0699d10d188bfdffb"], // Replace with the ObjectId values of the associated lessons
    courseId: "63ef9df5285492eaea02c17b", // Replace with the ObjectId of the associated course
  });

  // Save the new resource to the database
  newResource.save((err, resource) => {
    if (err) {
      // Handle error
      console.error(err);
      res.json("no creado");
      return;
    }
    // Resource saved successfully
    console.log("Resource saved:", resource);
    res.json("creado");
  });
};

exports.getResource = (req, res) => {
  Resource.findOne().populate("courseId").exec((err, resource) => {
    if (err) {
      // Handle error
      console.error(err);
      return;
    }
    res.json(resource);
  })
}

// exports.getResources = (req, res) => {
//   // Use Mongoose's find() method without any query to find all resources
//   Resource.find()
//     .populate("courseId") // Populate the courseId field with the associated course
//     // .sort("course") // Sort the results by the course field
//     .exec((err, resources) => {
//       if (err) {
//         // Handle error
//         console.error(err);
//         return;
//       }
//       // Create a map to store resources grouped by course
//       const resourcesByCourse = new Map();

//       // Loop through the resources and organize them by course
//       resources.forEach((resource) => {
//         const courseId = resource.courseId._id;
//         if (!resourcesByCourse.has(courseId)) {
//           resourcesByCourse.set(courseId, []);
//         }
//         resourcesByCourse.get(courseId).push(resource);
//       });

//       // Display the resources by course with indentation
//       resourcesByCourse.forEach((resources, courseId) => {
//         const course = resources[0].courseId;
//         console.log(`Course ${courseId}: ${course.name}`);
//         resources.forEach((resource) => {
//           console.log(`  - Resource: ${resource.title}`);
//         });
//       });
//       res.json(resources);
//     });
// };

exports.getResources = (req, res) => {

  // Use Mongoose's find() method without any query to find all resources
  Resource.find({title:{ $regex: req.query.title , $options: 'i' }})
    .populate("courseId") // Populate the courseId field with the associated course
    .sort("courseId") // Sort the results by the courseId field
    .exec((err, resources) => {
      if (err) {
        // Handle error
        console.error(err);
        return;
      }
      // Create an array to store courses with their associated resources
      const coursesWithResources = [];

      // Loop through the resources and organize them by course
      resources.forEach((resource) => {
        const courseId = resource.courseId._id;
        let courseIndex = -1;

        // Find the index of the course in the coursesWithResources array
        for (let i = 0; i < coursesWithResources.length; i++) {
          if (coursesWithResources[i].courseId.equals(courseId)) {
            courseIndex = i;
            break;
          }
        }

        // If course not found, add it to coursesWithResources array
        if (courseIndex === -1) {
          const course = {
            courseId: courseId,
            courseName: resource.courseId.title,
            resources: []
          };
          coursesWithResources.push(course);
          courseIndex = coursesWithResources.length - 1;
        }

        // Add the resource to the corresponding course's resources array
        coursesWithResources[courseIndex].resources.push(resource);
      });

      // Return the courses with their associated resources as JSON response
      res.json(coursesWithResources);
    });
};

// Create a new resource with multiple lesson references
