import mongoose, { Schema, model } from "mongoose";
import { ICart } from "src/utils/typesSchema";

 const cartSchema = new Schema<ICart> (
    {
        user: {type: mongoose.Types.ObjectId, ref: 'user', required:true},
        items: [
            {
              product: { type: mongoose.Types.ObjectId, ref: 'product', required: true },
              quantity: { type: Number, default: 1 },
            },
          ],
        
    },
    {timestamps: true}
)

// export const User = model<IUser>("user", userSchema)
export default model<ICart>("cart", cartSchema)