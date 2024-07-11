export interface ContactDTO {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status?: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  importHash?: string;
  createdById?: string;
  updatedById?: string;
  deletedBy?: string;
  createdAt?: Date;
}
