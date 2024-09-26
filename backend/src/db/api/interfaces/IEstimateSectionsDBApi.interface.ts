import { Transaction } from 'sequelize';
import { EstimateSectionDTO } from '../dtos/estimate.section.dto';

interface Options {
  currentUser?: { id: string } | null;
  transaction?: Transaction;
  countOnly?: boolean;
}

interface FilterOptions {
  limit?: number;
  page?: number;
  field?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
  description?: string;
  amountRange?: [number | undefined | null, number | undefined | null];
  material_priceRange?: [number | undefined | null, number | undefined | null];
  labor_priceRange?: [number | undefined | null, number | undefined | null];
  active?: boolean | 'true' | 'false';
  related_estimate?: string;
  related_template?: string;
  createdAtRange?: [
    Date | string | undefined | null,
    Date | string | undefined | null,
  ];
}

interface IEstimateSectionsDBApi {
  create(data: EstimateSectionDTO, options?: Options): Promise<any>;
  bulkImport(data: EstimateSectionDTO[], options?: Options): Promise<any>;
  update(id: string, data: EstimateSectionDTO, options?: Options): Promise<any>;
  deleteByIds(ids: string[], options?: Options): Promise<any>;
  remove(id: string, options?: Options): Promise<any>;
  findBy(where: any, options?: Options): Promise<any>;
  findAll(
    filter: FilterOptions,
    options?: Options,
  ): Promise<{ rows: any[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<{ id: string; label: string }[]>;
}

export { IEstimateSectionsDBApi };
