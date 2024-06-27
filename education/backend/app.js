const express = require('express')
const app = express()
const port = 3000
const mongoose=require('mongoose');
const Course = require('./entity/course');

const studentRoutes = require("./routes/student-route");
const teacherRoutes = require("./routes/teacher-route");
const subjectRoutes = require("./routes/subject-route");
const courseRoutes = require("./routes/course-route");


const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected.js');

const cors = require("cors");
const { addTeacher } = require('./controller/teacher-controller');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('fut a backend...');

});



app.use(authRoutes)
app.use( protectedRoutes);
app.use( studentRoutes);
app.use( teacherRoutes);
app.use( subjectRoutes);
app.use( courseRoutes);

async function connectDb() {
     await mongoose.connect("mongodb+srv://root:toor@cluster0.2lcevs5.mongodb.net/",{
        dbName: "StudentsDb"
        
    });
    console.log('Connected to MongoDB');
    
}


connectDb().catch(err=>console.error(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})