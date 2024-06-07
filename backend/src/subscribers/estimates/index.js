const eventEmitter = require('../../utils/eventEmitter');

eventEmitter.on('estimateCreated', async (estimate) => {
    // Actions on estimate creation
});

eventEmitter.on('estimateUpdated', async (estimate, oldEstimate) => {
    console.log(123456, estimate, oldEstimate)
});
