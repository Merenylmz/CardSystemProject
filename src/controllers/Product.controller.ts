import { Request, Response } from "express";
import Product from "../models/Product.model";
import redis from "../libs/redis/configureRedis";

export const getAllProduct = async(req: Request, res: Response) =>{
    try {
        let products;
        const cacheProducts = await redis.exists("products");
        if (cacheProducts) {
            const cached = await redis.get("products")
            products = JSON.parse(cached!);
        } else{
            products = await Product.find();
            redis.set("products", JSON.stringify(products));
        }
        
        res.send({status: true, products});     
    } catch (error) {
        console.log(error);
    }
}

export const getByIdProduct = async(req: Request, res: Response)=>{
    try {
        let products;
        if (await redis.exists("products")) {
            const cached = await redis.get("products")
            products = JSON.parse(cached!);
        } else {
            products = await Product.find();
        }

        const product = products.filter((p: any)=>p._id == req.params.id);

        res.send({status: true, product});
    } catch (error) {
        console.log(error);
    }
}


export const addProduct = async(req: Request, res: Response)=>{
    try {
                
    } catch (error) {
        console.log(error);
    }
};