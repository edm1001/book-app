import express from 'express';
import {PORT , mongoDBURL} from "./config.js"
import mongoose from 'mongoose';
import {Book} from "./models/bookModel.js"

const app = express();

// middleware for parsing req body
app.use(express.json());

// route to get to home page
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Hello World!');
});
// route to save a new book
app.post('/books', async (req, res) => {
    try {
    if (
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
    ) {
        return res.status(400).send({ message: 'Please fill in all required fields' });
    }
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
    }
    const book = await Book.create(newBook);

    return res.status(201).send({message: 'Book created successfully', book});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})


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