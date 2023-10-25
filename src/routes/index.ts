import { Router } from "express";
import AuthRoutes from './AuthRoutes';
import ProductRoutes from './ProductRoutes';
import CartRoutes from './CartRoutes';

const routes = Router();

routes.use("/api/auth", AuthRoutes)
routes.use("/api", ProductRoutes)
routes.use("/api", CartRoutes)

export default routes;