import type Email from '~/services/email/list/Email'
import type Estimate from '~/@types/Estimate/Estimate';
import type Contact from '~/@types/Contact/Contact';

const { getNotification } = require('../../../notifications/helpers');
const EmailUtils = require('../../utils')

const config = require('../../../../config');

export default class AppointmentCreatedContactEmail implements Email {
    public to: string

    private _subject?: string

    private estimate: Estimate

    constructor(to: string, estimate: Estimate) {
        this.to = to
        this.estimate = estimate
    }

    get subject() {
        return this._subject ?? getNotification(
            'emails.estimate.created.subject',
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
                getNotification('emails.estimate.created.body',
                    (this.estimate.related_contact as Contact).name,
                    // ToDo: generate correct link with token
                    (new URL(`${config.frontendUrl}/estimates/client-acceptance/${this.estimate.id}`))
                )
            );
        } catch (error) {
            console.error('Error generating estimate creation email HTML:', error);
            throw error;
        }
    }
}
