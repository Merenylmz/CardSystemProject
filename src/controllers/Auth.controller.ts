import { Request, Response } from "express";
import Users from "../models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import redis from "../libs/redis/configureRedis";

export const register = async(req: Request, res: Response) =>{
    try {
        const user = await Users.findOne({email: req.body.email});
        if (user) {
            return res.send({status: false, msg: "User is already exists"});
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 11);
        const newUser = new Users({...req.body, password: hashedPassword});
        await newUser.save();

        res.send({status: true, newUser});
    } catch (error) {
        console.log(error);
    }
};


export const login = async(req: Request, res: Response) =>{
    try {
        const user = await Users.findOne({email: req.body.email});
        if (!user) {
            return res.send({status: false, msg: "User is not found"});
        }
        const status = await bcrypt.compare(req.body.password, user.password!);
        if (!status) {
            return res.send({status: false, msg: "Password incorrect"});
        }
        const token = await jwt.sign({userId: user._id}, process.env.PRIVATE_KEY!);
        await redis.set(`blacklist:${token}`, user._id.toString(), "EX", 60);
        user.lastLoginToken = token;
        await user.save();

        res.send({token, email: user.email});
    } catch (error) {
        console.log(error);
    }
};

