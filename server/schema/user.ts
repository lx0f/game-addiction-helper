import { PassportLocalDocument, PassportLocalModel, Schema, model } from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";

export interface IUser extends PassportLocalDocument, Express.User {
    username : string,
    password : string,
    gaming_duration_limit_ms: number,
    coins: number,
    claimed_coins_today: string,
    claimed_coins_date: Date
}

export interface IUserModel <T extends PassportLocalDocument> extends PassportLocalModel<T> {}

const userSchema = new Schema({
    username : String,
    password : String,
    gaming_duration_limit_ms: Number,
    coins: Number,
    claimed_coins_today: String,
    claimed_coins_date: Date
});

userSchema.plugin(passportLocalMongoose);
const User: IUserModel<IUser> = model("User", userSchema)
export default User;