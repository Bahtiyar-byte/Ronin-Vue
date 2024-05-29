const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AddressesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const addresses = await db.addresses.create(
      {
        id: data.id || undefined,

        street: data.street || null,
        suite_apt_unit: data.suite_apt_unit || null,
        city: data.city || null,
        state: data.state || null,
        zip: data.zip || null,
        country: data.country || null,
        type: data.type || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await addresses.setContactId(data.contactId || null, {
      transaction,
    });

    await addresses.setJobId(data.jobId || null, {
      transaction,
    });

    await addresses.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    return addresses;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const addressesData = data.map((item, index) => ({
      id: item.id || undefined,

      street: item.street || null,
      suite_apt_unit: item.suite_apt_unit || null,
      city: item.city || null,
      state: item.state || null,
      zip: item.zip || null,
      country: item.country || null,
      type: item.type || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const addresses = await db.addresses.bulkCreate(addressesData, {
      transaction,
    });

    // For each item created, replace relation files

    return addresses;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const addresses = await db.addresses.findByPk(id, {}, { transaction });

    await addresses.update(
      {
        street: data.street || null,
        suite_apt_unit: data.suite_apt_unit || null,
        city: data.city || null,
        state: data.state || null,
        zip: data.zip || null,
        country: data.country || null,
        type: data.type || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await addresses.setContactId(data.contactId || null, {
      transaction,
    });

    await addresses.setJobId(data.jobId || null, {
      transaction,
    });

    await addresses.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    return addresses;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const addresses = await db.addresses.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of addresses) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of addresses) {
        await record.destroy({ transaction });
      }
    });

    return addresses;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const addresses = await db.addresses.findByPk(id, options);

    await addresses.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await addresses.destroy({
      transaction,
    });

    return addresses;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const addresses = await db.addresses.findOne({ where }, { transaction });

    if (!addresses) {
      return addresses;
    }

    const output = addresses.get({ plain: true });

    output.contactId = await addresses.getContactId({
      transaction,
    });

    output.jobId = await addresses.getJobId({
      transaction,
    });

    output.createdBy = await addresses.getCreatedBy({
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
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.street) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('addresses', 'street', filter.street),
        };
      }

      if (filter.suite_apt_unit) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'addresses',
            'suite_apt_unit',
            filter.suite_apt_unit,
          ),
        };
      }

      if (filter.city) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('addresses', 'city', filter.city),
        };
      }

      if (filter.zip) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('addresses', 'zip', filter.zip),
        };
      }

      if (filter.country) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('addresses', 'country', filter.country),
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

      if (filter.state) {
        where = {
          ...where,
          state: filter.state,
        };
      }

      if (filter.type) {
        where = {
          ...where,
          type: filter.type,
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
          count: await db.addresses.count({
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
      : await db.addresses.findAndCountAll({
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
          Utils.ilike('addresses', 'id', query),
        ],
      };
    }

    const records = await db.addresses.findAll({
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
