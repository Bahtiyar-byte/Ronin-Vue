import { Container } from 'typedi'
import type Appointment from '~/@types/Appointment/Appointment'

import {
    NotificationsServicesAppointments
} from "../../app/Notifications/Services/Appointments/NotificationsServicesAppointments";

const eventEmitter = require('../../utils/eventEmitter');

const notificationService = Container.get(NotificationsServicesAppointments.NotificationService);

eventEmitter.on('appointmentCreated', async (appointment: Appointment) => {
    await notificationService.notifyCreated(appointment)
});
