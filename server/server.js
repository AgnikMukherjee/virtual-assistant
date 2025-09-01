import express from "express";
import "dotenv/config";
import cors from "cors"
import cookieParser from "cookie-parser";
import connectdb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import { geminiresponse } from "./config/gemini.js";

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

// app.get('/test', async (req, res) => {
//     try {
//         let prompt = req.query.prompt; 
//         console.log("Received prompt:", prompt);
//         let data = await geminiresponse(prompt)
    
//         res.json(data.candidates[0].content.parts[0].text);
        
//     } catch (error) {
//         console.error("Route error:", error.message);
//     res.status(500).json({ error: "Something went wrong" });
//     }
// })

app.listen(PORT, () => {
    connectdb();
    console.log("server is running on port " + PORT);
});