const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AppointmentsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const appointments = await db.appointments.create(
      {
        id: data.id || undefined,

        subject: data.subject || null,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
        description: data.description || null,
        location: data.location || null,
        reminder: data.reminder || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await appointments.setAssignedUserId(data.assignedUserId || null, {
      transaction,
    });

    await appointments.setContactId(data.contactId || null, {
      transaction,
    });

    await appointments.setJobId(data.jobId || null, {
      transaction,
    });

    await appointments.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    await appointments.setUpdatedBy(data.updatedBy || null, {
      transaction,
    });

    return appointments;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const appointmentsData = data.map((item, index) => ({
      id: item.id || undefined,

      subject: item.subject || null,
      startTime: item.startTime || null,
      endTime: item.endTime || null,
      description: item.description || null,
      location: item.location || null,
      reminder: item.reminder || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const appointments = await db.appointments.bulkCreate(appointmentsData, {
      transaction,
    });

    // For each item created, replace relation files

    return appointments;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const appointments = await db.appointments.findByPk(
      id,
      {},
      { transaction },
    );

    await appointments.update(
      {
        subject: data.subject || null,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
        description: data.description || null,
        location: data.location || null,
        reminder: data.reminder || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await appointments.setAssignedUserId(data.assignedUserId || null, {
      transaction,
    });

    await appointments.setContactId(data.contactId || null, {
      transaction,
    });

    await appointments.setJobId(data.jobId || null, {
      transaction,
    });

    await appointments.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    await appointments.setUpdatedBy(data.updatedBy || null, {
      transaction,
    });

    return appointments;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const appointments = await db.appointments.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of appointments) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of appointments) {
        await record.destroy({ transaction });
      }
    });

    return appointments;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const appointments = await db.appointments.findByPk(id, options);

    await appointments.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await appointments.destroy({
      transaction,
    });

    return appointments;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const appointments = await db.appointments.findOne(
      { where },
      { transaction },
    );

    if (!appointments) {
      return appointments;
    }

    const output = appointments.get({ plain: true });

    output.tasks_appointmentId = await appointments.getTasks_appointmentId({
      transaction,
    });

    output.assignedUserId = await appointments.getAssignedUserId({
      transaction,
    });

    output.contactId = await appointments.getContactId({
      transaction,
    });

    output.jobId = await appointments.getJobId({
      transaction,
    });

    output.createdBy = await appointments.getCreatedBy({
      transaction,
    });

    output.updatedBy = await appointments.getUpdatedBy({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'assignedUserId',
      },

      {
        model: db.contacts,
        as: 'contactId',
      },

      {
        model: db.jobs,
        as: 'jobId',
      },

      {
        model: db.users,
        as: 'createdBy',
      },

      {
        model: db.users,
        as: 'updatedBy',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.subject) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('appointments', 'subject', filter.subject),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'appointments',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.location) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('appointments', 'location', filter.location),
        };
      }

      if (filter.startTimeRange) {
        const [start, end] = filter.startTimeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            startTime: {
              ...where.startTime,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            startTime: {
              ...where.startTime,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.endTimeRange) {
        const [start, end] = filter.endTimeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            endTime: {
              ...where.endTime,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            endTime: {
              ...where.endTime,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.reminderRange) {
        const [start, end] = filter.reminderRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            reminder: {
              ...where.reminder,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            reminder: {
              ...where.reminder,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.assignedUserId) {
        var listItems = filter.assignedUserId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          assignedUserIdId: { [Op.or]: listItems },
        };
      }

      if (filter.contactId) {
        var listItems = filter.contactId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          contactIdId: { [Op.or]: listItems },
        };
      }

      if (filter.jobId) {
        var listItems = filter.jobId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          jobIdId: { [Op.or]: listItems },
        };
      }

      if (filter.createdBy) {
        var listItems = filter.createdBy.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          createdById: { [Op.or]: listItems },
        };
      }

      if (filter.updatedBy) {
        var listItems = filter.updatedBy.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          updatedById: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.appointments.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.appointments.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('appointments', 'id', query),
        ],
      };
    }

    const records = await db.appointments.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
