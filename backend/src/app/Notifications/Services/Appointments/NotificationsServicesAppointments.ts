import { Service } from 'typedi'
import { Token } from 'typedi'
import { NotificationsServicesInterfaces } from "../Interfaces"
import { NotificationsServices } from "../Service"
import Appointment from '~/@types/Appointment/Appointment'
import User from '~/@types/User/User'
import { NotificationKey, NotificationType } from '../../../../@types/Notification/NotificationTypes'
import AppointmentCreatedUserEmail from '../../../../services/email/list/appointments/AppointmentCreatedUserEmail'
import EmailSender from "../../../../services/email/EmailSender";
import NotificationService = NotificationsServicesAppointments.NotificationService;

export const NotificationServiceToken = new Token<NotificationService>();

export namespace NotificationsServicesAppointments {
    @Service({ id: NotificationServiceToken })
    export class NotificationService extends NotificationsServices.Service
        implements NotificationsServicesInterfaces.EntityCreationNotifier
    {
        async notifyCreated(entity: Appointment): Promise<boolean> {
            const user = await this.getAppointmentUser(entity)

            if (this.checkIfNotificationEnabled(user, NotificationType.EMAIL, NotificationKey.APPOINTMENT_CREATED)) {
                const appointmentCreatedMail = new AppointmentCreatedUserEmail(user.email as string, entity)
                await new EmailSender(appointmentCreatedMail).send()
            }

            return true
        }

        private async getAppointmentUser(appointment: Appointment): Promise<User> {
            return this.getUser(appointment.assigned_toId as string)
        }
    }
}
