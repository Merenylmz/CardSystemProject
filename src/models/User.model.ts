import autoPopulate from 'mongoose-autopopulate';
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    orderId: {type: mongoose.Schema.Types.ObjectId, ref: "Orders", required: false, autoPopulate: true},
    lastLoginToken: {type: String, required: false}
});

userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`;
});

userSchema.plugin(autoPopulate);

const Users = mongoose.model("Users", userSchema);

export default Users;