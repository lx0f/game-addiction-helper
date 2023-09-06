import express, { Express, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import _ from "lodash";
import { blogsRouter, errorsRouter } from "./routes";

const port = 3000; // TODO get from .env file

const app: Express = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './server/views');

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

app.use('/', errorsRouter);

app.use('/blogs', blogsRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

