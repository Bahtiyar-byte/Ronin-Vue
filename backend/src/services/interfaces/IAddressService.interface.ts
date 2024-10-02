import { Request, Response } from 'express';

interface IAddressService {
    create(data: AddressData, currentUser: User): Promise<void>;
    bulkImport(
        req: Request,
        res: Response,
        sendInvitationEmails?: boolean,
        host?: string
    ): Promise<void>;
    update(
        data: AddressData,
        id: string | number,
        currentUser: User
    ): Promise<Address>;
    deleteByIds(ids: string[] | number[], currentUser: User): Promise<void>;
    remove(id: string | number, currentUser: User): Promise<void>;
}

interface AddressData {
    id?: string | number;
    street?: string;
    suite_apt_unit?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    is_mailing_address?: boolean;
    is_location?: boolean;
    is_billing_Address?: boolean;
    latitude?: number;
    longitude?: number;
    importHash?: string;
    related_contact?: string | null;
    related_job?: string | null;
}

interface User {
    id: string | number;
}

interface Address {
    id: string | number;
    street?: string;
    suite_apt_unit?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    is_mailing_address?: boolean;
    is_location?: boolean;
    is_billing_Address?: boolean;
    latitude?: number;
    longitude?: number;
}

export {IAddressService}