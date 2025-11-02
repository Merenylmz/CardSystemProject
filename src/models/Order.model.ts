import mongoose from "mongoose";
import autoPopulate from "mongoose-autopopulate";
import mongooseDelete from "mongoose-delete";


const orderSchema = new mongoose.Schema({
    content: String,
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", autoPopulate: true},
        quantity: Number
    }],
    email: {type: String}

}, {timestamps: true});

orderSchema.methods.configureQuantity = function(){
    // return this.products.filter()
}

orderSchema.index({createdAt: 1}, {expireAfterSeconds: 3600});

orderSchema.plugin(autoPopulate);
// orderSchema.plugin(mongooseDelete, {overrideMethods: "all"});

const Orders = mongoose.model("Orders", orderSchema);

export default Orders;