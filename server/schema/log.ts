import { Schema, model } from 'mongoose';

interface ILog {
    username: string,
    gamingDurationMs: number,
    createdAt: Date,
}

const logSchema = new Schema<ILog>({
    username: String,
    gamingDurationMs: Number,
    createdAt: Date,
});

const Log = model("Log", logSchema);
export default Log;