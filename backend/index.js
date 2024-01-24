import express, { request } from 'express';
import {PORT , mongoDBURL} from "./config.js"
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Hello World!');
});

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