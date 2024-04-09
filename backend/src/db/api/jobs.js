const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class JobsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const jobs = await db.jobs.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        category: data.category || null,
        type: data.type || null,
        status: data.status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await jobs.setContact(data.contact || [], {
      transaction,
    });

    await jobs.setAssignedUser(data.assignedUser || [], {
      transaction,
    });

    await jobs.setAssignedTeam(data.assignedTeam || [], {
      transaction,
    });

    await jobs.setEstimate(data.estimate || [], {
      transaction,
    });

    await jobs.setAppointment(data.appointment || [], {
      transaction,
    });

    await jobs.setImage(data.image || [], {
      transaction,
    });

    await jobs.setDocument(data.document || [], {
      transaction,
    });

    await jobs.setInvoice(data.invoice || [], {
      transaction,
    });

    return jobs;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const jobsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      category: item.category || null,
      type: item.type || null,
      status: item.status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const jobs = await db.jobs.bulkCreate(jobsData, { transaction });

    // For each item created, replace relation files

    return jobs;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const jobs = await db.jobs.findByPk(id, {}, { transaction });

    await jobs.update(
      {
        name: data.name || null,
        category: data.category || null,
        type: data.type || null,
        status: data.status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await jobs.setContact(data.contact || [], {
      transaction,
    });

    await jobs.setAssignedUser(data.assignedUser || [], {
      transaction,
    });

    await jobs.setAssignedTeam(data.assignedTeam || [], {
      transaction,
    });

    await jobs.setEstimate(data.estimate || [], {
      transaction,
    });

    await jobs.setAppointment(data.appointment || [], {
      transaction,
    });

    await jobs.setImage(data.image || [], {
      transaction,
    });

    await jobs.setDocument(data.document || [], {
      transaction,
    });

    await jobs.setInvoice(data.invoice || [], {
      transaction,
    });

    return jobs;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const jobs = await db.jobs.findByPk(id, options);

    await jobs.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await jobs.destroy({
      transaction,
    });

    return jobs;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const jobs = await db.jobs.findOne({ where }, { transaction });

    if (!jobs) {
      return jobs;
    }

    const output = jobs.get({ plain: true });

    output.estimates_job = await jobs.getEstimates_job({
      transaction,
    });

    output.contact = await jobs.getContact({
      transaction,
    });

    output.assignedUser = await jobs.getAssignedUser({
      transaction,
    });

    output.assignedTeam = await jobs.getAssignedTeam({
      transaction,
    });

    output.estimate = await jobs.getEstimate({
      transaction,
    });

    output.appointment = await jobs.getAppointment({
      transaction,
    });

    output.image = await jobs.getImage({
      transaction,
    });

    output.document = await jobs.getDocument({
      transaction,
    });

    output.invoice = await jobs.getInvoice({
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
        model: db.users,
        as: 'assignedUser',
        through: filter.assignedUser
          ? {
              where: {
                [Op.or]: filter.assignedUser.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.assignedUser ? true : null,
      },

      {
        model: db.teams,
        as: 'assignedTeam',
        through: filter.assignedTeam
          ? {
              where: {
                [Op.or]: filter.assignedTeam.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.assignedTeam ? true : null,
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

      {
        model: db.appointments,
        as: 'appointment',
        through: filter.appointment
          ? {
              where: {
                [Op.or]: filter.appointment.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.appointment ? true : null,
      },

      {
        model: db.images,
        as: 'image',
        through: filter.image
          ? {
              where: {
                [Op.or]: filter.image.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.image ? true : null,
      },

      {
        model: db.documents,
        as: 'document',
        through: filter.document
          ? {
              where: {
                [Op.or]: filter.document.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.document ? true : null,
      },

      {
        model: db.invoices,
        as: 'invoice',
        through: filter.invoice
          ? {
              where: {
                [Op.or]: filter.invoice.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.invoice ? true : null,
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
          [Op.and]: Utils.ilike('jobs', 'name', filter.name),
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

      if (filter.category) {
        where = {
          ...where,
          category: filter.category,
        };
      }

      if (filter.type) {
        where = {
          ...where,
          type: filter.type,
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
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
          count: await db.jobs.count({
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
      : await db.jobs.findAndCountAll({
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
          Utils.ilike('jobs', 'name', query),
        ],
      };
    }

    const records = await db.jobs.findAll({
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
