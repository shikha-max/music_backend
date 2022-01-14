const express=require('express')
const router=express.Router()

const User=require('../models/user.model')
const Album= require('../models/album')


router.get('/',async (req, res)=>{
    try {
        
        let response= await Album.find({}).lean().exec()

        return res.status(200).send({data:response})


    } catch (error) {
        return res.status(400).send({err:error})
    }
})


router.post("/",async (req, res)=>{
    try {
        let response= await Album.create(req.body)
console.log(response);
        return res.status(201).send({data:response})

    } catch (error) {
        return res.status(400).send({err:error})
    }
})

module.exports =router