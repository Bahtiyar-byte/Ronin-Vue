import { Transaction } from 'sequelize';
import { PermissionDTO } from '../dtos/permission.dto';

interface Options {
  currentUser?: { id: string } | null;
  transaction?: Transaction;
  countOnly?: boolean;
}

interface IPermissionsDBApi {
  create(data: PermissionDTO, options?: Options): Promise<any>;
  bulkImport(data: PermissionDTO[], options?: Options): Promise<any[]>;
  update(
    id: string,
    data: Partial<PermissionDTO>,
    options?: Options,
  ): Promise<any>;
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

export { IPermissionsDBApi };
