export interface EstimateSectionDTO {
  id?: string;
  amount?: number | null;
  material_price?: number | null;
  labor_price?: number | null;
  name?: string | null;
  description?: string | null;
  importHash?: string | null;
  createdById: string | null;
  updatedById: string | null;
}
