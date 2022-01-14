const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

const connect = async()=>{
    return await mongoose.connect('mongodb://127.0.0.1:27017/musicApp')
}

const signup= require('./controllers/auth.controller')
const album=require('./controllers/albumController')
app.use('/signup',signup)

app.use('/album',album)

app.listen(3000,async(req,res)=>{
    await connect()
    console.log('running on 2234 port');
})
//module.exports=app