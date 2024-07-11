export interface ContractDTO {
  id?: string;
  name: string | null;
  amount: number | null;
  body: string | null;
  signed_date: Date | null;
  importHash: string | null;
  createdById: string | null;
  updatedById: string | null;
}
