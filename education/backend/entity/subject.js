const mongoose = require("mongoose");
const { Schema } = mongoose;


const subjectSchema = new Schema({

    name: String,
    credit: String,
    type: String,
    students: {
        type: Schema.Types.ObjectId,
        ref: "Students"
    },
    teachers: {
        type: Schema.Types.ObjectId,
        ref: "Teachers"
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]

});


const Subject = mongoose.model('Subjects', subjectSchema);
module.exports = Subject;