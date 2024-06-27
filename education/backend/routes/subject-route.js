const express = require("express");
const router = express.Router();
const { addSubject, getSubjects, getSubject, updateSubject, deleteSubject } = require('./../controller/subject-controller');

router.post('/subjects', async (req, res) => {
    console.log("req.body", req.body);
    let subject = await addSubject(req.body);
    res.json({ status: "done", subject: subject }); 
});

router.get('/subjects', async (req, res) => {
    let subjects = await getSubjects();
    res.json(subjects); 
});

router.get("/subject/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    let subject = await getSubject(req.params["id"]);
    res.json(subject); 
});

router.put("/subject/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    await updateSubject(req.params["id"], req.body);
    res.json({ status: "updated" }); 
});

router.delete("/subject/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    await deleteSubject(req.params["id"]);
    res.json({ status: "deleted" }); 
});

module.exports = router;
