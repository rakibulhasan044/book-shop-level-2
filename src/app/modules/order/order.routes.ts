import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/revenue', OrderControllers.revenue);

export const OrderRoutes = router;
