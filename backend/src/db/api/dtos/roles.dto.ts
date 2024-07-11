export interface RolesDTO {
  id?: string;
  name: string | null;
  role_customization: string | null;
  importHash: string | null;
  createdById: string | null;
  updatedById: string | null;
  createdAt?: Date;
}
