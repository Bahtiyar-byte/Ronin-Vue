import { Transaction } from 'sequelize';
import { ImagesDTO } from '../dtos/images.dto';

interface FilterOptions {
  limit?: number;
  page?: number;
  id?: string;
  Name?: string;
  active?: boolean | string;
  related_job?: string;
  createdAtRange?: [Date | null, Date | null];
  field?: string;
  sort?: 'ASC' | 'DESC';
  countOnly?: boolean;
}

interface IImagesDBApi {
  create(
    data: ImagesDTO,
    options?: {
      currentUser?: { id: string | null };
      transaction?: Transaction;
    },
  ): Promise<any>;
  bulkImport(
    data: ImagesDTO[],
    options?: {
      currentUser?: { id: string | null };
      transaction?: Transaction;
    },
  ): Promise<any[]>;
  update(
    id: string,
    data: ImagesDTO,
    options?: {
      currentUser?: { id: string | null };
      transaction?: Transaction;
    },
  ): Promise<any>;
  deleteByIds(
    ids: string[],
    options?: {
      currentUser?: { id: string | null };
      transaction?: Transaction;
    },
  ): Promise<any[]>;
  remove(
    id: string,
    options?: {
      currentUser?: { id: string | null };
      transaction?: Transaction;
    },
  ): Promise<any>;
  findBy(where: any, options?: { transaction?: Transaction }): Promise<any>;
  findAll(
    filter: FilterOptions,
    options?: { transaction?: Transaction; countOnly?: boolean },
  ): Promise<{ rows: any[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<{ id: string; label: string }[]>;
}

export { IImagesDBApi };
