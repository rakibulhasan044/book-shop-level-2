import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';
import { Book } from '../book/book.model';

const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { order: orderData } = req.body;
    if (!orderData) {
      return res.status(404).json({
        success: false,
        message: 'Order data not found',
      });
    }

    // console.log(orderData);
    const zodParserData = orderValidationSchema.parse(orderData);

    // console.log(zodParserData.product);
    //checking do the book exits
    const bookExists = await Book.findById(zodParserData.product);
    if (!bookExists) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    //checking book available quantity and order quantity
    if (bookExists?.quantity < zodParserData.quantity) {
      return res.status(400).json({
        success: false,
        message: `Not enough stock available.${bookExists.quantity} items are in stock.`,
      });
    }

    //if book stock out return
    if (bookExists.quantity === 0) {
      return res.status(400).json({
        success: false,
        message: 'Book stock out.',
      });
    }

    const totalPrice = (bookExists.price * zodParserData.quantity).toFixed(2);

    bookExists.quantity -= zodParserData.quantity;

    // if quantity become zero after deduction update inStock
    if (bookExists.quantity === 0) {
      bookExists.inStock = false;
    }

    // Save the updated book document
    await bookExists.save();

    zodParserData.totalPrice = parseFloat(totalPrice);

    const result = await OrderServices.createOrderIntoDb(zodParserData);
    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const revenue = async (req: Request, res: Response): Promise<any> => {
  try {
    const totalRevenue = await OrderServices.getTotalRevenueFromDb();
    return res.status(201).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  revenue,
};
