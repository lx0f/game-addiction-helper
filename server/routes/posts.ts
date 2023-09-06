import express, { Request, Response} from "express";
import PostService from "../services/PostService";
import _ from "lodash";

const UNAUTHENTICATED_USERNAME = "ANON";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.redirect("/1");
})

// TODO get page from query string instead
router.get('/:page', async (req: Request, res: Response) => {
    const { page: p } = req.params;
    const page = _.toInteger(p); 
    const postService = new PostService();
    const getPostResult = await postService.getPosts(page)
    return res.render('posts/list', getPostResult)
});

// TODO integrate with user system
router.get('/submit', (req: Request, res: Response) => {
    return res.render('posts/submit');
});

router.post('/submit', async (req: Request, res: Response) => {
    const { title: t, body: b } = req.body;
    const title = _.toString(t);
    const body = _.toString(b);
    const createdAt = new Date();
    const authorUsername = req.isAuthenticated()
        ? (req.user as any).username as string 
        : UNAUTHENTICATED_USERNAME;

    const post = { title, body, createdAt, authorUsername };

    const postService = new PostService();

    // check if they can post
    const canCreatePost = postService.canCreatePost(authorUsername);
    if (!canCreatePost) {
        if (authorUsername === UNAUTHENTICATED_USERNAME) {
            return res.sendStatus(429).send({ error: "Too many anon posts at a time. Please create an account to skip the wait."})
        }

        return res.sendStatus(429).send({ error: "Too many posts at a time." });
    }

    // check if post is safe
    const isSafe = postService.isSafe(post);
    if (!isSafe) {
        return res.sendStatus(400).send({ error: "Your post was deemed as unsafe. Please refrain from using foul language in your posts." })
    }

    await postService.createPost(post);
    return res.redirect('/posts');
});

export default router;