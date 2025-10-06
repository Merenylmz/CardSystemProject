import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import redis, { redisStatus } from "./libs/redis/configureRedis";
import connectionRabbit, { rabbitMQConnectionStatus } from "./libs/rabbitmq/configureRMQ";
import cors from "cors";
import productRoutes from "./routes/Product.routes";
import orderRoutes from "./routes/Order.routes";
import userRoutes from "./routes/User.routes";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();
dotenv.config({quiet: true});

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: "Hey dude, Calm down take it easy :)"
});

//For a Security
app.use(cors());
app.use(limiter);
app.use(helmet());
//--------------------


app.get("/health", (req: Request, res: Response)=>{
    res.send({
        systemStatus: true,
        databaseStatus: mongoose.STATES.connected == 1 ? true : false,
        redisStatus,
        rabbitMQStatus: rabbitMQConnectionStatus
    });
});
app.get("/", (req, res)=>{
    res.send("Home Endpoint");
})
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
// app.use();

app.listen(process.env.PORT!, ()=>{
    console.log("✅ Listening a PORT");
    (async()=>{
        await mongoose.connect(process.env.MongoDbUri!);
        mongoose.STATES.connected == 1 && console.log("✅ MongoDb Connected");
        await connectionRabbit();
        console.log("Ready to Smash :)");
    })()
});