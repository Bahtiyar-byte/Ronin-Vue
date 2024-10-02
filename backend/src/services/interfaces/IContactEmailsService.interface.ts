import { Request, Response } from 'express';
import { Transaction } from 'sequelize';

interface IContactEmailsService {
    create(data: ContactEmailData, currentUser: User): Promise<void>;
    bulkImport(
        req: Request,
        res: Response,
        sendInvitationEmails?: boolean,
        host?: string
    ): Promise<void>;
    update(
        data: ContactEmailData,
        id: string | number,
        currentUser: User
    ): Promise<ContactEmailRecord>;
    deleteByIds(ids: string[] | number[], currentUser: User): Promise<void>;
    remove(id: string | number, currentUser: User): Promise<void>;
}

interface ContactEmailData {
    id?: string | number;
    email: string;
    contactId: string | number;
    isPrimary?: boolean;
    [key: string]: any; // For any additional fields
}

interface User {
    id: string | number;
    email?: string;
    roles?: string[];
}

interface ContactEmailRecord {
    id: string | number;
    email: string;
    contactId: string | number;
    isPrimary?: boolean;
    [key: string]: any;
}
export {IContactEmailsService}