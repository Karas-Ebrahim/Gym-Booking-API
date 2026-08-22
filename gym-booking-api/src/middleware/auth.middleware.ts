import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            })
        }

        const payload = verifyToken(token)

        req.user = {
            userId: payload.userId,
            role: payload.role
        }

        next()
    }catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}