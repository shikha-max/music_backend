const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors= require('cors')

app.use(express.json())

app.use(cors());
app.use(express.urlencoded({ extended: false }));


const connect = async()=>{
    return await mongoose.connect('mongodb+srv://shikha:shikha_123@cluster0.wzqbc.mongodb.net/musicApp?retryWrites=true&w=majority')
}

const signup= require('./controllers/auth.controller')
const album=require('./controllers/albumController')
const artist=require('./controllers/artist')
const song= require('./controllers/songController')
app.use('/signup',signup)

app.use('/album',album)

app.use('/artist',artist)

app.use('/song',song)

app.listen(4001,async(req,res)=>{
    await connect()
    console.log('running on 2234 port');
})
//module.exports=app