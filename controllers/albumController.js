const express=require('express')
const router=express.Router()

const User=require('../models/user.model')
const Album= require('../models/album')


const Song= require('../models/songs')

// ------->     album with its songs <----------------------///

router.get('/:id/songs',async (req, res)=>{
    try {
        
        let page= +req.query.page||1
        let limit= +req.query.limit||5
        let offset=Math.ceil((page-1)*limit)
        let totalpage= await Song.find({album:req.params.id}).countDocuments()
    
        totalpage=Math.ceil(totalpage/limit)
        //let reply= await data.find().skip(offset).limit(limit).lean().exec()
            // let response= await Album.find({}).populate('artist').skip(offset).limit(limit).lean().exec()
            // console.log('jdsak')
            // return res.status(200).send({data:response,totalpage:totalpage})
    
    
        let response= await Album.findById(req.params.id).skip(offset).limit(limit).lean().exec()

        let songs= await Song.find({album: req.params.id}).skip(offset).limit(limit).lean().exec()
        return res.status(200).send({data:response,song:songs,totalpage:totalpage})


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

        let s = req.query.filter||''
        let sort1= req.query.sort
        
        if(sort1[0]=='H'){
            sort1=-1
        }
        else{
            sort1=1
        }
  if(s&&sort1){
      
    let nikal = new RegExp(s, "i")
    let page= +req.query.page||1
    let limit= +req.query.limit||2
    let offset=Math.ceil((page-1)*limit)
    let totalpage= await Album.find({genre:{$regex:nikal}}).sort({year,sort1}).countDocuments()
    totalpage=Math.ceil(totalpage/limit)
   
    let resp= await Album.find({genre:{$regex:nikal}}).populate('artist').sort({year,sort1}).skip(offset).limit(limit).lean().exec()


   return  res.status(200).send({data:resp,totalpage:totalpage})
  }
  else if(s){
   let nikal = new RegExp(s, "i")
    let page= +req.query.page||1
    let limit= +req.query.limit||2
    let offset=Math.ceil((page-1)*limit)
    let totalpage= await Album.find({genre:{$regex:nikal}}).countDocuments()
    totalpage=Math.ceil(totalpage/limit)
   
    let resp= await Album.find({genre:{$regex:nikal}}).populate('artist').skip(offset).limit(limit).lean().exec()


   return  res.status(200).send({data:resp,totalpage:totalpage})
  }
  else if(sort1){
    let nikal = new RegExp(s, "i")
    let page= +req.query.page||1
    let limit= +req.query.limit||2
    let offset=Math.ceil((page-1)*limit)
    let totalpage= await Album.find({}).sort({year,sort1}).countDocuments()
    totalpage=Math.ceil(totalpage/limit)
   
    let resp= await Album.find({year:sort1}).populate('artist').sort({year,sort1}).skip(offset).limit(limit).lean().exec()


   return  res.status(200).send({data:resp,totalpage:totalpage})
  }
        
    let page= +req.query.page||1
    let limit= +req.query.limit||4
    let offset=Math.ceil((page-1)*limit)
    let totalpage= await Album.find({}).countDocuments()

    totalpage=Math.ceil(totalpage/limit)
   
        let response= await Album.find({}).populate('artist').skip(offset).limit(limit).lean().exec()
       // console.log('jdsak')
        return res.status(200).send({data:response,totalpage:totalpage})


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