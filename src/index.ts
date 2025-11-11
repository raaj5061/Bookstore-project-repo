import express from "express";
import { connectDB, closeDB } from "./config/db";
import { configDotenv } from "dotenv";
import cors from "cors";
import { userRoute } from "./routes/userRoute";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/VerifyToken";
import { Request, Response } from "express";
import { bookRouter } from "./routes/bookRoute";
import { userModel } from "./models/userModel";
import { orderRoute } from "./routes/orderRoute";

configDotenv();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env["PORT"] || 3000;

app.use(cookieParser());

app.use("/user-api", userRoute);
app.use("/book-api", bookRouter);
app.use("/order-api", orderRoute);



//route to deal with page refresh
app.get("/refresh", verifyToken, async (req: Request, res: Response) => {
  let userObj = (req as any).user;
  const userID = userObj._id;
  let user = await userModel.findOne({ _id: userID });
  res.json({ user: user });
});

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  const shutdown = async () => {
    console.log("\n🛑 Shutting down...");
    server.close(async () => {
      console.log("🧹 Express server closed");
      await closeDB();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown); // Ctrl+C
  process.on("SIGTERM", shutdown); // kill or container stop
};

startServer();
