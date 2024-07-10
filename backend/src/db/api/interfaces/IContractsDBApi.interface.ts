import { Model, Optional, Transaction } from 'sequelize';
import { ContractDTO } from '../dtos/contract.dto';

interface ContractCreationAttributes extends Optional<ContractDTO, 'id'> {}

interface ContractsDBOptions {
  currentUser?: { id: string | null };
  transaction?: Transaction;
  countOnly?: boolean;
  page?: number;
  limit?: number;
  field?: string;
  sort?: 'ASC' | 'DESC';
}

export interface IContractsDBApi {
  create(
    data: ContractCreationAttributes,
    options?: ContractsDBOptions,
  ): Promise<Model<ContractDTO>>;
  bulkImport(
    data: ContractCreationAttributes[],
    options?: ContractsDBOptions,
  ): Promise<Model<ContractDTO>[]>;
  update(
    id: string,
    data: ContractDTO,
    options?: ContractsDBOptions,
  ): Promise<Model<ContractDTO>>;
  deleteByIds(
    ids: string[],
    options?: ContractsDBOptions,
  ): Promise<Model<ContractDTO>[]>;
  remove(id: string, options?: ContractsDBOptions): Promise<Model<ContractDTO>>;
  findBy(where: any, options?: ContractsDBOptions): Promise<any>; // Update with specific return type as needed
  findAll(
    filter: any,
    options?: ContractsDBOptions,
  ): Promise<{ rows: any[]; count: number }>;
  findAllAutocomplete(
    query: string,
    limit?: number,
  ): Promise<{ id: string; label: string }[]>;
}
