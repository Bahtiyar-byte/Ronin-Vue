import { Request, Response } from 'express';

interface ISubContractorService {
    create(data: SubcontractorData, currentUser: User): Promise<void>;
    bulkImport(
        req: Request,
        res: Response,
        sendInvitationEmails?: boolean,
        host?: string
    ): Promise<void>;
    update(
        data: SubcontractorData,
        id: string | number,
        currentUser: User
    ): Promise<Subcontractor>;
    deleteByIds(ids: string[] | number[], currentUser: User): Promise<void>;
    remove(id: string | number, currentUser: User): Promise<void>;
}

interface SubcontractorData {
    id?: string | number;
    name?: string;
    contactEmail?: string;
    phoneNumber?: string;
    address?: string;
    [key: string]: any; // For any additional fields
}

interface User {
    id: string | number;
    email?: string;
    roles?: string[];
}

interface Subcontractor {
    id: string | number;
    name?: string;
    contactEmail?: string;
    phoneNumber?: string;
    address?: string;
    [key: string]: any;
}

export {ISubContractorService}