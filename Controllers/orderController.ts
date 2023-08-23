import { Request, Response } from "express";
import { Order } from "../Models/orderModels";
import { AucOrder } from "../Models/aucOrderModels";
export const GetAllOrders = async (_req: Request, res: Response) => {
    await Order.find({})
        .then(response => {
            if (response.length > 0) {
                return res.status(200).json({
                    response
                })
            }
            else {
                return res.status(404).json({
                    message: "No order found",
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                message: "Someting went wrong",
                error: err,
            })
        })
}

export const GetUserOrders = async (req: Request, res: Response) => {
    const { userId } = req.params;
    await Order.find({ userId })
        .then(response => {
            if (response.length > 0) {
                return res.status(200).json({
                    orders: response,
                })
            }
            else {
                return res.status(404).json({
                    message: "Not found"
                })
            }
        })
        .catch(error => {
            return res.status(500).json({
                message: "Somethign went wrong",
                error
            })
        })
}

export const PaymentSuccess = async (req: Request, res: Response) => {
    // console.log(req);
    const { orderId } = req.params;
    // console.log(orderId);
    const {paymentId,rzOrderId,rzSignature,isAucOrder=false}=req.body;
    if(!isAucOrder){
        await Order.findByIdAndUpdate(orderId,{paymentId,rzOrderId,rzSignature,payment:true})
        .then(resp=>{
            if(resp){
                return res.status(200).json({
                    message:"Payment Successful",
                })
            }
            else{
                return res.status(500).json({
                    message:"Something went wrong!",
                })
            }
        })
        .catch(error=>{
            return res.status(500).json({
                message:"Something went wrong!",
                error
            })
        })
    }
    else{
        await AucOrder.findByIdAndUpdate(orderId,{paymentId,rzOrderId,rzSignature,payment:true})
        .then(resp=>{
            if(resp){
                return res.status(200).json({
                    message:"Payment Successful",
                })
            }
            else{
                return res.status(500).json({
                    message:"Something went wrong!",
                })
            }
        })
        .catch(error=>{
            return res.status(500).json({
                message:"Something went wrong!",
                error
            })
        })
    }
}
export const GetOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    await Order.findById(orderId)
        .then(response => {
            if (response) {
                return res.status(200).json({
                    order: response,
                })
            }
            else {
                return res.status(404).json({
                    message: "Not found"
                })
            }
        })
        .catch(error => {
            return res.status(500).json({
                message: "Somethign went wrong",
                error
            })
        })
}

export const GetAllUserAucOrders=async(req:Request,res:Response)=>{
    const { userId } = req.params;
    await AucOrder.find({ userId })
        .then(response => {
            if (response.length > 0) {
                return res.status(200).json({
                    orders: response,
                })
            }
            else {
                return res.status(404).json({
                    message: "Not found"
                })
            }
        })
        .catch(error => {
            return res.status(500).json({
                message: "Somethign went wrong",
                error
            })
        })
}

export const GetAucOrder= async (req: Request, res: Response) => {
    const { orderId } = req.params;
    await AucOrder.findById(orderId)
        .then(response => {
            if (response) {
                return res.status(200).json({
                    order: response,
                })
            }
            else {
                return res.status(404).json({
                    message: "Not found"
                })
            }
        })
        .catch(error => {
            return res.status(500).json({
                message: "Somethign went wrong",
                error
            })
        })
}