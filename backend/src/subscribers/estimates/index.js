const eventEmitter = require('../../utils/eventEmitter');
const EstimateCreatedEmail = require('../../services/email/list/estimates/estimateCreated');
const EmailSender = require('../../services/email');

eventEmitter.on('estimateCreated', async (estimate) => {
    if (estimate.related_contact) {
        const estimateCreatedEmail = new EstimateCreatedEmail(estimate);
        await new EmailSender(estimateCreatedEmail).send();
    }
});

eventEmitter.on('estimateUpdated', async (estimate, oldEstimate) => {
    if (estimate.related_contact) {
        const estimateCreatedEmail = new EstimateCreatedEmail(estimate);
        await new EmailSender(estimateCreatedEmail).send();
    }
});
