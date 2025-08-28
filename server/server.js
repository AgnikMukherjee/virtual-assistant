import express from "express";
import "dotenv/config";
import connectdb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser);
app.use(cors())

app.get("/", (req, res) => {
    res.send("running server");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    connectdb();
    console.log("server is running on port " + PORT);
});