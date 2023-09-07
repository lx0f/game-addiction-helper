import express, { Express, Request, Response } from 'express';
import { engine } from 'express-handlebars';

const port = 3000; // TODO get from .env file

const mongoose = require("mongoose")
const uri = "mongodb+srv://irazachary:irakelvin@initialmongodb.uzb4hji.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch (error){
        console.error(error)
    }
}

connect()

const app: Express = express();

app.use(express.urlencoded({extended: true})) 

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './server/views');

const questionRouter = require('./routes/question')
app.use('/question', questionRouter)

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

