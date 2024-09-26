import type SendNotificationAdditionalData from '~/@types/helpers/SendNotificationAdditionalData';

const Estimates = require('./estimates.js');
import { Container, Service } from 'typedi';
import type { IEstimatesService } from './interfaces/IEstimatesService.interface';
import type Estimate from '~/@types/Estimate/Estimate';

import {
    NotificationServiceToken,
} from '../app/Notifications/Services/Estimates/NotificationsServicesEstimates';
import { UserDTO } from '~/db/api/dtos/users.dto';

const notificationService = Container.get(NotificationServiceToken);

@Service()
export default class EstimatesService
    extends Estimates
    implements IEstimatesService {

    create(data: any, currentUser: UserDTO): Promise<void> {
        return Estimates.create(data, currentUser)
    }
    bulkImport(req: Request, res: Response, sendInvitationEmails?: boolean, host?: string): Promise<void> {
        return Estimates.bulkImport(req, res, sendInvitationEmails, host)
    }
    update(data: any, id: string, currentUser: UserDTO): Promise<any> {
        return Estimates.update(data, id, currentUser)
    }
    deleteByIds(ids: string[], currentUser: UserDTO): Promise<void> {
        return Estimates.deleteByIds(ids, currentUser)
    }
    remove(id: string, currentUser: UserDTO): Promise<void> {
        return Estimates.remove(id, currentUser)
    }

    async sendToCustomer (estimate: Estimate, additionalData: SendNotificationAdditionalData): Promise<boolean> {
        return notificationService.sendToCustomer(estimate, additionalData)
    }
}
