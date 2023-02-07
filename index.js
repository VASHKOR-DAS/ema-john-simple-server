const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// DB syntax
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wbb4jrx.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// get all products from db
async function run() {
    try {
        const productCollection = client.db('emaJohn').collection('products')

        app.get('/products', async (req, res) => {
            // get data by pagination
            const page = req.query.page;
            const size = req.query.size;
            console.log(page, size);



            const query = {};
            const cursor = productCollection.find(query);

            //if get only 10 data
            // const products = await cursor.limit(10).toArray();
            const products = await cursor.toArray();

            // pagination korte hole amader 1ta count lagbe
            const count = await productCollection.estimatedDocumentCount();
            res.send({ count, products }); // count & products ta object hisebe pathiyechi 
        })


    }
    finally {

    }
}
run().catch(err => console.error(err))








// routes
app.get('/', (req, res) => {
    res.send('ema john server is running');
})





// at last
app.listen(port, () => {
    console.log(`ema john simple running on: ${port}`)
})