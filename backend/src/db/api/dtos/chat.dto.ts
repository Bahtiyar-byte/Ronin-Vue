import { JobDTO } from './jobs.dto';
import { UserDTO } from './users.dto';
export interface ChatDTO {
  id: string;
  name?: string;
  importHash?: string;
  createdById: string;
  updatedById: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  related_job?: JobDTO;
  related_users?: UserDTO[];
}
