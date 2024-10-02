import { Transaction } from 'sequelize';

export interface History {
    id?: string;
    action_description?: string | null;
    importHash?: string | null;
    createdById?: string | null;
    updatedById?: string | null;
    deletedBy?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface HistoryFilter {
    id?: string;
    action_description?: string;
    active?: boolean;
    related_estimate?: string;
    related_invoice?: string;
    related_job?: string;
    related_email?: string;
    related_labor_ticket?: string;
    related_user?: string;
    related_contact?: string;
    related_appointment?: string;
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

export interface IHistoryDBApi {
    create(data: History, options?: { currentUser?: { id: string }, transaction?: Transaction }): Promise<History>;
    bulkImport(data: History[], options?: { currentUser?: { id: string }, transaction?: Transaction }): Promise<History[]>;
    update(id: string, data: History, options?: { currentUser?: { id: string }, transaction?: Transaction }): Promise<History>;
    deleteByIds(ids: string[], options?: { currentUser?: { id: string }, transaction?: Transaction }): Promise<History[]>;
    remove(id: string, options?: { currentUser?: { id: string }, transaction?: Transaction }): Promise<History>;
    findBy(where: any, options?: { transaction?: Transaction }): Promise<History | null>;
    findAll(filter: HistoryFilter, options?: { transaction?: Transaction, countOnly?: boolean }): Promise<{ rows: History[], count: number }>;
    findAllAutocomplete(query: string, limit?: number): Promise<AutocompleteResult[]>;
}