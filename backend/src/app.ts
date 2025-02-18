import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import errorHanler from './middlewares/error-habdler';
import router from './routes/index';
import { requestLogger, errorLogger } from './middlewares/logger';
import { PORT, DB_ADDRESS } from './config';

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHanler);

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');
app.listen(PORT, () => { console.log(`listening on port ${PORT}`) });
