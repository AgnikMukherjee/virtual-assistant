import express from "express";
import { getCurrentUser } from "../controllers/user.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { updateAssistant } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.get("/current",isAuth, getCurrentUser )
userRouter.put("/update",isAuth, upload.single("assistantImage"), updateAssistant )

export default userRouter;