const express = require('express')
const  bodyParser = require('body-parser')
const app = express()
const  cors = require('cors')
require('dotenv').config()
app.use(cors())
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'
// Connection URL
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

// Database Name
const dbName = 'Password-Manager';
const port = 3000
app.use(bodyParser.json())
console.log(process.env.MONGODB_URL) // remove this after you've confirmed it is working
client.connect();
app.get('/', async(req, res) => {
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('Password');
    const findResult = await collection.find({}).toArray();
  res.send(findResult)
})
app.post('/', async(req, res) => {

    console.log('Connected successfully to server');
    const Pass = req.body;
    const db = client.db(dbName);
    const collection = db.collection('Password');
    const findResult = await collection.insertOne(Pass);
  res.send({sucess:true})
})
app.delete('/', async(req, res) => {
    
    console.log('Connected successfully to server');
    const Pass = req.body;
    const db = client.db(dbName);
    const collection = db.collection('Password');
    const findResult = await collection.deleteOne(Pass);
  res.send({sucess:true})
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})