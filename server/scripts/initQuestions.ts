import mongoose, { connect } from "mongoose";
import { getEnvConfig } from "../lib/config";

import Question from "../schema/question";

interface IQuestion {
    id: string,
    question: string,
    answers: Array<String>
}

const config = getEnvConfig();
connect(config.MONGODB_URI);

const QUESTIONS: IQuestion[] = [
    {
        id: "q0",
        answers: [
            "Less than 5 hours",
            "5-8 hours",
            "More than 8 hours",
        ], 
        question: "How long do you spend gaming every week?"
    },
    {
        id: "q1",
        answers: [
            "Yes",
            "No",
            "Sometimes",
            "Rarely"
        ],
        question: "Does gaming get in the way of other tasks (e.g. doing chores, homework…",
    },
    {
        id: "q2",
        answers: [
            "Poor",
            "Excellent",
            "Decent",
            "Disappointing"
        ],
        question: "How is your performance at school/work?"
    }
];

async function createQuestions() {
    for (const q of QUESTIONS) {
        const {id, question, answers} = q;
        const questionEntry = new Question({
            id,
            question,
            answers
        })
        try {
            const res = await questionEntry.save()
            console.log("[question script]: created question");
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}

async function main() {
    // delete all questions
    try {
        await Question.deleteMany()
        await createQuestions();
    } catch (err) {
        console.log(err);
    }

    process.exit();
}

main();