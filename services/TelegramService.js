const userService = require('./UserService')
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, { polling: true })

class TelegramService{

    async sendTelegramMessageAdmin(data){
        try {
            const users = await userService.getAdminUsers()
            for(let user of users){
                await bot.sendMessage(user.chatId, data);
            }
            return {warning:false}
        }catch (e) {
            return {warning:true, message:'Ошибка отправки сообщения '+e}
        }

    }

    async startListenMessage(){

        bot.on('message', async (msg) => {
            const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

            // отправляем сообщение
            await bot.sendMessage(chatId, 'Привет!', { // прикрутим клаву
                reply_markup: {
                    inline_keyboard:  [
                        [
                            {
                                text: 'Подписаться', // текст на кнопке
                                "callback_data": "subscribe"
                            },
                            {
                                text: 'Отписаться', // текст на кнопке
                                "callback_data": "unsubscribe"
                            }
                        ]
                    ]
                }
            });


        bot.on('callback_query', async (query) => {

            switch (query.data) {
                case 'subscribe':
                    console.log('subscribe')
                    const username = `${msg.chat.first_name} ${msg.chat.last_name} (${msg.chat.username})`
                    await userService.addUser(username, chatId, 'admin', true)
                    bot.sendMessage(chatId, 'Подписан');
                    break
                case 'unsubscribe':
                    console.log('unsubscribe')
                    bot.sendMessage(chatId, 'unsubscribe');
                    break
                default:
                    console.log('default')
                    bot.sendMessage(chatId, 'не знаю такого');
                    break
            }

        })

        });
    }

}
module.exports = new TelegramService()

