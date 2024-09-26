import "reflect-metadata"

import type { ContractDTO } from '~/db/api/dtos/contract.dto.ts'
import type SendNotificationAdditionalData from '~/@types/helpers/SendNotificationAdditionalData.ts'
import type { IContractsService } from './interfaces/IContractsService.interface'

const db = require('../db/models');
import ContractsDBApi from '../db/api/contracts.ts'

const Contracts = require('./contracts.js')
import { Container, Service } from 'typedi'
import { UserDTO } from '~/db/api/dtos/users.dto.ts'

import {
    NotificationServiceToken,
} from '../app/Notifications/Services/Contracts/NotificationsServicesContracts'

const notificationService = Container.get(NotificationServiceToken);

@Service()
export default class ContractsService
  extends Contracts
  implements IContractsService {

    async create(data: ContractDTO, currentUser: UserDTO): Promise<any> {
        const transaction = await db.sequelize.transaction();
        try {
            const contract = await ContractsDBApi.create(data, {
                currentUser,
                transaction,
            });

            await transaction.commit();

            return contract;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async update(data: ContractDTO, id: string, currentUser: UserDTO) {
        await super.update(data, id, currentUser);

        return await ContractsDBApi.findBy({ id });
    }

    bulkImport(req: Request, res: Response, sendInvitationEmails?: boolean, host?: string): Promise<void> {
        return Contracts.bulkImport(req, res, sendInvitationEmails, host)
    }
    deleteByIds(ids: string[], currentUser: UserDTO): Promise<void> {
        return Contracts.deleteByIds(ids, currentUser)
    }
    remove(id: string, currentUser: UserDTO): Promise<void> {
        return Contracts.remove(id, currentUser)
    }

    async sendToCustomer (contract: ContractDTO, additionalData: SendNotificationAdditionalData): Promise<boolean> {
        return notificationService.sendToCustomer(contract, additionalData)
    }
}
