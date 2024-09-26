import { Transaction } from 'sequelize';
import { InvoiceDTO } from '../dtos/invoice.dto';

interface Options {
  currentUser?: { id: number } | null;
  transaction?: Transaction;
}

interface FindAllFilter {
  limit?: number;
  page?: number;
  id?: string;
  invoice_number?: string;
  invoice_dateRange?: [Date | null, Date | null];
  approved_job_valueRange?: [number | null, number | null];
  balance_amountRange?: [number | null, number | null];
  active?: boolean | string;
  terms?: string;
  related_job?: string;
  createdAtRange?: [Date | null, Date | null];
  field?: string;
  sort?: 'ASC' | 'DESC';
}

interface IInvoicesDBApi {
  create(data: InvoiceDTO, options?: Options): Promise<any>;
  bulkImport(data: InvoiceDTO[], options?: Options): Promise<any[]>;
  update(id: any, data: InvoiceDTO, options?: Options): Promise<any>;
  deleteByIds(ids: any[], options?: Options): Promise<any[]>;
  remove(id: any, options?: Options): Promise<any>;
  findBy(where: any, options?: Options): Promise<any | null>;
  findAll(
    filter: FindAllFilter,
    options?: Options,
  ): Promise<{ rows: any[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<{ id: any; label: any }[]>;
}

export { IInvoicesDBApi };
