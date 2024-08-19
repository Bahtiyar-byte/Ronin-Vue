import { Service, Token } from 'typedi';
import { NotificationsServicesInterfaces } from '../Interfaces';
import { NotificationsServices } from '../Service';
import EmailSender from '../../../../services/email/EmailSender';
import ContractCreatedContactEmail from '../../../../services/email/list/contracts/ContractCreatedContactEmail';
import type { ContractDTO } from '~/db/api/dtos/contract.dto.ts'
import type Contact from '~/@types/Contact/Contact';
import type SendNotificationAdditionalData from '~/@types/helpers/SendNotificationAdditionalData';

export const NotificationServiceToken = new Token<NotificationsServicesAppointments.NotificationService>();

export namespace NotificationsServicesAppointments {
    @Service({ id: NotificationServiceToken })
    export class NotificationService extends NotificationsServices.Service implements NotificationsServicesInterfaces.EntityCreationNotifier {

        constructor() {
            super();
        }

        public async sendToCustomer(contract: ContractDTO, additionalData: SendNotificationAdditionalData): Promise<boolean> {
            await this.notifyCreated(contract, additionalData);

            return true
        }

        async notifyCreated(entity: ContractDTO & Partial<{ notifyContact: boolean }>, additionalData?: SendNotificationAdditionalData): Promise<boolean> {
            try {
                if (entity.notifyContact !== false) {
                    const contact = await this.getContractContact(entity);
                    await this.sendContactEmailNotification(contact, entity, additionalData);
                }

                return true;
            } catch (error) {
                console.error('Error notifying about contract creation:', error);
                return false;
            }
        }

        private async sendContactEmailNotification(contact: Contact, contract: ContractDTO, additionalData?: SendNotificationAdditionalData) {
            const _contract: ContractDTO = {
                ...contract,
                related_contact: contact,
            }

            const contractCreatedContactMail = new ContractCreatedContactEmail(
                additionalData?.emailTo.length ? additionalData?.emailTo  : contact.email as string,
                _contract
            );

            if (additionalData?.subject.length) {
                contractCreatedContactMail.subject = additionalData.subject
            }

            const emailSender = new EmailSender(contractCreatedContactMail);

            additionalData?.attachments?.forEach(item => {
                emailSender.addAttachment({
                    filename: 'Contract',
                    contentType: item.mimetype,
                    path: item.path,
                })
            })

            await emailSender.send();
        }

        private async getContractContact(contract: ContractDTO): Promise<Contact> {
            return this.getContact(contract.related_contact as string);
        }
    }
}
