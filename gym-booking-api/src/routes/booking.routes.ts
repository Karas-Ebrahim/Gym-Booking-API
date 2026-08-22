import { Router } from "express";
import {
    createBooking,
    getMyBookings,
    cancelBooking
} from "../controllers/booking.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorizeRole } from "../middleware/role.middleware";
import { validateBooking } from "../validators/booking.validator";

const myRouter = Router()



/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Book a class session
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - session
 *             properties:
 *               session:
 *                 type: string
 *                 example: 64f123456789abcdef123456
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Member role required
 *       404:
 *         description: Class session not found
 *       409:
 *         description: Class is full or already booked
 */


myRouter.post(
    "/",
    authenticate,
    authorizeRole("Member"),
    validateBooking,
    createBooking
)



/**
 * @swagger
 * /api/bookings/me:
 *   get:
 *     summary: Get the current member's bookings
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of the member's bookings
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Member role required
 */

myRouter.get(
    "/me",
    authenticate,
    authorizeRole("Member"),
    getMyBookings
)


/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel your own booking
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       400:
 *         description: Booking is already cancelled
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Not allowed to cancel this booking
 *       404:
 *         description: Booking not found
 */

myRouter.patch(
    "/:id/cancel",
    authenticate,
    authorizeRole("Member"),
    cancelBooking
)

export default myRouter