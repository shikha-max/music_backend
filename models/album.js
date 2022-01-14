const mongoose = require('mongoose')

const albmSchema=new mongoose.Schema({
    artist:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"},
    type:{type:String,default:"album"},
    genre:{type:String,required:true},
    img:{type:String,required:true},
    year:{type:Number,required:true}
})


module.exports =mongoose.model("album",albmSchema)