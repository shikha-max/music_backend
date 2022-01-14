const mongoose = require('mongoose')

const albmSchema=new mongoose.Schema({
    artist:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"},
    album_name:{type:String,required:true},
    type:{type:String,required:true,default:"album"}
})


module.exports =mongoose.model("album",albmSchema)