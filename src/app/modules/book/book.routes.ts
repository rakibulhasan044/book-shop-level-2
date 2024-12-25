import express from 'express';
import { BookControllers } from './book.controller';

const router = express.Router();

router.post('/', BookControllers.createBook);
router.get('/', BookControllers.getAllBooks);
router.get('/:productId', BookControllers.getSingleBook);
router.put('/:productId', BookControllers.updateBook);
router.delete('/:productId', BookControllers.deleteBook);

export const BookRoutes = router;
