const Notification = require('./Notification');

class WebNotification extends Notification {
    static TYPES = {
        NOTICE: 'notice',
        SUCCESS: 'success',
        WARNING: 'warning',
        ERROR: 'error',
    };

    constructor(type, message, userId) {
        if (!Object.values(WebNotification.TYPES).includes(type)) {
            throw new Error(`Invalid notification type: ${type}`);
        }

        super(type, message);
        this.userId = userId;
    }
}

module.exports = WebNotification;
