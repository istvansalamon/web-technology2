const express = require("express");
const router = express.Router();
const { addCourse, getCourses, getCourse, updateCourse, deleteCourse } = require('./../controller/course-controller');

router.post('/courses', async (req, res) => {
    console.log("req.body", req.body);
    let course = await addCourse(req.body);
    res.json({ status: "done", course: course }); 
});

router.get('/courses', async (req, res) => {
    let courses = await getCourses();
    res.json(courses); 
});

router.get("/course/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    let course = await getCourse(req.params["id"]);
    res.json(course); 
});

router.put("/course/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    await updateCourse(req.params["id"], req.body);
    res.json({ status: "updated" }); 
});

router.delete("/course/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    await deleteCourse(req.params["id"]);
    res.json({ status: "deleted" }); 
});

module.exports = router;
