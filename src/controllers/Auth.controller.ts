import { Request, Response } from "express";
import Users from "../models/User.model";
import bcrypt from "bcrypt";

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