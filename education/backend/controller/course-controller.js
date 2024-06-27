const Course = require("../entity/course");

async function addCourse(courseModel) {
    let course = new Course({
        ...courseModel
    });

    await course.save();
    return course.toObject();

}

async function getCourses() {
    const courses = await Course.find();
    return courses.map(x=>x.toObject());

}

async function getCourse(id) {
    const course = await Course.findById(id);
    return course.toObject();

}

async function updateCourse(id,courseModel) {
const filter = {_id: id};
await Course.findOneAndUpdate(filter,courseModel);
}


async function deleteCourse(id) {
   
    await Course.findOneAndDelete(id);
    }


module.exports = {addCourse,getCourses,getCourse,updateCourse,deleteCourse};

