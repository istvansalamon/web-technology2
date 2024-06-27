const Student = require("../entity/student");

async function addStudent(studentModel) {
    let student = new Student({
        ...studentModel
    });

    await student.save();
    return student.toObject();

}

async function getStudents() {
    const students = await Student.find();
    return students.map(x=>x.toObject());

}

async function getStudent(id) {
    const student = await Student.findById(id);
    return student.toObject();

}

async function updateStudent(id,studentModel) {
const filter = {_id: id};
await Student.findOneAndUpdate(filter,studentModel);
}


async function deleteStudent(id) {
   
    await Student.findOneAndDelete(id);
    }

async function getStudentAverageMark() {
    const students = await Student.find();
    if (students.length === 0) return 0;
    
    const totalMarks = students.reduce((sum, student) => sum + student.mark, 0);
    const averageMark = totalMarks / students.length;
    return averageMark;
    }


module.exports = {addStudent,getStudents,getStudent,updateStudent,deleteStudent,getStudentAverageMark};

