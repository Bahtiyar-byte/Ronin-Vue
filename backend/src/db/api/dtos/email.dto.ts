export interface EmailDTO {
  id: string;
  importHash: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  related_jobId?: string | null;
  related_contactId?: string | null;
  related_userId?: string | null;
  createdById?: string | null;
  updatedById?: string | null;
}
