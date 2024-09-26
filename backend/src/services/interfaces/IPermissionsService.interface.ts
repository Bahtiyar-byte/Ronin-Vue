import { PermissionDTO } from '../../db/api/dtos/permission.dto';

interface IPermissionsService {
  create(data: PermissionDTO, currentUser: any): Promise<void>;
  bulkImport(
    req: any,
    res: any,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(data: PermissionDTO, id: number, currentUser: any): Promise<any>;
  deleteByIds(ids: number[], currentUser: any): Promise<void>;
  remove(id: number, currentUser: any): Promise<void>;
}
export { IPermissionsService };
