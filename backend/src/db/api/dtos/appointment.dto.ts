export interface AppointmentDto {
  id?: string;
  subject?: string;
  start_time?: Date;
  end_time?: Date;
  notes?: string;
  importHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  assigned_toId?: string;
  related_jobId?: string;
  related_contactId?: string;
  createdById?: string;
  updatedById?: string;
}
