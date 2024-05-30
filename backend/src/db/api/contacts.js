const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ContactsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.create(
      {
        id: data.id || undefined,

        firstName: data.firstName || null,
        lastName: data.lastName || null,
        email: data.email || null,
        phone: data.phone || null,
        company: data.company || null,
        status: data.status || null,
        source: data.source || null,
        crossReference: data.crossReference || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await contacts.setAssignedUserId(data.assignedUserId || null, {
      transaction,
    });

    return contacts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const contactsData = data.map((item, index) => ({
      id: item.id || undefined,

      firstName: item.firstName || null,
      lastName: item.lastName || null,
      email: item.email || null,
      phone: item.phone || null,
      company: item.company || null,
      status: item.status || null,
      source: item.source || null,
      crossReference: item.crossReference || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const contacts = await db.contacts.bulkCreate(contactsData, {
      transaction,
    });

    // For each item created, replace relation files

    return contacts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.findByPk(id, {}, { transaction });

    await contacts.update(
      {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        email: data.email || null,
        phone: data.phone || null,
        company: data.company || null,
        status: data.status || null,
        source: data.source || null,
        crossReference: data.crossReference || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await contacts.setAssignedUserId(data.assignedUserId || null, {
      transaction,
    });

    return contacts;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of contacts) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of contacts) {
        await record.destroy({ transaction });
      }
    });

    return contacts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.findByPk(id, options);

    await contacts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await contacts.destroy({
      transaction,
    });

    return contacts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const contacts = await db.contacts.findOne({ where }, { transaction });

    if (!contacts) {
      return contacts;
    }

    const output = contacts.get({ plain: true });

    output.addresses_contactId = await contacts.getAddresses_contactId({
      transaction,
    });

    output.jobs_contactId = await contacts.getJobs_contactId({
      transaction,
    });

    output.estimates_contactId = await contacts.getEstimates_contactId({
      transaction,
    });

    output.emails_contactId = await contacts.getEmails_contactId({
      transaction,
    });

    output.appointments_contactId = await contacts.getAppointments_contactId({
      transaction,
    });

    output.contracts_contactId = await contacts.getContracts_contactId({
      transaction,
    });

    output.assignedUserId = await contacts.getAssignedUserId({
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
        model: db.users,
        as: 'assignedUserId',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.firstName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'firstName', filter.firstName),
        };
      }

      if (filter.lastName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'lastName', filter.lastName),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'email', filter.email),
        };
      }

      if (filter.phone) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'phone', filter.phone),
        };
      }

      if (filter.company) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('contacts', 'company', filter.company),
        };
      }

      if (filter.crossReference) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'contacts',
            'crossReference',
            filter.crossReference,
          ),
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

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.source) {
        where = {
          ...where,
          source: filter.source,
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
          count: await db.contacts.count({
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
      : await db.contacts.findAndCountAll({
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
          Utils.ilike('contacts', 'firstName', query),
        ],
      };
    }

    const records = await db.contacts.findAll({
      attributes: ['id', 'firstName'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['firstName', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.firstName,
    }));
  }
};
