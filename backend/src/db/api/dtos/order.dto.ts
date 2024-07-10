export interface OrderDTO {
  id?: string;
  order_number?: string | null;
  total_amount?: number | null;
  importHash?: string | null;
  related_job?: string | null; // Assuming related_job is of type string
  related_estimate?: string | null; // Assuming related_estimate is of type string
}
