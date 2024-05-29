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

        Name: data.Name || null,
        type: data.type || null,
        category: data.category || null,
        status: data.status || null,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        description: data.description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await jobs.setContactId(data.contactId || null, {
      transaction,
    });

    await jobs.setOrderId(data.orderId || null, {
      transaction,
    });

    await jobs.setAssignedUserId(data.assignedUserId || null, {
      transaction,
    });

    await jobs.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    await jobs.setUpdatedBy(data.updatedBy || null, {
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

      Name: item.Name || null,
      type: item.type || null,
      category: item.category || null,
      status: item.status || null,
      startDate: item.startDate || null,
      endDate: item.endDate || null,
      description: item.description || null,
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
        Name: data.Name || null,
        type: data.type || null,
        category: data.category || null,
        status: data.status || null,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        description: data.description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await jobs.setContactId(data.contactId || null, {
      transaction,
    });

    await jobs.setOrderId(data.orderId || null, {
      transaction,
    });

    await jobs.setAssignedUserId(data.assignedUserId || null, {
      transaction,
    });

    await jobs.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    await jobs.setUpdatedBy(data.updatedBy || null, {
      transaction,
    });

    return jobs;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const jobs = await db.jobs.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of jobs) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of jobs) {
        await record.destroy({ transaction });
      }
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

    output.addresses_jobId = await jobs.getAddresses_jobId({
      transaction,
    });

    output.estimates_jobId = await jobs.getEstimates_jobId({
      transaction,
    });

    output.invoices_jobId = await jobs.getInvoices_jobId({
      transaction,
    });

    output.orders_jobId = await jobs.getOrders_jobId({
      transaction,
    });

    output.images_jobId = await jobs.getImages_jobId({
      transaction,
    });

    output.documents_jobId = await jobs.getDocuments_jobId({
      transaction,
    });

    output.emails_jobId = await jobs.getEmails_jobId({
      transaction,
    });

    output.chats_jobId = await jobs.getChats_jobId({
      transaction,
    });

    output.appointments_jobId = await jobs.getAppointments_jobId({
      transaction,
    });

    output.tasks_jobId = await jobs.getTasks_jobId({
      transaction,
    });

    output.contracts_jobId = await jobs.getContracts_jobId({
      transaction,
    });

    output.amendments_jobId = await jobs.getAmendments_jobId({
      transaction,
    });

    output.contactId = await jobs.getContactId({
      transaction,
    });

    output.orderId = await jobs.getOrderId({
      transaction,
    });

    output.assignedUserId = await jobs.getAssignedUserId({
      transaction,
    });

    output.createdBy = await jobs.getCreatedBy({
      transaction,
    });

    output.updatedBy = await jobs.getUpdatedBy({
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
        model: db.orders,
        as: 'orderId',
      },

      {
        model: db.users,
        as: 'assignedUserId',
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

      if (filter.Name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('jobs', 'Name', filter.Name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('jobs', 'description', filter.description),
        };
      }

      if (filter.startDateRange) {
        const [start, end] = filter.startDateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            startDate: {
              ...where.startDate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            startDate: {
              ...where.startDate,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.endDateRange) {
        const [start, end] = filter.endDateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            endDate: {
              ...where.endDate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            endDate: {
              ...where.endDate,
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

      if (filter.type) {
        where = {
          ...where,
          type: filter.type,
        };
      }

      if (filter.category) {
        where = {
          ...where,
          category: filter.category,
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
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

      if (filter.orderId) {
        var listItems = filter.orderId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          orderIdId: { [Op.or]: listItems },
        };
      }

      if (filter.assignedUserId) {
        var listItems = filter.assignedUserId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          assignedUserIdId: { [Op.or]: listItems },
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
          Utils.ilike('jobs', 'id', query),
        ],
      };
    }

    const records = await db.jobs.findAll({
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
