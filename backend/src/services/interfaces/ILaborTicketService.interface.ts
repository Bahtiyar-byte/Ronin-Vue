import { Request, Response } from 'express';

interface ILaborTicketService {
    create(data: LaborTicketData, currentUser: User): Promise<void>;
    bulkImport(
        req: Request,
        res: Response,
        sendInvitationEmails?: boolean,
        host?: string
    ): Promise<void>;
    update(
        data: LaborTicketData,
        id: string | number,
        currentUser: User
    ): Promise<LaborTicket>;
    deleteByIds(ids: string[] | number[], currentUser: User): Promise<void>;
    remove(id: string | number, currentUser: User): Promise<void>;
}

interface LaborTicketData {
    id?: string | number;
    description?: string;
    date?: string;
    hoursWorked?: number;
    employeeId?: string | number;
    jobId?: string | number;
}

interface User {
    id: string | number;
    email?: string;
    roles?: string[];
}

interface LaborTicket {
    id: string | number;
    description?: string;
    date?: string;
    hoursWorked?: number;
    employeeId?: string | number;
    jobId?: string | number;
}

export {ILaborTicketService}