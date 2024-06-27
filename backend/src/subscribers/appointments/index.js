const eventEmitter = require('../../utils/eventEmitter');

eventEmitter.on('appointmentCreated', async (appointment) => {
    console.log(appointment)
});
