
const JobsDBApi = require('../db/api/jobs');
const JobsService = require('../services/jobs');

module.exports = class RoninJobsService extends JobsService {
    static async update(data, id, currentUser) {
        await super.update(data, id, currentUser);

        return await JobsDBApi.findBy({ id: id });
    }
}
