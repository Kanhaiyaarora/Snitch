import { config } from "dotenv";
config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in environment variable");
}

export const CONFIG = {
  MONGO_URI: process.env.MONGO_URI,
};
