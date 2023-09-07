import express, { Request, Response } from 'express';
import fs from "fs";
import path from 'path';
import { marked } from 'marked';
import _ from "lodash";
import SimpleCache from '../lib/SimpleCache';

const BLOGS_DIR = path.join(__dirname, "../blogs");
const BLOGS_TTL_MS = 5 * 60 * 1000 // 5 minutes

const router = express.Router();
const cache = new SimpleCache<string>(BLOGS_TTL_MS);

router.get('/', (req: Request, res: Response) => {
    fs.readdir(BLOGS_DIR, (err, files) => {
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

    // check cache for parsed blog
    const cachedHtml = cache.get(slug);
    if (!_.isUndefined(cachedHtml)) {
        return res.render('blog', { html: cachedHtml})
    }

    // find file that matches the slug
    const blogPath = path.join(BLOGS_DIR, `${slug}.md`);

    // TODO use async/await syntax instead
    fs.readFile(blogPath, (err, data) => {
        if (!_.isNull(err)) {
            return res.redirect('/404');
        }

        const html = marked.parse(data.toString())
        cache.set(slug, html);

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