const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ImagesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const images = await db.images.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        url: data.url || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await images.setJob(data.job || [], {
      transaction,
    });

    return images;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const imagesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      url: item.url || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const images = await db.images.bulkCreate(imagesData, { transaction });

    // For each item created, replace relation files

    return images;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const images = await db.images.findByPk(id, {}, { transaction });

    await images.update(
      {
        name: data.name || null,
        url: data.url || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await images.setJob(data.job || [], {
      transaction,
    });

    return images;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const images = await db.images.findByPk(id, options);

    await images.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await images.destroy({
      transaction,
    });

    return images;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const images = await db.images.findOne({ where }, { transaction });

    if (!images) {
      return images;
    }

    const output = images.get({ plain: true });

    output.job = await images.getJob({
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
          [Op.and]: Utils.ilike('images', 'name', filter.name),
        };
      }

      if (filter.url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('images', 'url', filter.url),
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
          count: await db.images.count({
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
      : await db.images.findAndCountAll({
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
          Utils.ilike('images', 'url', query),
        ],
      };
    }

    const records = await db.images.findAll({
      attributes: ['id', 'url'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['url', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.url,
    }));
  }
};
