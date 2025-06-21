import { Application, Request, Response } from 'express';
import express = require('express');

const app: Application = express();
const PORT: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, your Node.js and TypeScript server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});