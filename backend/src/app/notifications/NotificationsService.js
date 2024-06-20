const WebSocket = require('ws');
const WebNotification = require('./../contracts/notifications/WebNotification');

class NotificationsService {
    constructor() {
        this.clients = new Map();
    }

    addClient(userId, ws) {
        this.clients.set(userId, ws);
    }

    removeClient(userId) {
        this.clients.delete(userId);
    }

    sendNotification(userId, type, message) {
        const client = this.clients.get(userId);
        if (client && client.readyState === WebSocket.OPEN) {
            const notification = new WebNotification(type, message, userId);
            client.send(JSON.stringify(notification));
        }
    }

    sendRandomNotification(userId) {
        const types = Object.values(WebNotification.TYPES);
        const randomType = types[Math.floor(Math.random() * types.length)];
        const message = `This is a ${randomType} message`;
        this.sendNotification(userId, randomType, message);
    }
}

module.exports = new NotificationsService();
