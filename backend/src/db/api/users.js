const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const bcrypt = require('bcrypt');
const config = require('../../config');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class UsersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.create(
      {
        id: data.data.id || undefined,

        firstName: data.data.firstName || null,
        lastName: data.data.lastName || null,
        phoneNumber: data.data.phoneNumber || null,
        email: data.data.email || null,
        disabled: data.data.disabled || false,

        password: data.data.password || null,
        emailVerified: data.data.emailVerified || true,

        emailVerificationToken: data.data.emailVerificationToken || null,
        emailVerificationTokenExpiresAt:
          data.data.emailVerificationTokenExpiresAt || null,
        passwordResetToken: data.data.passwordResetToken || null,
        passwordResetTokenExpiresAt:
          data.data.passwordResetTokenExpiresAt || null,
        provider: data.data.provider || null,
        userName: data.data.userName || null,
        importHash: data.data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await users.setImageId(data.data.imageId || null, {
      transaction,
    });

    await users.setCreatedBy(data.data.createdBy || null, {
      transaction,
    });

    await users.setUpdatedBy(data.data.updatedBy || null, {
      transaction,
    });

    await users.setRoleId(data.data.roleId || null, {
      transaction,
    });

    await users.setPermissions(data.data.permissions || [], {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.users.getTableName(),
        belongsToColumn: 'avatar',
        belongsToId: users.id,
      },
      data.data.avatar,
      options,
    );

    return users;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const usersData = data.map((item, index) => ({
      id: item.id || undefined,

      firstName: item.firstName || null,
      lastName: item.lastName || null,
      phoneNumber: item.phoneNumber || null,
      email: item.email || null,
      disabled: item.disabled || false,

      password: item.password || null,
      emailVerified: item.emailVerified || false,

      emailVerificationToken: item.emailVerificationToken || null,
      emailVerificationTokenExpiresAt:
        item.emailVerificationTokenExpiresAt || null,
      passwordResetToken: item.passwordResetToken || null,
      passwordResetTokenExpiresAt: item.passwordResetTokenExpiresAt || null,
      provider: item.provider || null,
      userName: item.userName || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const users = await db.users.bulkCreate(usersData, { transaction });

    // For each item created, replace relation files

    for (let i = 0; i < users.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.users.getTableName(),
          belongsToColumn: 'avatar',
          belongsToId: users[i].id,
        },
        data[i].avatar,
        options,
      );
    }

    return users;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findByPk(id, {}, { transaction });

    if (!data?.app_role) {
      data.app_role = users?.app_role?.id;
    }
    if (!data?.custom_permissions) {
      data.custom_permissions = users?.custom_permissions?.map(
        (item) => item.id,
      );
    }

    if (data.password) {
      data.password = bcrypt.hashSync(data.password, config.bcrypt.saltRounds);
    } else {
      data.password = users.password;
    }

    await users.update(
      {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        phoneNumber: data.phoneNumber || null,
        email: data.email || null,
        disabled: data.disabled || false,

        password: data.password || null,
        emailVerified: data.emailVerified || true,

        emailVerificationToken: data.emailVerificationToken || null,
        emailVerificationTokenExpiresAt:
          data.emailVerificationTokenExpiresAt || null,
        passwordResetToken: data.passwordResetToken || null,
        passwordResetTokenExpiresAt: data.passwordResetTokenExpiresAt || null,
        provider: data.provider || null,
        userName: data.userName || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await users.setImageId(data.imageId || null, {
      transaction,
    });

    await users.setCreatedBy(data.createdBy || null, {
      transaction,
    });

    await users.setUpdatedBy(data.updatedBy || null, {
      transaction,
    });

    await users.setRoleId(data.roleId || null, {
      transaction,
    });

    await users.setPermissions(data.permissions || [], {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.users.getTableName(),
        belongsToColumn: 'avatar',
        belongsToId: users.id,
      },
      data.avatar,
      options,
    );

    return users;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of users) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of users) {
        await record.destroy({ transaction });
      }
    });

    return users;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findByPk(id, options);

    await users.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await users.destroy({
      transaction,
    });

    return users;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findOne({ where }, { transaction });

    if (!users) {
      return users;
    }

    const output = users.get({ plain: true });

    output.contacts_assignedUserId = await users.getContacts_assignedUserId({
      transaction,
    });

    output.contacts_createdBy = await users.getContacts_createdBy({
      transaction,
    });

    output.contacts_updatedBy = await users.getContacts_updatedBy({
      transaction,
    });

    output.addresses_createdBy = await users.getAddresses_createdBy({
      transaction,
    });

    output.jobs_assignedUserId = await users.getJobs_assignedUserId({
      transaction,
    });

    output.jobs_createdBy = await users.getJobs_createdBy({
      transaction,
    });

    output.jobs_updatedBy = await users.getJobs_updatedBy({
      transaction,
    });

    output.estimates_createdBy = await users.getEstimates_createdBy({
      transaction,
    });

    output.estimates_updatedBy = await users.getEstimates_updatedBy({
      transaction,
    });

    output.templates_createdBy = await users.getTemplates_createdBy({
      transaction,
    });

    output.templates_updatedBy = await users.getTemplates_updatedBy({
      transaction,
    });

    output.invoices_createdBy = await users.getInvoices_createdBy({
      transaction,
    });

    output.invoices_updatedBy = await users.getInvoices_updatedBy({
      transaction,
    });

    output.orders_createdBy = await users.getOrders_createdBy({
      transaction,
    });

    output.images_userId = await users.getImages_userId({
      transaction,
    });

    output.images_createdBy = await users.getImages_createdBy({
      transaction,
    });

    output.documents_createdBy = await users.getDocuments_createdBy({
      transaction,
    });

    output.emails_userId = await users.getEmails_userId({
      transaction,
    });

    output.emails_createdBy = await users.getEmails_createdBy({
      transaction,
    });

    output.chats_senderId = await users.getChats_senderId({
      transaction,
    });

    output.chats_receiverId = await users.getChats_receiverId({
      transaction,
    });

    output.appointments_assignedUserId =
      await users.getAppointments_assignedUserId({
        transaction,
      });

    output.appointments_createdBy = await users.getAppointments_createdBy({
      transaction,
    });

    output.appointments_updatedBy = await users.getAppointments_updatedBy({
      transaction,
    });

    output.tasks_assignedToUserId = await users.getTasks_assignedToUserId({
      transaction,
    });

    output.tasks_createdBy = await users.getTasks_createdBy({
      transaction,
    });

    output.contracts_createdBy = await users.getContracts_createdBy({
      transaction,
    });

    output.amendments_createdBy = await users.getAmendments_createdBy({
      transaction,
    });

    output.avatar = await users.getAvatar({
      transaction,
    });

    output.imageId = await users.getImageId({
      transaction,
    });

    output.createdBy = await users.getCreatedBy({
      transaction,
    });

    output.updatedBy = await users.getUpdatedBy({
      transaction,
    });

    output.roleId = await users.getRoleId({
      transaction,
    });

    output.permissions = await users.getPermissions({
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
        model: db.images,
        as: 'imageId',
      },

      {
        model: db.users,
        as: 'createdBy',
      },

      {
        model: db.users,
        as: 'updatedBy',
      },

      {
        model: db.roles,
        as: 'roleId',
      },

      {
        model: db.permissions,
        as: 'permissions',
        through: filter.permissions
          ? {
              where: {
                [Op.or]: filter.permissions.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.permissions ? true : null,
      },

      {
        model: db.file,
        as: 'avatar',
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
          [Op.and]: Utils.ilike('users', 'firstName', filter.firstName),
        };
      }

      if (filter.lastName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('users', 'lastName', filter.lastName),
        };
      }

      if (filter.phoneNumber) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('users', 'phoneNumber', filter.phoneNumber),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('users', 'email', filter.email),
        };
      }

      if (filter.password) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('users', 'password', filter.password),
        };
      }

      if (filter.emailVerificationToken) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'users',
            'emailVerificationToken',
            filter.emailVerificationToken,
          ),
        };
      }

      if (filter.passwordResetToken) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'users',
            'passwordResetToken',
            filter.passwordResetToken,
          ),
        };
      }

      if (filter.provider) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('users', 'provider', filter.provider),
        };
      }

      if (filter.userName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('users', 'userName', filter.userName),
        };
      }

      if (filter.emailVerificationTokenExpiresAtRange) {
        const [start, end] = filter.emailVerificationTokenExpiresAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            emailVerificationTokenExpiresAt: {
              ...where.emailVerificationTokenExpiresAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            emailVerificationTokenExpiresAt: {
              ...where.emailVerificationTokenExpiresAt,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.passwordResetTokenExpiresAtRange) {
        const [start, end] = filter.passwordResetTokenExpiresAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            passwordResetTokenExpiresAt: {
              ...where.passwordResetTokenExpiresAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            passwordResetTokenExpiresAt: {
              ...where.passwordResetTokenExpiresAt,
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

      if (filter.disabled) {
        where = {
          ...where,
          disabled: filter.disabled,
        };
      }

      if (filter.emailVerified) {
        where = {
          ...where,
          emailVerified: filter.emailVerified,
        };
      }

      if (filter.imageId) {
        var listItems = filter.imageId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          imageIdId: { [Op.or]: listItems },
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

      if (filter.roleId) {
        var listItems = filter.roleId.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          roleIdId: { [Op.or]: listItems },
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
          count: await db.users.count({
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
      : await db.users.findAndCountAll({
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
          Utils.ilike('users', 'firstName', query),
        ],
      };
    }

    const records = await db.users.findAll({
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

  static async createFromAuth(data, options) {
    const transaction = (options && options.transaction) || undefined;
    const users = await db.users.create(
      {
        email: data.email,
        firstName: data.firstName,
        authenticationUid: data.authenticationUid,
        password: data.password,
      },
      { transaction },
    );

    const app_role = await db.roles.findOne({
      where: { name: 'User' },
    });
    if (app_role?.id) {
      await users.setApp_role(app_role?.id || null, {
        transaction,
      });
    }

    await users.update(
      {
        authenticationUid: users.id,
      },
      { transaction },
    );

    delete users.password;
    return users;
  }

  static async updatePassword(id, password, options) {
    const currentUser = (options && options.currentUser) || { id: null };

    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findByPk(id, {
      transaction,
    });

    await users.update(
      {
        password,
        authenticationUid: id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return users;
  }

  static async generateEmailVerificationToken(email, options) {
    return this._generateToken(
      ['emailVerificationToken', 'emailVerificationTokenExpiresAt'],
      email,
      options,
    );
  }

  static async generatePasswordResetToken(email, options) {
    return this._generateToken(
      ['passwordResetToken', 'passwordResetTokenExpiresAt'],
      email,
      options,
    );
  }

  static async findByPasswordResetToken(token, options) {
    const transaction = (options && options.transaction) || undefined;

    return db.users.findOne(
      {
        where: {
          passwordResetToken: token,
          passwordResetTokenExpiresAt: {
            [db.Sequelize.Op.gt]: Date.now(),
          },
        },
      },
      { transaction },
    );
  }

  static async findByEmailVerificationToken(token, options) {
    const transaction = (options && options.transaction) || undefined;
    return db.users.findOne(
      {
        where: {
          emailVerificationToken: token,
          emailVerificationTokenExpiresAt: {
            [db.Sequelize.Op.gt]: Date.now(),
          },
        },
      },
      { transaction },
    );
  }

  static async markEmailVerified(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const users = await db.users.findByPk(id, {
      transaction,
    });

    await users.update(
      {
        emailVerified: true,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return true;
  }

  static async _generateToken(keyNames, email, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const users = await db.users.findOne(
      {
        where: { email: email.toLowerCase() },
      },
      {
        transaction,
      },
    );

    const token = crypto.randomBytes(20).toString('hex');
    const tokenExpiresAt = Date.now() + 360000;

    if (users) {
      await users.update(
        {
          [keyNames[0]]: token,
          [keyNames[1]]: tokenExpiresAt,
          updatedById: currentUser.id,
        },
        { transaction },
      );
    }

    return token;
  }
};
