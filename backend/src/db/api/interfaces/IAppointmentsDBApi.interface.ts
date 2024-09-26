import { Transaction } from 'sequelize';
import { AppointmentDto } from '../dtos/appointment.dto';

interface User {
  id: string | null;
}

interface Options {
  currentUser?: User;
  transaction?: Transaction;
  countOnly?: boolean;
}

interface AppointmentData {
  id?: string;
  subject?: string;
  start_time?: Date;
  end_time?: Date;
  notes?: string;
  importHash?: string;
  assigned_to?: string;
  related_job?: string;
  related_contact?: string;
}

interface Filter {
  limit?: number;
  page?: number;
  field?: string;
  sort?: string;
  id?: string;
  subject?: string;
  notes?: string;
  start_timeRange?: [Date?, Date?];
  end_timeRange?: [Date?, Date?];
  active?: boolean | string;
  assigned_to?: string;
  related_job?: string;
  related_contact?: string;
  createdAtRange?: [Date?, Date?];
}

interface AutocompleteResult {
  id: string;
  label: string;
}

interface FindAllResult {
  rows: AppointmentDto[];
  count: number;
}

export interface IAppointmentsDBApi {
  create(data: AppointmentData, options?: Options): Promise<AppointmentDto>;
  bulkImport(
    data: AppointmentData[],
    options?: Options,
  ): Promise<AppointmentDto[]>;
  update(
    id: string,
    data: AppointmentData,
    options?: Options,
  ): Promise<AppointmentDto>;
  deleteByIds(ids: string[], options?: Options): Promise<AppointmentDto[]>;
  remove(id: string, options?: Options): Promise<AppointmentDto>;
  findBy(where: object, options?: Options): Promise<AppointmentDto | null>;
  findAll(filter: Filter, options?: Options): Promise<FindAllResult>;
  findAllAutocomplete(
    query: string,
    limit: number,
  ): Promise<AutocompleteResult[]>;
}
