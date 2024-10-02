import { Transaction } from 'sequelize';

interface IContactEmailsDBApi {
    create(data: ContactEmailData, options?: Options): Promise<ContactEmailRecord>;
    bulkImport(data: ContactEmailData[], options?: Options): Promise<ContactEmailRecord[]>;
    update(id: string | number, data: ContactEmailData, options?: Options): Promise<ContactEmailRecord>;
    deleteByIds(ids: string[] | number[], options?: Options): Promise<ContactEmailRecord[]>;
    remove(id: string | number, options?: Options): Promise<ContactEmailRecord>;
    findBy(where: WhereClause, options?: Options): Promise<ContactEmailRecord | null>;
    findAll(filter: Filter, options?: Options): Promise<{ rows: ContactEmailRecord[], count: number }>;
    findAllAutocomplete(query: string, limit: number): Promise<AutocompleteResult[]>;
}

interface ContactEmailData {
    id?: string | number;
    email: string;
    type?: string;
    importHash?: string;
    createdById?: string | number;
    updatedById?: string | number;
    createdAt?: Date;
    active?: boolean;
    [key: string]: any; // for additional fields
}

interface ContactEmailRecord {
    id: string | number;
    email: string;
    type?: string;
    importHash?: string;
    createdById?: string | number;
    updatedById?: string | number;
    createdAt?: Date;
    active?: boolean;
    [key: string]: any;
}

interface Options {
    currentUser?: User;
    transaction?: Transaction;
    countOnly?: boolean;
}

interface WhereClause {
    [key: string]: any; // for defining dynamic where clauses
}

interface Filter {
    id?: string;
    email?: string;
    active?: boolean;
    type?: string;
    createdAtRange?: [string, string];
    limit?: number;
    page?: number;
    field?: string;
    sort?: 'ASC' | 'DESC';
}

interface AutocompleteResult {
    id: string | number;
    label: string;
}

interface User {
    id: string | number;
    email?: string;
}
export {IContactEmailsDBApi}