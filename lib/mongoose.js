// lib/mongoose.js
import mongoose from "mongoose";
import dotenv from "dotenv";

// Always attempt to load a local .env so `MONGO_URL` is available during local runs.
// In production (Vercel) the environment variables should be set in the project settings.
dotenv.config({ path: ".env" });

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connect() {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) {
    throw new Error(
      "MONGO_URL missing — please set the MONGO_URL environment variable"
    );
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;
