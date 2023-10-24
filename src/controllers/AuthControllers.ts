/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import type { JwtPayload } from "../jwtpayload/JwtPayload";

import { createUser, findEmail } from "../services/UserServices";
import { loginSchema, registerSchema } from "../validate/AuthValidate";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const jwtSign = (payload: JwtPayload, expiresIn: string) => {
  const secret = process.env.SECRET_JWT ?? "";
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
 // Verify Token
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const secret = process.env.SECRET_JWT?? ""
  
  try {
    jwt.verify(accessToken, secret, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: 'Token expired' });
      }
      req.user = user;
      next();
    });
  
  } catch (error) {
    res.status(400).json({ message: 'Token tidak valid' });
  }
};

// Register
export const register = async (
  req: Request,
  res: Response
) => {
    try {
      const { username, email, password } = req.body;
      
      const { error } = registerSchema.validate({ username, email, password });

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const regisResult = await createUser(username, email, password)

      if (regisResult.success) {
        // Mengirim respons dengan status 201 dan data pengguna yang baru dibuat
        res.status(201).json({ message: regisResult.message, user: regisResult.user });
      }
  } catch (error) {
    res.status(500).json({ data: null, message: "Network error" });
  }
};

// Login
export const login = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const findUser = await findEmail(email);
    if (!findUser) return res.status(401).json({ message: "User not found" });

    if (!email || !password) return res.status(400).send("missing parameters");

    const { error } = loginSchema.validate({ email, password });

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

    const isMatched = await bcrypt.compare(password, findUser.password);

    if (!isMatched) return res.status(400).send({ message: "Password wrong" });

    const accessTokenExpiresIn = process.env.ACCESS_TOKEN_JWT ?? "";
    const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_JWT ?? "";

    const payload = {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
    };

    const accessToken = jwtSign(payload, accessTokenExpiresIn);
    const refreshToken = jwtSign(payload, refreshTokenExpiresIn);

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Login Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Network error" });
  }
}

export const getuser = async (req: Request,
  res: Response) => {
    try {
      const user = req.user;
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Logout
export const logout = async (
  req: Request,
  res: Response
) => {
  try {
    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Network error" });
  }
};
