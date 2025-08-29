import express from "express";
import "dotenv/config";
import cors from "cors"
import cookieParser from "cookie-parser";
import connectdb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("running server");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    connectdb();
    console.log("server is running on port " + PORT);
});