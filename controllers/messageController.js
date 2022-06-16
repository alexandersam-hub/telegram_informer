const telegramService = require('../services/TelegramService')

class MessageController{
    async getMessage(req,res){
        try {
            console.log(req.body)
            const {data} = req.body
            console.log('message '+data)
            const result = await telegramService.sendTelegramMessageAdmin(data)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера '+e})
        }
    }
}

module.exports = new MessageController()