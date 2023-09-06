import express, { Express, Request, Response } from 'express';
import { engine } from 'express-handlebars';

const port = 3000; // TODO get from .env file

const app: Express = express();
const mongoose = require('mongoose')
const User = require('./userSchema')
const passport = require('passport');
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

// TODO: Change mongodb database
mongoose.connect(`mongodb+srv://admin20:${process.env.MONGODB_PASSWORD}@cluster0.vg83txc.mongodb.net/?retryWrites=true&w=majority`)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './server/views');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

