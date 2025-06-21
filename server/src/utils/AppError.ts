/**
 * Custom error class for application-specific errors.
 * This allows for more structured error handling, including a specific HTTP status code.
 */
class AppError extends Error {
    public statusCode: number;
    public status: string;
    public isOperational: boolean; // Indicates if the error is expected (e.g., validation errors)

   constructor(message: string, statusCode: number) {
       super(message);
       this.statusCode = statusCode;
       this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 4xx for client errors, 5xx for server errors
       this.isOperational = true; // Operational errors are expected and can be handled gracefully

       // Capture stack trace for better debugging
       Error.captureStackTrace(this, this.constructor);
   }
}

export default AppError;