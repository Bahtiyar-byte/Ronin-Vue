import { Service, Token } from 'typedi';
import { NotificationsServicesInterfaces } from '../Interfaces';
import { NotificationsServices } from '../Service';
import Appointment from '~/@types/Appointment/Appointment';
import type User from '~/@types/User/User';
import { NotificationKey, NotificationType, WebNotificationTypes } from '../../../../@types/Notification/NotificationTypes';
import AppointmentCreatedUserEmail from '../../../../services/email/list/appointments/AppointmentCreatedUserEmail';
import EmailSender from '../../../../services/email/EmailSender';
import WsNotificationsService from '../../WsNotificationsService';
import AppointmentCreatedContactEmail from '../../../../services/email/list/appointments/AppointmentCreatedContactEmail';
import type Contact from '~/@types/Contact/Contact';
import UsersDBApi from '../../../../db/api/users';
import ContactsDBApi  from '../../../../db/api/contacts';

export const NotificationServiceToken = new Token<NotificationsServicesAppointments.NotificationService>();

export namespace NotificationsServicesAppointments {
    @Service({ id: NotificationServiceToken })
    export class NotificationService extends NotificationsServices.Service implements NotificationsServicesInterfaces.EntityCreationNotifier {
        private readonly wsNotificationsService: WsNotificationsService;

        constructor(wsNotificationsService: WsNotificationsService) {
            super();
            this.wsNotificationsService = wsNotificationsService;
        }

        async notifyCreated(entity: Appointment): Promise<boolean> {
            try {
                const user = await this.getAppointmentUser(entity);

                await this.sendEmailNotification(user, entity);
                await this.sendWebNotification(user, entity);
                await this.sendPushNotification(user, entity);

                const contact = await this.getAppointmentContact(entity);
                await this.sendContactEmailNotification(contact, entity);

                return true;
            } catch (error) {
                console.error('Error notifying about appointment creation:', error);
                return false;
            }
        }

        private async sendEmailNotification(user: User, appointment: Appointment) {
            if (this.checkIfNotificationEnabled(user, NotificationType.EMAIL, NotificationKey.APPOINTMENT_CREATED)) {
                const appointmentCreatedMail = new AppointmentCreatedUserEmail(user.email as string, appointment);
                await new EmailSender(appointmentCreatedMail).send();
            }
        }

        private async sendWebNotification(user: User, appointment: Appointment) {
            if (this.checkIfNotificationEnabled(user, NotificationType.WEB, NotificationKey.APPOINTMENT_CREATED)) {
                this.wsNotificationsService.sendNotification(user.id, WebNotificationTypes.NOTICE, 'New appointment created');
            }
        }

        private async sendPushNotification(user: User, appointment: Appointment) {
            if (this.checkIfNotificationEnabled(user, NotificationType.PUSH, NotificationKey.APPOINTMENT_CREATED)) {
                // Implement push notification logic here
            }
        }

        private async sendContactEmailNotification(contact: User, appointment: Appointment) {
            const appointmentCreatedContactMail = new AppointmentCreatedContactEmail(contact.email as string, appointment);
            await new EmailSender(appointmentCreatedContactMail).send();
        }

        private async getAppointmentUser(appointment: Appointment): Promise<User> {
            return this.getUser(appointment.assigned_toId as string);
        }

        private async getAppointmentContact(appointment: Appointment): Promise<Contact> {
            return this.getContact(appointment.related_contactId as string);
        }
    }
}
