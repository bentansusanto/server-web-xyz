import { IUser } from "src/schema/User";
import { Types } from "mongoose";



export interface JwtPayload extends Omit<IUser, "password">{
    id: Types.ObjectId;
    
}



