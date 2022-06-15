require('dotenv').config()
const SocketIoService = require('./services/SocketIoService')
const express = require ('express')

const mongoose = require('mongoose')
const TelegramService = require('./services/TelegramService')


const PORT = process.env.PORT || 8005
const app = express()

const start = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        TelegramService.startListenMessage()

        app.listen(PORT,()=>{
            console.log(`start on port ${PORT}`)
        })
    }catch (e) {
        console.log(e)
    }

}
start()


