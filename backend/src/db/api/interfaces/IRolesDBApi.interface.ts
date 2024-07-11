import { Transaction } from 'sequelize';

import { RolesDTO } from '../dtos/roles.dto';

interface Options {
  currentUser?: { id: string } | null;
  transaction?: Transaction;
  countOnly?: boolean;
}

interface IRolesDBApi {
  create(data: RolesDTO, options?: Options): Promise<any>;
  bulkImport(data: RolesDTO[], options?: Options): Promise<any[]>;
  update(id: string, data: Partial<RolesDTO>, options?: Options): Promise<any>;
  deleteByIds(ids: string[], options?: Options): Promise<any[]>;
  remove(id: string, options?: Options): Promise<any | null>;
  findBy(where: any, options?: Options): Promise<any | null>;
  findAll(
    filter: any,
    options?: Options,
  ): Promise<{ rows: any[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<{ id: string; label: string }[]>;
}

export { IRolesDBApi };
