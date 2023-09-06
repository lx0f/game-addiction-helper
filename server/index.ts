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

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

app.get('/login', checkNotAuthenticated, (req: Request, res: Response) => {

    res.render('login');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : { type: 'error', message: 'Invalid username or password.' }
}));

app.get('/register', checkNotAuthenticated, (req: Request, res: Response) => {

    res.render('register');
});

app.post('/register', checkNotAuthenticated, (req, res) => {
    User.register(new User({ username : req.body.username , email : req.body.email}), req.body.password, (err, account) => {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, () => {
          res.redirect('/');
        });
    });
  });


app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/profile', checkAuthenticated, (req, res) => {
    res.render('profile', {user : req.user.username})
});

function checkAuthenticated(req: Request, res: Response, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req: Request, res: Response, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    next()
}

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

