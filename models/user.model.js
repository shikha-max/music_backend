const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const schema = new mongoose.Schema({
    type:{type:String,required:true,default:"artist"},
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true}
},{
    versionKey:false,
    timestamps:false
})





module.exports=mongoose.model('user',schema)