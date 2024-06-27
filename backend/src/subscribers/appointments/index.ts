import type Appointment from "../../@types/Appointment/Appointment";

const eventEmitter = require('../../utils/eventEmitter');

eventEmitter.on('appointmentCreated', async (appointment: Appointment) => {
    console.log(appointment)
});
