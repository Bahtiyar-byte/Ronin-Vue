const WebSocket = require('ws');
const authenticateWebSocket = require('./middlewares/authenticateWebSocket');

const NotificationsService = require('./../app/notifications/NotificationsService');

module.exports = class WebSocketManager {
    static initialize(server) {
        if (!this.wss) {
            this.wss = new WebSocket.Server({
                noServer: true,
            });

            this.wss.on('connection', (ws, req) => {
                const userId = req.user.id;

                if (req.url === '/ws/notifications') {
                    NotificationsService.addClient(userId, ws);
                    ws.on('close', () => NotificationsService.removeClient(userId));

                    setInterval(() => {
                        NotificationsService.sendRandomNotification(userId);
                    }, 2500);
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
