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

        date: data.date || null,
        scheduled: data.scheduled || false,

        name: data.name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await appointments.setContact(data.contact || [], {
      transaction,
    });

    await appointments.setJob(data.job || [], {
      transaction,
    });

    await appointments.setEstimate(data.estimate || [], {
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

      date: item.date || null,
      scheduled: item.scheduled || false,

      name: item.name || null,
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
        date: data.date || null,
        scheduled: data.scheduled || false,

        name: data.name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await appointments.setContact(data.contact || [], {
      transaction,
    });

    await appointments.setJob(data.job || [], {
      transaction,
    });

    await appointments.setEstimate(data.estimate || [], {
      transaction,
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

    output.contact = await appointments.getContact({
      transaction,
    });

    output.job = await appointments.getJob({
      transaction,
    });

    output.estimate = await appointments.getEstimate({
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
        model: db.contacts,
        as: 'contact',
        through: filter.contact
          ? {
              where: {
                [Op.or]: filter.contact.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.contact ? true : null,
      },

      {
        model: db.jobs,
        as: 'job',
        through: filter.job
          ? {
              where: {
                [Op.or]: filter.job.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.job ? true : null,
      },

      {
        model: db.estimates,
        as: 'estimate',
        through: filter.estimate
          ? {
              where: {
                [Op.or]: filter.estimate.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.estimate ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('appointments', 'name', filter.name),
        };
      }

      if (filter.dateRange) {
        const [start, end] = filter.dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
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

      if (filter.scheduled) {
        where = {
          ...where,
          scheduled: filter.scheduled,
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
          Utils.ilike('appointments', 'name', query),
        ],
      };
    }

    const records = await db.appointments.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
