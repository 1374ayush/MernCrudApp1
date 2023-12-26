const express = require('express')
const Product = require('./model/productModel.js')
const mainController = require('./controller/crudController.js')

const app = express()
const PORT = 3100
const mongoose = require('mongoose')

// Middleware to parse JSON in the request body
//When a client sends data to the server using a POST or PUT request with a Content-Type of "application/json", express.json() parses the JSON data and makes it available in the req.body object.
app.use(express.json());

app.use(mainController);

app.listen(PORT, ()=>{
    console.log("app running on port 3000")
})

mongoose.connect('mongodb+srv://Ayush:ayush123@cluster0.dfx1nqd.mongodb.net/')
.then(()=>{console.log("Db connected successfully...")})
.catch(()=>{console.log("Error in Db connection!!!")})