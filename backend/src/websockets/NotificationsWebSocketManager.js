const WebSocket = require('ws');
const authenticateWebSocket = require('./middlewares/authenticateWebSocket');

module.exports = class NotificationsWebSocketManager {
    static initialize(server) {
        if (!this.wss) {
            this.wss = new WebSocket.Server({
                noServer: true,
                path: '/ws/notifications',
            });

            this.wss.on('connection', (ws, req) => {
                console.log('Client connected: ', req.user);
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
