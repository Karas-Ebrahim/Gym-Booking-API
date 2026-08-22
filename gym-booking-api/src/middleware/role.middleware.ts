import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user.model";

export const authorizeRole = (role: IUser["role"]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            })
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                message: "Access denied"
            })
        }

        next();
    }
}