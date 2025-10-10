import { Request, Response } from "express";
import Orders from "../models/Order.model";
import { consumeQueue, sendToQueue } from "../libs/rabbitmq/configureRMQ";
import Users from "../models/User.model";

export const newOrder = async(req: Request, res: Response) => {
    try {
        const newOrder = new Orders(req.body);
        await newOrder.save();

        sendToQueue({
            type: "sendMail",
            payload: {
                to: req.body.email,
                subject: "Your Order is Ready",
                body: `<h1>Order</h1> <p>Thanks For your order :)</p>`
            }
        });

        res.send(newOrder);
    } catch (error) {
        console.log(error);
    }
};

export const getOrder = async(req: Request, res: Response)=>{
    try {
        const user = await Users.findOne({email: req.query.email});
        if (!user) {
            return res.send({status: false, msg: "..."});
        }
        const orders = await Orders.find({userId: user._id});

        res.send(orders);
    } catch (error) {
        console.log(error);
    }
}