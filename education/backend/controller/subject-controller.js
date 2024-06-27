const Subject = require("../entity/subject");

async function addSubject(subjectModel) {
    let subject = new Subject({
        ...subjectModel
    });

    await subject.save();
    return subject.toObject();

}

async function getSubjects() {
    const subjects = await Subject.find();
    return subjects.map(x=>x.toObject());

}

async function getSubject(id) {
    const subject = await Subject.findById(id);
    return subject.toObject();

}

async function updateSubject(id,subjectModel) {
const filter = {_id: id};
await Subject.findOneAndUpdate(filter,subjectModel);
}


async function deleteSubject(id) {
   
    await Subject.findOneAndDelete(id);
    }


module.exports = {addSubject,getSubjects,getSubject,updateSubject,deleteSubject};

