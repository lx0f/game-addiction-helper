import express, { Express, NextFunction, Request, Response } from 'express';
import User from '../userSchema';
const passport = require('passport');
const users = express.Router()


users.get('/login', checkNotAuthenticated, (req: Request, res: Response) => {

    res.render('login');
});

users.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect : '/users/profile',
    failureRedirect : '/users/login'
}));

users.get('/register', checkNotAuthenticated, (req: Request, res: Response) => {

    res.render('register');
});

users.post('/register', checkNotAuthenticated, (req: Request, res: Response) => {
    User.register(new User({ username : req.body.username}), req.body.password, (err: Error) => {
        if (err) {
            return res.render('register');
        }

        passport.authenticate('local')(req, res, () => {
          res.redirect('/users/profile');
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
    res.render('profile', {username : req.user!.username});
});

function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
};

function checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    };
    next();
};

module.exports = users