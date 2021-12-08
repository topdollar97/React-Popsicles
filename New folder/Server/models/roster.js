const mongoose = require("mongoose");

const rosterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    roster: {
        type: Array
    },    

},{minimize:false})

module.exports = mongoose.model('Roster', rosterSchema)