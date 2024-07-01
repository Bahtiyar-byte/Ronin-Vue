import type Appointment from '~/@types/Appointment/Appointment'
import type Email from '~/services/email/list/Email'

const { getNotification } = require('../../../notifications/helpers');
const EmailUtils = require('../../utils')

const config = require('../../../../config');

export default class AppointmentCreatedContactEmail implements Email {
    public to: string

    private appointment: Appointment

    constructor(to: string, appointment: Appointment) {
        this.to = to
        this.appointment = appointment
    }

    get subject() {
        return getNotification(
            'emails.appointments.created.contact.subject',
            getNotification('app.title'),
        );
    }

    async html() {
        try {
            return (new EmailUtils()).renderDefaultEmail(
                this.subject,
                getNotification('emails.appointments.created.contact.body')
            );
        } catch (error) {
            console.error('Error generating estimate creation email HTML:', error);
            throw error;
        }
    }
}
