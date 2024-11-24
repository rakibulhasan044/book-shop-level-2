import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './app/modules/book/book.routes';
import { OrderRoutes } from './app/modules/order/order.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/products', BookRoutes);

app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

export default app;
