import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/User.model";

export default async(req: Request, res:Response, next: NextFunction)=>{
    console.log(req.query);
    const decodedToken = await jwt.verify(req.query.token?.toString()!, process.env.PRIVATE_KEY!);
    if (!decodedToken) {
        return res.send("Token Expired");
    }
    const user = await Users.findOne({_id: decodedToken});
    if (!user) {
        return res.send("Please Check Your Token");
    }
}   