const AppointmentsDBApi = require('../db/api/appointments');
const AppointmentsService = require('../services/appointments');
const db = require('../db/models');

const eventEmitter = require('../utils/eventEmitter');

module.exports = class RoninAppointmentsService extends AppointmentsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      const appointment = await AppointmentsDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();

      eventEmitter.emit('appointmentCreated', appointment);

      return appointment;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async update(data, id, currentUser) {
    await super.update(data, id, currentUser);

    return await AppointmentsDBApi.findBy({ id: id });
  }
};
