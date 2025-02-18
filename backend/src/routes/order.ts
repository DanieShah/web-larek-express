import { Router } from 'express';
import postOrder from '../controllers/order';
import { validateOrderPostBody } from '../middlewares/validatons';

const orderRouter = Router();

orderRouter.post('/order', validateOrderPostBody, postOrder);

export default orderRouter;
