import { Request, response, Response } from "express";
import ClassSession from "../models/classSession.model";

export const createClassSession = async(req:Request,res:Response)=>{

    try{

        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            })
        }

        const { title, startAt, endAt, capacity } = req.body;
        const start = new Date(startAt)
        const end = new Date(endAt)
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({
                message: "Invalid date"
            });
        }

        if (start <= new Date()) {
            return res.status(400).json({
                message: "Class session must be in the future"
            })
        }

        if (end <= start) {
            return res.status(400).json({
                message: "endAt must be after startAt"
            })
        }

        const classSession = await ClassSession.create({
            title,
            trainer: req.user.userId,
            startAt: start,
            endAt: end,
            capacity
        });

        return res.status(201).json(classSession)



    }catch(error){
         return res.status(500).json({
            message: "Failed to create class session"
        })
    }

}
export const getAllClassSessions = async (req: Request,res: Response) => {

    try {
        const { title, trainer, date } = req.query

        const filter: Record<string, any> = {}

        if (title) {
            filter.title = {
                $regex: title,
                $options: "i"
            }
        }

        if (trainer) {
            filter.trainer = trainer
        }

        if (date) {
            const selectedDate = new Date(date as string)

            if (isNaN(selectedDate.getTime())) {
                return res.status(400).json({
                    message: "Invalid date"
                })
            }

            const nextDay = new Date(selectedDate)
            nextDay.setDate(nextDay.getDate() + 1)

            filter.startAt = {
                $gte: selectedDate,
                $lt: nextDay
            }
        }

        const classes = await ClassSession
            .find(filter)
            .populate("trainer", "fullName email")
            .sort({ startAt: 1 })

        return res.status(200).json(classes)

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch class sessions"
        })
    }
}


export const getClassSessionById = async (req: Request,res: Response) => {
    try {
        const classSession = await ClassSession
            .findById(req.params.id)
            .populate("trainer", "fullName email")

        if (!classSession) {
            return res.status(404).json({
                message: "Class session not found"
            })
        }

        return res.status(200).json(classSession)

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch class session"
        })
    }
}

export const updateClassSession = async (req: Request,res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            })
        }

        const classSession = await ClassSession.findById(req.params.id)

        if (!classSession) {
            return res.status(404).json({
                message: "Class session not found"
            })
        }

        if (classSession.trainer.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You can only update your own class sessions"
            })
        }

        const { title, startAt, endAt, capacity } = req.body

        if (startAt !== undefined) {
            const start = new Date(startAt)

            if (isNaN(start.getTime())) {
                return res.status(400).json({
                    message: "Invalid startAt"
                })
            }

            if (start <= new Date()) {
                return res.status(400).json({
                    message: "Class session must be in the future"
                })
            }

            classSession.startAt = start
        }

        if (endAt !== undefined) {
            const end = new Date(endAt);

            if (isNaN(end.getTime())) {
                return res.status(400).json({
                    message: "Invalid endAt"
                })
            }

            classSession.endAt = end
        }

        if (classSession.endAt <= classSession.startAt) {
            return res.status(400).json({
                message: "endAt must be after startAt"
            })
        }

        if (title !== undefined) {
            classSession.title = title
        }

        if (capacity !== undefined) {
            classSession.capacity = capacity
        }

        await classSession.save();

        return res.status(200).json(classSession)

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update class session"
        })
    }
}

export const deleteClassSession = async(req:Request,res:Response)=>{

    try{
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            })
        }
        const classSession = await ClassSession.findById(req.params.id)

        if (!classSession) {
            return res.status(404).json({
                message: "Class session not found"
            })
        }

        if (classSession.trainer.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You can only delete your own class sessions"
            })
        }

        await ClassSession.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            message: "Class session deleted successfully"
        })

    }catch(error){
        res.status(500).json({
            message: "Failed to delete class session"
        })
    }
}

