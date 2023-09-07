import { List } from "lodash";
import { Schema, model } from "mongoose";

export interface IPost {
    title: string,
    body: string,
    authorUsername: string,
    createdAt: Date,
    // comments: Array<String>,
    votes: number,

}

const postSchema = new Schema<IPost>({
    title: String,
    body: String,
    authorUsername: String,
    createdAt: Date,
    // comments: Array<String>,
    votes: Number,
});

const Post = model<IPost>("Post", postSchema);

export default Post;