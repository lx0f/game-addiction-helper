import express, {Request, Response } from 'express';

import Question from "../schema/question"

const router = express.Router()

router.get('/index', (req: Request, res: Response) => {
    res.render('question/index');
});

router.get('/questionnaire', (req: Request, res: Response) => {
    //pass questions here pls so can use as label and value and because backend gaming
    async function getAllQuestions(req: Request, res:Response)
    {
        try{
            const result = await Question.find({}).lean()
            res.render("question/questionnaire", { questions: result });
        } catch (err){
            console.error(err)
            res.status(500).send("Internal Server Error")
        }
    }

    getAllQuestions(req,res)
});

router.post('/', (req:Request, res:Response) => { //questionnaire submission
    var weightage = 0
    //questions for algo
    //q0 how long spent
    //q1 Does gaming get in the way
    //q2 Performance
    //add questions here when necessary
    async function getCalc(req: Request, res:Response)
    {
        try{
            const result = await Question.find({}).lean()
            for(let i in result)
            {
                console.log(i)
            }
            //build algorithm here
            //q0
            if (req.body.q0 == "More") {
                weightage +=50
            } else if (req.body.q0 == "Less")
            {
                weightage -=20
            }

            //q1
            if (req.body.q1 == "Yes"){
                weightage += 40
            } else if (req.body.q1 == "Sometimes")
            {
                weightage +=20
            }

            //q2
            if (req.body.q2 == "Poor" || req.body.q2 == "Disappointing"){
                weightage += 50
            } else if (req.body.q2 == "Excellent")
            {
                weightage -= 30
            }
            var addiction = "Pending Addiction Status"
            if (weightage > 20)
            {
                addiction = "Addicted"
            } else{
                addiction = "Not addicted"
            }
            res.render('question/result', {result: addiction})
        } catch (err){
            console.error(err)
            res.status(500).send("Internal Server Error")
        }
    }
    getCalc(req,res)
})

router.get('/add', (req:Request, res:Response) => {
    
    res.render('question/add')
})

router.post('/add', (req:Request, res:Response) => {
    //currently posting test data
    //add logic to consolidate all answers into an array before passing to mongodb
    const NumberOfAnswers = req.body.NumberOfAnswers;
    const answerArray: any[] = [];
    for(let i = 1; i <= NumberOfAnswers; i++)
    {
        answerArray.push(req.body["answer" + i])
    }

    async function getAllQuestions(req: Request, res:Response)
    {
        try{
            const result = await Question.find({}).lean()
            var count = 0
            for(let i in result)
            {
                count++
            }
            const question = new Question({
                id: "q"+count,
                question: req.body.question,
                answers: answerArray
            })
            question.save().then((result: any) => {
                res.redirect('question/questionnaire')
            }).catch((err: any) => {
                console.log(err)
            })
        } catch (err){
            console.error(err)
            res.status(500).send("Internal Server Error")
        }
    }
    getAllQuestions(req,res)
})

export default router;
