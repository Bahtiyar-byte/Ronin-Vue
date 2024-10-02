import { Request, Response } from 'express';
import { Transaction } from 'sequelize';

interface IHistoryService {
    create(data: HistoryData, currentUser: User): Promise<void>;
    bulkImport(
        req: Request,
        res: Response,
        sendInvitationEmails?: boolean,
        host?: string
    ): Promise<void>;
    update(
        data: HistoryData,
        id: string | number,
        currentUser: User
    ): Promise<HistoryRecord>;
    deleteByIds(ids: string[] | number[], currentUser: User): Promise<void>;
    remove(id: string | number, currentUser: User): Promise<void>;
}

interface HistoryData {
    id?: string | number;
    event?: string;
    timestamp?: Date;
    details?: string;
    [key: string]: any; // For any additional fields
}

interface User {
    id: string | number;
    email?: string;
    roles?: string[];
}

interface HistoryRecord {
    id: string | number;
    event?: string;
    timestamp?: Date;
    details?: string;
    [key: string]: any;
}
export {IHistoryService}