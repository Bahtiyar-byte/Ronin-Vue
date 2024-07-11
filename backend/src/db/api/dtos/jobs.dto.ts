export interface JobDTO {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  type?: string;
  status?: string;
  address?: string;
  start_date?: string | null;
  end_date?: string | null;
  importHash?: string | null;
  assigned_to?: string | null;
  related_contact?: string | null;
  main_image?: string | null;
  documents?: string | null;
  [key: string]: any;
}
