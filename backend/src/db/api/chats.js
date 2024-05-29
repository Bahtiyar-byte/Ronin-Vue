const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ChatsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const chats = await db.chats.create(
      {
        id: data.id || undefined,

        message: data.message || null,
        sentTime: data.sentTime || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await chats.setJobId(data.jobId || null, {
      transaction,
    });

    await chats.setSenderId(data.senderId || null, {
      transaction,
    });

    await chats.setReceiverId(data.receiverId || null, {
      transaction,
    });

    return chats;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const chatsData = data.map((item, index) => ({
      id: item.id || undefined,

      message: item.message || null,
      sentTime: item.sentTime || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const chats = await db.chats.bulkCreate(chatsData, { transaction });

    // For each item created, replace relation files

    return chats;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const chats = await db.chats.findByPk(id, {}, { transaction });

    await chats.update(
      {
        message: data.message || null,
        sentTime: data.sentTime || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await chats.setJobId(data.jobId || null, {
      transaction,
    });

    await chats.setSenderId(data.senderId || null, {
      transaction,
    });

    await chats.setReceiverId(data.receiverId || null, {
      transaction,
    });

    return chats;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const chats = await db.chats.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of chats) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of chats) {
        await record.destroy({ transaction });
      }
    });

    return chats;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const chats = await db.chats.findByPk(id, options);

    await chats.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await chats.destroy({
      transaction,
    });

    return chats;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const chats = await db.chats.findOne({ where }, { transaction });

    if (!chats) {
      return chats;
    }

    const output = chats.get({ plain: true });

    output.jobId = await chats.getJobId({
      transaction,
    });

    output.senderId = await chats.getSenderId({
      transaction,
    });

    output.receiverId = await chats.getReceiverId({
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
        as: 'senderId',
      },

      {
        model: db.users,
        as: 'receiverId',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.message) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('chats', 'message', filter.message),
        };
      }

      if (filter.sentTimeRange) {
        const [start, end] = filter.sentTimeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            sentTime: {
              ...where.sentTime,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            sentTime: {
              ...where.sentTime,
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

      if (filter.senderId) {
        var listItems = filter.senderId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          senderIdId: { [Op.or]: listItems },
        };
      }

      if (filter.receiverId) {
        var listItems = filter.receiverId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          receiverIdId: { [Op.or]: listItems },
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
          count: await db.chats.count({
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
      : await db.chats.findAndCountAll({
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
          Utils.ilike('chats', 'id', query),
        ],
      };
    }

    const records = await db.chats.findAll({
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
