import express, { Application, Request, Response } from 'express';
import bodyParser from "body-parser";
import mysql2 from "mysql2";

const app: Application = express();
const PORT: number = 3000;

app.use(bodyParser.json());

// MySQL connection setup
const db: mysql2.Connection = mysql2.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'college_db'
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to the Express server!',
        error: false
    });
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
