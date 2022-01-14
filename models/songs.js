const mongoose = require('mongoose')

const songSchema=new mongoose.Schema({
    type:{type:String,required:true,default:"songs"},
    name:{type:String,required:true},
    album:{type:mongoose.Schema.Types.ObjectId,ref:"album",required:true}
})

module.exports =mongoose.model('songs',songSchema)