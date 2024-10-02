import { Request, Response } from 'express';
import { Transaction } from 'sequelize';

interface IContactPhonesService {
    create(data: ContactPhoneData, currentUser: User): Promise<void>;
    bulkImport(
        req: Request,
        res: Response,
        sendInvitationEmails?: boolean,
        host?: string
    ): Promise<void>;
    update(
        data: ContactPhoneData,
        id: string | number,
        currentUser: User
    ): Promise<ContactPhoneRecord>;
    deleteByIds(ids: string[] | number[], currentUser: User): Promise<void>;
    remove(id: string | number, currentUser: User): Promise<void>;
}

interface ContactPhoneData {
    id?: string | number;
    phoneNumber: string;
    contactId: string | number;
    isPrimary?: boolean;
    [key: string]: any; // For any additional fields
}

interface User {
    id: string | number;
    email?: string;
    roles?: string[];
}

interface ContactPhoneRecord {
    id: string | number;
    phoneNumber: string;
    contactId: string | number;
    isPrimary?: boolean;
    [key: string]: any;
}
export {IContactPhonesService}