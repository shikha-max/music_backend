const express = require('express')
const router = express.Router()

const song= require('../models/songs')

const Album = require('../models/album')



//------------------------creating a song-----------------------//
router.post('/',async (req, res)=>{
    try {
        let data= await song.create(req.body)

        return res.status(200).send({data:data})

        
    } catch (error) {
        return res.status(400).send({err:error})
    }
})



//-------------------perticular song with album-----------------------------------//

router.get('/:id/album',async (req, res)=>{
    try {
        let page= +req.query.page||1
        let limit= +req.query.limit||3
        let offset=Math.ceil((page-1)*limit)
        let totalpage= await song.find().countDocuments()
    
        totalpage=Math.ceil(totalpage/limit)
        //let reply= await data.find().skip(offset).limit(limit).lean().exec()
            // let response= await Album.find({}).populate('artist').skip(offset).limit(limit).lean().exec()
            // console.log('jdsak')
            // return res.status(200).send({data:response,totalpage:totalpage})
    
    
        let data= await song.find({album: req.params.id}).skip(offset).limit(limit).lean().exec()
        let album= await Album.findById(req.params.id).skip(offset).limit(limit).lean().exec()
        
        return res.status(200).send({datas:data,album:album,totalpage:totalpage})
    } catch (error) {
        return res.status(400).send({err:error})
    }
})



//---------------getn all songs----------------------------------//

router.get('/',async (req, res)=>{
    try {
        let data= await song.find({}).lean().exec()

        return res.status(200).send({data:data})
    } catch (error) {
        return res.status(400).send({err:error})
    }
})



module.exports =router