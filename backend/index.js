import express from 'express';
import { PORT, MONGO_URL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import path from 'path';
import booksRoute from './routes/booksRoute.js';

import { Book } from './models/bookModels.js';
    

const app = express();

// ======= Middleware Setup =======
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Serve uploaded images statically from /uploads
const uploadsDir = path.join('./uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// ======= Book Routes =======
app.use('/books', booksRoute);

// ======= Upload Route =======
app.post('/upload', (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send('No image uploaded.');
    }

    const image = req.files.image;
    const fileName = `${Date.now()}_${image.name}`;
    const uploadPath = path.join(uploadsDir, fileName);

    image.mv(uploadPath, (err) => {
        if (err) {
            console.error('Image upload failed:', err);
            return res.status(500).send('Image upload failed');
        }
        const imageUrl = `http://localhost:${PORT}/uploads/${fileName}`;
        res.send({ imageUrl });
    });
});

// ======= MongoDB Connection =======
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(` Server running at: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });



