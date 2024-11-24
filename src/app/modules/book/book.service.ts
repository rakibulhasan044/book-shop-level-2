import { TBook } from './book.interface';
import { Book } from './book.model';

const createBookIntoDB = async (book: TBook) => {
  const result = await Book.create(book);
  return result;
};

const getAllBookFromDB = async (query: any) => {
  const result = await Book.find(query);
  return result;
};

const getSingleBookFromDB = async (id: string) => {
  const result = await Book.findById(id);
  return result;
};

const updateBookFromDB = async (id: string, updateDoc: Partial<TBook>) => {
  const result = await Book.findByIdAndUpdate(
    { _id: id },
    { $set: updateDoc },
    { new: true },
  );
  return result;
};

const deleteBookIntoDB = async (id: string) => {
  const result = await Book.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    return null;
  }
  return result;
};

export const BookServices = {
  createBookIntoDB,
  deleteBookIntoDB,
  getSingleBookFromDB,
  getAllBookFromDB,
  updateBookFromDB,
};
