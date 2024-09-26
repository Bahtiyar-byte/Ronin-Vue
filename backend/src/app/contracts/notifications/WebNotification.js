const Notification = require('./Notification');
const { WebNotificationTypes } = require('../../../@types/Notification/NotificationTypes')

class WebNotification extends Notification {
    constructor(type, message, userId) {
        if (!Object.values(WebNotificationTypes).includes(type)) {
            throw new Error(`Invalid notification type: ${type}`);
        }

        super(type, message);
        this.userId = userId;
    }
}

module.exports = WebNotification;
