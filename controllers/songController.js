const express = require('express')
const router = express.Router()

const song= require('../models/songs')

const Album = require('../models/album')
router.post('/',async (req, res)=>{
    try {
        let data= await song.create(req.body)

        return res.status(200).send({data:data})

        
    } catch (error) {
        return res.status(400).send({err:error})
    }
})


router.get('/:id',async (req, res)=>{
    try {
        let data= await song.find({album: req.params.id}).populate({
            path:'album',
            model:'album',
            select:{'album_name':1}
        }).lean().exec()

        return res.status(200).send({data:data})
    } catch (error) {
        return res.status(400).send({err:error})
    }
})



router.get('/',async (req, res)=>{
    try {
        let data= await song.find({}).lean().exec()

        return res.status(200).send({data:data})
    } catch (error) {
        return res.status(400).send({err:error})
    }
})



module.exports =router