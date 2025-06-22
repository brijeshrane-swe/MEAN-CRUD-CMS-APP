import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import {NODE_ENV} from "../configs/config"

/**
 * Global error handling middleware for Express.
 * This function catches errors passed via `next(err)` from routes or other middleware.
 * It sends a standardized error response to the client.
 */

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) : void => {
    // Determine the status code based on the error type
    const statusCode: number = err instanceof AppError ? err.statusCode : 500;

    // Determine the status message ('fail' for client errors, 'error' for server errors)
    const status: string = err instanceof AppError ? err.status : 'error';

    // Log the error for server-side debugging (should be replaced by a proper logger in production)
    console.error('--- UNHANDLED ERROR ---');
    console.error(err);
    if (err.stack) {
        console.error(err.stack);
    }
    console.error('-----------------------');

    // Send the error response to the client
    res.status(statusCode).json({
        status: status,
        message: err.message,
        // In development, provide more error details; in production, keep it simple for security
        stack: NODE_ENV === 'development' ? err.stack : undefined,
        error: NODE_ENV === 'development' ? err : undefined,
    });
}

export default errorHandler;