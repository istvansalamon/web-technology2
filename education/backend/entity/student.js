const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new mongoose.Schema({
    id: Number,
    name: String,
    mark: Number,
    class: String,
    subjects: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Subjects" 
    }]

});
const Student = mongoose.model('Students',studentSchema);
module.exports = Student;