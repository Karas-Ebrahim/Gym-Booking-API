import mongoose, { Document, Schema } from "mongoose";

export interface IClassSession extends Document {
    title: string;
    trainer: mongoose.Types.ObjectId;
    startAt: Date;
    endAt: Date;
    capacity: number;
}

const classSessionSchema = new Schema<IClassSession>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        trainer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        startAt: {
            type: Date,
            required: true
        },

        endAt: {
            type: Date,
            required: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        timestamps: true
    }
);

const ClassSession = mongoose.model<IClassSession>(
    "ClassSession",
    classSessionSchema
);

export default ClassSession;