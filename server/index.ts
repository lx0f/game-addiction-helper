import express, { Express, Request, Response } from 'express';
import { engine } from 'express-handlebars';

const port = 3000; // TODO get from .env file

const app: Express = express();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./userSchema')

require('dotenv').config();

// TODO: Change mongodb database
mongoose.connect(`mongodb+srv://admin20:${process.env.MONGODB_PASSWORD}@cluster0.vg83txc.mongodb.net/?retryWrites=true&w=majority`)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './server/views');
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

app.get('/login', (req: Request, res: Response) => {

    res.render('login');
});

app.get('/register', (req: Request, res: Response) => {

    res.render('register');
});

app.post('/register', async (req: Request, res: Response) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hash
        })
        newUser.save().then(() => console.log('new user saved'))
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

