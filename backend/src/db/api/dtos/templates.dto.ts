export interface TemplateDTO {
  id?: string;
  name: string | null;
  description: string | null;
  importHash: string | null;
  createdById: string | null;
  updatedById: string | null;
  createdAt?: Date;
}
