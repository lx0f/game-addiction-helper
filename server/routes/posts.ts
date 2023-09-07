import express, { Request, Response, NextFunction} from "express";
import PostService from "../services/PostService";
import _ from "lodash";
import bodyParser from 'body-parser'
const UNAUTHENTICATED_USERNAME = "ANON";

const router = express.Router();

// router.get('/', (req: Request, res: Response) => {
//     return res.redirect("/posts/page/1");
// })

router.get('/', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.redirect('/posts/page/1');
    }
});



// TODO get page from query string instead
router.get('/page/:page', async (req: Request, res: Response) => {
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
    console.log("TESTING");
    
    // const { title: t, body: b } = req.body;
    const title = _.toString(req.body.title);
    const body = _.toString(req.body.description);
    console.log(title);
    console.log(body);
    const createdAt = new Date();
    // var comments = Array
    const votes = 0
    // const authorUsername = req.isAuthenticated()
    //     ? (req.user as any).username as string 
    //     : UNAUTHENTICATED_USERNAME;
    const authorUsername = "ANON"
    const post = { title, body, createdAt, authorUsername ,votes };

    const postService = new PostService();

    // check if they can post
    const canCreatePost = postService.canCreatePost(authorUsername);
    // if (!canCreatePost) {
    //     if (authorUsername === UNAUTHENTICATED_USERNAME) {
    //         return res.sendStatus(429).send({ error: "Too many anon posts at a time. Please create an account to skip the wait."})
    //     }

    //     return res.sendStatus(429).send({ error: "Too many posts at a time." });
    // }

    // check if post is safe
    const isSafe = postService.isSafe(post);
    // if (!isSafe) {
    //     return res.sendStatus(400).send({ error: "Your post was deemed as unsafe. Please refrain from using foul language in your posts." })
    // }
    console.log(post)
    await postService.createPost(post);
    return res.redirect('/posts');
});

router.post('/upvote', async (req: Request, res: Response) => {
    console.log(req.body)
    const id = _.toString(req.body.id);
    const votes = _.toInteger(req.body.votes);
    const postService = new PostService();
    await postService.updateVotes(id, votes);
    
    return res.redirect('/posts');
});

export default router;