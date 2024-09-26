import { Transaction } from 'sequelize';
import { AmendmentDTO } from '../dtos/amendment.dto';
import { UserDTO } from '../dtos/users.dto';
interface AmendmentsDBApiOptions {
  currentUser?: UserDTO;
  transaction?: Transaction;
  countOnly?: boolean;
}

interface Filter {
  limit?: number;
  page?: number;
  id?: string;
  description?: string;
  amountRange?: [number, number];
  active?: boolean;
  type?: string;
  related_job?: string;
  createdAtRange?: [Date, Date];
  field?: string;
  sort?: 'asc' | 'desc';
}

export interface IAmendmentsDBApi {
  create(
    data: AmendmentDTO,
    options?: AmendmentsDBApiOptions,
  ): Promise<AmendmentDTO>;
  bulkImport(
    data: AmendmentDTO[],
    options?: AmendmentsDBApiOptions,
  ): Promise<AmendmentDTO[]>;
  update(
    id: string,
    data: AmendmentDTO,
    options?: AmendmentsDBApiOptions,
  ): Promise<AmendmentDTO>;
  deleteByIds(ids: string[], options?: AmendmentDTO): Promise<AmendmentDTO[]>;
  remove(id: string, options?: AmendmentsDBApiOptions): Promise<AmendmentDTO>;
  findBy(
    where: Partial<AmendmentDTO>,
    options?: AmendmentsDBApiOptions,
  ): Promise<AmendmentDTO | null>;
  findAll(
    filter: Filter,
    options?: AmendmentsDBApiOptions,
  ): Promise<{ rows: AmendmentDTO[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<{ id: string; label: string }[]>;
}

// export default IAmendmentsDBApi;
