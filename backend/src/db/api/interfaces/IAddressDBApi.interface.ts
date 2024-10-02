import { Transaction } from 'sequelize';

interface IAddressDBApi {
    create(data: AddressData, options?: DbOptions): Promise<any>;
    bulkImport(data: AddressData[], options?: DbOptions): Promise<any>;
    update(id: string | number, data: AddressData, options?: DbOptions): Promise<any>;
    deleteByIds(ids: string[] | number[], options?: DbOptions): Promise<any>;
    remove(id: string | number, options?: DbOptions): Promise<any>;
    findBy(where: any, options?: DbOptions): Promise<any>;
    findAll(filter: AddressFilter, options?: DbOptions): Promise<{ rows: any[]; count: number }>;
    findAllAutocomplete(query: string, limit: number): Promise<AutocompleteResult[]>;
}

interface AddressData {
    id?: string | number;
    street?: string;
    suite_apt_unit?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    is_mailing_address?: boolean;
    is_location?: boolean;
    is_billing_Address?: boolean;
    latitude?: number;
    longitude?: number;
    importHash?: string;
    related_contact?: string | null;
    related_job?: string | null;
}

interface DbOptions {
    currentUser?: {
        id: string | number | null;
    };
    transaction?: Transaction;
    countOnly?: boolean;
}

interface AddressFilter {
    id?: string;
    street?: string;
    suite_apt_unit?: string;
    city?: string;
    zip?: string;
    state?: string;
    country?: string;
    latitudeRange?: [number, number];
    longitudeRange?: [number, number];
    active?: boolean;
    is_mailing_address?: boolean;
    is_location?: boolean;
    is_billing_Address?: boolean;
    related_contact?: string;
    related_job?: string;
    createdAtRange?: [Date, Date];
    limit?: number;
    page?: number;
    field?: string;
    sort?: string;
}

interface AutocompleteResult {
    id: string | number;
    label: string;
}

export {IAddressDBApi}