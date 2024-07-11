interface IInvoicesService {
  create(data: any, currentUser: any): Promise<void>;
  bulkImport(
    req: any,
    res: any,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(data: any, id: number, currentUser: any): Promise<any>;
  deleteByIds(ids: number[], currentUser: any): Promise<void>;
  remove(id: number, currentUser: any): Promise<void>;
}

export { IInvoicesService };
