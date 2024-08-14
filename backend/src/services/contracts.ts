const db = require('../db/models');
import type { IContractsService } from './interfaces/IContractsService.interface';
import ContractsDBApi from "../db/api/contracts.ts";
import type User from "~/@types/User/User.ts";
import type { ContractDTO } from '../db/api/dtos/contract.dto';

const Contracts = require('./contracts.js');
import { Service } from 'typedi';

@Service()
export default class ContractsService
  extends Contracts
  implements IContractsService {

    static async create(data: ContractDTO, currentUser: User) {
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

    static async update(data: ContractDTO, id: string, currentUser: User) {
        await super.update(data, id, currentUser);

        return await ContractsDBApi.findBy({ id });
    }
}
