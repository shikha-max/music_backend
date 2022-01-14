const express = require('express')
const router = express.Router()

const song= require('../models/songs')


router.post('/',async (req, res)=>{
    try {
        let data= await song.find({}).lean().exec()

        return res.status(200).send({data:response})

        
    } catch (error) {
        return res.status(400).send({err:error})
    }
})