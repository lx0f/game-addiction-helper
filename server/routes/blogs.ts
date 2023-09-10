import express, { Request, Response } from 'express';
import fs from "fs";
import path from 'path';
import { marked } from 'marked';
import removeMd from "remove-markdown";
import _ from "lodash";
import SimpleCache from '../lib/SimpleCache';


const BLOGS_DIR = path.join(__dirname, "../blogs");
const BLOGS_TTL_MS = 5 * 60 * 1000 // 5 minutes

const router = express.Router();
const cache = new SimpleCache<string>(BLOGS_TTL_MS);

router.get('/', (req: Request, res: Response) => {
    fs.readdir(BLOGS_DIR, async (err, files) => {
        if (!_.isNull(err)) {
            return res.redirect('/500');
        }

        const blogs = await Promise.all(files
            .map(async (file) => {
                const preview = await getPreview(file);
                const slug = removeExtension(file);
                const title = prettify(slug);
                return { preview, slug, title }
            }));

        const length = blogs.length;
        const visited = new Set();
        const rand = [];

        while (rand.length !== 4) {
            const index = _.toInteger(Math.random() * 1000) % length;
            if (visited.has(index)) {
                continue;
            }
            visited.add(index);
            rand.push(blogs[index]);
        }

        return res.render('blogs/blogs', { blogs, rand })
    });
});

router.get('/:slug', (req: Request, res: Response) => {
    const { slug } = req.params;

    // check cache for parsed blog
    const cachedHtml = cache.get(slug);
    if (!_.isUndefined(cachedHtml)) {
        return res.render('blogs/blog', { html: cachedHtml })
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

        return res.render('blogs/blog', { html })
    })
});

function prettify(slug: string) {
    return slug.split('-').map(word => _.capitalize(word)).join(' ');
}

function removeExtension(file: string) {
    return file.slice(0, file.length - 3);
}

function getPreview(slug: string): Promise<string> {
    const blogPath = path.join(BLOGS_DIR, slug);
    return new Promise((resolve, reject) => {
        fs.readFile(blogPath, async (err, data) => {
            if (!_.isNull(err)) {
                return reject(err);
            }

            const previewMarkdown = data.toString('utf-8', 0, 200);
            const preview = removeMd(previewMarkdown) + "...";
            return resolve(preview);
        })
    })
}

export default router;