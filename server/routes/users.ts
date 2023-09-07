import express, { Express, NextFunction, Request, Response } from 'express';
import passport from 'passport';

import User from '../schema/user';
import { checkAuthenticated, checkNotAuthenticated } from './middleware';

const router = express.Router()

router.get('/login', checkNotAuthenticated, (req: Request, res: Response) => {
    res.render('login');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect : '/users/profile',
    failureRedirect : '/users/login'
}));

router.get('/register', checkNotAuthenticated, (req: Request, res: Response) => {
    res.render('register');
});

router.post('/register', checkNotAuthenticated, (req: Request, res: Response) => {
    User.register(new User({ username : req.body.username, coins : 0, claimed_coins_today : 'no'}), req.body.password, (err: Error) => {
        if (err) {
            return res.render('register');
        }

        passport.authenticate('local')(req, res, () => {
          res.redirect('/users/profile');
        });
    });
  });

router.post('/logout', function(req: Request, res: Response, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/profile', checkAuthenticated, (req: Request, res: Response) => {
    res.render('profile', {username : req.user!.username});
});

export default router;