const express=require('express')
const router=express.Router()

const User=require('../models/user.model')
const Album= require('../models/album')


const Song= require('../models/songs')

// ------->     album with its songs <----------------------///

router.get('/:id/songs',async (req, res)=>{
    try {
        
        let response= await Album.findById(req.params.id).lean().exec()

        let songs= await Song.find({album: req.params.id})
        return res.status(200).send({data:response,song:songs})


    } catch (error) {
        return res.status(400).send({err:error})
    }
})


router.get('/search',async (req, res)=>{

    try {

        let s = req.query.q
  
        let nikal = new RegExp(s, "i")
       
        let resp= await Album.find({genre:{$regex:nikal}}).populate('artist')

        return res.status(200).send({data:resp})

    } catch (error) {
        return res.status(400).send({err:error})
    }
})







router.get('/',async (req, res)=>{
    try {
        
        // let page= +req.query.page||1
        // let limit= +req.query.limit||2
        // let offset=Math.ceil((page-1)*limit)
        // let totalpage= await data.find().countDocuments()
    
        // totalpage=Math.ceil(totalpage/limit)
        // let reply= await data.find().skip(offset).limit(limit).lean().exec()
        // res.send({reply,totalpage})
        let response= await Album.find({}).populate('artist').lean().exec()
        return res.status(200).send({data:response})


    } catch (error) {
        return res.status(400).send({err:error})
    }
})


router.post("/",async (req, res)=>{
    try {
        let response= await Album.create(req.body)
        return res.status(201).send({data:response})

    } catch (error) {
        return res.status(400).send({err:error})
    }
})

module.exports =router