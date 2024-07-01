const { Container } = require('typedi')
const WebSocket = require('ws');
const authenticateWebSocket = require('./middlewares/authenticateWebSocket');

const WsNotificationsService = require('../app/Notifications/WsNotificationsService').default

module.exports = class WebSocketManager {
    static initialize(server) {
        if (!this.wss) {
            this.wss = new WebSocket.Server({
                noServer: true,
            });

            this.wss.on('connection', (ws, req) => {
                const userId = req.user.id;
                const notificationService = Container.get(WsNotificationsService)

                if (req.url.indexOf('/ws/notifications') === 0) {
                    notificationService.addClient(userId, ws);
                    ws.on('close', () => notificationService.removeClient(userId));
                }

                ws.on('message', (message) => {
                    console.log('received: %s', message);
                });
            });

            server.on('upgrade', (request, socket, head) => {
                authenticateWebSocket(request, socket, head, () => {
                    this.wss.handleUpgrade(request, socket, head, (ws) => {
                        this.wss.emit('connection', ws, request);
                    });
                });
            });
        }
    }

    static get instance() {
        if (!this.wss) {
            throw new Error("WebSocket server is not initialized.");
        }

        return this.wss;
    }
};
