import { Transaction } from 'sequelize';

import { EstimatesDTO } from '../dtos/estimates.dto';

interface Options {
  currentUser?: { id: string | null };
  transaction?: Transaction;
}

interface Filter {
  limit?: number;
  page?: number;
  id?: string;
  name?: string;
  description?: string;
  trade?: string;
  template_used?: string;
  material_costRange?: [number | null, number | null];
  labor_costRange?: [number | null, number | null];
  markupRange?: [number | null, number | null];
  profit_marginRange?: [number | null, number | null];
  total_priceRange?: [number | null, number | null];
  active?: boolean | 'true' | 'false';
  status?: string;
  related_contact?: string;
  related_job?: string;
  createdAtRange?: [Date | null, Date | null];
  countOnly?: boolean;
  field?: string;
  sort?: 'ASC' | 'DESC';
}

interface IEstimatesDBApi {
  create(data: EstimatesDTO, options?: Options): Promise<any>;
  bulkImport(data: EstimatesDTO[], options?: Options): Promise<any>;
  update(id: string, data: EstimatesDTO, options?: Options): Promise<any>;
  deleteByIds(ids: string[], options?: Options): Promise<any>;
  remove(id: string, options?: Options): Promise<any>;
  findBy(where: any, options?: { transaction?: Transaction }): Promise<any>;
  findAll(
    filter: Filter,
    options?: { transaction?: Transaction; countOnly?: boolean },
  ): Promise<{ rows: any[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<{ id: string; label: string }[]>;
}

export { IEstimatesDBApi };
