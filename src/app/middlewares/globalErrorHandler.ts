import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode?: number;
    errors?: string[] | Record<string, string>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || ['Something went wrong'];

    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};

export default globalErrorHandler;
