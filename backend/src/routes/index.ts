import productRouters from "./products";
import orderRouter from "./order";
import { Router } from "express";

const router = Router();

router.use(productRouters);
router.use(orderRouter);

export default router;