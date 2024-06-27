const express = require("express");
const router = express.Router();
const { addTeacher, getTeachers, getTeacher, updateTeacher, deleteTeacher } = require('./../controller/teacher-controller');

router.post('/teachers', async (req, res) => {
    console.log("req.body", req.body);
    let teacher = await addTeacher(req.body);
    res.json({ status: "done", teacher: teacher }); 
});

router.get('/teachers', async (req, res) => {
    let teachers = await getTeachers();
    res.json(teachers); 
});

router.get("/teacher/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    let teacher = await getTeacher(req.params["id"]);
    res.json(teacher); 
});

router.put("/teacher/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    await updateTeacher(req.params["id"], req.body);
    res.json({ status: "updated" }); 
});

router.delete("/teacher/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    await deleteTeacher(req.params["id"]);
    res.json({ status: "deleted" }); 
});

router.post('/teacher/:id/assign-subject', async (req, res) => {
    await assignSubjectToTeacher(req.params["id"], req.body.subjectId);
    res.json({ status: "subject assigned" });
});

router.post('/teacher/:id/assign-course', async (req, res) => {
    await assignCourseToTeacher(req.params["id"], req.body.courseId);
    res.json({ status: "course assigned" });
});

module.exports = router;
