const route = require('express').Router()
const Product = require('../model/productModel.js')

route.get('/list',async(req, res)=>{
    try{
        const list = await Product.find({})
        res.status(200).json(list)
    }catch{
        res.status(500).json("error in data sent")
    }
})

route.get('/list/:id',async(req, res)=>{
    try{
        const {id} = req.params
        const element = await Product.findById(id)
        res.status(200).json(element)
    }catch{
        res.status(500).json({message:"no elemnt present"})
    }
})

route.put('/updateData/:id', async(req, res)=>{
    try{
        const {id} = req.params
        const product = await Product .findByIdAndUpdate(id, req.body)
        if(!product)
            res.status(500).json({message:"no elemnt present"})

        res.status(200).json(product)
    }catch{
        res.status(500).json({message:"no elemnt present"})
    }
})

route.delete('/deleteData/:id', async(req, res)=>{
    try{
        const {id} = req.params
        const product = await Product .findByIdAndDelete(id)
        if(!product)
            res.status(500).json({message:"no elemnt present"})

        res.status(200).json("element deleted")
    }catch{
        res.status(500).json({message:"no elemnt present"})
    }
})

route.post('/addData',async(req,res)=>{
    try{
        //Product.create accepts the object in the req.body and this will be added to mongoDb
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch(e){
        console.log("Error Occurred !! Couldn't add data...", e)
        res.status(500).json({message:"error ocurred!!!"})
    }
})

module.exports= route