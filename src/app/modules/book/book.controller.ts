import { Request, Response } from 'express';
import { BookServices } from './book.service';
import bookValidationSchema from './book.validation';
import { Types } from 'mongoose';

const createBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { book: bookData } = req.body;
    if (!bookData) {
      return res.status(400).json({
        success: false,
        message: 'Book details is required.',
      });
    }

    const zodParserData = bookValidationSchema.parse(bookData);

    const result = await BookServices.createBookIntoDB(zodParserData);

    return res.status(200).json({
      success: true,
      message: 'Book added successfully',
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

const getAllBooks = async (req: Request, res: Response): Promise<any> => {
  try {
    const searchTerm = req.query.searchTerm || '';

    const query = searchTerm
      ? {
          $or: [
            { category: { $regex: searchTerm, $options: 'i' } },
            { title: { $regex: searchTerm, $options: 'i' } },
            { author: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      : {};

    const result = await BookServices.getAllBookFromDB(query);
    return res.status(201).json({
      success: true,
      message:
        result.length > 0 ? 'Successfully fetch books' : 'No result found',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: 'Internal server error.',
      error: error,
    });
  }
};

const getSingleBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(404).json({
        success: false,
        message: 'something went wrong',
      });
    }

    const result = await BookServices.getSingleBookFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Invalid information passed',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Successfully fetch book',
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

const updateBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { productId } = req.params;
    const updateDoc = req.body;

    if (!productId || Object.keys(updateDoc).length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Book ID or update field not found.',
      });
    }

    const partialValidationSchema = bookValidationSchema.partial();

    const zodParserData = partialValidationSchema.parse(updateDoc);
    if (zodParserData.quantity !== undefined) {
      if (zodParserData.quantity === 0) {
        zodParserData.inStock = false;
      } else {
        zodParserData.inStock = true;
      }
    }

    const updatedBook = await BookServices.updateBookFromDB(
      productId,
      zodParserData,
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Book updated successfully.',
      data: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the book.',
      error: error,
    });
  }
};

const deleteBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { productId } = req.params;

    if (!Types.ObjectId.isValid(productId)) {
      return res.status(404).json({
        success: false,
        message: 'Invalid Book ID.',
      });
    }

    const result = await BookServices.deleteBookIntoDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Book deleted successfully',
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

export const BookControllers = {
  createBook,
  deleteBook,
  getSingleBook,
  getAllBooks,
  updateBook,
};
