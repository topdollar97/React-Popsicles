const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    teacher: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    rosters: {
        type: Object
    },    

},{minimize:false})

module.exports = mongoose.model('Teacher', teacherSchema)