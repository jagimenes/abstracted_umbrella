import express, { json, Request, Response } from 'express';
import taksRouter from './routes/tasks.routes';

const app = express();
app.use(json());

app.use('/tasks', taksRouter);

app.listen(4444, () => {
    console.log('app is running');
});