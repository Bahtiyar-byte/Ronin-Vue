export interface EstimatesDTO {
  id?: string;
  name?: string | null;
  description?: string | null;
  trade?: string | null;
  template_used?: string | null;
  material_cost?: number | null;
  labor_cost?: number | null;
  markup?: number | null;
  profit_margin?: number | null;
  total_price?: number | null;
  status?: string | null;
  importHash?: string | null;
}
