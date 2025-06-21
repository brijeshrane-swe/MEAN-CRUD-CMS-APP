import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to the Express server!',
        error: false
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});