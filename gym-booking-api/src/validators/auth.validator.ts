import { Request, Response, NextFunction } from "express";


export const validateRegister = (req: Request,res: Response,next: NextFunction) => {
    const { fullName, email, password, role } = req.body;

    const errors: string[] = []

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
        errors.push("Full name is required.")
    }

    if (!email || typeof email !== "string") {
        errors.push("Email is required.")
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email.trim())) {
            errors.push("Invalid email format.")
        }
    }

    if (!password || typeof password !== "string") {
        errors.push("Password is required.")
    } else {
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.")
        }

        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter.")
        }

        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter.")
        }

        if (!/[0-9]/.test(password)) {
            errors.push("Password must contain at least one number.")
        }
    }

    if (!role) {
        errors.push("Role is required.")
    } else if (role !== "Member" && role !== "Trainer") {
        errors.push("Role must be either 'Member' or 'Trainer'.")
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors })
    }

    next()
}

