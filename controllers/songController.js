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
        
        let data= await song.find({album: req.params.id}).lean().exec()
        let album= await Album.findById(req.params.id).lean().exec()
        
        return res.status(200).send({datas:data,album:album})
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