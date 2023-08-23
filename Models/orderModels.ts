import mongoose, { Schema, Document } from "mongoose";

interface Iorder extends Document {
    products: Array<string>;
    userId: string;
    price: number;
    razorpayOrder: string;
    payment:boolean;
    paymentId:string;
    rzOrderId:string;
    rzSignature:string;
}

const orderSchema: Schema = new mongoose.Schema({
    products: [String],
    userId: {
        type: String,
        required: true,
    },
    totalPrice: {
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

export const Order = mongoose.model<Iorder>("Order", orderSchema);