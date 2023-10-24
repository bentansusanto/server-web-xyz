import { Router } from "express";
import { register, login, logout, verifyToken, getuser } from "../controllers/AuthControllers";

const routes = Router()

routes.post("/register", register)
routes.post("/login", login)
routes.get("/getuser", verifyToken, getuser)
routes.post("/logout", logout)

export default routes