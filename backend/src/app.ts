import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import errorHanler from './middlewares/error-habdler';
import orderRouter from './routes/order';
import productRouters from './routes/products';
import { requestLogger, errorLogger } from './middlewares/logger';
import { PORT, DB_ADDRESS } from './config';

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(requestLogger);
app.use(orderRouter);
app.use(productRouters)
app.use(errorLogger);
app.use(errors());
app.use(errorHanler);


const bootstrap = async () => {
  try {
    await mongoose.connect(DB_ADDRESS);
    await app.listen(PORT, () => { console.log(`listening on port ${PORT}`) });
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
