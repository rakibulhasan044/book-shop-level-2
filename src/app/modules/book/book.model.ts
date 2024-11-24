import { model, Schema } from 'mongoose';
import { TBook } from './book.interface';

const bookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: [true, 'Please enter book title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please enter author name.'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please enter book price.'],
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter book description'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter book quantity.'],
      default: 10,
    },
    inStock: {
      type: Boolean,
      // required: [true, "Please enter stock information."]
      default: true,
    },
  },
  { timestamps: true },
);

//pre save middleware   //will work on create() & save()
// bookSchema.pre('save', function() {
//     console.log(this, 'pre hook');
// })

// //post save middlewore
// bookSchema.post('save', function() {
//     console.log(this, 'post hook');
// })

//query middleware
// bookSchema.pre('find', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// bookSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// bookSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

export const Book = model<TBook>('Book', bookSchema);
