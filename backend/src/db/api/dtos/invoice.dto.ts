export interface InvoiceDTO {
  id?: any;
  invoice_number?: string | null;
  invoice_date?: Date | null;
  terms?:
    | 'By Due Date'
    | 'Upon Receipt'
    | 'Net 7 Days'
    | 'Net 10 Days'
    | 'Net 15 Days'
    | 'Net 30 Days'
    | 'Net 45 Days'
    | 'Net 60 Days'
    | null;
  approved_job_value?: number | null;
  balance_amount?: number | null;
  importHash?: string | null;
  related_job?: any;
}
