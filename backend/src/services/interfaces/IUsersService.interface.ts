import { UserDTO } from '../../db/api/dtos/users.dto';
interface IUsersService {
  create(
    data: any,
    currentUser: UserDTO,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  bulkImport(
    req: any,
    res: any,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(data: any, id: number, currentUser: UserDTO): Promise<any>; // Adjust the return type as per your model structure
  remove(id: number, currentUser: UserDTO): Promise<void>;
}
export { IUsersService };
