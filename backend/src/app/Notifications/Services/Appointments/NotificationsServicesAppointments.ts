import {Service} from 'typedi'
import {NotificationsServicesInterfaces} from "../Interfaces"
import {NotificationsServices} from "../Service"
import Appointment from '~/@types/Appointment/Appointment'
import User from '~/@types/User/User'
import { NotificationKey, NotificationType } from "../../../../@types/Notification/NotificationTypes";

export namespace NotificationsServicesAppointments {
    @Service()
    export class NotificationService extends NotificationsServices.Service
        implements NotificationsServicesInterfaces.EntityCreationNotifier
    {
        private usersDbApi

        constructor() {
            super()
            this.usersDbApi = require('../../../../db/api/users.js');
        }

        async notifyCreated(entity: Appointment): Promise<boolean> {
            const user = await this.getAppointmentUser(entity)

            if (this.checkIfNotificationEnabled(user, NotificationType.EMAIL, NotificationKey.APPOINTMENT_CREATED)) {

            }

            return true
        }

        private async getAppointmentUser(appointment: Appointment): Promise<User> {
            return this.usersDbApi.findBy({ id: appointment.assigned_toId })
        }
    }
}
