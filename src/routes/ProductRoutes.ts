import { Router } from "express";
import { verifyToken } from "../controllers/AuthControllers";
import {
  createProduct,
  deleteProductId,
  getAllProduct,
  getProductById,
  updateProductId,
} from "../controllers/ProductControllers";

const routes = Router();

routes.post("/create", verifyToken, createProduct);
routes.get("/products", verifyToken, getAllProduct);
routes.get("/products/:id", verifyToken, getProductById);
routes.put("/products/:id", verifyToken, updateProductId);
routes.delete("/products/:id", verifyToken, deleteProductId);

export default routes;
