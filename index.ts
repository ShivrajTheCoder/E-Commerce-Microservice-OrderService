import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db_connection";
import cors from "cors";
import orderRoutes from "./Routes/orderRoutes";
import { Order } from "./Models/orderModels";
import {AucOrder} from "./Models/aucOrderModels";
import { listenForMessages } from "./listenForMessages";
import { sendMessageToQueue } from "./sendOrderStatus";
dotenv.config();
const app = express();
type Env = {
    port: string;
}
const PORT = process.env["PORT" as keyof Env];
(async () => {
    await connectToDatabase().then(() => {

        console.log('Connected to the database successfully!');
    })
        .catch(err => {
            console.log(err);
        })
})();

app.use(cors());
app.use(express.json());

app.use("/orders", orderRoutes);
listenForMessages('order-auctionitem', async (content: any) => {
    console.log('Received message:', content);
    // Process the message as needed
    const {latestItem,userId} = JSON.parse(content);
    console.log(latestItem,userId);
    
    sendMessageToQueue("rz-order", JSON.stringify({ amount: latestItem.lastBid }));
    listenForMessages('razorpay-order', async (content: any) => {
        console.log('Received razorpay order:', content);
        // Process the message as needed
        const rzorder = JSON.parse(content);

        console.log(rzorder, "razorpay order received");
        const newOrder = new AucOrder({
            item: JSON.stringify(latestItem),
            price:latestItem.lastBid,
            userId,
            razorpayOrder: JSON.stringify(rzorder)
        });
        try {
            await newOrder.save();
            sendMessageToQueue("auc-order", JSON.stringify(newOrder));
        }
        catch (err) {
            console.log(err);
        }
    });
});

listenForMessages('order', async (content: any) => {
    console.log('Received message:', content);
    // Process the message as needed
    const detials = JSON.parse(content);
    // console.log(detials);
    const { products, userId } = detials;
    let totalPrice = 0;
    products.forEach((product: any) => {
        totalPrice += product.price * product.qty;
    });
    sendMessageToQueue("rz-order", JSON.stringify({ amount: totalPrice }));
    listenForMessages('razorpay-order', async (content: any) => {
        console.log('Received razorpay order:', content);
        // Process the message as needed
        const rzorder = JSON.parse(content);

        console.log(rzorder, "razorpay order received");
        const newOrder = new Order({
            products: JSON.stringify(products),
            totalPrice,
            userId,
            razorpayOrder: JSON.stringify(rzorder)
        });
        try {
            await newOrder.save();
            sendMessageToQueue("product", JSON.stringify(newOrder));
        }
        catch (err) {
            console.log(err);
        }
    });
});



    app.listen(PORT, () => {
        console.log(`product service running on ${PORT}`)
    })