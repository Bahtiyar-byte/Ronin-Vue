export interface PermissionDTO {
  id?: string;
  name: string | null;
  importHash: string | null;
  createdById: string | null;
  updatedById: string | null;
  createdAt?: Date;
}
