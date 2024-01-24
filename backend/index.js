import express from 'express';
import {PORT , mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

// middleware for parsing req body
app.use(express.json());

// Allow Custom Origins
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);
// CORS
// route to get to home page
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Hello World!');
});


app.use('/books', booksRoute);
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        
        });
    })
    .catch((err) => {
        console.log(err);
    })