import { Response } from 'express';

interface CurrentUser {
  id: string | null;
}

export interface IContactsService {
  create(data: any, currentUser: CurrentUser): Promise<void>;
  bulkImport(
    req: any,
    res: Response,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(data: any, id: string, currentUser: CurrentUser): Promise<any>;
  assignContact(data: any, id: string, currentUser: CurrentUser): Promise<any>;
  deleteByIds(ids: string[], currentUser: CurrentUser): Promise<void>;
  remove(id: string, currentUser: CurrentUser): Promise<void>;
}
