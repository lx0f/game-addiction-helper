import express, { Request, Response } from 'express';
import fs from "fs";
import path from 'path';
import { marked } from 'marked';
import _ from "lodash";

const ARTICLE_DIR = path.join(__dirname, "../articles");

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    fs.readdir(ARTICLE_DIR, (err, files) => {
        if (!_.isNull(err)) {
            return res.redirect('/500');
        }

        const blogs = files
            .map(file => removeExtension(file))
            .map(slug => ({ title: prettify(slug), slug }))

        return res.render('blogs', { blogs })
    });
});

router.get('/:slug', (req: Request, res: Response) => {
    const { slug } = req.params;

    if (_.isUndefined(slug)) {
        return res.redirect('/404');
    }

    // find file that matches the slug
    const articlePath = path.join(ARTICLE_DIR, `${slug}.md`);

    // TODO use async/await syntax instead
    fs.readFile(articlePath, (err, data) => {
        if (!_.isNull(err)) {
            return res.redirect('/404');
        }

        const html = marked.parse(data.toString())
        return res.render('blog', { html })
    })
});

function prettify(slug: string) {
    return slug.split('-').map(word => _.capitalize(word)).join(' ');
}

function removeExtension(file: string) {
    return file.slice(0, file.length - 3);
}

export default router;