import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000; // TODO get from .env file

app.get('/', (req: Request, res: Response) => {
    res.send('May the best team win!');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

