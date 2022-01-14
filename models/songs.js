const mongoose = require('mongoose')

const songSchema=new mongoose.Schema({
    name:{type:String,required:true},
    album:{type:mongoose.Schema.Types.ObjectId,ref:"album",required:true}
})

module.exports =mongoose.model('songs',songSchema)