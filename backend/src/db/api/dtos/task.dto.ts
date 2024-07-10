export interface TaskDTO {
  id?: string;
  subject: string | null;
  status: string | null;
  priority: string | null;
  due_date: Date | null;
  importHash: string | null;
  createdById: string | null;
  updatedById: string | null;
  createdAt?: Date;
}
