import { Schema, model } from "mongoose";
import { IUser } from "../utils/typesSchema";

 const userSchema = new Schema<IUser> (
    {
        username: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
    {timestamps: true}
)

// export const User = model<IUser>("user", userSchema)
export default model<IUser>("user", userSchema)