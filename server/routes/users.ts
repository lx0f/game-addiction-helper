import express, { Express, Request, Response } from 'express';

const User = require('../userSchema')
const passport = require('passport');
const users = express.Router()


users.get('/login', checkNotAuthenticated, (req: Request, res: Response) => {

    res.render('login');
});

users.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect : '/users/profile',
    failureRedirect : '/users/login',
    failureFlash : { type: 'error', message: 'Invalid username or password.' }
}));

users.get('/register', checkNotAuthenticated, (req: Request, res: Response) => {

    res.render('register');
});

users.post('/register', checkNotAuthenticated, (req: Request, res: Response) => {
    User.register(new User({ username : req.body.username , email : req.body.email}), req.body.password, (err, account) => {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, () => {
          res.redirect('/');
        });
    });
  });

users.post('/logout', function(req: Request, res: Response, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

users.get('/profile', checkAuthenticated, (req: Request, res: Response) => {
    res.render('profile', {user : req.user.username})
});

function checkAuthenticated(req: Request, res: Response, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/users/login')
}

function checkNotAuthenticated(req: Request, res: Response, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    next()
}

module.exports = users