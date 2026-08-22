import { Router } from "express";
import {
    createClassSession,
    getAllClassSessions,
    getClassSessionById,
    updateClassSession,
    deleteClassSession
} from "../controllers/classSession.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorizeRole } from "../middleware/role.middleware";
import { validateClassSession } from "../validators/classSession.validator";

const myRouter = Router();



/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all class sessions
 *     tags: [Class Sessions]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by class title
 *       - in: query
 *         name: trainer
 *         schema:
 *           type: string
 *         description: Filter by trainer ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by class date
 *     responses:
 *       200:
 *         description: List of class sessions
 */

myRouter.get("/", getAllClassSessions)


/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Get a class session by ID
 *     tags: [Class Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class session found
 *       404:
 *         description: Class session not found
 */

myRouter.get("/:id", getClassSessionById)


/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create a new class session
 *     tags: [Class Sessions]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - startAt
 *               - endAt
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 example: CrossFit
 *               startAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-09-01T18:00:00Z
 *               endAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-09-01T19:00:00Z
 *               capacity:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       201:
 *         description: Class session created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Trainer role required
 */

myRouter.post(
    "/",
    authenticate,
    authorizeRole("Trainer"),
    validateClassSession,
    createClassSession
)


/**
 * @swagger
 * /api/classes/{id}:
 *   patch:
 *     summary: Update your own class session
 *     tags: [Class Sessions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               startAt:
 *                 type: string
 *                 format: date-time
 *               endAt:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Class session updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Not allowed to modify this class
 *       404:
 *         description: Class session not found
 */

myRouter.patch(
    "/:id",
    authenticate,
    authorizeRole("Trainer"),
    validateClassSession,
    updateClassSession
)


/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Delete your own class session
 *     tags: [Class Sessions]
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
 *         description: Class session deleted
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Not allowed to delete this class
 *       404:
 *         description: Class session not found
 */


myRouter.delete(
    "/:id",
    authenticate,
    authorizeRole("Trainer"),
    deleteClassSession
)

export default myRouter