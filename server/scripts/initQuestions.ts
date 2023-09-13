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

const QUESTIONS = [
    {
        id: "q0",
        answers: [
            "Less than 5 hours",
            "5-8 hours",
            "More than 8 hours",
        ],
        remarks: [
            "You spend a healthy amount playing every week!",
            "You play games in a good moderation!",
            "You might want to cut down gaming a little..."

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
        remarks: [
            "You should probably game less and focus more on your chores...",
            "Your gaming is not intrusive! Keep it up!",
            "Maybe cut down gaming a little to do your homework...",
            "Nice! Despite gaming, you still make sure to complete your work!"
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
        remarks: [
            "Even if gaming is not getting in the way, you should focus on your work more.",
            "Good job! You can reward yourself with a few more hours of game time!",
            "Maybe cut down gaming a little to work a little harder...",
            "It's okay! We can help you cut down your game time so that you can focus on your studies!"
        ],
        question: "How is your performance at school/work?"
    }
];

async function createQuestions() {
    for (const q of QUESTIONS) {
        const {id, question, answers, remarks} = q;
        const questionEntry = new Question({
            id,
            question,
            answers,
            remarks
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