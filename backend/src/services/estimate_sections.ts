import db from '../db/models';

const EstimateSections = require('./estimate_sections.js');

import type { UserDTO } from '~/db/api/dtos/users.dto.ts';
import { Service } from 'typedi';
import type { IEstimateSectionsService } from './interfaces/IEstimateSectionsService.interface';

import EstimateSectionsDBApi from '../db/api/estimate_sections.ts';

@Service()
export default class EstimateSectionsServiceService
  extends EstimateSections
  implements IEstimateSectionsService {

    async create(data: any, currentUser: UserDTO): Promise<void> {
        const transaction = await db.sequelize.transaction();

        try {
            const sections = await EstimateSectionsDBApi.create(data, {
                currentUser,
                transaction,
            });

            await transaction.commit();

            return sections;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    bulkImport(req: Request, res: Response, sendInvitationEmails?: boolean, host?: string): Promise<void> {
        return EstimateSections.bulkImport(req as Request, res, sendInvitationEmails, host)
    }

    update(data: any, id: string, currentUser: UserDTO): Promise<any> {
        return EstimateSections.update(data, id, currentUser)
    }

    deleteByIds(ids: string[], currentUser: UserDTO): Promise<void> {
        return EstimateSections.deleteByIds(ids, currentUser)
    }

    remove(id: string, currentUser: UserDTO): Promise<void> {
        return EstimateSections.remove(id, currentUser)
    }


}
