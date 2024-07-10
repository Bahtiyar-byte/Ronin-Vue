import csv from 'csv-parser';

import { Response } from 'express';
import { PassThrough } from 'stream';
import { Service } from 'typedi';
import { ContactsDBApi } from '../db/api/contacts';
import db from '../db/models';
import processFile from '../middlewares/upload';
import { IContactsService } from './interfaces/IContactsService.interface';
import ValidationError from './notifications/errors/validation';
interface CurrentUser {
  id: string | null;
}

@Service()
class ContactsService implements IContactsService {
  private contactsDBApi = new ContactsDBApi();
  async create(data: any, currentUser: CurrentUser): Promise<void> {
    const transaction = await db.sequelize.transaction();
    try {
      const contacts = await this.contactsDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return contacts;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async bulkImport(
    req: any,
    res: Response,
    sendInvitationEmails = true,
    host?: string,
  ): Promise<void> {
    const transaction = await db.sequelize.transaction();

    try {
      await processFile(req, res);
      const bufferStream = new PassThrough();
      const results: any[] = [];

      await bufferStream.end(Buffer.from(req.file.buffer, 'utf-8')); // convert Buffer to Stream

      await new Promise<void>((resolve, reject) => {
        bufferStream
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            console.log('CSV results', results);
            resolve();
          })
          .on('error', (error) => reject(error));
      });

      await this.contactsDBApi.bulkImport(results, {
        transaction,
        ignoreDuplicates: true,
        validate: true,
        currentUser: req.currentUser,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(data: any, id: string, currentUser: CurrentUser): Promise<any> {
    const transaction = await db.sequelize.transaction();
    try {
      let contacts = await this.contactsDBApi.findBy({ id }, { transaction });

      if (!contacts) {
        throw new ValidationError('contactsNotFound');
      }

      await this.contactsDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return contacts;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async deleteByIds(ids: string[], currentUser: CurrentUser): Promise<void> {
    const transaction = await db.sequelize.transaction();

    try {
      await this.contactsDBApi.deleteByIds(ids, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id: string, currentUser: CurrentUser): Promise<void> {
    const transaction = await db.sequelize.transaction();

    try {
      await this.contactsDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

const ContactsServiceInstance: IContactsService =
  ContactsService as typeof ContactsService & IContactsService;
export { ContactsService, ContactsServiceInstance };
