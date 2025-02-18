import { BaseError } from '../errors/base-error';
import { NextFunction, Request, Response } from 'express';

function errorHanler(err: BaseError, req: Request, res: Response, next: NextFunction) {
    const { statusCode } = err;
    const message = err.message;

    res.status(statusCode).send({
        'message': `${message}`
    });
    next();
};

export default errorHanler;