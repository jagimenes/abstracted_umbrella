import express, { json, Request, Response } from 'express';

const app = express();
app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        ok: true
    })
});

app.listen(4444, () => {
    console.log('app is running');
});