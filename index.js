const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

const connect = async()=>{
    return await mongoose.connect('mongodb+srv://shikha:shikha_123@cluster0.wzqbc.mongodb.net/music?retryWrites=true&w=majority')
}

const signup= require('./controllers/auth.controller')
const album=require('./controllers/albumController')
const artist=require('./controllers/artist')
const song= require('./controllers/songController')
app.use('/signup',signup)

app.use('/album',album)

app.use('/artist',artist)

app.use('/song',song)

app.listen(3001,async(req,res)=>{
    await connect()
    console.log('running on 2234 port');
})
//module.exports=app