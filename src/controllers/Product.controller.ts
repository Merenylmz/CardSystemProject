import { Request, Response } from "express";
import Product from "../models/Product.model";
import redis from "../libs/redis/configureRedis";
import Users from "../models/User.model";

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
        const user = await Users.findOne({email: req.body.email});
        if (!user) {
            return res.send({msg: "User Not Found", status: false});
        }
        const newProduct = new Product({...req.body, userId: user._id});
        await newProduct.save();
        await redis.del("products");

        res.send({status: true, newProduct});
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const deleteProduct = async(req: Request, res: Response)=>{
    try {
        const product = await Product.findOne({_id: req.params.id});
        if (!product) {
            return res.send({status: false, msg: "Product is not found"});
        }
        await redis.del("products");  
        await product.deleteAfterDelOrder(product._id);
        
        res.send({status: true});
    } catch (error) {
        console.log(error);
    }
};

export const editProduct = async(req: Request, res: Response)=>{
    try {
        const editedProduct = await Product.findOneAndUpdate({_id: req.params.id}, req.body);
        await redis.del("products");

        res.send({status: true, editedProduct});
    } catch (error) {
        console.log(error);
    }
}