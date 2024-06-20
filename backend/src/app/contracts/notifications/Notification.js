
module.exports = class Notification {
    constructor(type, message) {
        if (this.constructor === Notification) {
            throw new Error("Cannot instantiate an interface");
        }

        this.type = type;
        this.message = message;
    }
}
