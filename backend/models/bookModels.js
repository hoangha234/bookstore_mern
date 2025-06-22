import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      validate: {
        validator: function(t) {
          return t.length >= 5;
        },
        message: 'Title must be at least 5 characters long'
      }
    },
    author: { type: String, required: true },
    publishYear: { 
      type: Number, 
      required: true,
      validate: {
        validator: function (v) {
          return v >= 2000 && v <= 2025; 
        },
        message: 'Publish year must be between 2000 and 2025',
      }
    },
    imageUrl: { type: String, required: false }, 
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);

 