import express from 'express';
import { Book } from '../models/bookModels.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Create a new book
router.post('/', async (req, res) => {
    try {
      const { title, author, publishYear, imageUrl } = req.body;
  
      // Kiểm tra các trường bắt buộc (trừ imageUrl vì không required)
      if (!title || !author || !publishYear) {
        return res.status(400).send({
          message: 'Vui lòng nhập đầy đủ: title, author, publishYear',
        });
      }
  
      const newBook = { title, author, publishYear, imageUrl };
  
      const book = await Book.create(newBook);
      return res.status(201).send(book);
  
    } catch (error) {
      console.error(error);
  
      // Xử lý lỗi từ Mongoose validation (ví dụ: publishYear không đúng)
      if (error.name === 'ValidationError') {
        const firstError = Object.values(error.errors)[0].message;
        return res.status(400).json({ message: firstError });
      }
  
      // Lỗi khác
      return res.status(500).json({ message: error.message });
    }
  });
  

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Get book by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Update a book
router.put('/:id', async (req, res) => {
    try {
        const { title, author, publishYear, imageUrl } = req.body;

        if (!title || !author || !publishYear || !imageUrl) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear, imageUrl',
            });
        }

        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, publishYear, imageUrl });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Delete a book and its image
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Delete associated image
        if (book.imageUrl) {
            const fileName = path.basename(book.imageUrl);
            const imagePath = path.join('uploads', fileName);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.warn('Failed to delete image:', imagePath, err.message);
                }
            });
        }

        return res.status(200).send({ message: 'Book and image deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

export default router;
