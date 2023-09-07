import { Schema, model } from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
    username : String,
    password : String,
    gaming_duration_limit_ms: Number,
    coins: Number,
});

userSchema.plugin(passportLocalMongoose);
const User = model("User", userSchema)
export default User;