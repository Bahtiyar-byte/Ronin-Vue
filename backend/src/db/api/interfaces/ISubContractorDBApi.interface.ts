interface Subcontractor {
    id?: string;
    name?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    address?: string | null;
    phone?: string | null;
    mobile_phone?: string | null;
    entity_name?: string | null;
    importHash?: string | null;
    createdById?: string;
    updatedById?: string;
    createdAt?: Date;
}

interface SubcontractorCreateData {
    id?: string;
    name?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    address?: string | null;
    phone?: string | null;
    mobile_phone?: string | null;
    entity_name?: string | null;
    importHash?: string | null;
    related_documents?: string[];
}

interface SubcontractorUpdateData {
    name?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    address?: string | null;
    phone?: string | null;
    mobile_phone?: string | null;
    entity_name?: string | null;
    related_documents?: string[];
}

interface SubcontractorFilter {
    id?: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    address?: string;
    phone?: string;
    mobile_phone?: string;
    entity_name?: string;
    active?: boolean | string;
    createdAtRange?: [Date, Date];
    limit?: number;
    page?: number;
    field?: string;
    sort?: string;
    related_documents?: string;
}

interface SubcontractorAutocomplete {
    id: string;
    label: string;
}

interface SubcontractorQueryOptions {
    transaction?: any;
    currentUser?: { id: string };
    countOnly?: boolean;
}

interface ISubContractorDBApi {
    create(data: SubcontractorCreateData, options?: SubcontractorQueryOptions): Promise<Subcontractor>;
    bulkImport(data: SubcontractorCreateData[], options?: SubcontractorQueryOptions): Promise<Subcontractor[]>;
    update(id: string, data: SubcontractorUpdateData, options?: SubcontractorQueryOptions): Promise<Subcontractor>;
    deleteByIds(ids: string[], options?: SubcontractorQueryOptions): Promise<Subcontractor[]>;
    remove(id: string, options?: SubcontractorQueryOptions): Promise<Subcontractor>;
    findBy(where: Partial<Subcontractor>, options?: SubcontractorQueryOptions): Promise<Subcontractor | null>;
    findAll(filter: SubcontractorFilter, options?: SubcontractorQueryOptions): Promise<{ rows: Subcontractor[], count: number }>;
    findAllAutocomplete(query: string, limit: number): Promise<SubcontractorAutocomplete[]>;
}
export{ ISubContractorDBApi }
