import { Op } from 'sequelize';
import { Service } from 'typedi';
import Utils from '../utils';
import { ContactDTO } from './dtos/contacts.dto';
import { IContactsDBApi, Options } from './interfaces/IContactsDBApi.interface';
const db = require('../models');

@Service()
class ContactsDBApi implements IContactsDBApi {
  async create(data: ContactDTO, options: Options = {}): Promise<void> {
    const currentUser = options.currentUser || { id: null };
    const transaction = options.transaction;

    const contacts = db.contacts.create(
      {
        id: data.id,
        name: data.name || null,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null,
        status: data.status || null,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        source: data.source || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return contacts;
  }

  public async bulkImport(
    data: ContactDTO[],
    options: Options = {},
  ): Promise<ContactDTO[]> {
    const currentUser = options.currentUser || { id: null };
    const transaction = options.transaction;

    const contactsData = data.map((item, index) => ({
      id: item.id,

      name: item.name || null,
      email: item.email || null,
      phone: item.phone || null,
      address: item.address || null,
      status: item.status || null,
      firstName: item.firstName || null,
      lastName: item.lastName || null,
      source: item.source || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    const contacts = await db.contacts.bulkCreate(contactsData, {
      transaction,
    });

    return contacts;
  }

  public async update(
    id: string,
    data: ContactDTO,
    options: Options = {},
  ): Promise<ContactDTO> {
    const currentUser = options.currentUser || { id: null };
    const transaction = options.transaction;

    const contacts = await db.contacts.findByPk(id, { transaction });

    if (!contacts) {
      throw new Error('Contact not found');
    }

    await contacts.update(
      {
        name: data.name || null,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null,
        status: data.status || null,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        source: data.source || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return contacts;
  }

  public async deleteByIds(
    ids: string[],
    options: Options = {},
  ): Promise<ContactDTO> {
    const currentUser = options.currentUser || { id: null };
    const transaction = options.transaction;

    const contacts = await db.contacts.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction: any) => {
      for (const record of contacts) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of contacts) {
        await record.destroy({ transaction });
      }
    });

    return contacts;
  }

  public async remove(id: string, options: Options = {}): Promise<ContactDTO> {
    const currentUser = options.currentUser || { id: null };
    const transaction = options.transaction;

    const contacts = await db.contacts.findByPk(id, { transaction });

    if (!contacts) {
      throw new Error('Contact not found');
    }

    await contacts.update(
      {
        deletedBy: currentUser.id,
      },
      { transaction },
    );

    await contacts.destroy({ transaction });

    return contacts;
  }

  public async findBy(
    where: object,
    options: Options = {},
  ): Promise<ContactDTO> {
    const transaction = options.transaction;

    const contacts = await db.contacts.findOne({ where, transaction });

    if (!contacts) {
      return contacts;
    }

    const output = contacts.get({ plain: true });

    output.estimates_related_contact =
      await contacts.getEstimates_related_contact({ transaction });
    output.jobs_related_contact = await contacts.getJobs_related_contact({
      transaction,
    });
    output.emails_related_contact = await contacts.getEmails_related_contact({
      transaction,
    });
    output.appointments_related_contact =
      await contacts.getAppointments_related_contact({ transaction });
    output.contracts_related_contact =
      await contacts.getContracts_related_contact({ transaction });

    return output;
  }

  public async findAll(
    filter: any,
    options: Options = {},
  ): Promise<{ count: number; rows: ContactDTO[] }> {
    const limit = filter.limit || 0;
    const currentPage = +filter.page;
    const offset = currentPage * limit;

    const transaction = options.transaction;
    let where: any = {};
    let include: any[] = [];

    if (filter) {
      if (filter.id) {
        where.id = Utils.uuid(filter.id);
      }
      if (filter.name) {
        where[Op.and] = Utils.ilike('contacts', 'name', filter.name);
      }
      if (filter.email) {
        where[Op.and] = Utils.ilike('contacts', 'email', filter.email);
      }
      if (filter.phone) {
        where[Op.and] = Utils.ilike('contacts', 'phone', filter.phone);
      }
      if (filter.address) {
        where[Op.and] = Utils.ilike('contacts', 'address', filter.address);
      }
      if (filter.firstName) {
        where[Op.and] = Utils.ilike('contacts', 'firstName', filter.firstName);
      }
      if (filter.lastName) {
        where[Op.and] = Utils.ilike('contacts', 'lastName', filter.lastName);
      }
      if (filter.active !== undefined) {
        where.active = filter.active === true || filter.active === 'true';
      }
      if (filter.status) {
        where.status = filter.status;
      }
      if (filter.source) {
        where.source = filter.source;
      }
      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start) {
          where.createdAt = { [Op.gte]: start };
        }

        if (end) {
          where.createdAt = { [Op.lte]: end };
        }
      }
    }

    const result = options.countOnly
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

    return result;
  }

  async findAllAutocomplete(
    query: string,
    limit: number,
  ): Promise<ContactDTO[]> {
    const where: any = {};

    if (query) {
      where[Op.or] = [
        { id: Utils.uuid(query) },
        Utils.ilike('contacts', 'name', query),
      ];
    }

    const records = await db.contacts.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      order: [['name', 'ASC']],
    });

    return records.map((record: any) => ({
      id: record.id,
      label: record.name,
    }));
  }
}

const ContactsDBApiInstance: IContactsDBApi =
  ContactsDBApi as typeof ContactsDBApi & IContactsDBApi;
export { ContactsDBApi, ContactsDBApiInstance };
