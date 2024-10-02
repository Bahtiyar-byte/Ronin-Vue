// Options interface for the methods
interface Options {
    currentUser?: { id: string | null };
    transaction?: any;
    countOnly?: boolean;
}

// Filter interface for filtering and pagination
interface LaborTicketFilter {
    limit?: number;
    page?: number;
    field?: string;
    sort?: 'asc' | 'desc';
    id?: string;
    name?: string;
    crew_instructions?: string;
    disclaimer?: string;
    start_dateRange?: [string, string];
    end_dateRange?: [string, string];
    actual_start_timeRange?: [string, string];
    actual_end_timeRange?: [string, string];
    assigned_dateRange?: [string, string];
    active?: boolean | string;
    crew_actions?: string;
    labor_progress?: string;
    related_job?: string;
    related_order?: string;
    related_images?: string;
    related_document?: string;
    assigned_crew?: string;
    createdAtRange?: [string, string];
}

// Data interface for labor_ticket creation and updates
interface LaborTicketData {
    id?: string;
    name?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    crew_instructions?: string | null;
    actual_start_time?: string | null;
    actual_end_time?: string | null;
    crew_actions?: string | null;
    labor_progress?: string | null;
    disclaimer?: string | null;
    assigned_date?: string | null;
    importHash?: string | null;
    related_job?: string | null;
    related_order?: string | null;
    related_images?: string[] | null;
    related_document?: string[] | null;
    assigned_crew?: string[] | null;
    createdAt?: string;
    createdById?: string;
    updatedById?: string;
}

// Bulk import data interface
interface LaborTicketBulkImportData {
    id?: string;
    name?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    crew_instructions?: string | null;
    actual_start_time?: string | null;
    actual_end_time?: string | null;
    crew_actions?: string | null;
    labor_progress?: string | null;
    disclaimer?: string | null;
    assigned_date?: string | null;
    importHash?: string | null;
    createdById: string;
    updatedById: string;
    createdAt?: string;
}

// Autocomplete return type
interface AutocompleteResult {
    id: string;
    label: string;
}

// Rows and count return type for findAll
interface LaborTicketRowsAndCount {
    rows: LaborTicketData[];
    count: number;
}

// Labor ticket DB API interface
interface ILaborTicketDBApi {
    create(data: LaborTicketData, options: Options): Promise<LaborTicketData>;
    bulkImport(data: LaborTicketBulkImportData[], options: Options): Promise<LaborTicketData[]>;
    update(id: string, data: LaborTicketData, options: Options): Promise<LaborTicketData>;
    deleteByIds(ids: string[], options: Options): Promise<LaborTicketData[]>;
    remove(id: string, options: Options): Promise<LaborTicketData>;
    findBy(where: object, options: Options): Promise<LaborTicketData>;
    findAll(filter: LaborTicketFilter, options: Options): Promise<LaborTicketRowsAndCount>;
    findAllAutocomplete(query: string, limit: number): Promise<AutocompleteResult[]>;
}
export {ILaborTicketDBApi}