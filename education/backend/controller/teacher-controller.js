const Teacher = require("../entity/teacher");

async function addTeacher(teacherModel) {
    let teacher = new Teacher({
        ...teacherModel
    });

    await teacher.save();
    return teacher.toObject();

}

async function getTeachers() {
    const teachers = await Teacher.find();
    return teachers.map(x=>x.toObject());

}

async function getTeacher(id) {
    const teacher = await Teacher.findById(id);
    return teacher.toObject();

}

async function updateTeacher(id,teacherModel) {
const filter = {_id: id};
await Teacher.findOneAndUpdate(filter,teacherModel);
}


async function deleteTeacher(id) {
   
    await Teacher.findOneAndDelete(id);
    }


module.exports = {addTeacher,getTeachers,getTeacher,updateTeacher,deleteTeacher};

