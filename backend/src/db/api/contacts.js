const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ContactsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        email: data.email || null,
        phone: data.phone || null,
        adress: data.adress || null,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        stage: data.stage || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await contacts.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    await contacts.setJobId(data.jobId || [], {
      transaction,
    });

    await contacts.setEstimateId(data.estimateId || [], {
      transaction,
    });

    await contacts.setAppointmentId(data.appointmentId || [], {
      transaction,
    });

    return contacts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const contactsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      email: item.email || null,
      phone: item.phone || null,
      adress: item.adress || null,
      firstName: item.firstName || null,
      lastName: item.lastName || null,
      stage: item.stage || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const contacts = await db.contacts.bulkCreate(contactsData, {
      transaction,
    });

    // For each item created, replace relation files

    return contacts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.findByPk(id, {}, { transaction });

    await contacts.update(
      {
        name: data.name || null,
        email: data.email || null,
        phone: data.phone || null,
        adress: data.adress || null,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        stage: data.stage || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await contacts.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    await contacts.setJobId(data.jobId || [], {
      transaction,
    });

    await contacts.setEstimateId(data.estimateId || [], {
      transaction,
    });

    await contacts.setAppointmentId(data.appointmentId || [], {
      transaction,
    });

    return contacts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.findByPk(id, options);

    await contacts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await contacts.destroy({
      transaction,
    });

    return contacts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.findOne({ where }, { transaction });

    if (!contacts) {
      return contacts;
    }

    const output = contacts.get({ plain: true });

    output.jobId = await contacts.getJobId({
      transaction,
    });

    output.estimateId = await contacts.getEstimateId({
      transaction,
    });

    output.createdBy = await contacts.getCreatedBy({
      transaction,
    });

    output.appointmentId = await contacts.getAppointmentId({
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
        as: 'createdBy',
      },

      {
        model: db.jobs,
        as: 'jobId',
        through: filter.jobId
          ? {
              where: {
                [Op.or]: filter.jobId.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.jobId ? true : null,
      },

      {
        model: db.estimates,
        as: 'estimateId',
        through: filter.estimateId
          ? {
              where: {
                [Op.or]: filter.estimateId.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.estimateId ? true : null,
      },

      {
        model: db.appointments,
        as: 'appointmentId',
        through: filter.appointmentId
          ? {
              where: {
                [Op.or]: filter.appointmentId.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.appointmentId ? true : null,
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
          [Op.and]: Utils.ilike('contacts', 'name', filter.name),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'email', filter.email),
        };
      }

      if (filter.phone) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'phone', filter.phone),
        };
      }

      if (filter.adress) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'adress', filter.adress),
        };
      }

      if (filter.firstName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'firstName', filter.firstName),
        };
      }

      if (filter.lastName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'lastName', filter.lastName),
        };
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

      if (filter.stage) {
        where = {
          ...where,
          stage: filter.stage,
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
          count: await db.contacts.count({
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
      : await db.contacts.findAndCountAll({
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
          Utils.ilike('contacts', 'name', query),
        ],
      };
    }

    const records = await db.contacts.findAll({
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
