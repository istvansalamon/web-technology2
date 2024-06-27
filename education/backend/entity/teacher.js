const mongoose = require('mongoose');
const { Schema } = mongoose;
const teacherSchema = new mongoose.Schema({
    
    name: String,
    mark: Number,
    department: String,
    subjects: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Subjects" 
    }],
    courses: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Course" 
    }]
});
const Teacher = mongoose.model('Teachers',teacherSchema);
module.exports = Teacher;