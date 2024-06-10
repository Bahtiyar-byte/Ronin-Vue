
const EstimatesDBApi = require('../db/api/estimates');
const EstimatesService = require('../services/estimates');
const db = require("../db/models");

const eventEmitter = require('../utils/eventEmitter')

module.exports = class RoninEstimatesService extends EstimatesService {

    static async create(data, currentUser) {
        const transaction = await db.sequelize.transaction();
        try {
            let estimates = await EstimatesDBApi.create(data, {
                currentUser,
                transaction,
            });

            await transaction.commit();

            estimates = await EstimatesDBApi.findBy({ id: estimates.id });
            eventEmitter.emit('estimateCreated', estimates);

            return estimates;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async update(data, id, currentUser) {
        const oldEstimate = await super.update(data, id, currentUser);

        const estimates = await EstimatesDBApi.findBy({ id: id });

        eventEmitter.emit('estimateUpdated', estimates, oldEstimate);

        return estimates;
    }
}
