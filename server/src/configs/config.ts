import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Configuration for the MySQL database connection.
 * Fetched from environment variables for security and flexibility.
 */
export const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', // Correctly using 'user'
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'college_db',
    port: parseInt(process.env.DB_PORT || '3306', 10),
};

/**
 * The port number on which the Express server will listen.
 * Fetched from environment variables.
 */
export const PORT: number = parseInt(process.env.SERVER_PORT || '3000', 10);

/**
 * Node environment (e.g., 'development', 'production', 'test').
 */
export const NODE_ENV: string = process.env.NODE_ENV || 'development';