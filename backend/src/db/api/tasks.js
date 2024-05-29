const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TasksDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tasks = await db.tasks.create(
      {
        id: data.id || undefined,

        subject: data.subject || null,
        dueDateAndTime: data.dueDateAndTime || null,
        description: data.description || null,
        priority: data.priority || null,
        completed: data.completed || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tasks.setAssignedToUserId(data.assignedToUserId || null, {
      transaction,
    });

    await tasks.setAppointmentId(data.appointmentId || null, {
      transaction,
    });

    await tasks.setJobId(data.jobId || null, {
      transaction,
    });

    await tasks.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    return tasks;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const tasksData = data.map((item, index) => ({
      id: item.id || undefined,

      subject: item.subject || null,
      dueDateAndTime: item.dueDateAndTime || null,
      description: item.description || null,
      priority: item.priority || null,
      completed: item.completed || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const tasks = await db.tasks.bulkCreate(tasksData, { transaction });

    // For each item created, replace relation files

    return tasks;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tasks = await db.tasks.findByPk(id, {}, { transaction });

    await tasks.update(
      {
        subject: data.subject || null,
        dueDateAndTime: data.dueDateAndTime || null,
        description: data.description || null,
        priority: data.priority || null,
        completed: data.completed || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tasks.setAssignedToUserId(data.assignedToUserId || null, {
      transaction,
    });

    await tasks.setAppointmentId(data.appointmentId || null, {
      transaction,
    });

    await tasks.setJobId(data.jobId || null, {
      transaction,
    });

    await tasks.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    return tasks;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tasks = await db.tasks.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of tasks) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of tasks) {
        await record.destroy({ transaction });
      }
    });

    return tasks;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tasks = await db.tasks.findByPk(id, options);

    await tasks.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await tasks.destroy({
      transaction,
    });

    return tasks;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const tasks = await db.tasks.findOne({ where }, { transaction });

    if (!tasks) {
      return tasks;
    }

    const output = tasks.get({ plain: true });

    output.assignedToUserId = await tasks.getAssignedToUserId({
      transaction,
    });

    output.appointmentId = await tasks.getAppointmentId({
      transaction,
    });

    output.jobId = await tasks.getJobId({
      transaction,
    });

    output.createdBy = await tasks.getCreatedBy({
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
        as: 'assignedToUserId',
      },

      {
        model: db.appointments,
        as: 'appointmentId',
      },

      {
        model: db.jobs,
        as: 'jobId',
      },

      {
        model: db.users,
        as: 'createdBy',
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
          [Op.and]: Utils.ilike('tasks', 'subject', filter.subject),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('tasks', 'description', filter.description),
        };
      }

      if (filter.dueDateAndTimeRange) {
        const [start, end] = filter.dueDateAndTimeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            dueDateAndTime: {
              ...where.dueDateAndTime,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            dueDateAndTime: {
              ...where.dueDateAndTime,
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

      if (filter.priority) {
        where = {
          ...where,
          priority: filter.priority,
        };
      }

      if (filter.completed) {
        where = {
          ...where,
          completed: filter.completed,
        };
      }

      if (filter.assignedToUserId) {
        var listItems = filter.assignedToUserId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          assignedToUserIdId: { [Op.or]: listItems },
        };
      }

      if (filter.appointmentId) {
        var listItems = filter.appointmentId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          appointmentIdId: { [Op.or]: listItems },
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
          count: await db.tasks.count({
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
      : await db.tasks.findAndCountAll({
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
          Utils.ilike('tasks', 'id', query),
        ],
      };
    }

    const records = await db.tasks.findAll({
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
