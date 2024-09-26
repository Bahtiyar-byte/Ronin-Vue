import { UserDTO } from '../../db/api/dtos/users.dto';

interface IEstimateSectionsService {
  create(data: any, currentUser: UserDTO): Promise<void>;
  bulkImport(
    req: Request,
    res: Response,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(data: any, id: string, currentUser: UserDTO): Promise<any>;
  deleteByIds(ids: string[], currentUser: UserDTO): Promise<void>;
  remove(id: string, currentUser: UserDTO): Promise<void>;
}

export { IEstimateSectionsService };
