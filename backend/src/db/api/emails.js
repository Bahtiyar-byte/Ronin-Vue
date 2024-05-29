const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class EmailsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const emails = await db.emails.create(
      {
        id: data.id || undefined,

        toAddress: data.toAddress || null,
        fromAddress: data.fromAddress || null,
        isInbound: data.isInbound || false,

        subject: data.subject || null,
        body: data.body || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await emails.setJobId(data.jobId || null, {
      transaction,
    });

    await emails.setUserId(data.userId || null, {
      transaction,
    });

    await emails.setContactId(data.contactId || null, {
      transaction,
    });

    await emails.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    return emails;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const emailsData = data.map((item, index) => ({
      id: item.id || undefined,

      toAddress: item.toAddress || null,
      fromAddress: item.fromAddress || null,
      isInbound: item.isInbound || false,

      subject: item.subject || null,
      body: item.body || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const emails = await db.emails.bulkCreate(emailsData, { transaction });

    // For each item created, replace relation files

    return emails;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const emails = await db.emails.findByPk(id, {}, { transaction });

    await emails.update(
      {
        toAddress: data.toAddress || null,
        fromAddress: data.fromAddress || null,
        isInbound: data.isInbound || false,

        subject: data.subject || null,
        body: data.body || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await emails.setJobId(data.jobId || null, {
      transaction,
    });

    await emails.setUserId(data.userId || null, {
      transaction,
    });

    await emails.setContactId(data.contactId || null, {
      transaction,
    });

    await emails.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    return emails;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const emails = await db.emails.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of emails) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of emails) {
        await record.destroy({ transaction });
      }
    });

    return emails;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const emails = await db.emails.findByPk(id, options);

    await emails.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await emails.destroy({
      transaction,
    });

    return emails;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const emails = await db.emails.findOne({ where }, { transaction });

    if (!emails) {
      return emails;
    }

    const output = emails.get({ plain: true });

    output.jobId = await emails.getJobId({
      transaction,
    });

    output.userId = await emails.getUserId({
      transaction,
    });

    output.contactId = await emails.getContactId({
      transaction,
    });

    output.createdBy = await emails.getCreatedBy({
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
        as: 'userId',
      },

      {
        model: db.contacts,
        as: 'contactId',
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

      if (filter.toAddress) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('emails', 'toAddress', filter.toAddress),
        };
      }

      if (filter.fromAddress) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('emails', 'fromAddress', filter.fromAddress),
        };
      }

      if (filter.subject) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('emails', 'subject', filter.subject),
        };
      }

      if (filter.body) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('emails', 'body', filter.body),
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

      if (filter.isInbound) {
        where = {
          ...where,
          isInbound: filter.isInbound,
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

      if (filter.userId) {
        var listItems = filter.userId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userIdId: { [Op.or]: listItems },
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
          count: await db.emails.count({
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
      : await db.emails.findAndCountAll({
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
          Utils.ilike('emails', 'id', query),
        ],
      };
    }

    const records = await db.emails.findAll({
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
