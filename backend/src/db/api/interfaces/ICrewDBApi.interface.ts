import { Transaction } from 'sequelize';

interface ICrewDBApi {
    create(data: any, options?: DbOptions): Promise<any>;
    bulkImport(data: any[], options?: DbOptions): Promise<any>;
    update(id: string | number, data: any, options?: DbOptions): Promise<any>;
    deleteByIds(ids: Array<string | number>, options?: DbOptions): Promise<any>;
    remove(id: string | number, options?: DbOptions): Promise<any>;
    findBy(where: any, options?: DbOptions): Promise<any>;
    findAll(filter: any, options?: DbOptions): Promise<{ rows: any[]; count: number }>;
    findAllAutocomplete(query: string, limit: number): Promise<Array<AutocompleteResult>>;
}

interface DbOptions {
    currentUser?: {
        id: string | number | null;
    };
    transaction?: Transaction;
    countOnly?: boolean;
}

interface AutocompleteResult {
    id: string | number;
    label: string;
}

export {ICrewDBApi}