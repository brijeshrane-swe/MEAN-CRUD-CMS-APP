// Create an Express application instance
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { PORT } from "./configs/config.js";
import './db/db.js'; // Import and initialize the database connection pool (no direct export needed here)
import studentRoutes from "./routes/student_routes.js";
import errorHandler from "./middlewares/error_middleware.js";

const app: Application = express();

// --- Global Middleware ---

// Enable parsing of JSON request bodies
app.use(bodyParser.json());

// Example of a simple custom logging middleware (optional, can be replaced by morgan)
app.use((req: Request, res: Response, next: NextFunction) : void => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route handler
});

// --- Routes ---

// Basic root route for a welcome message
app.get('/', (req: Request, res: Response) : void => {
    res.status(200).json({
        message: 'Welcome to the College Management System API!',
        version: '1.0.0',
        documentation: 'Accessible via /api/students' // Placeholder
    });
});

// Mount student routes under '/api/students'
// All routes defined in studentRoutes.ts will be prefixed with /api/students
app.use('/api/students', studentRoutes);

// --- Error Handling Middleware ---

// This middleware must be placed AFTER all other routes and middleware
// It catches any errors passed via `next(err)`
app.use(errorHandler);

// --- Server Startup ---

// Start the Express server and listen on the specified port
app.listen(PORT, () : void => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    console.log('Press CTRL+C to stop the server');
});