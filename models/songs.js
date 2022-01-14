const mongoose = require('mongoose')

const songSchema=new mongoose.Schema({
    type:{type:String,required:true,default:"songs"},
    name:{type:String,required:true},
    album:{type:mongoose.Schema.Types.ObjectId,ref:"album",required:true},
    img:{type:String,required:true},
    duration:{type:Number,required:true},
    monthlyListeners:{type:Number,default:Math.floor((Math.random()*1000000)+1)}
})

module.exports =mongoose.model('songs',songSchema)

