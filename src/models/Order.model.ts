import mongoose from "mongoose";
import autoPopulate from "mongoose-autopopulate";
import mongooseDelete from "mongoose-delete";


const orderSchema = new mongoose.Schema({
    content: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, autoPopulate: true},
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", autoPopulate: true},
        quantity: Number
    }],

}, {timestamps: true});

orderSchema.methods.configureQuantity = function(){
    // return this.products.filter()
}

orderSchema.index({createdAt: 1}, {expireAfterSeconds: 3600});

orderSchema.plugin(autoPopulate);
orderSchema.plugin(mongooseDelete, {overrideMethods: "all"});

const Orders = mongoose.model("Orders", orderSchema);

export default Orders;