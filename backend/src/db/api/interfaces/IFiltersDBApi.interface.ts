// filters-db-api.interface.ts

interface Filter {
  entity: string;
  column: string;
}

interface IFiltersDBApi {
  findVariants(filter: Filter, options?: any): Promise<string[]>;
}

export { IFiltersDBApi };
