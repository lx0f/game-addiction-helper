import express, { Express, Request, Response } from 'express';
import { connect } from 'mongoose';
import passport from 'passport';
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import User from './userSchema';
import { engine } from 'express-handlebars';

const port = 3000; // TODO get from .env file

const app: Express = express();

require('dotenv').config();

// TODO: Change mongodb database
connect(`${process.env.MONGODB_URI}`)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './server/views');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
if (process.env.SESSION_SECRET === undefined) {
    throw new Error('env variable "SESSION_SECRET" cannot be undefined.');
  }
app.use(session({
    secret : process.env.SESSION_SECRET,
    //                   ^^^^^^^^^^^^^^ 
    //             type is string | undefined
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

