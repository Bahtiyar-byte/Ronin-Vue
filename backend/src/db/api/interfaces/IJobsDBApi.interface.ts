import { Transaction } from 'sequelize';
import { Model } from 'sequelize/types';
import { JobDTO } from '../dtos/jobs.dto';

interface User {
  id: string;
  email?: string;
  [key: string]: any;
}

interface Options {
  currentUser?: User;
  transaction?: Transaction;
  countOnly?: boolean;
}

interface Filter {
  limit?: number;
  page?: number;
  field?: string;
  sort?: string;
  id?: string;
  name?: string;
  description?: string;
  address?: string;
  start_dateRange?: [string, string];
  end_dateRange?: [string, string];
  active?: boolean | string;
  category?: string;
  type?: string;
  status?: string;
  assigned_to?: string;
  related_contact?: string;
  createdAtRange?: [string, string];
}

interface Job extends Model {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  status: string;
  address: string;
  start_date: string | null;
  end_date: string | null;
  createdById: string;
  updatedById: string;
}

export interface IJobsDBApi {
  create(data: JobDTO, options: Options): Promise<Job>;
  bulkImport(data: JobDTO[], options: Options): Promise<Job[]>;
  update(id: string, data: JobDTO, options: Options): Promise<Job>;
  deleteByIds(ids: string[], options: Options): Promise<Job[]>;
  remove(id: string, options: Options): Promise<Job>;
  findBy(where: object, options: Options): Promise<any>;
  findAll(
    filter: Filter,
    options: Options,
  ): Promise<{ rows: Job[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit: number,
  ): Promise<{ id: string; label: string }[]>;
}
