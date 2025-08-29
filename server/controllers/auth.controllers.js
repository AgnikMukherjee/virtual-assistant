import { genToken } from "../config/tokent.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import cookie from "cookie-parser"


export const signUp= async (req, res) => {
    try {
            // console.log("Incoming signup data:", req.body); 

        const {name, email, password} = req.body

        const existEmail = await User.findOne({email})
        console.log("Existing email:", existEmail);

        if(existEmail){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await User.create({name, email, password:hashedPassword})
        // await user.save() 
        
        const token= await genToken(user._id)
        // console.log("New user created:", user);
        // console.log("Generated token:", token);
        res.cookie("token", token, {httpOnly: true, maxAge: 7*24*60*60*1000, sameSite: "Strict", secure: false})

        return res.status(201).json(user)


    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({message: `signUp error: ${error.message}`})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})    

        if(!user){
            return res.status(400).json({
                message: "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                message: "Incorrect password"
            })
        }

        const token= await genToken(user._id)
        res.cookie("token", token, {httpOnly: true, maxAge: 7*24*60*60*1000, sameSite: "Strict", secure: false})

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({message: `login error: ${error.message}`})
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "Logout successful"})
    } catch (error) {
        return res.status(500).json({message: `logout error: ${error.message}`})
        console.log(error);
    }
}