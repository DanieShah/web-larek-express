import { NextFunction, Request, Response } from 'express';
import BaseError from '../errors/base-error';

function errorHanler(err: BaseError, _req: Request, res: Response, next: NextFunction) {
  const { statusCode, message } = err;

  res.status(statusCode).send({
    message,
  });

  next();
}

export default errorHanler;
