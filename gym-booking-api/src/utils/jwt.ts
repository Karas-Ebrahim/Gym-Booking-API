import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

interface JwtPayload {
    userId: string;
    role: "Member" | "Trainer";
}

export const generateToken = (payload: JwtPayload): string => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const expiresIn = (process.env.JWT_EXPIRES_IN || "1d") as StringValue;

    return jwt.sign(payload, secret, {
        expiresIn
    });
};

export const verifyToken = (token: string): JwtPayload => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.verify(token, secret) as JwtPayload;
};