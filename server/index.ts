import express, { Express, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import fs from "fs";
import _ from "lodash";
import { marked } from 'marked';
import path from 'path';
import { prettify, removeExtension } from "./util";

const port = 3000; // TODO get from .env file

const app: Express = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './server/views');

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

app.get('/blogs', (req: Request, res: Response) => {
    const articlePath = path.join(__dirname, "articles");
    fs.readdir(articlePath, (err, files) => {
        if (!_.isNull(err)) {
            return res.redirect('/500');
        }

        const blogs = files
            .map(file => removeExtension(file))
            .map(slug => ({ title: prettify(slug), slug }))

        return res.render('blogs', { blogs })
    });
});

app.get('/blogs/:slug', (req: Request, res: Response) => {
    const { slug } = req.params;

    if (_.isUndefined(slug)) {
        return res.redirect('/404');
    }

    // find file that matches the slug
    const articleFileName = `${slug}.md`;
    const articlePath = path.join(__dirname, "articles", articleFileName);

    // TODO use async/await syntax instead
    fs.readFile(articlePath, (err, data) => {
        if (!_.isNull(err)) {
            return res.redirect('/404');
        }

        const html = marked.parse(data.toString())
        return res.render('blog', { html })
    })
});

app.get('/404', (_, res: Response) => {
    return res.render('errors/404'); 
});

app.get('/500', (_, res: Response) => {
    return res.render('errors/500');
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

