import { Transaction } from 'sequelize';
import { DocumentDTO } from '../dtos/document.dto';

interface FindAllFilter {
  limit?: number;
  page?: number;
  id?: string;
  name?: string;
  active?: boolean | string;
  related_job?: string;
  createdAtRange?: [Date | null | undefined, Date | null | undefined];
  field?: string;
  sort?: 'ASC' | 'DESC';
  countOnly?: boolean;
}

export interface IDocumentsDBApi {
  create(
    data: DocumentDTO,
    options?: {
      currentUser?: { id: string | null };
      transaction?: Transaction;
    },
  ): Promise<any>;
  bulkImport(
    data: DocumentDTO[],
    options?: {
      currentUser?: { id: string | null };
      transaction?: Transaction;
    },
  ): Promise<any>;
  update(
    id: string,
    data: DocumentDTO,
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
  ): Promise<any>;
  remove(
    id: string,
    options?: {
      currentUser?: { id: string | null };
      transaction?: Transaction;
    },
  ): Promise<any>;
  findBy(where: object, options?: { transaction?: Transaction }): Promise<any>;
  findAll(
    filter: FindAllFilter,
    options?: { transaction?: Transaction; countOnly?: boolean },
  ): Promise<{ rows: any[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<{ id: string; label: string }[]>;
}
