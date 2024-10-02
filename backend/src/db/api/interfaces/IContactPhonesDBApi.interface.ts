import { Transaction } from 'sequelize';

export interface ContactPhone {
    id?: string;
    phone_number?: string | null;
    type?: string | null;
    is_primary?: boolean;
    importHash?: string | null;
    createdById?: string | null;
    updatedById?: string | null;
    deletedBy?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ContactPhoneFilter {
    id?: string;
    phone_number?: string;
    active?: boolean;
    type?: string;
    is_primary?: boolean;
    createdAtRange?: [Date | null, Date | null];
    limit?: number;
    page?: number;
    field?: string;
    sort?: string;
}

export interface AutocompleteResult {
    id: string;
    label: string;
}

export interface IContactPhonesDBApi {
    create(data: ContactPhone, options?: { currentUser?: { id: string }, transaction?: Transaction }): Promise<ContactPhone>;
    bulkImport(data: ContactPhone[], options?: { currentUser?: { id: string }, transaction?: Transaction }): Promise<ContactPhone[]>;
    update(id: string, data: ContactPhone, options?: { currentUser?: { id: string }, transaction?: Transaction }): Promise<ContactPhone>;
    deleteByIds(ids: string[], options?: { currentUser?: { id: string }, transaction?: Transaction }): Promise<ContactPhone[]>;
    remove(id: string, options?: { currentUser?: { id: string }, transaction?: Transaction }): Promise<ContactPhone>;
    findBy(where: any, options?: { transaction?: Transaction }): Promise<ContactPhone | null>;
    findAll(filter: ContactPhoneFilter, options?: { transaction?: Transaction, countOnly?: boolean }): Promise<{ rows: ContactPhone[], count: number }>;
    findAllAutocomplete(query: string, limit?: number): Promise<AutocompleteResult[]>;
}
