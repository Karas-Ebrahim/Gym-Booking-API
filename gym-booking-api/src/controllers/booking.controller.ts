import { Request, Response } from "express";
import Booking from "../models/booking.model";
import ClassSession from "../models/classSession.model";

export const createBooking = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            })
        }

        const { session } = req.body;

        if (!session) {
            return res.status(400).json({
                message: "Session is required"
            })
        }

        const classSession = await ClassSession.findById(session);

        if (!classSession) {
            return res.status(404).json({
                message: "Class session not found"
            })
        }

        if (classSession.startAt <= new Date()) {
            return res.status(400).json({
                message: "Cannot book a past class session"
            })
        }

        const existingBooking = await Booking.findOne({
            session,
            member: req.user.userId,
            status: "booked"
        })

        if (existingBooking) {
            return res.status(409).json({
                message: "You have already booked this class"
            })
        }

        const bookedCount = await Booking.countDocuments({
            session,
            status: "booked"
        })

        if (bookedCount >= classSession.capacity) {
            return res.status(409).json({
                message: "Class session is full"
            })
        }

        const booking = await Booking.create({
            session,
            member: req.user.userId,
            status: "booked"
        })

        return res.status(201).json({
            message: "Booking created successfully",
            booking
        })

    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "You have already booked this class"
            })
        }

        return res.status(500).json({
            message: "Failed to create booking"
        })
    }
}

export const getMyBookings = async (req: Request,res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            })
        }

        const bookings = await Booking.find({
            member: req.user.userId
        })
            .populate({
                path: "session",
                populate: {
                    path: "trainer",
                    select: "fullName email"
                }
            })
            .sort({ createdAt: -1 })

        return res.status(200).json(bookings)

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch bookings"
        })
    }
}

export const cancelBooking = async ( req: Request,res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            })
        }

        const booking = await Booking.findById(req.params.id)

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            })
        }

        if (booking.member.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You can only cancel your own booking"
            })
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking is already cancelled"
            })
        }

        booking.status = "cancelled"

        await booking.save()

        return res.status(200).json({
            message: "Booking cancelled successfully",
            booking
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to cancel booking"
        })
    }
}