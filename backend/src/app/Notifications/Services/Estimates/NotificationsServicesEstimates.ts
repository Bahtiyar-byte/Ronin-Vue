import { Service, Token } from 'typedi';
import type Contact from '~/@types/Contact/Contact';
import type Estimate from '~/@types/Estimate/Estimate';
import type SendNotificationAdditionalData from '~/@types/helpers/SendNotificationAdditionalData';
import EmailSender from '../../../../services/email/EmailSender';
import EstimateCreatedContactEmail from '../../../../services/email/list/estimates/EstimateCreatedContactEmail';
import { NotificationsServicesInterfaces } from '../Interfaces';
import { NotificationsServices } from '../Service';

export const NotificationServiceToken =
  new Token<NotificationsServicesAppointments.NotificationService>();

export namespace NotificationsServicesAppointments {
  @Service({ id: NotificationServiceToken })
  export class NotificationService
    extends NotificationsServices.Service
    implements NotificationsServicesInterfaces.EntityCreationNotifier
  {
    constructor() {
      super();
    }

    public async sendToCustomer(
      estimate: Estimate,
      additionalData: SendNotificationAdditionalData,
    ): Promise<boolean> {
      await this.notifyCreated(estimate, additionalData);

      return true;
    }

    async notifyCreated(
      entity: Estimate & Partial<{ notifyContact: boolean }>,
      additionalData?: SendNotificationAdditionalData,
    ): Promise<boolean> {
      try {
        if (entity.notifyContact !== false) {
          const contact = await this.getEstimateContact(entity);
          await this.sendContactEmailNotification(
            contact,
            entity,
            additionalData,
          );
        }

        return true;
      } catch (error) {
        console.error('Error notifying about estimate creation:', error);
        return false;
      }
    }

    private async sendContactEmailNotification(
      contact: Contact,
      estimate: Estimate,
      additionalData?: SendNotificationAdditionalData,
    ) {
      const _estimate: Estimate = {
        ...estimate,
        related_contact: contact,
      };

      const estimateCreatedContactMail = new EstimateCreatedContactEmail(
        additionalData?.emailTo.length
          ? additionalData?.emailTo
          : (contact.email as string),
        _estimate,
      );

      if (additionalData?.subject.length) {
        estimateCreatedContactMail.subject = additionalData.subject;
      }

      const emailSender = new EmailSender(estimateCreatedContactMail);

      additionalData?.attachments?.forEach((item) => {
        emailSender.addAttachment({
          filename: 'Estimate',
          contentType: item.mimetype,
          path: item.path,
        });
      });

      await emailSender.send();
    }

    private async getEstimateContact(estimate: Estimate): Promise<Contact> {
      return this.getContact(estimate.related_contact as string);
    }
  }
}
