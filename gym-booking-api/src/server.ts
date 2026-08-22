import  express, {Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import { authenticate } from "./middleware/auth.middleware";
import { authorizeRole } from "./middleware/role.middleware";
import classSessionRoutes from "./routes/classSession.routes";
import bookingRoutes from "./routes/booking.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

dotenv.config();

const app: Application = express()
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/classes", classSessionRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
)

const startServer = async ()=>{
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))
}


startServer()

module.exports = app
