import { Schema, model } from "mongoose"

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
    },
    remarks: {
        type: Array,
        required: false
    }
}, {timestamps: true})

const Question = model("Questions", questionSchema)

export default Question;

