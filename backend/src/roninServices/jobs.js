
const JobsDBApi = require('../db/api/jobs');
const JobsService = require('../services/jobs');
const db = require("../db/models");

module.exports = class RoninJobsService extends JobsService {

    static async create(data, currentUser) {
        const transaction = await db.sequelize.transaction();
        try {
            const jobs = await JobsDBApi.create(data, {
                currentUser,
                transaction,
            });

            await transaction.commit();

            return jobs;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async update(data, id, currentUser) {
        await super.update(data, id, currentUser);

        return await JobsDBApi.findBy({ id: id });
    }
}
