import WebSocket from 'ws';
const WebNotification = require('./../contracts/notifications/WebNotification');

class WsNotificationsService {
    private clients: Map<string, WebSocket> = new Map()

    constructor() {}

    addClient(userId: string, ws: WebSocket) {
        this.clients.set(userId, ws);
    }

    removeClient(userId: string) {
        this.clients.delete(userId);
    }

    // ToDo: Create WebNotification in database + use this model here
    sendNotification(userId: string, type: string, message: string) {
        const client = this.clients.get(userId);
        if (client && client.readyState === WebSocket.OPEN) {
            const notification = new WebNotification(type, message, userId);
            client.send(JSON.stringify(notification));
        }
    }
}

module.exports = new WsNotificationsService();
