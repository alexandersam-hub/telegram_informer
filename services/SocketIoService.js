const WebSocket = require('ws');
const TelegramService = require('./TelegramService')

class SocketIoService{
    constructor() {
        const wsServer = new WebSocket.Server({ port: 8101 });
        wsServer.on('connection', this.onConnect);
    }

    onConnect(wsClient) {
        console.log('Новый пользователь');
        wsClient.send('Привет');

        wsClient.on('close', function() {
            console.log('Пользователь отключился');
        });

        wsClient.on('message', function(message) {
            try {
                const jsonMessage = JSON.parse(message);
                switch (jsonMessage.action) {
                    case 'telegramSendAdmin':
                        TelegramService.sendTelegramMessageAdmin(jsonMessage.data)
                        break;
                    case 'PING':
                        setTimeout(function() {
                            wsClient.send('PONG');
                        }, 2000);
                        break;
                    default:
                        console.log('Неизвестная команда');
                        break;
                }
            } catch (error) {
                console.log('Ошибка', error);
            }
        });
    }


}

module.exports = new SocketIoService()