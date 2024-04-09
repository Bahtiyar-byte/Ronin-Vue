const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class InvoicesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const invoices = await db.invoices.create(
      {
        id: data.id || undefined,

        number: data.number || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await invoices.setDocument(data.document || null, {
      transaction,
    });

    await invoices.setJob(data.job || [], {
      transaction,
    });

    await invoices.setEstimate(data.estimate || [], {
      transaction,
    });

    return invoices;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const invoicesData = data.map((item, index) => ({
      id: item.id || undefined,

      number: item.number || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const invoices = await db.invoices.bulkCreate(invoicesData, {
      transaction,
    });

    // For each item created, replace relation files

    return invoices;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const invoices = await db.invoices.findByPk(id, {}, { transaction });

    await invoices.update(
      {
        number: data.number || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await invoices.setDocument(data.document || null, {
      transaction,
    });

    await invoices.setJob(data.job || [], {
      transaction,
    });

    await invoices.setEstimate(data.estimate || [], {
      transaction,
    });

    return invoices;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const invoices = await db.invoices.findByPk(id, options);

    await invoices.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await invoices.destroy({
      transaction,
    });

    return invoices;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const invoices = await db.invoices.findOne({ where }, { transaction });

    if (!invoices) {
      return invoices;
    }

    const output = invoices.get({ plain: true });

    output.job = await invoices.getJob({
      transaction,
    });

    output.estimate = await invoices.getEstimate({
      transaction,
    });

    output.document = await invoices.getDocument({
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
        model: db.documents,
        as: 'document',
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

      if (filter.numberRange) {
        const [start, end] = filter.numberRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            number: {
              ...where.number,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            number: {
              ...where.number,
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

      if (filter.document) {
        var listItems = filter.document.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          documentId: { [Op.or]: listItems },
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
          count: await db.invoices.count({
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
      : await db.invoices.findAndCountAll({
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
          Utils.ilike('invoices', 'id', query),
        ],
      };
    }

    const records = await db.invoices.findAll({
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
