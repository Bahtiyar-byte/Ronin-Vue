
const AppointmentsDBApi = require('../db/api/Appointments');
const AppointmentsService = require('../services/Appointments');
const db = require("../db/models");

module.exports = class RoninAppointmentsService extends AppointmentsService {
    static async create(data, currentUser) {
        const transaction = await db.sequelize.transaction();
        try {
            const Appointments = await AppointmentsDBApi.create(data, {
                currentUser,
                transaction,
            });

            await transaction.commit();

            return Appointments;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async update(data, id, currentUser) {
        await super.update(data, id, currentUser);

        return await AppointmentsDBApi.findBy({ id: id });
    }
}
