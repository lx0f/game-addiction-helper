const mongoose = require("mongoose")
const Schema = mongoose.Schema

const questionSchema = new Schema({
    id: {
        type: String
    },
    question: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        required: true
    }
}, {timestamps: true})

const Question = mongoose.model("Questions", questionSchema)

module.exports = Question