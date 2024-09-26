import { OrderDTO } from '../../db/api/dtos/order.dto';

interface IOrdersService {
  create(data: OrderDTO, currentUser: any): Promise<void>;
  bulkImport(
    req: any,
    res: any,
    sendInvitationEmails?: boolean,
    host?: string,
  ): Promise<void>;
  update(data: OrderDTO, id: number, currentUser: any): Promise<any>;
  deleteByIds(ids: number[], currentUser: any): Promise<void>;
  remove(id: number, currentUser: any): Promise<void>;
}

export { IOrdersService };
