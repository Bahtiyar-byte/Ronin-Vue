const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TemplatesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const templates = await db.templates.create(
      {
        id: data.id || undefined,

        materialCost: data.materialCost || null,
        laborCost: data.laborCost || null,
        markup: data.markup || null,
        profitMargin: data.profitMargin || null,
        name: data.name || null,
        totalPrice: data.totalPrice || null,
        unitOfMeasurement: data.unitOfMeasurement || null,
        description: data.description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await templates.setTradeId(data.tradeId || [], {
      transaction,
    });

    return templates;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const templatesData = data.map((item, index) => ({
      id: item.id || undefined,

      materialCost: item.materialCost || null,
      laborCost: item.laborCost || null,
      markup: item.markup || null,
      profitMargin: item.profitMargin || null,
      name: item.name || null,
      totalPrice: item.totalPrice || null,
      unitOfMeasurement: item.unitOfMeasurement || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const templates = await db.templates.bulkCreate(templatesData, {
      transaction,
    });

    // For each item created, replace relation files

    return templates;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const templates = await db.templates.findByPk(id, {}, { transaction });

    await templates.update(
      {
        materialCost: data.materialCost || null,
        laborCost: data.laborCost || null,
        markup: data.markup || null,
        profitMargin: data.profitMargin || null,
        name: data.name || null,
        totalPrice: data.totalPrice || null,
        unitOfMeasurement: data.unitOfMeasurement || null,
        description: data.description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await templates.setTradeId(data.tradeId || [], {
      transaction,
    });

    return templates;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const templates = await db.templates.findByPk(id, options);

    await templates.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await templates.destroy({
      transaction,
    });

    return templates;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const templates = await db.templates.findOne({ where }, { transaction });

    if (!templates) {
      return templates;
    }

    const output = templates.get({ plain: true });

    output.tradeId = await templates.getTradeId({
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
        model: db.trades,
        as: 'tradeId',
        through: filter.tradeId
          ? {
              where: {
                [Op.or]: filter.tradeId.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.tradeId ? true : null,
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
          [Op.and]: Utils.ilike('templates', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('templates', 'description', filter.description),
        };
      }

      if (filter.materialCostRange) {
        const [start, end] = filter.materialCostRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            materialCost: {
              ...where.materialCost,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            materialCost: {
              ...where.materialCost,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.laborCostRange) {
        const [start, end] = filter.laborCostRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            laborCost: {
              ...where.laborCost,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            laborCost: {
              ...where.laborCost,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.markupRange) {
        const [start, end] = filter.markupRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            markup: {
              ...where.markup,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            markup: {
              ...where.markup,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.profitMarginRange) {
        const [start, end] = filter.profitMarginRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            profitMargin: {
              ...where.profitMargin,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            profitMargin: {
              ...where.profitMargin,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.totalPriceRange) {
        const [start, end] = filter.totalPriceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            totalPrice: {
              ...where.totalPrice,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            totalPrice: {
              ...where.totalPrice,
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

      if (filter.unitOfMeasurement) {
        where = {
          ...where,
          unitOfMeasurement: filter.unitOfMeasurement,
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
          count: await db.templates.count({
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
      : await db.templates.findAndCountAll({
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
          Utils.ilike('templates', 'name', query),
        ],
      };
    }

    const records = await db.templates.findAll({
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
