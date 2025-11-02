import mongoose, { Model } from "mongoose";
import autoPopulate from "mongoose-autopopulate";
import Orders from "./Order.model";
export interface IProductModel {
    title: string;
    description: string;
    views: number,
    userId: mongoose.Schema.Types.ObjectId,
    price: number
    deleteAfterDelOrder(productId: any) : Promise<Boolean>;
}

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    views: {type: Number, default: 0},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, autoPopulate: true},
    price: Number
});

productSchema.index({title: 1, price: -1});

productSchema.plugin(autoPopulate);

productSchema.methods.deleteAfterDelOrder = async function(productId: any) {
    if (!productId) {
        throw new Error("ürün bulunamadı");
    }
    await Orders.updateMany(
        {},
        { $pull: { products: { product: productId } } }
    );

    // const editedOrderArray = order.products.filter((p)=>p._id.toString() !== productId.toString());
    // order.set("products", editedOrderArray);

    // await order.save();
    return true;
}
const Product = mongoose.model<IProductModel>("Product", productSchema);

export default Product;