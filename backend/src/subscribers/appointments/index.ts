import { Container } from 'typedi'
import type Appointment from '~/@types/Appointment/Appointment'

import {
    NotificationServiceToken,
} from "../../app/Notifications/Services/Appointments/NotificationsServicesAppointments";

const eventEmitter = require('../../utils/eventEmitter');

const notificationService = Container.get(NotificationServiceToken);

eventEmitter.on('appointmentCreated', async (appointment: Appointment) => {
    await notificationService.notifyCreated(appointment)
});
