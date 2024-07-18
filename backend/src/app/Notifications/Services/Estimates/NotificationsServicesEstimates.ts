import { Service, Token } from 'typedi';
import { NotificationsServicesInterfaces } from '../Interfaces';
import { NotificationsServices } from '../Service';
import EmailSender from '../../../../services/email/EmailSender';
import EstimateCreatedContactEmail from '../../../../services/email/list/estimates/EstimateCreatedContactEmail';
import type Estimate from '~/@types/Estimate/Estimate';
import type Contact from '~/@types/Contact/Contact';

export const NotificationServiceToken = new Token<NotificationsServicesAppointments.NotificationService>();

export namespace NotificationsServicesAppointments {
    @Service({ id: NotificationServiceToken })
    export class NotificationService extends NotificationsServices.Service implements NotificationsServicesInterfaces.EntityCreationNotifier {

        constructor() {
            super();
        }

        async notifyCreated(entity: Estimate & Partial<{ notifyContact: boolean }>): Promise<boolean> {
            try {
                if (entity.notifyContact !== false) {
                    const contact = await this.getEstimateContact(entity);
                    await this.sendContactEmailNotification(contact, entity);
                }

                return true;
            } catch (error) {
                console.error('Error notifying about estimate creation:', error);
                return false;
            }
        }

        private async sendContactEmailNotification(contact: Contact, estimate: Estimate & { attachments?: string[] }) {
            const _estimate: Estimate = {
                ...estimate,
                related_contact: contact,
            }

            const estimateCreatedContactMail = new EstimateCreatedContactEmail(contact.email as string, _estimate);

            const emailSender = new EmailSender(estimateCreatedContactMail);

            estimate.attachments?.forEach(item => {
                emailSender.addAttachment({
                    filename: 'Estimate',
                    contentType: 'application/pdf',
                    content: Buffer.from(item)
                })
            })

            await emailSender.send();
        }

        private async getEstimateContact(estimate: Estimate): Promise<Contact> {
            return this.getContact(estimate.related_contactId as string);
        }
    }
}
