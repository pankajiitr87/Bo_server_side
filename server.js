const express = require('express');
// const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const { METHODS } = require('http');
const app = express();
const port = 4000;
// const url = 'mongodb://192.168.13.28:27017';
// const databaseName = 'Ecommerce';
// const client = new MongoClient(url);
const cors = require('cors');
// Use cors middleware
app.use(cors({
    origin: 'https://bo-server-side.onrender.com/' // specify your client's origin
  }));
app.use(express.json());

app.use(express.static(path.join(__dirname +"/public")))

app.post('/downloadData', async (req, res) => {
    console.log('in downloadData api');
    let { filePath } = req.body;
    console.log('filePath =', filePath);

    let pathParts = filePath.split('/');
    console.log('parthParts.length =', pathParts.length);
    if (pathParts.length < 4) {
        console.error('Invalid filePath format');
        res.status(400).send('Invalid filePath format');
        return;
    }

    let domain = pathParts[0];
    let clientName = pathParts[1];
    let month = pathParts[2];
    let year = pathParts[3];

    // console.log('Partition =', domain, clientName, month, year);
    
    let basePath = pathParts.slice(0, 2).join('/');
    console.log('basePath =', basePath);
    try {
        // console.log('Connecting to MongoDB...');
        // await client.connect();
        // console.log('Connected to MongoDB');

        // let db = client.db(databaseName);
        // console.log(`Connected to database: ${databaseName}`);

        // let collection = db.collection('files');

        // Query MongoDB to find the document with matching conditions
        // let document = await collection.findOne({ domain, client: clientName, month, year });
        // console.log('document.filename =', document.filename);
        // if (!document) {
        //     console.log('No document found with the specified criteria');
        //     res.status(404).send('No document found with the specified criteria');
        //     return;
        // }
        // console.log('document.csv =', document.csv);
        // console.log('document.plots =', document.plots);
        
        console.log(`Data saved to ${basePath}`);
        res.status(200).send(
            // {
            // plots: document.plots,
            // csv: document.csv || null
            "Success from node server"
        // }
    );
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching data');
    } finally {
        // await client.close();
        console.log('MongoDB connection closed');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

