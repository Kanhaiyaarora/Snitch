import { config } from "dotenv";
config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in environment variable");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variable");
}
if (!process.env.JWT_EXPIRE) {
  throw new Error("JWT_EXPIRE is missing in environment variable");
}

export const CONFIG = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
};
