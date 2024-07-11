import { UserDTO } from '../../db/api/dtos/users.dto';

interface ITasksService {
  create(data: any, currentUser: UserDTO): Promise<void>;
  bulkImport(
    req: any,
    res: any,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(data: any, id: number, currentUser: UserDTO): Promise<any>; // Adjust the return type as per your model structure
  deleteByIds(ids: number[], currentUser: UserDTO): Promise<void>;
  remove(id: number, currentUser: UserDTO): Promise<void>;
}

export { ITasksService };
