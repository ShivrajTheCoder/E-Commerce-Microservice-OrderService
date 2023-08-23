import mongoose, { Schema, Document } from "mongoose";

interface IAorder extends Document {
    products: Array<string>;
    userId: string;
    price: number;
    razorpayOrder: string;
    payment:boolean;
    paymentId:string;
    rzOrderId:string;
    rzSignature:string;
}

const aucOrderSchema: Schema = new mongoose.Schema({
    item: [String],
    userId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        reqired: true,
        default: Date.now(),
    },
    payment: {
        type: Boolean,
        required: true,
        default: false,
    },
    razorpayOrder: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
    rzOrderId: {
        type: String,
    },
    rzSignature: {
        type: String,
    }
})

export const AucOrder = mongoose.model<IAorder>("AucOrder", aucOrderSchema);