import bcrypt from "bcrypt";
import User from "../schema/User";
import { IUser } from "../utils/typesSchema";

export const createUser = async (username: string, email:string, password:string) => {
  try {
    const findUser = await User.findOne({ email: email });

    if (findUser) {
      throw new Error("Email allready exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: username,
      email: email,
      password: hashPassword,
    });

    await user.save();

    return { success: true, message: 'Registration successful', user };
  } catch (error) {
    throw new Error("Error data");
  }
};

export const findEmail = async (email: string) : Promise<IUser | null> => {
    const user = await User.findOne({email});
    if(user) {
        return user;
    }
    return null
}

export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Error data");
  }
};
