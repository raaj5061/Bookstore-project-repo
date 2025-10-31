import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const MONGO_URI = process.env["MONGO_URI"]!;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", (err as Error).message);
    process.exit(1);
  }
};

export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (err) {
    console.error("❌ Error closing MongoDB connection:", (err as Error).message);
  }
};
