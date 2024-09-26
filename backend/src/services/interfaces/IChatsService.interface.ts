import { UserDTO } from '../../db/api/dtos/users.dto';

interface IChatsService {
  create(data: any, currentUser: UserDTO): Promise<void>;
  bulkImport(
    req: any,
    res: any,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(data: any, id: string, currentUser: UserDTO): Promise<any>;
  deleteByIds(ids: string[], currentUser: UserDTO): Promise<void>;
  remove(id: string, currentUser: UserDTO): Promise<void>;
}
export { IChatsService };
