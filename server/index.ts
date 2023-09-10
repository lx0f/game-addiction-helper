import express, { Express, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import session from "express-session";
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import { connect } from 'mongoose';
import path from 'path';
import _ from "lodash";

import User, { IUser } from './schema/user';
import {
    blogsRouter,
    errorsRouter,
    usersRouter,
    postsRouter,
    trackerRouter,
    questionRouter,
} from "./routes";
import { getEnvConfig } from './lib/config';

const config = getEnvConfig();

const VIEWS_DIR = path.join(__dirname, 'views');

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// TODO: Change mongodb database
connect(config.MONGODB_URI)

// Setup templating engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', VIEWS_DIR);

// Setup session
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Setup passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser() as any); // FIXME don't use any
passport.deserializeUser(User.deserializeUser());

// Register routes
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);
app.use("/posts", postsRouter)
app.use('/tracker', trackerRouter);
app.use('/question', questionRouter);
app.use('/', errorsRouter);

// const handlebar = require("handlebars");
// handlebar.registerHelper('ifEquals', function (arg1:any, arg2:any, options:any) {
//     return (arg1 == arg2) ? options.fn() : options.inverse();
// });

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

// Run server
app.listen(config.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
});

