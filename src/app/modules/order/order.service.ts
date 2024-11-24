import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDb = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const getTotalRevenueFromDb = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: '$totalPrice',
        },
      },
    },
  ]);
  return result.length > 0 ? result[0].totalRevenue : 0;
};

export const OrderServices = {
  createOrderIntoDb,
  getTotalRevenueFromDb,
};
