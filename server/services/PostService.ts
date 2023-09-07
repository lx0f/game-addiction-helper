import { List } from "lodash";
import SimpleCache from "../lib/SimpleCache";
import Post, { IPost } from "../models/post";

const POSTS_PER_PAGE = 5;
const CREATE_TTL = 60 * 1000 // 1 minute
const UNSAFE_WORD_LIST = ["freak", "minions", "shrek"]; // TODO pls do this properly

const userCache = new SimpleCache<string>(CREATE_TTL);

type GetPostResult = {
    page: number,
    posts: IPost[],
    totalPages: number,
    totalPosts: number,
}


interface IPostService {
    createPost(post: IPost): void;
    getPosts(page: number): Promise<GetPostResult>;
    isSafe(post: IPost): boolean;
    canCreatePost(username: string): boolean;
    updateVotes(id: string, votes: number) : Promise<void>;
}

class PostService implements IPostService {
    async createPost(post: IPost): Promise<void> {
        const newPost = new Post(post);
        await newPost.save()
        userCache.set(post.authorUsername, post.authorUsername);
    }

    async updateVotes(id: string = "sampleid", votes: number = 0): Promise<void>{
        console.log("updating")
        const voteValue = votes + 1
        // await Post.findByIdAndUpdate(id, { voteValue }).then((data) => {
        //     console.log("Votes updated")
        // })
        console.log(id);
        console.log(votes);
        await Post.findByIdAndUpdate(id, { votes:voteValue }).then((data) => {
            console.log("Votes updated")
        })
        
        
        
    }

        
    
    
    async getPosts(page: number = 1): Promise<GetPostResult> {
        const totalPosts = await Post.count();
        console.log(totalPosts)
        var totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
        console.log(totalPages)

        if (page > totalPages) {
            const posts = await Post.find().skip(totalPosts)
            return {
            posts,
            page,
            totalPages,
            totalPosts,
        }
        } 

        var skipCount = (page - 1) * POSTS_PER_PAGE
        console.log(skipCount)
        const posts = await Post.find().sort({ createdAt: -1 }).skip(skipCount).limit(POSTS_PER_PAGE).lean();
        console.log(posts)
        
        return {
            posts,
            page,
            totalPages,
            totalPosts,
        }
    }

    isSafe(post: IPost): boolean {
        return UNSAFE_WORD_LIST.some(v => post.title.includes(v) || post.body.includes(v));
    }

    canCreatePost(username: string): boolean {
        return userCache.has(username);
    }
}

export default PostService;