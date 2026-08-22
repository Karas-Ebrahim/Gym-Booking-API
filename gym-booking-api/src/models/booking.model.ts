import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
    session: mongoose.Types.ObjectId
    member: mongoose.Types.ObjectId
    status: "booked" | "cancelled"
}

const bookingSchema = new Schema<IBooking>(
    {
        session: {
            type: Schema.Types.ObjectId,
            ref: "ClassSession",
            required: true
        },

        member: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["booked", "cancelled"],
            default: "booked",
            required: true
        }
    },
    {
        timestamps: true
    }
    
)
bookingSchema.index(
    { session: 1, member: 1 },
    {
        unique: true,
        partialFilterExpression: {
            status: "booked"
        }
    }
)
const Booking = mongoose.model<IBooking>("Booking", bookingSchema)

export default Booking