import { z } from 'zod';

const bookValidationSchema = z.object({
  title: z
    .string({ message: 'Please enter valid title.' })
    .nonempty({ message: 'Book title missing. Please enter your book title.' })
    .trim(),
  author: z
    .string({ message: 'Please enter valid author name' })
    .nonempty({ message: 'Author name missing. Please author name.' })
    .trim(),
  price: z
    .number()
    .positive({ message: 'Price must be a positive number' })
    .nonnegative({ message: 'Price cannot be negative' }),
  category: z
    .string({ message: 'Please enter valid category' })
    .nonempty({
      message: 'Book category missing. Please enter your book category.',
    })
    .trim(),
  description: z
    .string()
    .nonempty({ message: 'Description is required' })
    .trim()
    .max(300, { message: 'Description cannot exceed 300 characters' }),
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' })
    .min(0, { message: 'Quantity cannot be less than 0' }),
  inStock: z.boolean().optional(),
});

export default bookValidationSchema;
