import type Email from '~/services/email/list/Email'
import type { ContractDTO } from '~/db/api/dtos/contract.dto.ts'
import type Contact from '~/@types/Contact/Contact'

const { getNotification } = require('../../../notifications/helpers');
const EmailUtils = require('../../utils')

const config = require('../../../../config');

export default class AppointmentCreatedContactEmail implements Email {
    public to: string

    private _subject?: string

    private contract: ContractDTO

    constructor(to: string, contract: ContractDTO) {
        this.to = to
        this.contract = contract
    }

    get subject() {
        return this._subject ?? getNotification(
            'emails.contract.created.subject',
            getNotification('app.title'),
        );
    }

    set subject(subj: string) {
        this._subject = subj
    }

    async html() {
        try {
            return (new EmailUtils()).renderDefaultEmail(
                this.subject,
                getNotification('emails.contract.created.body',
                    (this.contract.related_contact as Contact).name,
                    // ToDo: generate correct link with token
                    (new URL(`${config.frontendUrl}/contracts/client-acceptance/${this.contract.id}`))
                )
            );
        } catch (error) {
            console.error('Error generating contract creation email HTML:', error);
            throw error;
        }
    }
}
