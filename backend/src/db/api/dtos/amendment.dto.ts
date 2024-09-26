export interface AmendmentDTO {
  id?: string;
  type?:
    | 'Change Order'
    | 'Discount'
    | 'Insurance Claim'
    | 'Supplement'
    | 'Upgrade';
  amount?: number;
  description?: string;
  importHash?: string;
  related_jobId?: string;
  createdById?: string;
  updatedById?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
