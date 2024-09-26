import { Transaction } from 'sequelize';
import { EmailDTO } from '../dtos/email.dto';

interface CurrentUser {
  id: string | null;
}

interface FilterOptions {
  limit?: number;
  page?: number;
  countOnly?: boolean;
  field?: string;
  sort?: 'ASC' | 'DESC';
  createdAtRange?: [Date, Date];
  related_job?: string;
  related_contact?: string;
  related_user?: string;
}

export interface IEmailsDBApi {
  create(
    data: EmailDTO,
    options?: { currentUser?: CurrentUser; transaction?: Transaction },
  ): Promise<EmailDTO>;
  bulkImport(
    data: EmailDTO[],
    options?: { currentUser?: CurrentUser; transaction?: Transaction },
  ): Promise<EmailDTO[]>;
  update(
    id: string,
    data: EmailDTO,
    options?: { currentUser?: CurrentUser; transaction?: Transaction },
  ): Promise<EmailDTO | null>;
  deleteByIds(
    ids: string[],
    options?: { currentUser?: CurrentUser; transaction?: Transaction },
  ): Promise<EmailDTO[]>;
  remove(
    id: string,
    options?: { currentUser?: CurrentUser; transaction?: Transaction },
  ): Promise<EmailDTO | null>;
  findBy(
    where: any,
    options?: { transaction?: Transaction },
  ): Promise<any | null>;
  findAll(
    filter: FilterOptions,
    options?: { transaction?: Transaction; countOnly?: boolean },
  ): Promise<{ rows: any[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<{ id: string; label: string }[]>;
}
