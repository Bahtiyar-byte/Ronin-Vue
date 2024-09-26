import { TradeDTO } from '../dtos/trades.dto';
interface User {
  id: string | null;
}

interface Options {
  currentUser?: User;
  transaction?: any;
  countOnly?: boolean;
}

interface UpdateData {
  name?: string;
}

interface Filter {
  limit?: number;
  page: number;
  id?: string;
  name?: string;
  active?: boolean | string;
  createdAtRange?: [string, string];
  field?: string;
  sort?: string;
}

interface Where {
  [key: string]: any;
}

interface Trade {
  id: string;
  name: string;
  importHash: string;
  createdById: string;
  updatedById: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedBy?: string;
  active?: boolean;
  templates_related_trade?: any;
}

interface TradesFindAllResult {
  rows: Trade[];
  count: number;
}

interface AutocompleteRecord {
  id: string;
  label: string;
}

interface ITradesDBApi {
  create(data: TradeDTO, options?: Options): Promise<Trade>;
  bulkImport(data: TradeDTO[], options?: Options): Promise<Trade[]>;
  update(id: string, data: UpdateData, options?: Options): Promise<Trade>;
  deleteByIds(ids: string[], options?: Options): Promise<Trade[]>;
  remove(id: string, options?: Options): Promise<Trade>;
  findBy(where: Where, options?: Options): Promise<Trade | null>;
  findAll(filter: Filter, options?: Options): Promise<TradesFindAllResult>;
  findAllAutocomplete(
    query: string,
    limit: number,
  ): Promise<AutocompleteRecord[]>;
}

export { ITradesDBApi };
