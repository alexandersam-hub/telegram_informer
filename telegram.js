require('dotenv').config()
const SocketIoService = require('./services/SocketIoService')
const express = require ('express')
const cors = require('cors')
const messageRouter = require('./routers/MessageRouter')
const mongoose = require('mongoose')
const TelegramService = require('./services/TelegramService')


const PORT = process.env.PORT || 8005
const app = express()

app.use(express.json({ limit: "50mb" }))
app.use(express.static(__dirname+'/public'));
app.use(
    cors({
        // credentials: true,
        // origin: [process.env.URL_CLIENT],
        // optionsSuccessStatus: 200
    })
);
app.use('/api/message/', messageRouter)


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


