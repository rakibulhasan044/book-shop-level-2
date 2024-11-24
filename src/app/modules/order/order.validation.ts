import { z } from 'zod';
import { Types } from 'mongoose';

//Zod validation for ObjectId
const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, { message: 'Invalid search item format' })
  .transform((val) => new Types.ObjectId(val));

const orderValidationSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Please enter your email address.' })
    .trim()
    .email({ message: 'Invalid email address.' }),
  product: objectIdSchema,
  quantity: z
    .number()
    .positive({ message: 'Quantity must be a positive number' })
    .int({ message: 'Fraction is invalid' }),
  totalPrice: z.number().optional(),
});

export default orderValidationSchema;
