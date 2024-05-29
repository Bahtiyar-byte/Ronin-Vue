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

        invoiceNumber: data.invoiceNumber || null,
        invoiceDate: data.invoiceDate || null,
        terms: data.terms || null,
        approvedJobValue: data.approvedJobValue || null,
        invoicedAmount: data.invoicedAmount || null,
        balanceAmount: data.balanceAmount || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await invoices.setJobId(data.jobId || null, {
      transaction,
    });

    await invoices.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    await invoices.setUpdatedBy(data.updatedBy || null, {
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

      invoiceNumber: item.invoiceNumber || null,
      invoiceDate: item.invoiceDate || null,
      terms: item.terms || null,
      approvedJobValue: item.approvedJobValue || null,
      invoicedAmount: item.invoicedAmount || null,
      balanceAmount: item.balanceAmount || null,
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
        invoiceNumber: data.invoiceNumber || null,
        invoiceDate: data.invoiceDate || null,
        terms: data.terms || null,
        approvedJobValue: data.approvedJobValue || null,
        invoicedAmount: data.invoicedAmount || null,
        balanceAmount: data.balanceAmount || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await invoices.setJobId(data.jobId || null, {
      transaction,
    });

    await invoices.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    await invoices.setUpdatedBy(data.updatedBy || null, {
      transaction,
    });

    return invoices;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const invoices = await db.invoices.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of invoices) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of invoices) {
        await record.destroy({ transaction });
      }
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

    output.jobId = await invoices.getJobId({
      transaction,
    });

    output.createdBy = await invoices.getCreatedBy({
      transaction,
    });

    output.updatedBy = await invoices.getUpdatedBy({
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

      if (filter.invoiceNumber) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'invoices',
            'invoiceNumber',
            filter.invoiceNumber,
          ),
        };
      }

      if (filter.invoiceDateRange) {
        const [start, end] = filter.invoiceDateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            invoiceDate: {
              ...where.invoiceDate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            invoiceDate: {
              ...where.invoiceDate,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.approvedJobValueRange) {
        const [start, end] = filter.approvedJobValueRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            approvedJobValue: {
              ...where.approvedJobValue,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            approvedJobValue: {
              ...where.approvedJobValue,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.invoicedAmountRange) {
        const [start, end] = filter.invoicedAmountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            invoicedAmount: {
              ...where.invoicedAmount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            invoicedAmount: {
              ...where.invoicedAmount,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.balanceAmountRange) {
        const [start, end] = filter.balanceAmountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            balanceAmount: {
              ...where.balanceAmount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            balanceAmount: {
              ...where.balanceAmount,
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

      if (filter.terms) {
        where = {
          ...where,
          terms: filter.terms,
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
