import { Transaction } from 'sequelize';

import { OrderDTO } from '../dtos/order.dto';

interface FindAllFilter {
  limit?: number;
  page?: number;
  id?: string;
  order_number?: string;
  total_amountRange?: [number | undefined, number | undefined];
  active?: boolean | string;
  related_job?: string;
  related_estimate?: string;
  createdAtRange?: [Date | undefined, Date | undefined];
}

interface IOrdersDBApi {
  create(
    data: OrderDTO,
    options?: {
      currentUser?: { id: string } | null;
      transaction?: Transaction;
    },
  ): Promise<any>;

  bulkImport(
    data: OrderDTO[],
    options?: {
      currentUser?: { id: string } | null;
      transaction?: Transaction;
    },
  ): Promise<any>;

  update(
    id: string,
    data: OrderDTO,
    options?: {
      currentUser?: { id: string } | null;
      transaction?: Transaction;
    },
  ): Promise<any>;

  deleteByIds(
    ids: string[],
    options?: {
      currentUser?: { id: string } | null;
      transaction?: Transaction;
    },
  ): Promise<any>;

  remove(
    id: string,
    options?: {
      currentUser?: { id: string } | null;
      transaction?: Transaction;
    },
  ): Promise<any>;

  findBy(where: any, options?: { transaction?: Transaction }): Promise<any>;

  findAll(
    filter: FindAllFilter,
    options?: { transaction?: Transaction; countOnly?: boolean },
  ): Promise<{ rows: any[]; count: number }>;

  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<{ id: string; label: string }[]>;
}

export { IOrdersDBApi };
