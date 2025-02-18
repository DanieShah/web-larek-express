import { Router } from 'express';
import productRouters from './products';
import orderRouter from './order';

const router = Router();

router.use(productRouters);
router.use(orderRouter);

export default router;
