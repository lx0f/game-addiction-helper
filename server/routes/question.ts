import express, {Request, Response } from 'express';


//const express = require("express")
const router = express.Router()

// router.get('/', (req:Request, res:Response) =>{
//     res.send("test")
// })

router.get('/index', (req: Request, res: Response) => {
    res.render('question/index');
});

router.get('/questionnaire', (req: Request, res: Response) => {
    //pass questions here pls so can use as label and value and because backend gaming
    const questionOne = ["Less than 5 hours","5-8 hours","More than 8 hours"]
    const questionTwo = ["Yes", "No","Sometimes","Rarely"]
    res.render('question/questionnaire',{q1: questionOne, q2: questionTwo});
});

router.post('/', (req:Request, res:Response) => {
    var answer_one = req.body.qOne
    var answer_two = req.body.qTwo
    console.log(req.body.qOne)
    console.log(req.body.qTwo)
    res.render('question/question_answers_test',{q1: answer_one, q2: answer_two})
})

router.get('/add', (req:Request, res:Response) => {
    res.render('question/add')
})

router.post('/add', (req:Request, res:Response) => {
    res.send(req.body.NumberOfQuestions)
})


module.exports = router