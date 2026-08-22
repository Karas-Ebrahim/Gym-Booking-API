import { Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export const register = async (req:Request, res:Response)=>{
    try{
        const {fullName, email,password,role } = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({
                message: "Email already exists"
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role
        })

         const token = generateToken({
            userId: user._id.toString(),
            role: user.role
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            },

        })

    }catch(error){
        return res.status(500).json({
            message:"Registiration Failed"
        })
    }
}


export const login = async (req:Request, res:Response)=>{
    try{
        const {email,password} = req.body 
        const user = await User.findOne({email})
        if (!user ){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }
        const passwordMatches = await comparePassword(
            password,
            user.password
        ) 
        if(!passwordMatches){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }
        const token = generateToken({
            userId: user._id.toString(),
            role: user.role
        })
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });
        
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            },
        })

    }catch(error){
          res.status(500).json({
            message:"Login Failed"
        })
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    })

    return res.status(200).json({
        message: "Logged out successfully"
    })
}