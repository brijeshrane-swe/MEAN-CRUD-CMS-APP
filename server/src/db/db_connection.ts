import mysql2 from "mysql2/promise";
import { DB_CONFIG } from "../configs/config";

/**
 * Creates a MySQL connection pool.
 * A connection pool manages multiple connections, improving performance
 * by reusing connections and handling concurrency.
 */
const pool = mysql2.createPool({
    ...DB_CONFIG,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * Tests the database connection by trying to get a connection from the pool.
 * This is run once on application startup to ensure database connectivity.
 */
pool.getConnection()
    .then((connection) => {
        console.log('Successfully connected to the database pool.');
        connection.release(); // Release the connection back to the pool immediately
    })
    .catch((err) => {
        console.error('Failed to connect to the database pool:', err.message);
        console.error('Please check your database configuration and ensure MySQL is running.');
        // In a real application, you might want to exit the process or try to reconnect
        process.exit(1); // Exit if database connection cannot be established
    });

export default pool;