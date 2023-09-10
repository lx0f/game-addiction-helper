import _ from "lodash";
import { config } from "dotenv";

const ConfigKeys = {
    PORT: "PORT",
    MONGODB_URI: "MONGODB_URI",
    SESSION_SECRET: "SESSION_SECRET",
} as const;

type ConfigKeys = (typeof ConfigKeys)[keyof typeof ConfigKeys]

export type Config = Record<ConfigKeys, string>;

export function getEnvConfig(): Readonly<Config> {
    config();
    const obj: Partial<Config> = {};
    Object.values(ConfigKeys).map(key => {
        if (_.isUndefined(process.env[key])) {
            throw new Error(`env variable "${key}" cannot be undefined.`);
        }
        obj[key] = process.env[key];
        console.log("Processed")
    })
    return obj as Readonly<Config>;
}