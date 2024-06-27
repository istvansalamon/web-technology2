const express = require("express");
const router = express.Router();
const { addStudent, getStudents, getStudent, updateStudent, deleteStudent } = require('./../controller/student-controller');
const Student = require('../entity/student');

router.post('/students', async (req, res) => {
    console.log("req.body", req.body);
    let student = await addStudent(req.body);
    res.json({ status: "done", student: student }); 
});

router.get('/students', async (req, res) => {
    let students = await getStudents();
    res.json(students); 
});

router.get("/student/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    let student = await getStudent(req.params["id"]);
    res.json(student); 
});

router.put("/student/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    await updateStudent(req.params["id"], req.body);
    res.json({ status: "updated" }); 
});

router.delete("/student/:id", async (req, res) => {
    console.log("id", req.params["id"]);
    await deleteStudent(req.params["id"]);
    res.json({ status: "deleted" }); 
});

router.get('/students/average-mark', async (req, res) => {
    try {
      const students = await Student.find();
      const totalMarks = students.reduce((sum, student) => sum + student.mark, 0);
      const averageMark = students.length ? totalMarks / students.length : 0;
      res.json({ averageMark });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;
