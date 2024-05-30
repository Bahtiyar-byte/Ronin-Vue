const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class EstimatesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const estimates = await db.estimates.create(
      {
        id: data.id || undefined,

        description: data.description || null,
        additionalNotes: data.additionalNotes || null,
        price: data.price || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await estimates.setJobId(data.jobId || null, {
      transaction,
    });

    await estimates.setContactId(data.contactId || null, {
      transaction,
    });

    await estimates.setTemplateId(data.templateId || null, {
      transaction,
    });

    return estimates;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const estimatesData = data.map((item, index) => ({
      id: item.id || undefined,

      description: item.description || null,
      additionalNotes: item.additionalNotes || null,
      price: item.price || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const estimates = await db.estimates.bulkCreate(estimatesData, {
      transaction,
    });

    // For each item created, replace relation files

    return estimates;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const estimates = await db.estimates.findByPk(id, {}, { transaction });

    await estimates.update(
      {
        description: data.description || null,
        additionalNotes: data.additionalNotes || null,
        price: data.price || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await estimates.setJobId(data.jobId || null, {
      transaction,
    });

    await estimates.setContactId(data.contactId || null, {
      transaction,
    });

    await estimates.setTemplateId(data.templateId || null, {
      transaction,
    });

    return estimates;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const estimates = await db.estimates.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of estimates) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of estimates) {
        await record.destroy({ transaction });
      }
    });

    return estimates;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const estimates = await db.estimates.findByPk(id, options);

    await estimates.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await estimates.destroy({
      transaction,
    });

    return estimates;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const estimates = await db.estimates.findOne({ where }, { transaction });

    if (!estimates) {
      return estimates;
    }

    const output = estimates.get({ plain: true });

    output.orders_estimateId = await estimates.getOrders_estimateId({
      transaction,
    });

    output.jobId = await estimates.getJobId({
      transaction,
    });

    output.contactId = await estimates.getContactId({
      transaction,
    });

    output.templateId = await estimates.getTemplateId({
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
        model: db.jobs,
        as: 'jobId',
      },

      {
        model: db.contacts,
        as: 'contactId',
      },

      {
        model: db.templates,
        as: 'templateId',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('estimates', 'description', filter.description),
        };
      }

      if (filter.additionalNotes) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'estimates',
            'additionalNotes',
            filter.additionalNotes,
          ),
        };
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
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

      if (filter.jobId) {
        var listItems = filter.jobId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          jobIdId: { [Op.or]: listItems },
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

      if (filter.templateId) {
        var listItems = filter.templateId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          templateIdId: { [Op.or]: listItems },
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
          count: await db.estimates.count({
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
      : await db.estimates.findAndCountAll({
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
          Utils.ilike('estimates', 'id', query),
        ],
      };
    }

    const records = await db.estimates.findAll({
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
