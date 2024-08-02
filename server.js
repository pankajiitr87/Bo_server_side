const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
const { METHODS } = require('http');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
// Configure dotenv to load environment variables
dotenv.config();

const port = process.env.PORT || 4000;
// Replace the following with your MongoDB connection string. 
const uri = process.env.MONGODB_URI ;
const databaseName = 'BoData';

app.use(express.json());
app.use(cors({
    origin: 'https://bo-cilent.vercel.app'
 }));
// app.use(express.static(path.join(__dirname +"/public")))

// Mongoose connection events for logging
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB Atlas');
});

const connectToMongoDB = async () => {
    let client;
    try {
        client = new MongoClient(uri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
         });
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

app.post('/downloadData', async (req, res) => {
    let client;
    // console.log('req.body =', req.body);
    try {
        client = await connectToMongoDB();
        const db = client.db(databaseName);

       // Extract filePath from the request body
       const { filePath } = req.body;
       if (!filePath) {
           return res.status(400).send('filePath is required');
       }

       // Extract the collection name from filePath
       const collectionName = filePath.split('/')[0];
       if (!collectionName) {
           return res.status(400).send('Invalid filePath format');
       }

       // Fetch documents from the specified collection
       const collection = db.collection(collectionName);
    
        const documents = await collection.find({}, { projection: { _id: 0 } }).toArray();
        console.log('All data fetched:', documents);

        res.status(200).json(documents);
    } catch (error) {
        console.error('Error fetching plots data:', error);
        res.status(500).send('Error fetching plots data');
    } finally {
        if (client) {
            await client.close();
            console.log('MongoDB connection closed');
        }
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

