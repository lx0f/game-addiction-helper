import { Schema, model } from "mongoose";

export interface IPost {
    title: string,
    body: string,
    authorUsername: string,
    createdAt: Date,
}

const postSchema = new Schema<IPost>({
    title: String,
    body: String,
    authorUsername: String,
    createdAt: Date,
});

const Post = model<IPost>("Post", postSchema);

export default Post;