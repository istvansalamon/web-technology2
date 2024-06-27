const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new mongoose.Schema({
    
    type: String,
    mark: Number,
    limit: Number,
    teachers: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Teachers" 
    }],
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    }

});
const Course = mongoose.model('Courses',courseSchema);
module.exports = Course;