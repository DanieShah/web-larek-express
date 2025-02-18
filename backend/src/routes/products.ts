import { Router } from 'express';
import { getProducts, postProduct } from '../controllers/products';
import { validateProductPostBody } from '../middlewares/validatons';

const productRouters = Router();

productRouters.get('/product', getProducts);

productRouters.post('/product', validateProductPostBody, postProduct);

export default productRouters;
