import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

export interface IProduct extends Document {
    productId: string;
    name_product: string;
    slug: string;
    category: string;
    price: number;
    size: string[];
    desc: string;
    image: string;
}

export interface ICart extends Document{
    user?: mongoose.Types.ObjectId;
    items: {product: mongoose.Types.ObjectId; quantity: number}[];
}