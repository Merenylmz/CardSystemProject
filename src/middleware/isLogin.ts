import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/User.model";

export default async(req: Request, res:Response, next: NextFunction)=>{
    const decodedToken = await jwt.verify(req.query.token?.toString()!, process.env.PRIVATE_KEY!) as {userId: any};
    if (!decodedToken) {
        return res.send("Token Expired");
    }
    const user = await Users.findOne({_id: decodedToken.userId});
    if (!user) {
        return res.send("Please Check Your Token");
    }
    next();
}   