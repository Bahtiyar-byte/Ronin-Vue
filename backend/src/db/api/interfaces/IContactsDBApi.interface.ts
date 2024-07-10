import { Transaction } from 'sequelize';
import { ContactDTO } from '../dtos/contacts.dto';

interface Options {
  currentUser?: { id: string | null };
  transaction?: Transaction;
  countOnly?: boolean;
  ignoreDuplicates?: boolean;
  validate?: boolean;
}

interface IContactsDBApi {
  create(data: ContactDTO, options?: Options): Promise<any>;
  bulkImport(data: ContactDTO[], options?: Options): Promise<any>;
  update(id: string, data: ContactDTO, options?: Options): Promise<any>;
  deleteByIds(ids: string[], options?: Options): Promise<any>;
  remove(id: string, options?: Options): Promise<any>;
  findBy(where: object, options?: Options): Promise<any>;
  findAll(filter: any, options?: Options): Promise<any>;
  findAllAutocomplete(query: string, limit: number): Promise<any>;
}

export { IContactsDBApi, Options };
