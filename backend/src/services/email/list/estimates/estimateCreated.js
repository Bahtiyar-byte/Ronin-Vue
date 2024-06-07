const { getNotification } = require('../../../notifications/helpers');
const EmailUtils = require('../../utils')

module.exports = class EstimateCreatedEmail {
    constructor(estimate) {
        // this.to = estimate.related_contact.contact.email;
        this.estimate = estimate;

        // ToDo: remove this shit
        this.to = 'mkuchirov@gmail.com';
    }

    get subject() {
        return getNotification(
            'emails.estimate.created.subject',
            getNotification('app.title'),
        );
    }

    async html() {
        try {
            return (new EmailUtils()).renderDefaultEmail(
                this.subject,
                getNotification('emails.estimate.created.body',
                    this.estimate.related_contact.name,
                    this.estimate.name,
                    this.estimate.description,
                    this.estimate.trade,
                    this.estimate.material_cost,
                    this.estimate.labor_cost,
                    this.estimate.total_price,

                    // ToDo: generate correct link with token
                    'https://example.com/accept-estimate'
                )
            );
        } catch (error) {
            console.error('Error generating estimate creation email HTML:', error);
            throw error;
        }
    }
};
