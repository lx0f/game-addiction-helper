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
    }
}, {timestamps: true})

const Question = model("Questions", questionSchema)

export default Question;