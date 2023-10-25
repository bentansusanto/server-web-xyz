import { Schema, model } from "mongoose";
import { IProduct } from "src/utils/typesSchema";

 const productSchema = new Schema<IProduct> (
    {
        productId: {type: String, required: true, unique: true},
        name_product: {type: String, required: true},
        slug: {type: String, required: true, unique: true},
        category: {type: String, required: true},
        price: {type: Number, required: true},
        size: [{type: String, required: true}],
        desc: {type: String, required: true},
        image: {type: String, required: true},
    },
    {timestamps: true}
)

// export const User = model<IUser>("user", userSchema)
export default model<IProduct>("product", productSchema)