import { Router } from "express";
import { verifyToken } from "../controllers/AuthControllers";
import { addToCart, getCartByUser } from "../controllers/CartController";

const routes = Router();


routes.get("/carts/:userId", verifyToken, getCartByUser);
routes.post("/carts/:userId/add-product", verifyToken, addToCart);


export default routes;
