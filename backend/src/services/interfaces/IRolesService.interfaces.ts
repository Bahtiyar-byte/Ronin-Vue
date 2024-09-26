import { RolesDTO } from '../../db/api/dtos/roles.dto';

interface IRolesService {
  create(data: RolesDTO, currentUser: any): Promise<void>;
  bulkImport(
    req: any,
    res: any,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(data: RolesDTO, id: number, currentUser: any): Promise<any>;
  deleteByIds(ids: number[], currentUser: any): Promise<void>;
  remove(id: number, currentUser: any): Promise<void>;
  addRoleInfo(
    roleId: number,
    userId: number,
    key: string,
    widgetId: string,
    currentUser: any,
  ): Promise<any>;
  removeRoleInfoById(
    infoId: number,
    roleId: number,
    key: string,
    currentUser: any,
  ): Promise<any>;
  getRoleInfoByKey(key: string, roleId: number, currentUser: any): Promise<any>;
}
export { IRolesService };
