import { Request, Response, NextFunction } from "express";


export const validateClassSession = (req: Request,res: Response,next: NextFunction) => {
    
    const { title, capacity, startAt, endAt } = req.body

    const errors: string[] = []

    const isCreate = req.method === "POST"

    if (isCreate) {
        if (!title || typeof title !== "string" || !title.trim()) {
            errors.push("Title is required.")
        }

        if (capacity === undefined || capacity === null) {
            errors.push("Capacity is required.")
        }

        if (!startAt) {
            errors.push("Start time is required.")
        }

        if (!endAt) {
            errors.push("End time is required.")
        }
    }

    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            errors.push("Title must be a non-empty string.")
        }
    }

    if (capacity !== undefined) {
        if (!Number.isInteger(capacity) || capacity <= 0) {
            errors.push("Capacity must be a positive integer.")
        }
    }

    let startDate: Date | undefined
    let endDate: Date | undefined

    if (startAt !== undefined) {
        startDate = new Date(startAt)

        if (isNaN(startDate.getTime())) {
            errors.push("Invalid start time.")
        } else if (startDate <= new Date()) {
            errors.push("Start time must be in the future.")
        }
    }

    if (endAt !== undefined) {
        endDate = new Date(endAt)

        if (isNaN(endDate.getTime())) {
            errors.push("Invalid end time.")
        }
    }

    if (startDate && endDate && endDate <= startDate) {
        errors.push("End time must be after the start time.")
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors })
    }

    next()
}

