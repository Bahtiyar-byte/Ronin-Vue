interface ICrewService {
    create(data: any, currentUser: any): Promise<void>;
    bulkImport(
        req: Request,
        res: Response,
        sendInvitationEmails?: boolean,
        host?: string
    ): Promise<void>;
    update(data: any, id: string | number, currentUser: any): Promise<any>;
    deleteByIds(ids: Array<string | number>, currentUser: any): Promise<void>;
    remove(id: string | number, currentUser: any): Promise<void>;
}
export { ICrewService }